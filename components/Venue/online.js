import CFSBanner from "../Speaker/banner.js";
// import EventDetails from "../Speaker/eventDetails";
// import Button from "../Buttons/button";
// import Link from "next/link";

import Agenda from "../Agenda/agenda.js";
import CFPdata from "../../config/cfp-data.json"

export default function CallForSpeakers() {
  return (
    <div className="text-white mt-1">
      <CFSBanner />
      
      <div
				id='agenda'
				className='border border-x-0 border-b-0 border-t-[#333] py-28 container flex flex-col justify-center items-center '
			>
				<div className='w-[1130px] lg:w-full'>
					<Agenda city={CFPdata} />
				</div>
			</div>
      
      </div>
        
    )

}
