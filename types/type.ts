export interface Sponsor {
    image: string;
    websiteUrl: string;
    className? : string
}

export interface City {
    name: string;
    country: string;
    date: string;
    cfpdate: string;
    description: string;
    img: string;
    address: string;
    map: string;
    sponsors: {
      eventSponsors: Sponsor[];
      financialSponsors?: Sponsor[];
    };
    isFree: boolean;
    ended: boolean;
    cfp: string ;
    playlist: string;
    ticket?: string;
  }

export interface SpeakerCityType {
    city: string;
    location: string;
    lists: SpeakerListType[];
    agenda?: any;
    cfp?: boolean;
  }
  
export interface SpeakerListType {
    name: string;
    title: string;
    img: string;
}