# Dependencies Documentation

## Post-Disaster Relief Resource Locator

This document outlines all dependencies, external services, and tools used in the Post-Disaster Relief Resource Locator application.

---

## Core Runtime

### Node.js
- **Purpose**: JavaScript runtime environment
- **Version**: Latest LTS recommended
- **Usage**: Runs the backend server and build tools

### TypeScript
- **Package**: `typescript`
- **Purpose**: Type-safe JavaScript development
- **Usage**: Used across frontend and backend for type checking

### PostgreSQL Database
- **Provider**: Neon Serverless (@neondatabase/serverless)
- **Purpose**: Primary data storage for relief centers and users
- **Connection**: Via DATABASE_URL environment variable
- **Features**: WebSocket support, connection pooling

---

## Frontend Dependencies

### Framework & Build Tools

#### React
- **Package**: `react`, `react-dom`
- **Version**: 18.x
- **Purpose**: UI component framework
- **Usage**: All frontend components and views

#### Vite
- **Package**: `vite`, `@vitejs/plugin-react`
- **Purpose**: Build tool and development server
- **Features**: Fast HMR, optimized production builds
- **Plugins**:
  - `@replit/vite-plugin-cartographer` - Code mapping
  - `@replit/vite-plugin-dev-banner` - Development banner
  - `@replit/vite-plugin-runtime-error-modal` - Error overlay

#### Wouter
- **Package**: `wouter`
- **Purpose**: Lightweight client-side routing
- **Usage**: Single-page application navigation

### UI Component Libraries

#### Radix UI
- **Packages**: 20+ `@radix-ui/react-*` primitives
- **Purpose**: Accessible, unstyled UI components
- **Components Used**:
  - Dialog, Dropdown Menu, Popover, Tooltip
  - Accordion, Tabs, Select, Radio Group
  - Alert Dialog, Toast, Progress
  - Scroll Area, Separator, Slider, Switch

#### Shadcn/ui
- **Purpose**: Pre-built component system using Radix UI
- **Style**: "new-york" variant
- **Location**: `client/src/components/ui/`
- **Customization**: Components styled with Tailwind CSS

#### Lucide React
- **Package**: `lucide-react`
- **Purpose**: Icon library
- **Usage**: All UI icons (Navigation, AlertTriangle, MapPin, etc.)

#### React Icons
- **Package**: `react-icons`
- **Purpose**: Additional icon sets
- **Usage**: Company logos via `react-icons/si`

### Styling

#### Tailwind CSS
- **Packages**: `tailwindcss`, `@tailwindcss/typography`, `@tailwindcss/vite`
- **Purpose**: Utility-first CSS framework
- **Config**: Custom design tokens in `tailwind.config.ts`
- **Plugins**: Typography for rich text formatting

#### PostCSS & Autoprefixer
- **Packages**: `postcss`, `autoprefixer`
- **Purpose**: CSS processing and vendor prefixing
- **Usage**: Automatic browser compatibility

#### Class Variance Authority
- **Package**: `class-variance-authority`
- **Purpose**: Component variant management
- **Usage**: Type-safe component styling variants

#### Tailwind Utilities
- **Packages**: 
  - `tailwind-merge` - Merge Tailwind classes intelligently
  - `tailwindcss-animate` - Animation utilities
  - `tw-animate-css` - Additional animations
  - `clsx` - Conditional className helper

### Maps & Geolocation

#### Leaflet
- **Package**: `leaflet`
- **Version**: Latest
- **Purpose**: Interactive map rendering
- **Features**:
  - OpenStreetMap tile integration
  - Custom color-coded markers by resource type
  - User location indicator with pulse animation
  - Auto-zoom and bounds fitting
  - Recenter functionality

#### Browser Geolocation API
- **Type**: Native Web API
- **Purpose**: Get user's current location
- **Usage**: "Use My Location" feature
- **Fallback**: Postal code search

### State Management & Data Fetching

#### TanStack Query (React Query)
- **Package**: `@tanstack/react-query`
- **Version**: v5
- **Purpose**: Server state management and caching
- **Features**:
  - Automatic caching and invalidation
  - Background refetching
  - Optimistic updates
  - Query key-based cache management
- **Configuration**: Custom query client with infinite stale time

#### React Hook Form
- **Package**: `react-hook-form`
- **Purpose**: Form state management and validation
- **Integration**: Used with Zod via `@hookform/resolvers/zod`
- **Usage**: Search form, filters

