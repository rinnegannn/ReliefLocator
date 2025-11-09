import ResourceList from "../ResourceList";

export default function ResourceListExample() {
  const mockResources = [
    {
      id: "1",
      name: "Metro Toronto Convention Centre Emergency Shelter",
      type: "shelter" as const,
      address: "255 Front St W, Toronto, ON M5V 2W6",
      phone: "(416) 585-8000",
      hours: "Open 24/7",
      distance: 2.3,
      lastUpdated: "5 minutes ago",
    },
    {
      id: "2",
      name: "Daily Bread Food Bank",
      type: "food" as const,
      address: "191 New Toronto St, Toronto, ON M8V 2E7",
      phone: "(416) 203-0050",
      hours: "Mon-Fri: 9AM-5PM",
      distance: 4.1,
      lastUpdated: "1 hour ago",
    },
    {
      id: "3",
      name: "Toronto General Hospital Emergency",
      type: "medical" as const,
      address: "200 Elizabeth St, Toronto, ON M5G 2C4",
      phone: "(416) 340-4800",
      hours: "Open 24/7",
      distance: 1.8,
      lastUpdated: "10 minutes ago",
    },
  ];

  return (
    <div className="p-6 bg-background max-w-2xl">
      <ResourceList
        resources={mockResources}
        onGetDirections={(id) => console.log("Get directions:", id)}
        onShare={(id) => console.log("Share:", id)}
      />
    </div>
  );
}
