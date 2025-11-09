import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Navigation } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ResourceType } from "./FilterControls";

interface MapMarker {
  id: string;
  lat: number;
  lng: number;
  type: ResourceType;
  name: string;
}

interface MapViewProps {
  markers: MapMarker[];
  onMarkerClick: (id: string) => void;
  userLocation?: { lat: number; lng: number };
  onRecenter?: () => void;
}

const markerColors: Record<ResourceType, string> = {
  shelter: "#d32f2f",
  food: "#f57c00",
  medical: "#1976d2",
  water: "#7b1fa2",
};

function createCustomIcon(color: string): L.DivIcon {
  return L.divIcon({
    html: `<svg width="32" height="40" viewBox="0 0 32 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24c0-8.837-7.163-16-16-16z" fill="${color}"/>
      <circle cx="16" cy="15" r="6" fill="white"/>
    </svg>`,
    className: "custom-marker-icon",
    iconSize: [32, 40],
    iconAnchor: [16, 40],
    popupAnchor: [0, -40],
  });
}

export default function MapView({
  markers,
  onMarkerClick,
  userLocation,
  onRecenter,
}: MapViewProps) {
  const mapRef = useRef<L.Map | null>(null);
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    const defaultCenter: [number, number] = userLocation
      ? [userLocation.lat, userLocation.lng]
      : [43.6532, -79.3832];

    const map = L.map(mapContainerRef.current, {
      minZoom: 3,
      maxBounds: [[-85, -180], [85, 180]],
      maxBoundsViscosity: 1.0,
    }).setView(defaultCenter, 12);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      maxZoom: 19,
      minZoom: 3,
      bounds: [[-85, -180], [85, 180]],
    }).addTo(map);

    mapRef.current = map;
    markersLayerRef.current = L.layerGroup().addTo(map);

    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  useEffect(() => {
    if (!mapRef.current || !markersLayerRef.current) return;

    markersLayerRef.current.clearLayers();

    markers.forEach((marker) => {
      const icon = createCustomIcon(markerColors[marker.type]);
      const leafletMarker = L.marker([marker.lat, marker.lng], { icon })
        .bindPopup(`<strong>${marker.name}</strong>`)
        .on("click", () => onMarkerClick(marker.id));

      leafletMarker.getElement()?.setAttribute("data-testid", `marker-${marker.id}`);
      markersLayerRef.current!.addLayer(leafletMarker);
    });

    if (markers.length > 0 && mapRef.current) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    } else if (markers.length === 0 && userLocation && mapRef.current) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 12);
    }
  }, [markers, onMarkerClick, userLocation]);

  useEffect(() => {
    if (!mapRef.current) return;

    if (userMarkerRef.current) {
      userMarkerRef.current.remove();
      userMarkerRef.current = null;
    }

    if (userLocation) {
      const userIcon = L.divIcon({
        html: `<div class="w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg relative">
          <div class="absolute inset-0 bg-primary rounded-full animate-ping opacity-75"></div>
        </div>`,
        className: "user-location-marker",
        iconSize: [16, 16],
        iconAnchor: [8, 8],
      });

      userMarkerRef.current = L.marker([userLocation.lat, userLocation.lng], {
        icon: userIcon,
      }).addTo(mapRef.current);

      userMarkerRef.current.getElement()?.setAttribute("data-testid", "marker-user-location");
    }
  }, [userLocation]);

  const handleRecenter = () => {
    if (!mapRef.current) return;

    if (userLocation) {
      mapRef.current.setView([userLocation.lat, userLocation.lng], 12);
    } else if (markers.length > 0) {
      const bounds = L.latLngBounds(markers.map((m) => [m.lat, m.lng]));
      mapRef.current.fitBounds(bounds, { padding: [50, 50], maxZoom: 13 });
    }
  };

  return (
    <div className="relative w-full h-full rounded-md overflow-hidden border border-border" data-testid="map-view">
      <div ref={mapContainerRef} className="w-full h-full" />

      {onRecenter && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-4 right-4 shadow-lg z-[1000]"
          onClick={handleRecenter}
          data-testid="button-recenter"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      )}
    </div>
  );
}
