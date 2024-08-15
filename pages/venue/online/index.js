import CallForSpeakers from "../../../components/Venue/online";
import Sponsors from "../../../components/Sponsors/sponsors";
import cfpData from "../../../config/cfp-data.json"
export default function VenueOnline() {
    return(
        <div>
            <CallForSpeakers />
        
            <Sponsors imgs={cfpData.sponsors} />
        
        </div>
    )
}