import { MapConnection } from './types';

// Exact coordinates for actual conference venue locations
export const conferenceVenues: MapConnection[] = [
  {
    start: { lat: 1.2815, lng: 103.8636, label: "Singapore" }, // Marina Bay Sands, Singapore
    end: { lat: 48.1375, lng: 11.5865, label: "Munich" }, // Smartvillage Bogenhausen, Munich
  },
  {
    start: { lat: 6.5568, lng: 3.3675, label: "Lagos" }, // The Zone Gbagada, Lagos
    end: { lat: 51.5171, lng: -0.0819, label: "London" }, // 155 Bishopsgate, London
  },
  {
    start: { lat: 12.9719, lng: 77.5946, label: "Bangalore" }, // The Chancery Pavilion, Bangalore
    end: { lat: 48.8908, lng: 2.2381, label: "Paris" }, // CNIT La Defense, Paris
  },
  {
    start: { lat: 48.1375, lng: 11.5865, label: "Munich" }, // Munich
    end: { lat: 6.5568, lng: 3.3675, label: "Lagos" }, // Lagos
  },
  {
    start: { lat: 51.5171, lng: -0.0819, label: "London" }, // London
    end: { lat: 12.9719, lng: 77.5946, label: "Bangalore" }, // Bangalore
  },
  {
    start: { lat: 1.2815, lng: 103.8636, label: "Singapore" }, // Singapore
    end: { lat: 48.8908, lng: 2.2381, label: "Paris" }, // Paris
  },
];
