import { Phone, MapPin, Clock, ExternalLink } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ResourceType } from "./FilterControls";

interface ResourceCardProps {
  id: string;
  name: string;
  type: ResourceType;
  address: string;
  phone?: string;
  hours?: string;
  distance: number;
  lastUpdated: string;
  onGetDirections: (id: string) => void;
  onShare?: (id: string) => void;
}

const typeLabels: Record<ResourceType, string> = {
  shelter: "Emergency Shelter",
  food: "Food Bank",
  medical: "Medical Center",
  water: "Water Station",
};

const typeColors: Record<ResourceType, string> = {
  shelter: "bg-chart-1 text-white",
  food: "bg-chart-2 text-white",
  medical: "bg-chart-3 text-white",
  water: "bg-chart-4 text-white",
};

export default function ResourceCard({
  id,
  name,
  type,
  address,
  phone,
  hours,
  distance,
  lastUpdated,
  onGetDirections,
  onShare,
}: ResourceCardProps) {
  return (
    <Card className="w-full hover-elevate" data-testid={`card-resource-${id}`}>
      <CardHeader className="flex flex-row items-start justify-between gap-2 space-y-0 pb-3">
        <div className="flex-1 min-w-0">
          <h3 className="text-lg font-semibold leading-tight" data-testid={`text-name-${id}`}>
            {name}
          </h3>
          <Badge className={`mt-2 ${typeColors[type]}`} data-testid={`badge-type-${id}`}>
            {typeLabels[type]}
          </Badge>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-lg font-semibold text-primary" data-testid={`text-distance-${id}`}>
            {distance.toFixed(1)} km
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-3 text-sm">
        <div className="flex gap-2">
          <MapPin className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
          <p className="text-foreground" data-testid={`text-address-${id}`}>{address}</p>
        </div>

        {phone && (
          <div className="flex gap-2">
            <Phone className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <a
              href={`tel:${phone}`}
              className="text-primary hover:underline font-medium"
              data-testid={`link-phone-${id}`}
            >
              {phone}
            </a>
          </div>
        )}

        {hours && (
          <div className="flex gap-2">
            <Clock className="h-4 w-4 text-muted-foreground flex-shrink-0 mt-0.5" />
            <p className="text-muted-foreground" data-testid={`text-hours-${id}`}>{hours}</p>
          </div>
        )}

        <div className="text-xs text-muted-foreground pt-2" data-testid={`text-updated-${id}`}>
          Last updated: {lastUpdated}
        </div>
      </CardContent>

      <CardFooter className="gap-2 flex-wrap">
        <Button
          className="flex-1"
          onClick={() => onGetDirections(id)}
          data-testid={`button-directions-${id}`}
        >
          <ExternalLink className="h-4 w-4 mr-2" />
          Get Directions
        </Button>
        {onShare && (
          <Button
            variant="outline"
            onClick={() => onShare(id)}
            data-testid={`button-share-${id}`}
          >
            Share
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
