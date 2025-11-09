# Design Guidelines: Post-Disaster Relief Resource Locator

## Design Approach

**System Selection**: Material Design principles adapted for emergency response applications
**References**: Google Maps interface patterns, emergency.gov clarity, FEMA mobile apps
**Core Principle**: Maximum clarity and speed of information access during high-stress situations

## Typography System

**Font Family**: Inter (via Google Fonts CDN) for exceptional legibility at all sizes
- Headings: 600-700 weight
- Body text: 400-500 weight
- Critical information (addresses, phone numbers): 500-600 weight

**Type Scale**:
- Hero/Page Title: text-3xl md:text-4xl
- Section Headers: text-xl md:text-2xl
- Card Titles/Resource Names: text-lg font-semibold
- Body/List Items: text-base
- Metadata (distances, timestamps): text-sm
- Alert Banner: text-base md:text-lg font-medium

## Layout System

**Spacing Primitives**: Tailwind units of 2, 3, 4, 6, 8, 12
- Component padding: p-4 md:p-6
- Section spacing: space-y-4 md:space-y-6
- Card spacing: p-4
- Button padding: px-4 py-2 md:px-6 py-3

**Grid Structure**:
- Desktop: Two-column split (map 60% / list 40%)
- Tablet: Stacked with tabs to switch views
- Mobile: Single column, map-first with scrollable list below

**Container Strategy**:
- Full-width map container
- Content max-width: max-w-7xl
- Form elements: max-w-md

## Component Library

### Navigation Header
- Sticky top bar (h-16 md:h-20)
- Logo/title left-aligned
- Location input center (desktop) or below (mobile)
- Icon-only utilities right-aligned (share, settings)

### Emergency Alert Banner
- Full-width, positioned above header
- Dismissible with X button
- Icon + bold message + timestamp
- Collapsible to icon-only bar after dismissal

### Search & Location Input
- Prominent search bar with location icon
- Toggle buttons: "Use My Location" | "Enter Postal Code"
- Autocomplete dropdown for postal code suggestions
- Clear visual feedback for active location detection

### Filter Controls
- Horizontal chip-based toggles (desktop)
- Icon + label for each resource type (shelter, food, medical, water)
- Active state shows count badge
- Collapsible drawer on mobile

### Map Interface
- Full-height container (min-h-[500px] md:min-h-screen)
- Custom marker clusters for density management
- Zoom controls positioned bottom-right
- "Recenter to my location" floating action button

### Resource Cards (Map Popups)
- Card size: w-72
- Header: Resource name + type badge
- Body: Address, phone (tap-to-call), hours
- Footer: Distance indicator + "Last updated" timestamp
- Primary CTA: "Get Directions" button

### List View Panel
- Scrollable container with shadow separator from map
- Each item: compact card (h-24 md:h-28)
- Left: Type icon circle
- Center: Name, address, distance
- Right: Chevron for detail view
- Sort dropdown at top: "Nearest" | "Recently Updated" | "By Type"

### Detail Modal (Mobile)
- Slide-up panel covering 80% viewport
- Large type icon at top
- All resource information
- Action buttons: Call, Directions, Share
- Swipe-down to dismiss

### Status Indicators
- "Last Updated" timestamp: sticky bottom bar or floating chip
- Offline mode banner: prominent yellow alert
- Loading states: skeleton screens for list, spinner overlay for map
- Empty states: centered message with icon for "No results found"

## Accessibility Implementation

- ARIA labels on all interactive map elements
- Keyboard navigation for filter chips and list items
- Focus indicators: 2px ring with offset
- Tap targets minimum 44x44px on mobile
- Screen reader announcements for live updates
- High contrast mode support for critical information

## Asset Guidelines

**Icons**: Heroicons (outline for UI controls, solid for resource types)
- Shelter: home icon
- Food: shopping-bag icon
- Medical: heart icon with pulse
- Water: beaker icon

**Maps**: Google Maps JavaScript API via CDN
- Custom marker icons using data URIs for resource types
- Marker clustering library for performance

## Animations

**Minimal Motion Approach**:
- Map marker drop-in: single bounce on load
- Filter toggle: smooth opacity transition (200ms)
- Card/modal appearance: slide-up transform (300ms ease-out)
- Loading spinner: rotate animation only
- NO scroll-triggered animations
- NO parallax effects

## Images

**No Hero Section**: This is a utility application - users need immediate access to the map and search functionality.

**Iconography Only**: Use icon-based visual communication rather than photographic images. The focus is on functional clarity, not marketing imagery.

## Mobile Optimization

**Touch Targets**: All interactive elements minimum 48px height
**Viewport Management**: 
- Search bar: fixed top position
- Map: flexible height with min-h-[400px]
- List view: accordion-style expansion on mobile

**Progressive Enhancement**:
- Core functionality works without JavaScript (static list)
- Map enhances with JS enabled
- Offline cache provides degraded experience

## Critical UX Patterns

**One-Hand Operation**: Primary actions within thumb reach on mobile
**Error Recovery**: Clear retry buttons with specific error messages
**Loading Feedback**: Immediate response to all user actions
**Information Hierarchy**: Distance and type are always visible at a glance
**Shareable State**: URL updates with current location and filters for bookmark/share capability