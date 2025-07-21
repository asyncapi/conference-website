# Add Interactive World Map Component

## Description

This PR adds a new interactive world map component that displays connections between AsyncAPI conference venues worldwide. The component features:

- Interactive dotted world map with animated connections
- Conference venue locations with non-overlapping labels
- Responsive design that works on all devices
- Optimized for dark/light theme compatibility
- Smart label positioning to avoid overlaps in crowded regions

## Changes

- Added `components/WorldMap/` directory with organized component structure:
  - `WorldMap.tsx` - Core map visualization component
  - `WorldMapContainer.tsx` - Section container with title and layout
  - `data.ts` - Conference venue coordinates and connections
  - `types.ts` - TypeScript interfaces for the component
  - `index.ts` - Export file for easier imports
  - `README.md` - Documentation

- Added required dependencies:
  - motion (v12.0.0-alpha.2)
  - dotted-map
  - clsx
  - tailwind-merge

- Updated `pages/index.tsx` to integrate the new map component

## Visual Changes

The new world map shows all AsyncAPI conference venues and visually connects them with animated gradient lines. Each location is labeled and the component integrates seamlessly with the existing site design.

## Technical Details

- Uses SVG rendering for the map and connection paths
- Intelligent label positioning algorithm to prevent overlaps
- Handles international date line path crossings
- Enhanced visualization with SVG filters for glow effects
- Extracted venue coordinates to separate data file for easier maintenance

## Testing

The component has been tested on desktop and mobile viewports and works correctly in both light and dark modes.
