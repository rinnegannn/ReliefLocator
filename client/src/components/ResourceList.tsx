import { useState } from "react";
import { ChevronDown } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ResourceCard from "./ResourceCard";
import { ResourceType } from "./FilterControls";

export interface Resource {
  id: string;
  name: string;
  type: ResourceType;
  address: string;
  phone?: string;
  hours?: string;
  distance: number;
  lastUpdated: string;
}

interface ResourceListProps {
  resources: Resource[];
  onGetDirections: (id: string) => void;
  onShare?: (id: string) => void;
}

type SortOption = "nearest" | "recent" | "type";

export default function ResourceList({
  resources,
  onGetDirections,
  onShare,
}: ResourceListProps) {
  const [sortBy, setSortBy] = useState<SortOption>("nearest");

  const sortedResources = [...resources].sort((a, b) => {
    switch (sortBy) {
      case "nearest":
        return a.distance - b.distance;
      case "recent":
        return 0;
      case "type":
        return a.type.localeCompare(b.type);
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-4" data-testid="resource-list">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">
          {resources.length} {resources.length === 1 ? "Resource" : "Resources"} Found
        </h2>
        <Select value={sortBy} onValueChange={(value) => setSortBy(value as SortOption)}>
          <SelectTrigger className="w-48" data-testid="select-sort">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="nearest">Nearest First</SelectItem>
            <SelectItem value="recent">Recently Updated</SelectItem>
            <SelectItem value="type">By Type</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-4">
        {sortedResources.map((resource) => (
          <ResourceCard
            key={resource.id}
            {...resource}
            onGetDirections={onGetDirections}
            onShare={onShare}
          />
        ))}
      </div>
    </div>
  );
}
