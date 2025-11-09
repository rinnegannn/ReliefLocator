import { useState } from "react";
import { Navigation, ZoomIn, ZoomOut } from "lucide-react";
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

export default function MapView({
  markers,
  onMarkerClick,
  userLocation,
  onRecenter,
}: MapViewProps) {
  const [zoom, setZoom] = useState(12);

  return (
    <div className="relative w-full h-full min-h-[500px] bg-muted rounded-md overflow-hidden" data-testid="map-view">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-full h-full">
          <svg className="w-full h-full">
            <defs>
              <pattern
                id="grid"
                width="40"
                height="40"
                patternUnits="userSpaceOnUse"
              >
                <path
                  d="M 40 0 L 0 0 0 40"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="0.5"
                  className="text-border"
                />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {userLocation && (
            <div
              className="absolute w-4 h-4 bg-primary rounded-full border-2 border-white shadow-lg"
              style={{
                left: "50%",
                top: "50%",
                transform: "translate(-50%, -50%)",
              }}
              data-testid="marker-user-location"
            >
              <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-75" />
            </div>
          )}

          {markers.map((marker, index) => {
            const angle = (index / markers.length) * 2 * Math.PI;
            const radius = 120 + (index % 3) * 40;
            const x = 50 + Math.cos(angle) * radius;
            const y = 50 + Math.sin(angle) * radius;

            return (
              <button
                key={marker.id}
                className="absolute w-8 h-8 -translate-x-1/2 -translate-y-full cursor-pointer hover-elevate active-elevate-2 rounded-full"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                }}
                onClick={() => onMarkerClick(marker.id)}
                data-testid={`marker-${marker.id}`}
              >
                <svg
                  width="32"
                  height="40"
                  viewBox="0 0 32 40"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16 0C7.163 0 0 7.163 0 16c0 8.837 16 24 16 24s16-15.163 16-24c0-8.837-7.163-16-16-16z"
                    fill={markerColors[marker.type]}
                  />
                  <circle cx="16" cy="15" r="6" fill="white" />
                </svg>
              </button>
            );
          })}
        </div>
      </div>

      <div className="absolute top-4 right-4 flex flex-col gap-2">
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg"
          onClick={() => setZoom(Math.min(20, zoom + 1))}
          data-testid="button-zoom-in"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          className="shadow-lg"
          onClick={() => setZoom(Math.max(1, zoom - 1))}
          data-testid="button-zoom-out"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {onRecenter && (
        <Button
          size="icon"
          variant="secondary"
          className="absolute bottom-4 right-4 shadow-lg"
          onClick={onRecenter}
          data-testid="button-recenter"
        >
          <Navigation className="h-4 w-4" />
        </Button>
      )}

      <div className="absolute bottom-4 left-4 bg-card border border-card-border rounded-md px-3 py-2 text-sm font-medium shadow-lg">
        Zoom: {zoom}
      </div>
    </div>
  );
}
