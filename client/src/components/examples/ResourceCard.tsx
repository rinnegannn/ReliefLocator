import ResourceCard from "../ResourceCard";

export default function ResourceCardExample() {
  return (
    <div className="p-6 bg-background max-w-md">
      <ResourceCard
        id="1"
        name="Metro Toronto Convention Centre Emergency Shelter"
        type="shelter"
        address="255 Front St W, Toronto, ON M5V 2W6"
        phone="(416) 585-8000"
        hours="Open 24/7"
        distance={2.3}
        lastUpdated="5 minutes ago"
        onGetDirections={(id) => console.log("Get directions:", id)}
        onShare={(id) => console.log("Share:", id)}
      />
    </div>
  );
}
