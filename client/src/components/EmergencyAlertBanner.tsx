import { useState } from "react";
import { AlertTriangle, X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmergencyAlertBannerProps {
  message: string;
  timestamp: string;
  severity?: "warning" | "critical";
}

export default function EmergencyAlertBanner({
  message,
  timestamp,
  severity = "warning",
}: EmergencyAlertBannerProps) {
  const [isExpanded, setIsExpanded] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  if (isDismissed) return null;

  const bgColor = severity === "critical" 
    ? "bg-destructive text-destructive-foreground" 
    : "bg-primary text-primary-foreground";

  return (
    <div className={`${bgColor} ${isExpanded ? "" : "py-2"}`} data-testid="alert-banner">
      {isExpanded ? (
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-start gap-3">
          <AlertTriangle className="h-5 w-5 flex-shrink-0 mt-0.5" data-testid="icon-alert" />
          <div className="flex-1 min-w-0">
            <p className="text-base md:text-lg font-medium" data-testid="text-alert-message">
              {message}
            </p>
            <p className="text-sm mt-1 opacity-90" data-testid="text-alert-timestamp">
              {timestamp}
            </p>
          </div>
          <div className="flex gap-2">
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsExpanded(false)}
              data-testid="button-minimize-alert"
            >
              <X className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="ghost"
              className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
              onClick={() => setIsDismissed(true)}
              data-testid="button-dismiss-alert"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-center">
          <Button
            variant="ghost"
            size="sm"
            className="text-primary-foreground hover:bg-primary-foreground/20"
            onClick={() => setIsExpanded(true)}
            data-testid="button-expand-alert"
          >
            <AlertTriangle className="h-4 w-4 mr-2" />
            <span className="text-sm font-medium">Emergency Alert</span>
          </Button>
        </div>
      )}
    </div>
  );
}