### Validation & Schema

#### Zod
- **Packages**: `zod`, `zod-validation-error`, `drizzle-zod`
- **Purpose**: TypeScript-first schema validation
- **Usage**:
  - Form validation
  - API request/response validation
  - Database schema validation via Drizzle

### Date & Time

#### date-fns
- **Package**: `date-fns`
- **Purpose**: Date formatting and manipulation
- **Usage**: "Last updated" timestamps, relative time display

### Animation

#### Framer Motion
- **Package**: `framer-motion`
- **Purpose**: Animation library
- **Usage**: Smooth transitions and micro-interactions

---

## Backend Dependencies

### Server Framework

#### Express.js
- **Package**: `express`
- **Purpose**: Web server and API framework
- **Features**:
  - RESTful API endpoints
  - Middleware support
  - JSON parsing
- **Type Definitions**: `@types/express`

### Database & ORM

#### Drizzle ORM
- **Packages**: `drizzle-orm`, `drizzle-kit`
- **Purpose**: Type-safe SQL ORM
- **Features**:
  - Schema definition and migrations
  - Type-safe queries
  - Relation mapping
- **Usage**: All database operations

#### Neon Serverless
- **Package**: `@neondatabase/serverless`
- **Purpose**: PostgreSQL connection for Neon database
- **Features**: WebSocket support, serverless optimized

### Session Management

#### Express Session
- **Packages**: 
  - `express-session`
  - `connect-pg-simple` - PostgreSQL session store
  - `memorystore` - In-memory session store (development)
- **Purpose**: User session handling
- **Type Definitions**: `@types/express-session`

#### Passport.js (Infrastructure Ready)
- **Packages**: `passport`, `passport-local`
- **Purpose**: Authentication middleware
- **Status**: Infrastructure exists but not fully implemented
- **Type Definitions**: `@types/passport`, `@types/passport-local`

### WebSockets

#### ws
- **Package**: `ws`
- **Purpose**: WebSocket server implementation
- **Status**: Infrastructure exists for real-time features
- **Type Definitions**: `@types/ws`

---

## External Services & APIs

### OpenStreetMap
- **Service**: Tile server for map rendering
- **URL**: `https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`
- **Cost**: Free
- **API Key**: Not required
- **Usage**: Base map tiles for Leaflet
- **Attribution**: Required (automatically included)

### Nominatim Geocoding API
- **Service**: OpenStreetMap geocoding service
- **URL**: `https://nominatim.openstreetmap.org/search`
- **Cost**: Free
- **API Key**: Not required
- **Rate Limit**: 1 request per second (enforced in code)
- **Usage**: Postal code to coordinate conversion
- **Caching**: 24-hour in-memory cache per postal code
- **Fallback**: In-memory lookup table for 100+ Toronto postal codes
- **User-Agent**: Required (set to application name)

### Google Maps / Apple Maps
- **Service**: Directions service (external link)
- **Usage**: "Get Directions" button opens native maps app
- **Implementation**: Deep links to maps apps
  - Desktop: Google Maps web
  - iOS: Apple Maps app via URL scheme
