import Paper from '../../../../components/Form/paper';
import Sponsors from "../../../../components/Sponsors/sponsors";
import cfpData from "../../../../config/cfp-data.json"

export default function SpeakersForm(){
    return(<div><div className='flex justify-center border  border-x-0 border-b-0 border-[#333]'>
        <Paper />
        </div>
        <div>
        <Sponsors eventSponsors={[{image:'/img/apidays.png',websiteUrl:"https://www.apidays.global/"}]} financialSponsor={[{image:"/img/graviteeio.svg" , websiteUrl: "https://www.gravitee.io/",className:"w-[250px] h-[50px]" } , {image:"/img/postman.png" ,websiteUrl:"https://www.postman.com/",className:"w-[240px] h-[70px]"}]} />
        </div>
    </div>)
}
