# Post-Disaster Relief Resource Locator - Design Guidelines

## Design Approach
**System Selected:** Material Design with emergency/crisis optimization
**Rationale:** Specified Material Design with calming blue (#1976D2). For high-stress emergency situations, prioritize clarity, accessibility, and rapid information access over visual flourishes.

## Core Design Elements

### Typography
- **Primary Font:** Roboto (Material Design standard)
- **Headings:** Roboto Medium (500) - sizes: 32px (h1), 24px (h2), 20px (h3)
- **Body:** Roboto Regular (400) - 16px base, 18px for critical info
- **UI Labels:** Roboto Medium (500) - 14px
- **High Contrast:** Ensure WCAG AAA compliance for emergency readability

### Layout System
**Spacing Units:** Use Tailwind units of 3, 4, 6, 8, 12 for consistent rhythm
- Component padding: p-4 to p-8
- Section spacing: py-12 desktop, py-8 mobile
- Card gaps: gap-4 to gap-6
- Emergency action areas: p-6 minimum for tap targets

### Component Library

**Navigation Bar (Sticky)**
- Fixed top position with elevated Material shadow
- Logo left, "Emergency Hotline: XXX" right with phone icon
- Height: 64px desktop, 56px mobile
- Quick action: "Report New Resource" button (elevated, accent color)

**Hero Section (No Image - Map Priority)**
- Headline: "Find Emergency Resources Near You"
- Subheading: "Real-time shelter, food, water, and medical assistance locations"
- Location search bar (prominent, elevated card)
- Quick status badges: "Updated 5 mins ago" • "1,247 active resources"
- Height: ~300px (not full viewport) - users need quick access to map

**Interactive Map Section**
- Full-width container with 600px height desktop, 400px mobile
- Elevated Material card wrapping Leaflet map
- Color-coded markers: Red (shelters), Blue (water), Green (food), Orange (medical)
- Map legend: fixed position bottom-left overlay on map
- Zoom controls: Material Design FAB-style buttons

**Filter Panel**
- Sticky sidebar on desktop (300px width), collapsible drawer on mobile
- Filter chips: All, Shelters, Food Banks, Water Stations, Medical Centers
- Additional filters: Open Now toggle, Distance slider (0-10 miles)
- "Clear All Filters" text button at bottom
- Rounded corners (8px), elevated shadow level 2

**Resource Cards Grid**
- 2-column grid desktop, single column mobile
- Each card: 16px padding, 12px border-radius, elevated shadow
- Card structure: Icon (24px) + Resource name (18px bold) + Status badge + Distance + Address + Hours + "Get Directions" button
- Status badges: Pill-shaped, 6px vertical padding, uppercase 12px text
- Critical info (hours, capacity) in 16px bold
- Divider lines between sections within card

**Emergency Action Bar (Sticky Bottom Mobile)**
- Fixed bottom on mobile only
- Two-button layout: "Call 911" (red background) + "Share Location" (primary blue)
- 56px height, full-width buttons with icons
- Blur backdrop for overlay situations

**Footer**
- Simple utility footer: Last Updated timestamp + Data Sources + Privacy + Contact
- Single row desktop, stacked mobile
- 48px height, minimal padding

## Images
**No hero image.** This emergency application prioritizes immediate map and resource access over visual branding. The hero focuses on search functionality and quick status information.

## Accessibility (Emergency Critical)
- Minimum 48px touch targets for all interactive elements
- Color-blind safe marker colors with pattern/shape variations
- Screen reader labels for all map interactions
- High contrast mode support
- Focus indicators: 3px solid outline
- Error states: Red 600 with icon + descriptive text

## Animations
**Minimal:** Avoid all decorative animations in emergency context.
- Map marker clustering: Instant (no animation)
- Filter application: Immediate results
- Card loading: Simple fade-in (150ms) only
- Button states: Standard Material ripple effect
- Modal/drawer transitions: 200ms slide (Material standard)