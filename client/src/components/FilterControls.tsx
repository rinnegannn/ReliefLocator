import { Home, ShoppingBag, Heart, Droplets } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export type ResourceType = "shelter" | "food" | "medical" | "water";

interface FilterControlsProps {
  activeFilters: ResourceType[];
  onToggleFilter: (type: ResourceType) => void;
  counts?: Record<ResourceType, number>;
}

const resourceConfig: Record<ResourceType, { icon: any; label: string; color: string }> = {
  shelter: { icon: Home, label: "Shelters", color: "bg-chart-1 text-white" },
  food: { icon: ShoppingBag, label: "Food Banks", color: "bg-chart-2 text-white" },
  medical: { icon: Heart, label: "Medical", color: "bg-chart-3 text-white" },
  water: { icon: Droplets, label: "Water Stations", color: "bg-chart-4 text-white" },
};

export default function FilterControls({
  activeFilters,
  onToggleFilter,
  counts,
}: FilterControlsProps) {
  return (
    <div className="flex flex-wrap gap-2" data-testid="filter-controls">
      {(Object.keys(resourceConfig) as ResourceType[]).map((type) => {
        const config = resourceConfig[type];
        const Icon = config.icon;
        const isActive = activeFilters.includes(type);
        const count = counts?.[type] || 0;

        return (
          <Badge
            key={type}
            variant={isActive ? "default" : "outline"}
            className={`cursor-pointer h-9 px-3 gap-2 ${
              isActive ? config.color : ""
            } hover-elevate active-elevate-2`}
            onClick={() => onToggleFilter(type)}
            data-testid={`filter-${type}`}
          >
            <Icon className="h-4 w-4" />
            <span className="font-medium">{config.label}</span>
            {count > 0 && (
              <span className="ml-1 text-xs opacity-90" data-testid={`count-${type}`}>
                ({count})
              </span>
            )}
          </Badge>
        );
      })}
    </div>
  );
}
