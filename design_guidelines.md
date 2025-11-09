# Design Guidelines: Post-Disaster Relief Resource Locator

## Design Approach

**System**: Material Design principles for emergency response applications
**References**: Google Maps interface patterns, emergency.gov, FEMA mobile apps
**Core Principle**: Maximum clarity and information access speed during high-stress situations. This is a utility-first application—no hero section, users need immediate access to map and search functionality.

## Color System

**Primary Blue** (Trust & Calm):
- Primary: #1976D2 (buttons, active states, map markers)
- Primary Dark: #1565C0 (hover states, header)
- Primary Light: #E3F2FD (background panels, hover backgrounds)

**Critical Red** (Alerts & Urgency):
- Alert: #D32F2F (emergency banners, critical status)
- Alert Light: #FFEBEE (alert backgrounds)

**Neutrals** (Clarity):
- White: #FFFFFF (main background, cards)
- Gray 50: #FAFAFA (secondary backgrounds)
- Gray 100: #F5F5F5 (disabled states)
- Gray 400: #BDBDBD (borders, dividers)
- Gray 700: #616161 (secondary text)
- Gray 900: #212121 (primary text)

**Status Colors**:
- Success/Open: #2E7D32 (operational resources)
- Warning: #F57C00 (limited capacity)
- Info: #0288D1 (informational notices)

**Shadows**: Use Material Design elevation system
- Cards: shadow-md (4px elevation)
- Modals: shadow-xl (24px elevation)
- Floating buttons: shadow-lg (8px elevation)

## Typography System

**Font Family**: Inter (Google Fonts) for exceptional legibility
- Headings: 600-700 weight
- Body: 400-500 weight  
- Critical info: 500-600 weight

**Scale**:
- Page Title: text-2xl md:text-3xl
- Section Headers: text-xl md:text-2xl
- Resource Names: text-lg font-semibold
- Body: text-base
- Metadata: text-sm text-gray-700
- Alert Text: text-base md:text-lg font-medium

## Layout System

**Spacing**: Tailwind units of 2, 4, 6, 8
- Component padding: p-4 md:p-6
- Section gaps: space-y-4 md:space-y-6
- Card padding: p-4
- Button padding: px-6 py-3

**Grid Structure**:
- Desktop: 60/40 split (map/list) with divider
- Tablet: Tabbed switching between views
- Mobile: Map-first, scrollable list below
- All layouts: Full-width map, max-w-7xl for content

## Component Library

### Navigation Header
Fixed top bar (h-16 md:h-20), white bg, shadow-sm. Logo left, location search center (desktop) or full-width below (mobile), utilities right. Border-b with gray-200.

### Emergency Alert Banner
Full-width, bg-red-50, border-l-4 border-alert, dismissible. Bold red text, icon, timestamp. Sticky position above header.

### Search & Location
Prominent search with blue location icon. Toggle: "Use My Location" (blue filled) / "Enter Postal Code" (outline). Autocomplete dropdown, white cards with shadow-md.

### Filter Controls
Horizontal chip toggles with icons. Active: blue bg, white text, count badge. Inactive: gray-100 bg, gray-700 text. Rounded-full, px-4 py-2. Mobile: collapsible drawer.

### Map Interface
Full-height (min-h-[500px] md:min-h-screen). Custom blue markers, cluster icons for density. Zoom controls bottom-right. Floating recenter button (blue, shadow-lg).

### Resource Cards
Width w-80, white bg, shadow-md, rounded-lg. Header: resource type badge (blue for shelter, green for food, red for medical, cyan for water). Body: address, phone (blue link), hours. Footer: distance chip, timestamp text-sm.

### List Panel
Scrollable, white bg, shadow-lg separator. Each item: h-24, border-b gray-200. Type icon circle (colored by category), name/address/distance stack, chevron right. Sort dropdown at top.

### Detail Modal
Slide-up panel (mobile), 80vh height, rounded-t-2xl. Large icon circle at top, full resource info, action buttons row (Call, Directions, Share - all blue primary). Swipe indicator.

### Status Elements
Sticky bottom timestamp bar, blue-50 bg. Offline banner: yellow warning. Loading: skeleton screens (gray-100 pulse). Empty state: centered with gray icon, text-gray-600.

## Accessibility

- ARIA labels on all map interactions
- Keyboard nav for filters/lists
- 2px blue focus rings with offset
- 48px minimum touch targets mobile
- Screen reader live region announcements
- High contrast mode: darken blues, enhance borders

## Assets

**Icons**: Heroicons via CDN
- UI: outline variant (search, location, close, chevrons)
- Resources: solid (home-shelter, shopping-bag-food, heart-medical, beaker-water)

**Maps**: Google Maps JavaScript API with custom styled markers using data URIs for type-based colors

## Animations

Minimal motion only:
- Marker drop: single bounce (300ms)
- Filter toggle: opacity 200ms
- Modal slide-up: translateY 300ms ease-out
- Loading spinner: rotate only
- NO scroll effects or parallax

## Images

**No hero section or marketing imagery.** This is a utility application requiring immediate functional access. Visual communication via iconography and color-coded resource types only.

## Mobile Optimization

Fixed search header, flexible map height min-h-[400px], accordion list expansion. One-hand operation: primary actions in thumb zone (bottom third). Progressive enhancement: core list works without JS, map enhances experience. URL state for shareable locations/filters.