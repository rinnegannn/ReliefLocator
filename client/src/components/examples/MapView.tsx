import MapView from "../MapView";

export default function MapViewExample() {
  const mockMarkers = [
    { id: "1", lat: 43.65, lng: -79.38, type: "shelter" as const, name: "Metro Shelter" },
    { id: "2", lat: 43.66, lng: -79.39, type: "food" as const, name: "Daily Bread Food Bank" },
    { id: "3", lat: 43.64, lng: -79.37, type: "medical" as const, name: "Toronto General Hospital" },
    { id: "4", lat: 43.67, lng: -79.40, type: "water" as const, name: "Water Distribution Point" },
    { id: "5", lat: 43.63, lng: -79.36, type: "shelter" as const, name: "Community Center" },
  ];

  return (
    <div className="h-[600px] p-4 bg-background">
      <MapView
        markers={mockMarkers}
        onMarkerClick={(id) => console.log("Marker clicked:", id)}
        userLocation={{ lat: 43.65, lng: -79.38 }}
        onRecenter={() => console.log("Recenter clicked")}
      />
    </div>
  );
}
