# Post-Disaster Relief Resource Locator

## Overview

The Post-Disaster Relief Resource Locator is a web-based application designed to help people affected by natural disasters quickly find nearby emergency shelters, food banks, water stations, and medical centers. The platform combines real-time data, interactive maps, and secure cloud infrastructure to deliver life-saving information through a simple, modern, and mobile-friendly interface.

The application allows users to search by postal code or use browser geolocation to find relief resources within a 25 km radius. It features an interactive map with color-coded markers, filtering by resource type, distance calculations, and shareable location links.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18 with TypeScript using Vite as the build tool and development server.

**Routing**: Wouter for lightweight client-side routing. The application is primarily a single-page application with a main home route and a 404 page.

**UI Component Library**: shadcn/ui components built on Radix UI primitives, providing accessible and customizable components (buttons, cards, dialogs, forms, etc.).

**Styling**: Tailwind CSS with a custom design system defined in the configuration. Uses CSS variables for theming with light/dark mode support. Custom utility classes for elevation effects (`hover-elevate`, `active-elevate-2`).

**State Management**: 
- TanStack Query (React Query) for server state management and data fetching
- Local React state (useState) for UI state
- LocalStorage for offline caching of relief center data

**Map Integration**: Leaflet for interactive maps with custom markers. Color-coded by resource type (shelter: red, food: orange, medical: blue, water: purple).

**Form Handling**: React Hook Form with Zod validation schemas for type-safe form validation.

### Backend Architecture

**Runtime**: Node.js with Express framework running TypeScript.

**Database ORM**: Drizzle ORM for type-safe database queries and schema management.

**API Design**: RESTful API endpoints under `/api` prefix:
- `GET /api/relief-centers?lat={lat}&lng={lng}&radius={radius}` - Fetch nearby relief centers
- Geocoding endpoint for converting postal codes to coordinates

**Distance Calculation**: Server-side Haversine formula implementation to calculate distances between coordinates and filter results within the specified radius (25 km).

**Geocoding Strategy**: 
- Hardcoded postal code coordinates for common Toronto postal codes
- Fallback to Nominatim API (OpenStreetMap) with rate limiting (1 request per second)
- Caching layer to prevent redundant geocoding requests (24-hour cache duration)

**Data Seeding**: Automated database seeding with Toronto-area relief centers on server startup if the database is empty.

### Database Schema

**Technology**: PostgreSQL (Neon Serverless) with WebSocket support for connection pooling.

**Tables**:
1. `users` - User authentication (currently minimal usage)
   - id (UUID primary key)
   - username (unique text)
   - password (text)

2. `relief_centers` - Relief resource locations
   - id (UUID primary key)
   - name (text)
   - type (varchar: shelter/food/medical/water)
   - latitude (double precision)
   - longitude (double precision)
   - address (text)
   - phone (optional text)
   - hours (optional text)
   - lastUpdated (timestamp with default now())

**Schema Management**: Drizzle Kit for migrations and schema synchronization. Schema defined in TypeScript for type safety across the application.

### Key Architectural Decisions

**Postal Code Geocoding**: Uses a hybrid approach with hardcoded coordinates for performance and reliability, falling back to external API only when needed. This reduces dependency on external services and improves response time for common queries.

**25 km Radius Filtering**: Applied server-side to reduce payload size and improve map rendering performance. The Haversine formula provides accurate distance calculations for the geographically small search area.

**Offline Support**: LocalStorage caching ensures the application remains functional during connectivity issues. The last successful data fetch is stored and served when the network is unavailable.

**Real-time Updates**: Architecture supports real-time data updates through TanStack Query's automatic refetching, though WebSocket-based real-time subscriptions mentioned in documentation are not currently implemented.

**Mobile-First Design**: Responsive design with Tailwind's mobile-first breakpoints ensures the application works seamlessly across devices, critical for disaster scenarios where mobile access is common.

## External Dependencies

### Database & Infrastructure
- **Neon Serverless PostgreSQL** (`@neondatabase/serverless`): Serverless PostgreSQL database with WebSocket support and connection pooling. Accessed via `DATABASE_URL` environment variable.

### Mapping & Geolocation
- **Leaflet** (`leaflet`, `@types/leaflet`): Interactive map library for displaying relief centers with custom markers and popups.
- **Nominatim/OpenStreetMap API**: Used as fallback geocoding service for converting postal codes to coordinates (rate-limited to 1 request/second).

### UI Component Libraries
- **Radix UI**: Collection of headless UI components (`@radix-ui/react-*`) including dialogs, dropdowns, tooltips, forms, and more. Provides accessibility features out of the box.
- **Lucide React** (`lucide-react`): Icon library used throughout the application.

### Form & Validation
- **React Hook Form** (`react-hook-form`, `@hookform/resolvers`): Form state management and validation.
- **Zod** (`zod`, `drizzle-zod`): Schema validation for forms and database operations.

### Data Fetching
- **TanStack Query** (`@tanstack/react-query`): Server state management, caching, and data synchronization.

### Styling & Utilities
- **Tailwind CSS** (`tailwindcss`, `autoprefixer`, `postcss`): Utility-first CSS framework.
- **class-variance-authority**: Type-safe variant-based component styling.
- **clsx** & **tailwind-merge**: Utility for conditional class names and merging Tailwind classes.

### Date Handling
- **date-fns**: Date formatting and manipulation library.

### Development Tools
- **Vite**: Build tool and development server with HMR support.
- **Replit Plugins**: Development banner, error overlay, and code mapping for Replit environment.
- **TypeScript**: Type safety across frontend and backend.
- **ESBuild**: Used for production server bundling.

### Additional Backend Dependencies
- **Express**: Web application framework for Node.js.
- **WebSocket** (`ws`): Required for Neon database connection.
- **Drizzle ORM** (`drizzle-orm`, `drizzle-kit`): Type-safe ORM and migration tool.

### Potential Future Integrations
- **Twilio API**: Mentioned in README for SMS alerts (not currently implemented).
- **Google Maps API**: Mentioned in README but currently using Leaflet/OpenStreetMap instead.
- **Supabase**: Mentioned in documentation but currently using Neon PostgreSQL with Drizzle ORM.