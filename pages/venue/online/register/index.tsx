import Paper from '../../../../components/Form/paper';
import Sponsors from '../../../../components/Sponsors/sponsors';

export default function SpeakersForm(): JSX.Element {
  return (
    <div>
      <div className="container">
        <Paper />
      </div>
      <div>
        <Sponsors
          eventSponsors={[
            {
              image: '/img/logos/asyncapi-logo--white.png',
              websiteUrl: 'https://www.asyncapi.com',
            },
          ]}
          // financialSponsor={[{image:"/img/graviteeio.svg" , websiteUrl: "https://www.gravitee.io/",className:"w-[250px] h-[50px]" } , {image:"/img/postman.png" ,websiteUrl:"https://www.postman.com/",className:"w-[240px] h-[70px]"}]}
        />
      </div>
    </div>
  );
}
