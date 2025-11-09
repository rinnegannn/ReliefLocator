import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import EmergencyAlertBanner from "@/components/EmergencyAlertBanner";
import SearchLocationInput from "@/components/SearchLocationInput";
import FilterControls, { ResourceType } from "@/components/FilterControls";
import MapView from "@/components/MapView";
import ResourceList, { Resource } from "@/components/ResourceList";
import LastUpdatedIndicator from "@/components/LastUpdatedIndicator";
import ShareLocationButton from "@/components/ShareLocationButton";
import OfflineIndicator from "@/components/OfflineIndicator";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface ReliefCenter {
  id: string;
  name: string;
  type: ResourceType;
  address: string;
  phone: string | null;
  hours: string | null;
  latitude: number;
  longitude: number;
  lastUpdated: string;
  distance?: number;
}

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<ResourceType[]>([
    "shelter",
    "food",
    "medical",
    "water",
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("M5H 2N2");
  const [coordinates, setCoordinates] = useState<{ lat: number; lng: number } | null>(null);
  const [lastFetchTime, setLastFetchTime] = useState<Date>(new Date());
  const { toast } = useToast();

  const { data: reliefCenters = [], refetch, isLoading } = useQuery<ReliefCenter[]>({
    queryKey: ["/api/relief-centers", coordinates],
    enabled: !!coordinates,
    queryFn: async () => {
      if (!coordinates) return [];
      const url = `/api/relief-centers?lat=${coordinates.lat}&lng=${coordinates.lng}&radius=25`;
      
      try {
        const response = await fetch(url);
        const data = await response.json();
        
        const fetchTime = new Date();
        localStorage.setItem("cached-relief-centers", JSON.stringify({
          data,
          timestamp: fetchTime.toISOString(),
          coordinates,
        }));
        
        setLastFetchTime(fetchTime);
        setIsOffline(false);
        return data;
      } catch (error) {
        console.error("Failed to fetch relief centers, using cache:", error);
        
        const cached = localStorage.getItem("cached-relief-centers");
        if (cached) {
          const { data } = JSON.parse(cached);
          setIsOffline(true);
          return data;
        }
        
        setIsOffline(true);
        throw error;
      }
    },
  });

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const lat = urlParams.get("lat");
    const lng = urlParams.get("lng");
    const locationParam = urlParams.get("location");
    
    if (lat && lng) {
      const coords = {
        lat: parseFloat(lat),
        lng: parseFloat(lng),
      };
      setCoordinates(coords);
      setCurrentLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
    } else if (locationParam) {
      setCurrentLocation(locationParam);
      convertPostalCode(locationParam);
    } else {
      convertPostalCode("M5H 2N2");
    }
  }, []);

  const convertPostalCode = async (postalCode: string) => {
    try {
      const response = await apiRequest("POST", "/api/postal-code/convert", { postalCode });
      const data = await response.json();
      setCoordinates(data);
      setIsOffline(false);
    } catch (error) {
      console.error("Error converting postal code:", error);
      toast({
        title: "Error",
        description: "Could not find coordinates for this postal code. Please try another.",
        variant: "destructive",
      });
    }
  };

  const filteredResources: Resource[] = reliefCenters
    .filter((center) => activeFilters.includes(center.type))
    .map((center) => ({
      id: center.id,
      name: center.name,
      type: center.type,
      address: center.address,
      phone: center.phone || undefined,
      hours: center.hours || undefined,
      distance: center.distance || 0,
      lastUpdated: formatLastUpdated(center.lastUpdated),
    }));

  const mapMarkers = reliefCenters
    .filter((center) => activeFilters.includes(center.type))
    .map((center) => ({
      id: center.id,
      lat: center.latitude,
      lng: center.longitude,
      type: center.type,
      name: center.name,
    }));

  const filterCounts = {
    shelter: reliefCenters.filter((r) => r.type === "shelter").length,
    food: reliefCenters.filter((r) => r.type === "food").length,
    medical: reliefCenters.filter((r) => r.type === "medical").length,
    water: reliefCenters.filter((r) => r.type === "water").length,
  };

  const handleToggleFilter = (type: ResourceType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  const handleSearch = (location: string) => {
    setCurrentLocation(location);
    convertPostalCode(location);
    
    const url = new URL(window.location.href);
    url.searchParams.delete("lat");
    url.searchParams.delete("lng");
    url.searchParams.delete("resource");
    url.searchParams.set("location", location);
    window.history.pushState({}, "", url);
  };

  const handleUseCurrentLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          setCoordinates(coords);
          setCurrentLocation(`${coords.lat.toFixed(4)}, ${coords.lng.toFixed(4)}`);
          
          const url = new URL(window.location.href);
          url.searchParams.delete("location");
          url.searchParams.delete("resource");
          url.searchParams.set("lat", coords.lat.toString());
          url.searchParams.set("lng", coords.lng.toString());
          window.history.pushState({}, "", url);
          
          toast({
            title: "Location found",
            description: "Showing relief centers near your current location",
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
          toast({
            title: "Location unavailable",
            description: "Could not access your location. Please enter a postal code.",
            variant: "destructive",
          });
        }
      );
    } else {
      toast({
        title: "Not supported",
        description: "Geolocation is not supported by your browser",
        variant: "destructive",
      });
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await refetch();
    setTimeout(() => setIsRefreshing(false), 500);
  };

  const handleGetDirections = (id: string) => {
    const center = reliefCenters.find((c) => c.id === id);
    if (!center) return;

    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
    const destination = encodeURIComponent(center.address);
    
    const mapsUrl = isIOS
      ? `maps://maps.apple.com/?daddr=${destination}&dirflg=d`
      : `https://www.google.com/maps/dir/?api=1&destination=${destination}`;

    window.open(mapsUrl, "_blank");
  };

  const handleShare = async (id: string) => {
    const center = reliefCenters.find((c) => c.id === id);
    if (!center) return;

    const shareUrl = `${window.location.origin}${window.location.pathname}?lat=${center.latitude}&lng=${center.longitude}&resource=${id}`;
    const shareText = `${center.name} - ${center.address}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: center.name,
          text: shareText,
          url: shareUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      try {
        await navigator.clipboard.writeText(shareUrl);
        toast({
          title: "Link copied",
          description: "Location link copied to clipboard",
        });
      } catch (error) {
        console.error("Error copying to clipboard:", error);
        toast({
          title: "Could not copy",
          description: "Please copy the URL manually from the address bar",
          variant: "destructive",
        });
      }
    }
  };

  const handleMarkerClick = (id: string) => {
    const element = document.querySelector(`[data-testid="card-resource-${id}"]`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  function formatLastUpdated(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins} minute${diffMins === 1 ? "" : "s"} ago`;
    
    const diffHours = Math.floor(diffMins / 60);
    if (diffHours < 24) return `${diffHours} hour${diffHours === 1 ? "" : "s"} ago`;
    
    const diffDays = Math.floor(diffHours / 24);
    return `${diffDays} day${diffDays === 1 ? "" : "s"} ago`;
  }

  if (isLoading && !reliefCenters.length) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading relief centers...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen overflow-hidden bg-background flex flex-col">
      <EmergencyAlertBanner
        message="Evacuation order in effect for downtown area. Seek shelter immediately at designated evacuation centers."
        timestamp="Updated 15 minutes ago"
        severity="critical"
      />

      {isOffline && <OfflineIndicator />}

      <header className="flex-shrink-0 bg-background border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-5 space-y-5">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-foreground">Relief Resource Locator</h1>
              <p className="text-sm text-muted-foreground mt-1.5">
                Find emergency resources within 25km of your location
              </p>
            </div>
            <ShareLocationButton location={currentLocation} />
          </div>

          <SearchLocationInput
            onSearch={handleSearch}
            onUseCurrentLocation={handleUseCurrentLocation}
          />

          <div className="flex items-center justify-between gap-4 flex-wrap">
            <FilterControls
              activeFilters={activeFilters}
              onToggleFilter={handleToggleFilter}
              counts={filterCounts}
            />
            <LastUpdatedIndicator
              lastUpdated={formatLastUpdated(lastFetchTime.toISOString())}
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      </header>

      <main className="flex-1 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 h-full">
          <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6 h-full">
            <div className="order-2 lg:order-1 h-full">
              <MapView
                markers={mapMarkers}
                onMarkerClick={handleMarkerClick}
                userLocation={coordinates || undefined}
                onRecenter={() => coordinates && setCoordinates({ ...coordinates })}
              />
            </div>

            <div className="order-1 lg:order-2 overflow-auto h-full">
              <ResourceList
                resources={filteredResources}
                onGetDirections={handleGetDirections}
                onShare={handleShare}
              />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
