# 🌐 Post-Disaster Relief Resource Locator

### Helping communities find safety, food, and medical aid when it matters most.

The **Post-Disaster Relief Resource Locator** is a web-based application designed to help people affected by natural disasters quickly find nearby **emergency shelters**, **food banks**, **water stations**, and **medical centers**.  
It combines **real-time data**, **interactive maps**, and **secure cloud infrastructure** to deliver life-saving information in a simple, modern, and mobile-friendly interface.

---

## 🚨 Purpose

Natural disasters like wildfires and floods can strike with little warning, leaving thousands searching for basic necessities.  
This platform provides affected individuals with accurate, up-to-date information about relief resources near them, reducing panic and improving response time.

---

## 🧩 Key Features

### 🗺️ **Interactive Map & Search**
- Location input via **postal code** or **browser geolocation**
- Automatic coordinate conversion for accurate searching
- Google Maps API integration displaying all relief centers
- **Color-coded map markers** by type:  
  🏠 Shelter 🍞 Food 💧 Water ⚕️ Medical  
- Clickable pins show pop-up cards with:
  - Center name, address, phone number, hours, and last update time
  - “Open/Closed” status
  - Distance from user

### 📍 **Smart Filtering & Radius Search**
- Filters by resource type (Shelter / Food / Medical / Water)
- **25 km radius** filtering for faster rendering and higher relevance
- Dual-view layout: interactive map + scrollable list view of nearby centers
- **Shareable links** (with coordinates or center ID) for easy communication

### 🔁 **Real-Time Data & Reliability**
- All relief-center data stored in **Supabase**
- Automatic data refresh with visible **“Last Updated”** indicator
- **Realtime subscription**: new centers appear instantly—no refresh needed
- **Offline caching** via localStorage for use during poor connectivity
- Fallback to cached data if external APIs (e.g., Open Data Canada) fail

### ⚡ **Backend Intelligence**
- Built with **Node.js (Express)** or **Python Flask**
- Uses **Haversine formula** to calculate facilities within 25 km
- Connects to Supabase via REST API or JavaScript Client
- Real-time updates via Supabase’s subscription channels
- **Twilio API** integration for SMS alerts when new resources appear nearby

### 🔒 **Security & Privacy**
- **Supabase Auth** with optional sign-in for alert subscriptions
- **Row Level Security (RLS)** policies to restrict write access
- **Encrypted user data** and secure storage of location preferences
- Minimal personal data retained – only required for notifications

### 📱 **Responsive UI**
- **React + Tailwind CSS** for a clean, adaptive interface
- Optimized for desktops, tablets, and smartphones
- Accessible color contrast, readable typography, and intuitive icons

### 🚨 **Emergency Integrations**
- Live emergency or evacuation notices fetched from public safety APIs
- Displays warning banners across the app during critical events

---

## 🏗️ Tech Stack

| Layer | Technologies |
|:------|:--------------|
| **Frontend** | React JS • Tailwind CSS • Google Maps API • Geolocation API |
| **Backend** | Node.js (Express) / Python (Flask) |
| **Database** | Supabase (PostgreSQL + Realtime Subscriptions) |
| **Integrations** | Twilio API (SMS alerts) • Open Data Canada • Emergency Alert Feeds |
| **Security** | Supabase Auth • Row Level Security • Encrypted storage |
| **Deployment** | Vercel / Netlify (frontend) • Render / Fly.io / Supabase Cloud (backend & DB) |

---

## 🧮 System Workflow

1. **User enters postal code** or enables location access.  
2. **Backend queries Supabase** for all relief centers.  
3. Uses the **Haversine formula** to find those within 25 km.  
4. Sends filtered results to the frontend → displayed on Google Maps with custom icons.  
5. Supabase **Realtime service** pushes new entries instantly to active clients.  
6. If the user has opted for SMS alerts, Twilio sends a text when a new center is added nearby.

---
