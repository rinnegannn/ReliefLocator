import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { seedDatabase } from "./seed";

const geocodeCache = new Map<string, { lat: number; lng: number; timestamp: number }>();
const CACHE_DURATION_MS = 24 * 60 * 60 * 1000;

const lastNominatimRequest = { timestamp: 0 };
const MIN_REQUEST_INTERVAL_MS = 1000;

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
  "M4Y1E5": { lat: 43.6658, lng: -79.3831 },
  "M4Y 1E5": { lat: 43.6658, lng: -79.3831 },
  "M4W1A8": { lat: 43.6795, lng: -79.3775 },
  "M4W 1A8": { lat: 43.6795, lng: -79.3775 },
  "M6K2G8": { lat: 43.6368, lng: -79.4281 },
  "M6K 2G8": { lat: 43.6368, lng: -79.4281 },
  "M6H1W3": { lat: 43.6627, lng: -79.4281 },
  "M6H 1W3": { lat: 43.6627, lng: -79.4281 },
  "M6G1B4": { lat: 43.6579, lng: -79.4225 },
  "M6G 1B4": { lat: 43.6579, lng: -79.4225 },
  "M4E2E4": { lat: 43.6763, lng: -79.2930 },
  "M4E 2E4": { lat: 43.6763, lng: -79.2930 },
  "M4K1N2": { lat: 43.6795, lng: -79.3520 },
  "M4K 1N2": { lat: 43.6795, lng: -79.3520 },
  "M4L3P5": { lat: 43.6689, lng: -79.3155 },
  "M4L 3P5": { lat: 43.6689, lng: -79.3155 },
  "M4M2Y6": { lat: 43.6595, lng: -79.3400 },
  "M4M 2Y6": { lat: 43.6595, lng: -79.3400 },
  "M4C5L3": { lat: 43.6953, lng: -79.3183 },
  "M4C 5L3": { lat: 43.6953, lng: -79.3183 },
  "M5A2N1": { lat: 43.6542, lng: -79.3606 },
  "M5A 2N1": { lat: 43.6542, lng: -79.3606 },
  "M5R1C8": { lat: 43.6727, lng: -79.4056 },
  "M5R 1C8": { lat: 43.6727, lng: -79.4056 },
  "M5S2V1": { lat: 43.6627, lng: -79.3957 },
  "M5S 2V1": { lat: 43.6627, lng: -79.3957 },
  "M5T1R8": { lat: 43.6532, lng: -79.4000 },
  "M5T 1R8": { lat: 43.6532, lng: -79.4000 },
  "M6J2K3": { lat: 43.6479, lng: -79.4197 },
  "M6J 2K3": { lat: 43.6479, lng: -79.4197 },
  "M6P1A6": { lat: 43.6616, lng: -79.4647 },
  "M6P 1A6": { lat: 43.6616, lng: -79.4647 },
  "M6R2E9": { lat: 43.6489, lng: -79.4565 },
  "M6R 2E9": { lat: 43.6489, lng: -79.4565 },
  "M6S1N8": { lat: 43.6515, lng: -79.4844 },
  "M6S 1N8": { lat: 43.6515, lng: -79.4844 },
  "M9A1B6": { lat: 43.6678, lng: -79.5322 },
  "M9A 1B6": { lat: 43.6678, lng: -79.5322 },
  "M9B6K5": { lat: 43.6509, lng: -79.5547 },
  "M9B 6K5": { lat: 43.6509, lng: -79.5547 },
  "M9C1B9": { lat: 43.6435, lng: -79.5772 },
  "M9C 1B9": { lat: 43.6435, lng: -79.5772 },
  "M1K1N1": { lat: 43.7279, lng: -79.2620 },
  "M1K 1N1": { lat: 43.7279, lng: -79.2620 },
  "M1L4L9": { lat: 43.7111, lng: -79.2845 },
  "M1L 4L9": { lat: 43.7111, lng: -79.2845 },
  "M1M2J5": { lat: 43.7247, lng: -79.2306 },
  "M1M 2J5": { lat: 43.7247, lng: -79.2306 },
  "M1N2R1": { lat: 43.6922, lng: -79.2644 },
  "M1N 2R1": { lat: 43.6922, lng: -79.2644 },
  "M2J4S6": { lat: 43.7785, lng: -79.3465 },
  "M2J 4S6": { lat: 43.7785, lng: -79.3465 },
  "M2M4J1": { lat: 43.7891, lng: -79.4088 },
  "M2M 4J1": { lat: 43.7891, lng: -79.4088 },
  "M2N5Y7": { lat: 43.7701, lng: -79.4084 },
  "M2N 5Y7": { lat: 43.7701, lng: -79.4084 },
  "M3A1X7": { lat: 43.7532, lng: -79.3296 },
  "M3A 1X7": { lat: 43.7532, lng: -79.3296 },
  "M3B2T5": { lat: 43.7459, lng: -79.3522 },
  "M3B 2T5": { lat: 43.7459, lng: -79.3522 },
  "M3C1S2": { lat: 43.7258, lng: -79.3406 },
  "M3C 1S2": { lat: 43.7258, lng: -79.3406 },
  "M3H5T4": { lat: 43.7543, lng: -79.4422 },
  "M3H 5T4": { lat: 43.7543, lng: -79.4422 },
  "M3J1P3": { lat: 43.7679, lng: -79.4872 },
  "M3J 1P3": { lat: 43.7679, lng: -79.4872 },
  "M3K1Y5": { lat: 43.7374, lng: -79.4647 },
  "M3K 1Y5": { lat: 43.7374, lng: -79.4647 },
  "M3L1S4": { lat: 43.7390, lng: -79.5069 },
  "M3L 1S4": { lat: 43.7390, lng: -79.5069 },
  "M3M1J4": { lat: 43.7284, lng: -79.4956 },
  "M3M 1J4": { lat: 43.7284, lng: -79.4956 },
  "M3N1W5": { lat: 43.7616, lng: -79.5209 },
  "M3N 1W5": { lat: 43.7616, lng: -79.5209 },
  "M4A2W1": { lat: 43.7253, lng: -79.3155 },
  "M4A 2W1": { lat: 43.7253, lng: -79.3155 },
  "M4B1Y5": { lat: 43.7063, lng: -79.3094 },
  "M4B 1Y5": { lat: 43.7063, lng: -79.3094 },
  "M4G1N6": { lat: 43.7090, lng: -79.3632 },
  "M4G 1N6": { lat: 43.7090, lng: -79.3632 },
  "M4H1C9": { lat: 43.7053, lng: -79.3493 },
  "M4H 1C9": { lat: 43.7053, lng: -79.3493 },
  "M4J1W9": { lat: 43.6852, lng: -79.3381 },
  "M4J 1W9": { lat: 43.6852, lng: -79.3381 },
  "M4P1E4": { lat: 43.7127, lng: -79.3901 },
  "M4P 1E4": { lat: 43.7127, lng: -79.3901 },
  "M4R1X4": { lat: 43.7153, lng: -79.4056 },
  "M4R 1X4": { lat: 43.7153, lng: -79.4056 },
  "M4S1S1": { lat: 43.7043, lng: -79.3887 },
  "M4S 1S1": { lat: 43.7043, lng: -79.3887 },
  "M4T1A1": { lat: 43.6895, lng: -79.3831 },
  "M4T 1A1": { lat: 43.6895, lng: -79.3831 },
  "M4V1R2": { lat: 43.6864, lng: -79.4000 },
  "M4V 1R2": { lat: 43.6864, lng: -79.4000 },
  "M4X1G6": { lat: 43.6679, lng: -79.3676 },
  "M4X 1G6": { lat: 43.6679, lng: -79.3676 },
  "M5C2K3": { lat: 43.6514, lng: -79.3754 },
  "M5C 2K3": { lat: 43.6514, lng: -79.3754 },
  "M5E1A1": { lat: 43.6447, lng: -79.3733 },
  "M5E 1A1": { lat: 43.6447, lng: -79.3733 },
  "M5J2R9": { lat: 43.6408, lng: -79.3817 },
  "M5J 2R9": { lat: 43.6408, lng: -79.3817 },
  "M5K1B7": { lat: 43.6471, lng: -79.3815 },
  "M5K 1B7": { lat: 43.6471, lng: -79.3815 },
  "M5L1R5": { lat: 43.6481, lng: -79.3798 },
  "M5L 1R5": { lat: 43.6481, lng: -79.3798 },
  "M5M2K2": { lat: 43.7332, lng: -79.4197 },
  "M5M 2K2": { lat: 43.7332, lng: -79.4197 },
  "M5N2L7": { lat: 43.7116, lng: -79.4169 },
  "M5N 2L7": { lat: 43.7116, lng: -79.4169 },
  "M5P2N7": { lat: 43.6969, lng: -79.4112 },
  "M5P 2N7": { lat: 43.6969, lng: -79.4112 },
  "M6A2E6": { lat: 43.7184, lng: -79.4647 },
  "M6A 2E6": { lat: 43.7184, lng: -79.4647 },
  "M6B2Z8": { lat: 43.7090, lng: -79.4450 },
  "M6B 2Z8": { lat: 43.7090, lng: -79.4450 },
  "M6C2L8": { lat: 43.6937, lng: -79.4281 },
  "M6C 2L8": { lat: 43.6937, lng: -79.4281 },
  "M6E2M1": { lat: 43.6890, lng: -79.4534 },
  "M6E 2M1": { lat: 43.6890, lng: -79.4534 },
  "M6L2B9": { lat: 43.7137, lng: -79.4900 },
  "M6L 2B9": { lat: 43.7137, lng: -79.4900 },
  "M6M2W5": { lat: 43.6911, lng: -79.4760 },
  "M6M 2W5": { lat: 43.6911, lng: -79.4760 },
  "M6N2J3": { lat: 43.6731, lng: -79.4872 },
  "M6N 2J3": { lat: 43.6731, lng: -79.4872 },
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

      if (coordinates) {
        return res.json(coordinates);
      }

      const cached = geocodeCache.get(normalized);
      if (cached && Date.now() - cached.timestamp < CACHE_DURATION_MS) {
        return res.json({ lat: cached.lat, lng: cached.lng });
      }

      try {
        const now = Date.now();
        const timeSinceLastRequest = now - lastNominatimRequest.timestamp;
        
        if (timeSinceLastRequest < MIN_REQUEST_INTERVAL_MS) {
          await new Promise(resolve => setTimeout(resolve, MIN_REQUEST_INTERVAL_MS - timeSinceLastRequest));
        }
        
        lastNominatimRequest.timestamp = Date.now();
        
        const nominatimUrl = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(postalCode)},Ontario,Canada&format=json&limit=1`;
        const response = await fetch(nominatimUrl, {
          headers: {
            'User-Agent': 'Relief-Resource-Locator/1.0'
          }
        });

        if (!response.ok) {
          throw new Error("Nominatim request failed");
        }

        const data = await response.json();
        
        if (data && data.length > 0) {
          const result = {
            lat: parseFloat(data[0].lat),
            lng: parseFloat(data[0].lon),
          };
          
          geocodeCache.set(normalized, {
            ...result,
            timestamp: Date.now(),
          });

          if (geocodeCache.size > 1000) {
            const firstKey = geocodeCache.keys().next().value;
            if (firstKey) {
              geocodeCache.delete(firstKey);
            }
          }
          
          return res.json(result);
        }

        return res.status(404).json({ 
          error: "Postal code not found. Please try another location or use your current location." 
        });
      } catch (geocodingError) {
        console.error("Geocoding fallback failed:", geocodingError);
        return res.status(404).json({ 
          error: "Postal code not found. Please try another location or use your current location." 
        });
      }
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
