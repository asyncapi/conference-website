// Types for the WorldMap component

export interface MapLocation {
  lat: number;
  lng: number;
  label?: string;
}

export interface MapConnection {
  start: MapLocation;
  end: MapLocation;
}

export interface WorldMapProps {
  dots?: MapConnection[];
  lineColor?: string;
}
