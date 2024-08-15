import Paper from '../../../../components/Form/paper';
import Sponsors from "../../../../components/Sponsors/sponsors";
import cfpData from "../../../../config/cfp-data.json"

export default function SpeakersForm(){
    return(<div><div className='flex justify-center container border  border-x-0 border-b-0 border-[#333]'>
        <Paper />
        </div>
        <div>
        <Sponsors imgs={cfpData.sponsors} />
        </div>
    </div>)
}
