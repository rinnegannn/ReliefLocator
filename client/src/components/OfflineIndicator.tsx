import { WifiOff } from "lucide-react";

export default function OfflineIndicator() {
  return (
    <div className="bg-primary text-primary-foreground px-4 py-2 text-center" data-testid="offline-indicator">
      <div className="flex items-center justify-center gap-2">
        <WifiOff className="h-4 w-4" />
        <span className="text-sm font-medium">
          You're offline. Showing cached data from last update.
        </span>
      </div>
    </div>
  );
}
