import CFSBanner from "../../../components/Speaker/banner";
import EventDetails from "../../../components/Speaker/eventDetails";
import Button from "../../../components/Buttons/button";
import Link from "next/link";
import CFPdata from "../../../config/cfp-data.json"
export default function CallForSpeakers() {
  return (
    <div className="text-white mt-1">
      <CFSBanner />
      <div className="px-20 py-12">
            <div>

            <h2 className="text-2xl font-bold mb-8 ">Hello! Thank you for your interest in speaking at AACoT'24 Online Edition</h2>
            <div className="text-lg mb-4 lg:text-base">
             The AsyncAPI Conf on Tour is an official event created by the AsyncAPI Initiative. This conference is aimed primarily at the community to share and exchange experiences between existing users and new members. We aim to integrate new members into the community and expand their knowledge about the project.
            </div>

  {/*<div className="text-lg mb-14 lg:mb-10 lg:text-base">
            AACoT Madrid Edition will be hosted by <a href="https://www.ibm.com/" className="font-semibold text-blue-400">IBM</a>, one of the leading digital transformation companies in Spain. The conference will take place at one of IBM&#39;s offices in London, providing attendees with an opportunity to network with industry leaders and peers while exploring the city&#39;s vibrant culture. During the conference, attendees can expect to hear from industry experts including Fran Mendez, who will give a keynote on the history of AsyncAPI.
            </div>*/}

            </div>

        <div>

            <h2 className="text-2xl font-bold mb-8">Event Details & Ticket Information</h2>
            <EventDetails EventStartDate={CFPdata.EventStartDate} EventEndDate={CFPdata.EventEndDate} EventLocation={CFPdata.EventLocation} CallStartDate={CFPdata.CallStartDate} CallEndDate={CFPdata.CallEndDate} />
        </div>

        <div>
            <h2 className="text-2xl font-bold mb-8">Speakers Guidelines</h2>
            <div className="grid grid-cols-2  gap-10 lg:gap-3 lg:grid-cols-1">

            <div className="mb-4">
            <div className="text-lg">Who can submit a talk</div>
            <ul className="list-disc flex gap-0 flex-col px-10">
                <li className="text-sm pr-14 lg:pr-0">We're excited to have speakers from different parts of the globe sharing how they apply the AsyncAPI Specification in their practical use cases.</li>
                <li className="text-sm pr-14 lg:pr-0">We encourage proposals from all individuals, regardless of their expertise level, to promote a diverse content track that welcomes everyone.</li>
            </ul>
            </div>

            <div className="mb-4">
            <div className="text-lg">Talk Style</div>
            <ul className="list-disc flex gap-0 flex-col px-10">
                <li className="text-sm">Informative/Session Presentation (typically 30 mins incl Q&A)</li>
                <li className="text-sm">Tutorial/Hands-on (typically 45 mins incl Q&A)</li>

            </ul>
            </div>

            <div className="mb-4">
            <div className="text-lg">Talks we don&#39;t recommend</div>
            <ul className="list-disc flex gap-0 flex-col px-10">
                <li className="text-sm">Marketing/Sales - rather share your experience or use case using our tools or specifications.</li>
                <li className="text-sm">Workshops</li>
            </ul>
            </div>

            <div className=" mb-4">
            <div className="text-lg">Talk Reviews</div>
            <ul className="list-disc flex gap-0 flex-col px-10">
                <li className="text-sm pr-14 lg:pr-0">Reviews will be kept anonymous, and reviewers will not have access to speaker information such as name, gender or company, etc.</li>
            </ul>
            </div>

            <div className="mb-14 lg:mb-7">
            <div className="text-lg">Accepted Talks</div>
            <ul className="list-disc flex gap-0 flex-col px-10">
                <li className="text-sm">Selected talks will be emailed (please make sure you check your spam folder)</li>
                <li className="text-sm">Speakers will be required to confirm their talks failure to do so will result in forfeiting their slot.</li>

            </ul>
            </div>
            
            </div>

        </div>

{/*<h2 className="text-xl font-bold lg:text-base">P.S. This is an in-person event and we are not accepting virtual presentations.</h2>*/}

      </div> {/* content div end */}
        <div className="flex justify-center my-14 lg:my-2 mb-20 lg:mb-14">
          <Link href="/venue/online/register">
      <Button className="font-semibold w-96 lg:w-44">Submit Proposal</Button>
          </Link>
        </div>
      </div>
        
    )

}