- **Cost**: Free (user's own maps app)

---

## Development Tools

### Build Tools

#### ESBuild
- **Package**: `esbuild`
- **Purpose**: Fast JavaScript bundler
- **Usage**: Production builds via Vite

#### TSX
- **Package**: `tsx`
- **Purpose**: TypeScript execution for Node.js
- **Usage**: Running TypeScript files directly in development

### Type Definitions

All type definitions are in `@types/*` packages:
- `@types/node` - Node.js types
- `@types/react` - React types
- `@types/react-dom` - React DOM types
- `@types/express` - Express types
- `@types/leaflet` - Leaflet types
- `@types/passport` - Passport types
- `@types/ws` - WebSocket types

### Utilities

#### CMDK
- **Package**: `cmdk`
- **Purpose**: Command palette pattern
- **Usage**: Command menu component infrastructure

#### Input OTP
- **Package**: `input-otp`
- **Purpose**: One-time password input
- **Usage**: Available for authentication features

#### React Day Picker
- **Package**: `react-day-picker`
- **Purpose**: Date picker component
- **Usage**: Available for date selection features

#### Recharts
- **Package**: `recharts`
- **Purpose**: Chart library
- **Usage**: Available for data visualization features

#### Embla Carousel
- **Package**: `embla-carousel-react`
- **Purpose**: Carousel component
- **Usage**: Available for image galleries

#### React Resizable Panels
- **Package**: `react-resizable-panels`
- **Purpose**: Resizable panel layouts
- **Usage**: Available for split views

#### Vaul
- **Package**: `vaul`
- **Purpose**: Drawer component
- **Usage**: Mobile-friendly drawers

#### Next Themes
- **Package**: `next-themes`
- **Purpose**: Theme management (light/dark mode)
- **Status**: Infrastructure ready but not implemented

---

## Environment Variables

### Required

- `DATABASE_URL` - PostgreSQL connection string
- `PGHOST` - Database host
- `PGPORT` - Database port
- `PGUSER` - Database user
- `PGPASSWORD` - Database password
- `PGDATABASE` - Database name
- `SESSION_SECRET` - Session encryption key

### Optional

None currently required for core functionality.

---

## Data Storage & Caching

### LocalStorage
- **Purpose**: Offline data caching
- **Usage**: Relief center data cached for offline access
- **Key**: `relief_centers_cache`
- **Expiration**: None (persistent)

### In-Memory Caches
- **Postal Code Cache**: 24-hour cache for Nominatim geocoding results
- **Postal Code Lookup Table**: 100+ Toronto postal codes hardcoded
- **Session Store**: Development uses MemoryStore

---

## Version Management

### Package Versions
All package versions are managed in `package.json`. The project uses:
- Exact versions for critical dependencies
- Caret ranges (^) for most packages allowing minor updates
- Regular updates recommended for security patches

### Node.js Version
- Recommended: Latest LTS (Long Term Support)
- Minimum: Node 18.x or higher

---

## Security Considerations

### API Rate Limiting
- **Nominatim**: Self-enforced 1 request/second
- **Implementation**: In-memory queue with 1000ms delay

### Secrets Management
- All secrets stored in environment variables
- Never committed to version control
- Managed via Replit Secrets

### Data Privacy
- User location data never stored in database
- Only relief center data persisted
- Session data stored securely with encryption

---

## Performance Optimizations

### Caching Strategy
1. **LocalStorage**: Relief centers cached for offline access
2. **TanStack Query**: Infinite stale time for relief centers
3. **Nominatim Cache**: 24-hour in-memory cache
4. **Postal Code Lookup**: Hardcoded table for Toronto postal codes

### Bundle Optimization
- Tree-shaking via Vite
- Code splitting for routes
- Lazy loading for non-critical components
- Optimized production builds with ESBuild

### Database
- Neon serverless with connection pooling
- WebSocket connections for low latency
- Indexed queries on latitude/longitude

---

## Browser Compatibility

### Required Features
- ES2020+ JavaScript
- CSS Grid and Flexbox
- LocalStorage API
- Geolocation API (optional, has fallback)
- Modern Fetch API

### Tested Browsers
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile Safari (iOS 14+)
- Chrome Mobile (Android)

---

## Known Limitations

### External Services
- **Nominatim**: Rate limited to 1 req/sec (self-enforced)
- **OpenStreetMap Tiles**: Usage policy requires attribution
- **Geocoding**: Limited to global locations supported by Nominatim

### Data Coverage
- Relief centers limited to Toronto, Guelph, and Hamilton
- Can be expanded by adding more seed data

### Offline Support
- Map tiles not cached (requires internet)
- Relief center data cached in LocalStorage
- Geolocation requires device hardware support

---

## Future Considerations

### Potential Additions
- Real-time emergency alerts via WebSocket
- Push notifications for critical updates
- Additional map providers (Google Maps, Mapbox)
- PWA support for offline-first experience
- Multi-language support (i18n)
- Dark mode implementation (infrastructure ready)

### Scalability
- Consider Redis for caching in production
- CDN for static assets
- Load balancing for high traffic
- Database replication for read-heavy loads

---

## Support & Documentation

### Official Documentation
- [React](https://react.dev)
- [Vite](https://vitejs.dev)
- [TanStack Query](https://tanstack.com/query)
- [Drizzle ORM](https://orm.drizzle.team)
- [Tailwind CSS](https://tailwindcss.com)
- [Leaflet](https://leafletjs.com)
- [Radix UI](https://www.radix-ui.com)
- [Shadcn/ui](https://ui.shadcn.com)

---

**Last Updated**: November 9, 2025
