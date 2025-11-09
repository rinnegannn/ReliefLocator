# 🆘 Post-Disaster Relief Resource Locator

Emergency relief resource locator helping disaster victims find nearby shelters, food, medical care, and water within 25km. Features interactive mapping with OpenStreetMap, postal code search, and a calming blue interface designed for clarity during emergencies.

![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)

---

# Relief Resource Locator

A lightweight web application that helps people find nearby relief resources (shelters, supplies, medical, and info hubs) during and after natural disasters.

> **Dev URL:** http://localhost:5000

---

## ✨ Features (high level)
- Search and browse local relief resources
- Filter by category (e.g., food, shelter, medical)
- Map/list views (implementation-specific)
- Offline-first considerations and error handling (where supported)
- Simple, fast setup for hackathon/competition environments

### 🗺️ Interactive Mapping
- **Color-Coded Markers** - Red (shelters), Orange (food), Blue (medical), Purple (water)
- **User Location Tracking** - Pulsing marker shows your current position
- **Auto-Zoom & Bounds** - Map automatically fits all nearby resources
- **OpenStreetMap Integration** - Free, no API key required

### 🔍 Search & Filter
- **Postal Code Search** - Find resources by entering any postal code
- **Browser Geolocation** - "Use My Location" for instant results
- **Resource Type Filtering** - Filter by shelter, food, medical, or water
- **25km Radius** - Only shows resources within practical distance

### 📱 Mobile-Optimized Design
- **Calming Blue Theme** - Material Design optimized for high-stress situations
- **Viewport-Fitted Layout** - No page scroll, only resource list scrolls
- **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- **Touch-Friendly** - Large buttons and interactive elements

### 💾 Offline Support
- **LocalStorage Caching** - Relief center data cached for offline access
- **Geocoding Cache** - 24-hour cache reduces API calls
- **Hardcoded Postal Codes** - 100+ Toronto postal codes work offline

### 🌍 Multi-City Coverage
- **Toronto** - 18 relief centers across all districts
- **Guelph** - 8 relief centers
- **Hamilton** - 8 relief centers
- **Easy Expansion** - Add more cities by updating seed data

---

## 🧰 Tech & Requirements
- **Node.js** (v18+ recommended; v20+ ideal)
- **npm** (v9+)
- **git**
- Linux/macOS/WSL supported

> If you’re on Windows, we recommend **WSL** (Ubuntu) for the smoothest experience.

---

## 🚀 Quick Start

```bash
# 1) Clone the repo
git clone https://github.com/rinnegannn/ReliefLocator.git
cd ReliefLocator

# 2) Run setup (installs system deps where needed + npm packages)
./setup.sh

# 3) Start the dev server
npm run dev

# 4) Open the app
# Follow the link printed in the terminal, or visit:
http://localhost:5000
```

## 🗄️ Database Options

### SQLite (Local Development) - Default

No configuration needed! The app automatically uses SQLite when `DATABASE_URL` is not set.

- **Database File**: `./dev.db` (auto-created)
- **Seeding**: 34 relief centers loaded automatically
- **Perfect For**: Local development, testing, demos

### PostgreSQL (Production)

For production deployment with Neon, Supabase, or any PostgreSQL:

```bash
# Set your database URL
export DATABASE_URL="postgresql://user:password@host:5432/database"

# Push schema to database
npm run db:push

# Start the app
npm run dev
```

The app will automatically detect `DATABASE_URL` and use PostgreSQL instead of SQLite.

---

## 🛠️ Tech Stack

### Frontend
- **React 18** - Modern UI framework
- **Vite** - Lightning-fast build tool
- **Wouter** - Lightweight routing
- **TanStack Query** - Server state management
- **Tailwind CSS** - Utility-first styling
- **Shadcn/ui** - Beautiful accessible components
- **Radix UI** - 20+ accessible primitives
- **Leaflet** - Interactive maps

### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web server framework
- **Drizzle ORM** - Type-safe database queries
- **TypeScript** - Type safety across the stack

### Database
- **SQLite** - Local development (better-sqlite3)
- **PostgreSQL** - Production (Neon serverless)
- **Dual support** - Auto-detects based on environment

### External Services (Free)
- **OpenStreetMap** - Map tiles (no API key)
- **Nominatim** - Geocoding (rate-limited to 1 req/sec)

---

## 📁 Project Structure

```
relief-resource-locator/
├── client/                 # Frontend application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Route pages
│   │   ├── lib/           # Utilities
│   │   └── hooks/         # Custom hooks
│   └── index.html
├── server/                # Backend application
│   ├── db.ts              # Database connection (dual support)
│   ├── routes.ts          # API endpoints
│   ├── seed.ts            # Database seeding
│   └── storage.ts         # Data access layer
├── shared/                # Shared types and schemas
│   ├── schema.ts          # PostgreSQL schema
│   └── sqlite-schema.ts   # SQLite schema
├── setup.sh               # Automated setup (Linux/Mac)
├── setup.bat              # Automated setup (Windows)
├── dependencies.md        # Comprehensive dependency docs
└── package.json           # Project dependencies
```

