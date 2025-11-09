import { storage } from "./storage";
import { type InsertReliefCenter } from "@shared/schema";

const torontoReliefCenters: InsertReliefCenter[] = [
  {
    name: "Metro Toronto Convention Centre Emergency Shelter",
    type: "shelter",
    latitude: 43.6426,
    longitude: -79.3871,
    address: "255 Front St W, Toronto, ON M5V 2W6",
    phone: "(416) 585-8000",
    hours: "Open 24/7",
  },
  {
    name: "Covenant House Emergency Shelter",
    type: "shelter",
    latitude: 43.6611,
    longitude: -79.3803,
    address: "20 Gerrard St E, Toronto, ON M5B 2P3",
    phone: "(416) 598-4898",
    hours: "Open 24/7",
  },
  {
    name: "Scarborough Civic Centre Emergency Shelter",
    type: "shelter",
    latitude: 43.7731,
    longitude: -79.2578,
    address: "150 Borough Dr, Scarborough, ON M1P 4N7",
    phone: "(416) 396-7301",
    hours: "Open 24/7",
  },
  {
    name: "North York Shelter",
    type: "shelter",
    latitude: 43.7615,
    longitude: -79.4111,
    address: "5100 Yonge St, North York, ON M2N 5V7",
    phone: "(416) 338-0338",
    hours: "Open 24/7",
  },
  {
    name: "Etobicoke Community Shelter",
    type: "shelter",
    latitude: 43.6205,
    longitude: -79.5132,
    address: "399 The West Mall, Etobicoke, ON M9C 2Y2",
    phone: "(416) 394-8500",
    hours: "Open 24/7",
  },
  {
    name: "Daily Bread Food Bank",
    type: "food",
    latitude: 43.6156,
    longitude: -79.5245,
    address: "191 New Toronto St, Toronto, ON M8V 2E7",
    phone: "(416) 203-0050",
    hours: "Mon-Fri: 9AM-5PM",
  },
  {
    name: "Second Harvest Food Bank",
    type: "food",
    latitude: 43.7184,
    longitude: -79.3429,
    address: "2800 Dufferin St, Toronto, ON M6B 4J7",
    phone: "(416) 408-2594",
    hours: "Mon-Fri: 8AM-4PM",
  },
  {
    name: "North York Harvest Food Bank",
    type: "food",
    latitude: 43.7695,
    longitude: -79.4150,
    address: "1647 Sheppard Ave W, North York, ON M3M 2X2",
    phone: "(416) 635-7771",
    hours: "Tue, Thu: 10AM-2PM",
  },
  {
    name: "Scarborough Food Security Initiative",
    type: "food",
    latitude: 43.7731,
    longitude: -79.2578,
    address: "150 Borough Dr, Scarborough, ON M1P 4N7",
    phone: "(416) 396-4636",
    hours: "Mon, Wed, Fri: 9AM-4PM",
  },
  {
    name: "Toronto General Hospital Emergency",
    type: "medical",
    latitude: 43.6593,
    longitude: -79.3876,
    address: "200 Elizabeth St, Toronto, ON M5G 2C4",
    phone: "(416) 340-4800",
    hours: "Open 24/7",
  },
  {
    name: "St. Michael's Hospital Emergency",
    type: "medical",
    latitude: 43.6533,
    longitude: -79.3773,
    address: "30 Bond St, Toronto, ON M5B 1W8",
    phone: "(416) 360-4000",
    hours: "Open 24/7",
  },
  {
    name: "Sunnybrook Health Sciences Centre",
    type: "medical",
    latitude: 43.7243,
    longitude: -79.3776,
    address: "2075 Bayview Ave, Toronto, ON M4N 3M5",
    phone: "(416) 480-6100",
    hours: "Open 24/7",
  },
  {
    name: "Scarborough Health Network - General Campus",
    type: "medical",
    latitude: 43.7295,
    longitude: -79.2318,
    address: "3050 Lawrence Ave E, Scarborough, ON M1P 2V5",
    phone: "(416) 438-2911",
    hours: "Open 24/7",
  },
  {
    name: "William Osler Health Centre - Etobicoke",
    type: "medical",
    latitude: 43.6608,
    longitude: -79.5599,
    address: "101 Humber College Blvd, Etobicoke, ON M9V 1R8",
    phone: "(416) 494-2120",
    hours: "Open 24/7",
  },
  {
    name: "Water Distribution Center - Nathan Phillips Square",
    type: "water",
    latitude: 43.6534,
    longitude: -79.3839,
    address: "100 Queen St W, Toronto, ON M5H 2N2",
    phone: "(416) 392-7111",
    hours: "Daily: 8AM-8PM",
  },
  {
    name: "Emergency Water Station - High Park",
    type: "water",
    latitude: 43.6465,
    longitude: -79.4637,
    address: "1873 Bloor St W, Toronto, ON M6R 2Z3",
    phone: "(416) 392-1111",
    hours: "Daily: 7AM-9PM",
  },
  {
    name: "Scarborough Water Distribution Point",
    type: "water",
    latitude: 43.7731,
    longitude: -79.2578,
    address: "150 Borough Dr, Scarborough, ON M1P 4N7",
    phone: "(416) 396-7301",
    hours: "Daily: 8AM-8PM",
  },
  {
    name: "North York Emergency Water Station",
    type: "water",
    latitude: 43.7615,
    longitude: -79.4111,
    address: "5100 Yonge St, North York, ON M2N 5V7",
    phone: "(416) 395-7777",
    hours: "Daily: 8AM-8PM",
  },
];

