export interface SVGTypes {
  className?: string;
  fill?: string;
}

export interface LinkItem {
  title: string;
  ref: string;
  subMenu?: LinkItem[];
}

export interface EventSponsor {
  image: string;
  websiteUrl: string;
}

export interface Sponsors {
  eventSponsors: EventSponsor[];
}

export interface City {
  name: string;
  country: string;
  date: string;
  cfpDate: string;
  description: string;
  img: string;
  address: string;
  mapUrl: string | undefined;
  sponsors: Sponsors;
  freeEntry: boolean;
  cfp: string | null;
  recordings: string | null;
  playlist: string | null;
}

export enum ConferenceStatus {
  UPCOMING = 'Upcoming',
  ONGOING = 'Ongoing',
  ENDED = 'Ended',
}

export interface SpeakerTypes {
  name: string;
  title: string;
  img: string;
  id: number;
  city: string[];
}

export interface Agenda {
  time: string;
  session: string;
  speaker: number;
}

// {
//     "location": "",
//     "city": "All",
//     "lists": []
//   },
//   {
//     "city": "Singapore",
//     "location": "Singapore, Singapore",
//     "lists": [

//     ],
//     "agenda": [
//       {
//         "time": "11:10 AM SGT - 11:35 AM SGT",
//         "session": "Multi-Protocol Async APIs: Designing a Unified Interface for EDA",
//         "speaker": 2,
//         "type": "Technical Speaker"
//       },
//       {
//         "time": "11:35 AM SGT - 12:00 PM SGT",
//         "session": "The Untapped Potentials of AsyncAPI Studio",
//         "speaker": 3,
//         "type": "Technical Speaker"
//       },
//       {
//         "time": "12:00 PM SGT - 12:25 PM SGT",
//         "session": "Enhancing Kafka Security and Control with Event Gateways",
//         "speaker": 1,
//         "type": "Technical Speaker"
//       },
//       {
//         "time": "12:25 PM SGT - 12:50 PM SGT",
//         "session": "AsyncAPI v3: Streamlining Event-Driven API Design",
//         "speaker": 4,
//         "type": "Technical Speaker"
//       }
//     ]
//   },
//   {
//     "city": "Munich",
//     "location": "Munich, Germany",
//     "lists": [
//       {
//         "name": "Dr. Annegret Junker",
//         "title": "Chief Software Architect at codecentric AG",
//         "img": "/img/speaker-images/paris/Annegret.webp"
//       },
//       {
//         "name": "Naresh Jain",
//         "title": "Founder & CEO at Specmatic",
//         "img": "/img/speaker-images/paris/Naresh.webp"
//       },
//       {
//         "name": "Eduardo Maldonado Fonseca Silva",
//         "title": "Senior Platform Engineer at The LEGO Group",
//         "img": "/img/speaker-images/london/Eduardo.webp"
//       },
//       {
//         "name": "Andreas Habel",
//         "title": "Executive Professional for Enterprise Integration at Schwarz IT KG",
//         "img": "/img/speaker-images/munich/Andreas.webp"
//       },
//       {
//         "name": "Fabrizio Lazzaretti",
//         "title": "Managing Consultant at Wavestone",
//         "img": "/img/speaker-images/munich/Fabrizio.webp"
//       }
//     ],
//     "agenda": null
//   },
//   {
//     "city": "Lagos",
//     "location": "Lagos, Nigeria",
//     "lists": [
//       {
//         "name": "Azeez Elegbede",
//         "title": "Developer Advocate at AsyncAPI Initiative",
//         "img": "/img/speaker-images/lagos/Azeez.webp"
//       },
//       {
//         "name": "Thulisile Sibanda",
//         "title": "Senior Community Manager at AsyncAPI Initiative",
//         "img": "/img/speaker-images/london/Thulisile Sibanda.webp"
//       },
//       {
//         "name": "Prince Onyeanuna",
//         "title": "Technical Writer at Pi Squared",
//         "img": "/img/speaker-images/lagos/Prince.webp"
//       },
//       {
//         "name": "Aishat Muibudeen",
//         "title": "Lead Design Maintainer at AsyncAPI Initiative",
//         "img": "/img/speaker-images/online-conf/Maya.webp"
//       },
//       {
//         "name": "Ezinne Anne Emilia",
//         "title": "Documentation Mentee at AsyncAPI Initiative",
//         "img": "/img/speaker-images/lagos/Ezinne.webp"
//       }
//     ],
//     "agenda": null
//   },
//   {
//     "city": "London",
//     "location": "London, UK",
//     "lists": [],
//     "agenda": null
//   },
//   {
//     "city": "Bangalore",
//     "location": "Bangalore, India",
//     "lists": [],
//     "agenda": null
//   },
//   {
//     "city": "Online",
//     "location": "AsyncAPI YouTube Channel",
//     "lists": [],
//     "agenda": null
//   },
//   {
//     "city": "Paris",
//     "location": "Paris, France",
//     "lists": [],
//     "agenda": null
//   }
// ]
