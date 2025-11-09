import EmergencyAlertBanner from "../EmergencyAlertBanner";

export default function EmergencyAlertBannerExample() {
  return (
    <EmergencyAlertBanner
      message="Evacuation order in effect for downtown area. Seek shelter immediately at designated evacuation centers."
      timestamp="Updated 15 minutes ago"
      severity="critical"
    />
  );
}
