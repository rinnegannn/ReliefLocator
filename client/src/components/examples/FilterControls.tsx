import { useState } from "react";
import FilterControls, { ResourceType } from "../FilterControls";

export default function FilterControlsExample() {
  const [activeFilters, setActiveFilters] = useState<ResourceType[]>([
    "shelter",
    "food",
    "medical",
    "water",
  ]);

  const handleToggleFilter = (type: ResourceType) => {
    setActiveFilters((prev) =>
      prev.includes(type)
        ? prev.filter((f) => f !== type)
        : [...prev, type]
    );
  };

  return (
    <div className="p-6 bg-background">
      <FilterControls
        activeFilters={activeFilters}
        onToggleFilter={handleToggleFilter}
        counts={{ shelter: 12, food: 8, medical: 5, water: 3 }}
      />
    </div>
  );
}
