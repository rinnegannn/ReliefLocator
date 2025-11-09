import { useState } from "react";
import { Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface ShareLocationButtonProps {
  location: string;
  resourceId?: string;
}

export default function ShareLocationButton({
  location,
  resourceId,
}: ShareLocationButtonProps) {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const handleShare = () => {
    const url = resourceId
      ? `${window.location.origin}?resource=${resourceId}`
      : `${window.location.origin}?location=${encodeURIComponent(location)}`;

    navigator.clipboard.writeText(url).then(() => {
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share this link to help others find relief resources.",
      });
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <Button
      variant="outline"
      size="sm"
      onClick={handleShare}
      data-testid="button-share-location"
    >
      {copied ? (
        <>
          <Check className="h-4 w-4 mr-2" />
          Copied!
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4 mr-2" />
          Share Location
        </>
      )}
    </Button>
  );
}
