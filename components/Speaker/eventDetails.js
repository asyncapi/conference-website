import Image from "next/image";

export default function EventDetails(props) {
    return (
      <div className="grid grid-cols-2 lg:grid-cols-1 gap-9 mb-14 lg:mb-10">
        {/* <div className="flex gap-20">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Calender.png" alt="Calendar Icon" width={20} height={20} layout="fixed"  className="w-6 h-6" />
              <span className="font-bold">Event Starts</span>
            </div>
            <div className="text-lg lg:text-base">{props.EventStartDate}</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Calender.png" alt="Calendar Icon" width={20} height={20} layout="fixed"   className="w-6 h-6" />
              <span className="font-bold">Event Ends</span>
            </div>
            <div className="text-lg lg:text-base">{props.EventEndDate}</div>
          </div>
          
        </div> */}
        <div className="flex gap-20">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Calender.png" alt="Calendar Icon" width={20} height={20} layout="fixed"  className="w-6 h-6" />
              <span className="font-bold lg:w-[70%] lg:text-base">Call Opens at 12:00 AM</span>
            </div>
            <div className="text-lg lg:text-base">{props.CallStartDate}</div>
          </div>
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Calender.png" alt="Calendar Icon" width={20} height={20} layout="fixed" className="w-6 h-6" />
              <span className="font-bold lg:w-[70%] lg:text-base">Call Closes at 12:00 AM</span>
            </div>
            <div className="text-lg lg:text-base">{props.CallEndDate}</div>
          </div>
          
        </div>

        <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Location.png" alt="Location Icon" width={20} height={20} layout="fixed" className="w-6 h-6" />
              <span className="font-bold">Location</span>
            </div>
            <div className="text-lg lg:text-base">{props.EventLocation}            
            <a href="https://www.youtube.com/@AsyncAPI" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
            AsyncAPI YouTube
              </a>
            </div>
        </div>

        {/*<div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Image src="/img/Globe.png" alt="Ticket Icon" width={20} height={20} layout="fixed" className="w-6 h-6" />
              <span className="font-bold">Buy Tickets</span>
            </div>
            <div className="text-lg lg:text-base">
              <a href="https://opencollective.com/asyncapi/events/asyncapi" className="text-blue-400 underline" target="_blank" rel="noopener noreferrer">
                opencollective.com/asyncapi/events/asyncapi
              </a>
            </div>
          </div>*/}
      </div>
    );
  }
