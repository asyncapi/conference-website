import { WorldMap } from './WorldMap';
import { conferenceVenues } from './data';

export default function WorldMapContainer() {
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
            dots={conferenceVenues}
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
