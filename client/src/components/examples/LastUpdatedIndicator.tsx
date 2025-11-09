import { useState } from "react";
import LastUpdatedIndicator from "../LastUpdatedIndicator";

export default function LastUpdatedIndicatorExample() {
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => setIsRefreshing(false), 2000);
  };

  return (
    <div className="p-6 bg-background">
      <LastUpdatedIndicator
        lastUpdated="2 minutes ago"
        onRefresh={handleRefresh}
        isRefreshing={isRefreshing}
      />
    </div>
  );
}