const guelphReliefCenters: InsertReliefCenter[] = [
  {
    name: "University of Guelph Emergency Shelter",
    type: "shelter",
    latitude: 43.5321,
    longitude: -80.2258,
    address: "50 Stone Rd E, Guelph, ON N1G 2W1",
    phone: "(519) 824-4120",
    hours: "Open 24/7",
  },
  {
    name: "Guelph City Hall Emergency Center",
    type: "shelter",
    latitude: 43.5448,
    longitude: -80.2482,
    address: "1 Carden St, Guelph, ON N1H 3A1",
    phone: "(519) 822-1260",
    hours: "Open 24/7",
  },
  {
    name: "Guelph Food Bank",
    type: "food",
    latitude: 43.5460,
    longitude: -80.2493,
    address: "100 Crimea St, Guelph, ON N1H 2Y6",
    phone: "(519) 763-3663",
    hours: "Mon-Fri: 9AM-4PM",
  },
  {
    name: "Chalmers Community Services Centre Food Bank",
    type: "food",
    latitude: 43.5390,
    longitude: -80.2561,
    address: "97 Yarmouth St, Guelph, ON N1H 4G3",
    phone: "(519) 824-3773",
    hours: "Tue, Thu: 10AM-2PM",
  },
  {
    name: "Guelph General Hospital",
    type: "medical",
    latitude: 43.5526,
    longitude: -80.2336,
    address: "115 Delhi St, Guelph, ON N1E 4J4",
    phone: "(519) 822-5350",
    hours: "Open 24/7",
  },
  {
    name: "St. Joseph's Health Centre Guelph",
    type: "medical",
    latitude: 43.5284,
    longitude: -80.2418,
    address: "100 Westmount Rd, Guelph, ON N1H 5H8",
    phone: "(519) 824-6000",
    hours: "Open 24/7",
  },
  {
    name: "Exhibition Park Emergency Water Station",
    type: "water",
    latitude: 43.5412,
    longitude: -80.2367,
    address: "Victoria Rd S, Guelph, ON N1E 6T8",
    phone: "(519) 822-1260",
    hours: "Daily: 8AM-8PM",
  },
  {
    name: "Riverside Park Water Distribution",
    type: "water",
    latitude: 43.5388,
    longitude: -80.2619,
    address: "355 Woolwich St, Guelph, ON N1H 3W6",
    phone: "(519) 822-1260",
    hours: "Daily: 8AM-8PM",
  },
];

const allReliefCenters = [...torontoReliefCenters, ...guelphReliefCenters];

export async function seedDatabase() {
  try {
    const existingCenters = await storage.getReliefCenters();
    
    if (existingCenters.length === 0) {
      console.log("Seeding database with relief centers...");
      await storage.seedReliefCenters(allReliefCenters);
      console.log(`Successfully seeded ${allReliefCenters.length} relief centers`);
    } else {
      console.log(`Database already contains ${existingCenters.length} relief centers`);
    }
  } catch (error) {
    console.error("Error seeding database:", error);
    throw error;
  }
}