---

## 🔧 Available Scripts

```bash
# Development
npm run dev          # Start dev server (frontend + backend)
npm run check        # TypeScript type checking

# Database
npm run db:push      # Sync schema to database (PostgreSQL)

# Production
npm run build        # Build for production
npm start            # Start production server
```

---

## 🌐 Environment Variables

### Required for Production

```bash
# PostgreSQL Connection (for production)
DATABASE_URL="postgresql://user:password@host:5432/database"

# Session Secret (for production)
SESSION_SECRET="your-secure-random-string-here"
```

### Optional

```bash
# Development uses SQLite by default
# No environment variables needed for local development!
```

---

## 📊 Relief Center Data

The application comes pre-seeded with 34 relief centers across three cities:

### Toronto (18 locations)
- 5 Emergency Shelters
- 4 Food Banks
- 5 Medical Centers
- 4 Water Distribution Points

### Guelph (8 locations)
- 2 Emergency Shelters
- 2 Food Banks
- 2 Medical Centers
- 2 Water Stations

### Hamilton (8 locations)
- 2 Emergency Shelters
- 2 Food Banks
- 2 Medical Centers
- 2 Water Stations

### Adding More Cities

Edit `server/seed.ts` and add your relief centers:

```typescript
const newCityReliefCenters: InsertReliefCenter[] = [
  {
    name: "City Hall Emergency Shelter",
    type: "shelter",
    latitude: 43.1234,
    longitude: -79.5678,
    address: "123 Main St, City, ON",
    phone: "(555) 123-4567",
    hours: "Open 24/7",
  },
  // ... more centers
];
```

---

## 🎨 Design System

### Color Scheme (Material Design Blue)
- **Primary**: `#1976D2` (Calming blue for emergency contexts)
- **Primary Dark**: `#1565C0`
- **Primary Light**: `#E3F2FD`
- **Accent**: `#FFC107` (Warning amber)

### Resource Type Colors
- **Shelter**: Red (`#EF4444`)
- **Food**: Orange (`#F97316`)
- **Medical**: Blue (`#3B82F6`)
- **Water**: Purple (`#A855F7`)

### Typography
- **Headings**: System font stack
- **Body**: System font stack optimized for readability

---

## 🚢 Deployment

### Replit (Recommended)

1. Import this repository to Replit
2. Set `DATABASE_URL` secret (get free PostgreSQL from Neon)
3. Set `SESSION_SECRET` secret
4. Click "Run" - auto-deploys!

### Manual Deployment

```bash
# Build the application
npm run build

# Set environment variables
export DATABASE_URL="your-postgres-url"
export SESSION_SECRET="your-secret"

# Push database schema
npm run db:push

# Start production server
npm start
```

The app will be available on port 5000.

---

## 📖 Documentation

- **[dependencies.md](dependencies.md)** - Complete dependency reference (85+ packages)
- **[design_guidelines.md](design_guidelines.md)** - UI/UX design system
- **[replit.md](replit.md)** - Project architecture and technical decisions

---

## 🤝 Contributing

Contributions are welcome! This project helps people in emergency situations.

### Ways to Contribute

1. **Add More Cities** - Expand coverage to new regions
2. **Improve UI/UX** - Enhance mobile experience
3. **Add Features** - SMS alerts, push notifications, etc.
4. **Fix Bugs** - Report or fix issues
5. **Translate** - Add multi-language support

### Development Workflow

```bash
# Fork and clone
git clone https://github.com/yourusername/relief-resource-locator.git

# Create feature branch
git checkout -b feature/amazing-feature

# Make changes and test
npm run dev
npm run check

# Commit and push
git commit -m "Add amazing feature"
git push origin feature/amazing-feature

# Open Pull Request
```

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- **OpenStreetMap** - Free map tiles and data
- **Nominatim** - Free geocoding service
- **Shadcn/ui** - Beautiful component library
- **Radix UI** - Accessible primitives
- **Replit** - Hosting and development platform

---

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/yourusername/relief-resource-locator/issues)
- **Discussions**: [GitHub Discussions](https://github.com/yourusername/relief-resource-locator/discussions)

---

## 🗺️ Roadmap

- [ ] **Real-time Updates** - WebSocket-based emergency alerts
- [ ] **SMS Notifications** - Twilio integration for alerts
- [ ] **Multi-language** - i18n support (English, French, Spanish)
- [ ] **PWA** - Offline-first progressive web app
- [ ] **Dark Mode** - Infrastructure ready, needs implementation
- [ ] **More Cities** - Expand beyond Toronto/Guelph/Hamilton
- [ ] **Community Reports** - User-submitted relief center updates
- [ ] **Route Navigation** - Turn-by-turn directions

---

**Built with ❤️ for disaster relief efforts**

*Help us expand coverage to more cities! [Contribute today](#-contributing)*
