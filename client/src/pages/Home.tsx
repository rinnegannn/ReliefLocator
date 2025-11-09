import { useState } from "react";
import EmergencyAlertBanner from "@/components/EmergencyAlertBanner";
import SearchLocationInput from "@/components/SearchLocationInput";
import FilterControls, { ResourceType } from "@/components/FilterControls";
import MapView from "@/components/MapView";
import ResourceList, { Resource } from "@/components/ResourceList";
import LastUpdatedIndicator from "@/components/LastUpdatedIndicator";
import ShareLocationButton from "@/components/ShareLocationButton";
import OfflineIndicator from "@/components/OfflineIndicator";

export default function Home() {
  const [activeFilters, setActiveFilters] = useState<ResourceType[]>([
    "shelter",
    "food",
    "medical",
    "water",
  ]);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isOffline] = useState(false);
  const [currentLocation, setCurrentLocation] = useState("M5H 2N2");

  const mockResources: Resource[] = [
    {
      id: "1",
      name: "Metro Toronto Convention Centre Emergency Shelter",
      type: "shelter",
      address: "255 Front St W, Toronto, ON M5V 2W6",
      phone: "(416) 585-8000",
      hours: "Open 24/7",
      distance: 2.3,
      lastUpdated: "5 minutes ago",
    },
    {
      id: "2",
      name: "Daily Bread Food Bank",
      type: "food",
      address: "191 New Toronto St, Toronto, ON M8V 2E7",
      phone: "(416) 203-0050",
      hours: "Mon-Fri: 9AM-5PM",
      distance: 4.1,
      lastUpdated: "1 hour ago",
    },
    {
      id: "3",
      name: "Toronto General Hospital Emergency",
      type: "medical",
      address: "200 Elizabeth St, Toronto, ON M5G 2C4",
      phone: "(416) 340-4800",
      hours: "Open 24/7",
      distance: 1.8,
      lastUpdated: "10 minutes ago",
    },
    {
      id: "4",
      name: "Water Distribution Center - Nathan Phillips Square",
      type: "water",
      address: "100 Queen St W, Toronto, ON M5H 2N2",
      phone: "(416) 392-7111",
      hours: "Daily: 8AM-8PM",
      distance: 0.5,
      lastUpdated: "15 minutes ago",
    },
    {
      id: "5",
      name: "Covenant House Emergency Shelter",
      type: "shelter",
      address: "20 Gerrard St E, Toronto, ON M5B 2P3",
      phone: "(416) 598-4898",
      hours: "Open 24/7",
      distance: 3.2,
      lastUpdated: "30 minutes ago",
    },
  ];

  const filteredResources = mockResources.filter((resource) =>
    activeFilters.includes(resource.type)
  );

  const mapMarkers = filteredResources.map((resource) => ({
    id: resource.id,
    lat: 43.65 + Math.random() * 0.05,
    lng: -79.38 + Math.random() * 0.05,
    type: resource.type,
    name: resource.name,
  }));

  const filterCounts = {
    shelter: mockResources.filter((r) => r.type === "shelter").length,
    food: mockResources.filter((r) => r.type === "food").length,
    medical: mockResources.filter((r) => r.type === "medical").length,
    water: mockResources.filter((r) => r.type === "water").length,
  };

  const handleToggleFilter = (type: ResourceType) => {
    setActiveFilters((prev) =>
      prev.includes(type) ? prev.filter((f) => f !== type) : [...prev, type]
    );
  };

  const handleSearch = (location: string) => {
    setCurrentLocation(location);
    console.log("Searching for location:", location);
  };

  const handleUseCurrentLocation = () => {
    console.log("Using current location");
  };

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 1500);
  };

  const handleGetDirections = (id: string) => {
    console.log("Get directions to:", id);
  };

  const handleShare = (id: string) => {
    console.log("Share resource:", id);
  };

  const handleMarkerClick = (id: string) => {
    console.log("Marker clicked:", id);
    const element = document.querySelector(`[data-testid="card-resource-${id}"]`);
    element?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background">
      <EmergencyAlertBanner
        message="Evacuation order in effect for downtown area. Seek shelter immediately at designated evacuation centers."
        timestamp="Updated 15 minutes ago"
        severity="critical"
      />

      {isOffline && <OfflineIndicator />}

      <header className="sticky top-0 z-10 bg-background border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 space-y-4">
          <div className="flex items-center justify-between gap-4 flex-wrap">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold">Relief Resource Locator</h1>
              <p className="text-sm text-muted-foreground mt-1">
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
              lastUpdated="2 minutes ago"
              onRefresh={handleRefresh}
              isRefreshing={isRefreshing}
            />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[1.5fr_1fr] gap-6">
          <div className="order-2 lg:order-1">
            <MapView
              markers={mapMarkers}
              onMarkerClick={handleMarkerClick}
              userLocation={{ lat: 43.65, lng: -79.38 }}
              onRecenter={() => console.log("Recenter")}
            />
          </div>

          <div className="order-1 lg:order-2 overflow-auto max-h-[800px]">
            <ResourceList
              resources={filteredResources}
              onGetDirections={handleGetDirections}
              onShare={handleShare}
            />
          </div>
        </div>
      </main>
    </div>
  );
}
