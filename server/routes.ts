import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";

const postalCodeCoordinates: Record<string, { lat: number; lng: number }> = {
  "M5H2N2": { lat: 43.6534, lng: -79.3839 },
  "M5H 2N2": { lat: 43.6534, lng: -79.3839 },
  "M5G2C4": { lat: 43.6593, lng: -79.3876 },
  "M5G 2C4": { lat: 43.6593, lng: -79.3876 },
  "M5B1W8": { lat: 43.6533, lng: -79.3773 },
  "M5B 1W8": { lat: 43.6533, lng: -79.3773 },
  "M5V2W6": { lat: 43.6426, lng: -79.3871 },
  "M5V 2W6": { lat: 43.6426, lng: -79.3871 },
  "M8V2E7": { lat: 43.6156, lng: -79.5245 },
  "M8V 2E7": { lat: 43.6156, lng: -79.5245 },
  "M4N3M5": { lat: 43.7243, lng: -79.3776 },
  "M4N 3M5": { lat: 43.7243, lng: -79.3776 },
  "M1P2V5": { lat: 43.7295, lng: -79.2318 },
  "M1P 2V5": { lat: 43.7295, lng: -79.2318 },
  "M1P4N7": { lat: 43.7731, lng: -79.2578 },
  "M1P 4N7": { lat: 43.7731, lng: -79.2578 },
};

export async function registerRoutes(app: Express): Promise<Server> {
  await seedDatabase();

  app.get("/api/relief-centers", async (req, res) => {
    try {
      const { lat, lng, radius = 25 } = req.query;

      if (lat && lng) {
        const latitude = parseFloat(lat as string);
        const longitude = parseFloat(lng as string);
        const radiusKm = parseFloat(radius as string);

        const centers = await storage.getReliefCentersNearby(
          latitude,
          longitude,
          radiusKm
        );
        
        const centersWithDistance = centers.map(center => ({
          ...center,
          distance: calculateDistance(latitude, longitude, center.latitude, center.longitude),
        }));

        return res.json(centersWithDistance);
      }

      const centers = await storage.getReliefCenters();
      res.json(centers);
    } catch (error) {
      console.error("Error fetching relief centers:", error);
      res.status(500).json({ error: "Failed to fetch relief centers" });
    }
  });

  app.post("/api/postal-code/convert", async (req, res) => {
    try {
      const { postalCode } = req.body;

      if (!postalCode) {
        return res.status(400).json({ error: "Postal code is required" });
      }

      const normalized = postalCode.toUpperCase().replace(/\s+/g, "");
      const coordinates = postalCodeCoordinates[normalized] || postalCodeCoordinates[postalCode.toUpperCase()];

      if (!coordinates) {
        return res.status(404).json({ 
          error: "Postal code not found. Try M5H 2N2, M5G 2C4, or other Toronto postal codes." 
        });
      }

      res.json(coordinates);
    } catch (error) {
      console.error("Error converting postal code:", error);
      res.status(500).json({ error: "Failed to convert postal code" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}

function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(degrees: number): number {
  return degrees * (Math.PI / 180);
}
