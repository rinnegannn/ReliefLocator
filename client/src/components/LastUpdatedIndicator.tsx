import { RefreshCw, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

interface LastUpdatedIndicatorProps {
  lastUpdated: string;
  onRefresh: () => void;
  isRefreshing?: boolean;
}

export default function LastUpdatedIndicator({
  lastUpdated,
  onRefresh,
  isRefreshing = false,
}: LastUpdatedIndicatorProps) {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card border border-card-border rounded-md" data-testid="last-updated-indicator">
      <Clock className="h-4 w-4 text-muted-foreground" />
      <span className="text-sm text-muted-foreground" data-testid="text-last-updated">
        Last updated: <span className="font-medium text-foreground">{lastUpdated}</span>
      </span>
      <Button
        size="sm"
        variant="ghost"
        onClick={onRefresh}
        disabled={isRefreshing}
        data-testid="button-refresh"
      >
        <RefreshCw className={`h-4 w-4 ${isRefreshing ? "animate-spin" : ""}`} />
      </Button>
    </div>
  );
}
