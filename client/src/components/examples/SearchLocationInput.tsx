import SearchLocationInput from "../SearchLocationInput";

export default function SearchLocationInputExample() {
  return (
    <div className="p-6 bg-background">
      <SearchLocationInput
        onSearch={(location) => console.log("Searching for:", location)}
        onUseCurrentLocation={() => console.log("Using current location")}
      />
    </div>
  );
}
