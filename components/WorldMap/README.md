# WorldMap Component

An interactive world map showing the conference venues and connections for the AsyncAPI Conference. The map features animated connecting paths and labeled locations.

## Features

- Interactive dotted world map
- Animated connection paths between venues
- Location labels with smart positioning to avoid overlaps
- Responsive design with mobile optimization
- Dark/light theme compatible
- Glowing effects for better visibility

## Component Structure

- `WorldMap/`
  - `WorldMap.tsx` - The core map component with SVG rendering
  - `WorldMapContainer.tsx` - Container component with section heading and layout
  - `data.ts` - Conference venue coordinates and connections
  - `types.ts` - TypeScript interfaces for the component
  - `index.ts` - Export file for easy imports

## Usage

```tsx
// Basic usage
import WorldMapContainer from '../components/WorldMap';

function Page() {
  return (
    <div>
      <WorldMapContainer />
    </div>
  );
}

// Advanced usage with custom data
import { WorldMap } from '../components/WorldMap/WorldMap';

const customConnections = [
  {
    start: { lat: 37.7749, lng: -122.4194, label: "San Francisco" },
    end: { lat: 40.7128, lng: -74.0060, label: "New York" },
  },
  // ...more connections
];

function CustomMap() {
  return (
    <WorldMap dots={customConnections} lineColor="#ff00ff" />
  );
}
```

## Props

The `WorldMap` component accepts the following props:

- `dots`: Array of connections, each with start and end points containing lat, lng, and label
- `lineColor`: Optional color for the connecting paths (default: "#0ea5e9")

## Technical Details

- Uses DottedMap library for the base map
- Motion library for path animations
- Smart label positioning algorithm to prevent overlapping in crowded regions
- Handles international date line path crossings
- Enhanced SVG filters for visual effects
