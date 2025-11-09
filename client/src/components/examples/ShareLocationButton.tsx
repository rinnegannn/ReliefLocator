import { Toaster } from "@/components/ui/toaster";
import ShareLocationButton from "../ShareLocationButton";

export default function ShareLocationButtonExample() {
  return (
    <div className="p-6 bg-background">
      <ShareLocationButton location="M5H 2N2" resourceId="shelter-123" />
      <Toaster />
    </div>
  );
}
