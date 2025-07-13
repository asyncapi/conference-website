import { WorldMap } from "./ui/world-map";

// Exact coordinates for actual conference venue locations
const sampleData = [
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

export default function WorldMapDemo() {
  return (
    <div 
      className="px-6 py-24 lg:pt-16 lg:pb-24 container flex items-center justify-center w-full"
      data-test="worldmap-section"
    >
      <div className="w-[1120px] lg:w-full flex flex-col items-center justify-center">
        <div className="text-center mb-14 lg:mb-10">
          <div className="flex items-center justify-center">
            <div className="text-lg sm:text-sm text-white font-semi-bold border-b-2 border-blue-400 mb-1">
              Global Network
            </div>
          </div>
          <h2 className="text-gradient mt-10 lg:mt-6 text-4xl lg:text-3xl sm:text-2xl font-bold">
            AsyncAPI Conference Worldwide
          </h2>
          <p className="text-gray-200 text-lg sm:text-base mt-6 max-w-3xl mx-auto">
            Connecting developers, architects, and API enthusiasts across the globe. 
            Join our international community shaping the future of asynchronous communication.
          </p>
        </div>
        <div className="w-full max-w-6xl rounded-xl shadow-2xl shadow-blue-500/10 relative">
          <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/5 to-blue-500/5 rounded-xl"></div>
          <WorldMap 
            dots={sampleData}
            lineColor="#4bc5cf"
          />
          <div className="absolute bottom-4 right-4 text-xs text-gray-400 opacity-70">
            Conference venues and connections worldwide
          </div>
        </div>
      </div>
    </div>
  );
}
