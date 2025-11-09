# Post-Disaster Relief Resource Locator

## Overview

The Post-Disaster Relief Resource Locator is a web-based emergency response application designed to help people affected by natural disasters quickly find nearby emergency shelters, food banks, medical centers, and water stations. The application provides an interactive map-based interface with real-time data on relief resources within a 25km radius of the user's location.

Users can search by postal code or use browser geolocation to find resources, filter by resource type, view detailed information about each center, and share locations with others. The system prioritizes maximum clarity and speed of information access during high-stress disaster situations.

## User Preferences

Preferred communication style: Simple, everyday language.

## Recent Changes

### November 9, 2025 - Bug Fixes and Map Integration
**Fixed Issues:**
1. **Postal Code Search** - Expanded lookup table from 8 to 100+ Toronto postal codes, added Nominatim OpenStreetMap API fallback with 24hr caching and 1-second rate limiting
2. **Get Directions** - Implemented to open Google Maps (Apple Maps on iOS) with resource coordinates in new tab
3. **Share Functionality** - Implemented with navigator.share API and clipboard fallback, generates shareable URLs with lat/lng query parameters
4. **Map Visualization** - Replaced grey SVG placeholder with Leaflet-based OpenStreetMap integration featuring:
   - Real geographic map tiles from OpenStreetMap
   - Color-coded markers by resource type (shelter=red, food=orange, medical=blue, water=purple)
   - User location indicator with animated pulse
   - Auto-zoom to fit all markers in view
   - Recenter button for navigation
5. **URL Management** - Fixed query parameter handling to properly clear old params when searching or using geolocation
6. **Offline Support** - Added localStorage caching for relief center data with fallback on network failures

**Known Limitations:**
- Nominatim geocoding rate limiting is basic (1 request/second) - may need enhancement for high-traffic disaster scenarios
- Map markers could benefit from enhanced keyboard navigation and screen reader support for full accessibility compliance
- Geocode cache is in-memory only - resets on server restart (consider persistent storage for production)

## System Architecture

### Frontend Architecture

**Framework & Build System**
- React 18 with TypeScript for type-safe component development
- Vite as the build tool and development server for fast hot module replacement
- Wouter for lightweight client-side routing (single-page application)

**UI Component Library**
- Radix UI primitives for accessible, unstyled components
- Shadcn/ui design system with the "new-york" style variant
- Tailwind CSS for utility-first styling with custom design tokens
- Material Design principles adapted for emergency response interfaces

**State Management**
- TanStack Query (React Query) for server state management and caching
- Local React state for UI interactions
- Query client configured with infinite stale time and disabled automatic refetching

**Key Design Decisions**
- Inter font family for exceptional legibility at all sizes
- Responsive mobile-first design with breakpoint at 768px
- Custom color system using HSL values for light/dark mode support
- Emphasis on high-contrast, clear typography for emergency situations

### Backend Architecture

**Server Framework**
- Express.js running on Node.js with ES modules
- RESTful API design for relief center data retrieval
- Custom middleware for request logging and JSON parsing

**Database Layer**
- Drizzle ORM for type-safe database operations
- PostgreSQL as the primary database (via Neon serverless)
- Schema includes users and relief centers tables
- Drizzle Kit for schema migrations

**Core API Endpoints**
- `GET /api/relief-centers` - Retrieves relief centers with optional lat/lng/radius filtering
- Postal code to coordinate conversion via in-memory lookup table
- Distance calculations performed server-side using Haversine formula

**Data Seeding**
- Automated database seeding with Toronto-area relief centers on startup
- Seed data includes shelters, food banks, medical centers, and water stations

**Key Design Decisions**
- Geographic filtering uses a simple distance calculation rather than PostGIS for simplicity
- Postal code conversion handled via hardcoded lookup (limited to Toronto area)
- Session management infrastructure exists but authentication not fully implemented

### Data Storage Solutions

**Database Schema**
- `users` table: id (UUID), username (unique), password
- `relief_centers` table: id (UUID), name, type, latitude, longitude, address, phone, hours, lastUpdated (timestamp)
- All primary keys use PostgreSQL's `gen_random_uuid()`
- Timestamps automatically set to current time on creation

**Connection Management**
- Neon serverless PostgreSQL with WebSocket support
- Connection pooling via @neondatabase/serverless
- Environment variable based configuration (DATABASE_URL required)

**Data Model Design Rationale**
- Geographic coordinates stored as double precision floats for accuracy
- Resource type stored as varchar(20) for flexibility (shelter, food, medical, water)
- Phone and hours fields nullable to accommodate incomplete data
- lastUpdated timestamp for data freshness tracking

### External Dependencies

**Maps & Geolocation**
- Browser Geolocation API for user location detection
- Custom SVG-based map visualization (Google Maps integration referenced but not implemented)
- Client-side distance calculations for sorting and display

**UI Component Libraries**
- @radix-ui/* packages for 20+ accessible UI primitives (dialogs, popovers, dropdowns, etc.)
- Lucide React for consistent icon system
- Embla Carousel for touch-friendly carousels
- CMDK for command palette pattern

**Development Tools**
- Replit-specific plugins for error overlay, development banner, and cartographer
- TSX for TypeScript execution in development
- ESBuild for production bundling
- Drizzle Kit for database migrations

**Form & Validation**
- React Hook Form with Zod resolvers for type-safe form validation
- Drizzle-Zod for automatic schema validation from database models

**Styling & Utilities**
- Tailwind CSS with PostCSS and Autoprefixer
- Class Variance Authority (CVA) for component variant management
- clsx and tailwind-merge for conditional className handling
- date-fns for date formatting

**Key Integration Decisions**
- No actual Google Maps API integration despite design references
- Offline caching mentioned in requirements but not fully implemented
- Emergency alert system structure exists but no external alert API connected
- Shareable links implemented via query parameters rather than unique IDs