import { useState } from "react";
import { MapPin, Navigation, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface SearchLocationInputProps {
  onSearch: (location: string) => void;
  onUseCurrentLocation: () => void;
}

export default function SearchLocationInput({
  onSearch,
  onUseCurrentLocation,
}: SearchLocationInputProps) {
  const [postalCode, setPostalCode] = useState("");
  const [isLocating, setIsLocating] = useState(false);

  const handleSearch = () => {
    if (postalCode.trim()) {
      onSearch(postalCode);
    }
  };

  const handleUseLocation = () => {
    setIsLocating(true);
    onUseCurrentLocation();
    setTimeout(() => setIsLocating(false), 1500);
  };

  return (
    <div className="w-full max-w-2xl mx-auto space-y-3">
      <div className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="Enter postal code (e.g., M5H 2N2)"
            value={postalCode}
            onChange={(e) => setPostalCode(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            className="pl-10"
            data-testid="input-postal-code"
          />
        </div>
        <Button onClick={handleSearch} data-testid="button-search">
          <MapPin className="h-4 w-4 mr-2" />
          Search
        </Button>
      </div>
      <div className="flex items-center justify-center">
        <div className="flex-1 border-t" />
        <span className="px-3 text-sm text-muted-foreground">or</span>
        <div className="flex-1 border-t" />
      </div>
      <Button
        variant="outline"
        className="w-full"
        onClick={handleUseLocation}
        disabled={isLocating}
        data-testid="button-use-location"
      >
        <Navigation className={`h-4 w-4 mr-2 ${isLocating ? "animate-pulse" : ""}`} />
        {isLocating ? "Getting your location..." : "Use My Current Location"}
      </Button>
    </div>
  );
}
