import { JSX } from 'react';
import Youtube from '../components/illustration/socials/Youtube';
import X from '../components/illustration/socials/X';
import Github from '../components/illustration/socials/Github';
import LinkedIn from '../components/illustration/socials/LinkedIn';

export interface SocialWithIcon {
  name: string;
  href: string;
  imgUrl: string;
  icon: ({ className, fill }: { className?: string; fill?: string }) => JSX.Element;
}

const socials: SocialWithIcon[] = [
  {
    name: "Github",
    href: "https://github.com/asyncapi",
    imgUrl: "/img/Github.png",
    icon: Github
  },
  {
    name: "Linkedin", 
    href: "https://www.linkedin.com/company/asyncapi/",
    imgUrl: "/img/Linkedln.png",
    icon: LinkedIn
  },
  {
    name: "Twitter(X)",
    href: "https://x.com/asyncapispec",
    imgUrl: "/img/twitter_new.png",
    icon: X
  },
  {
    name: "YouTube",
    href: "https://www.youtube.com/@AsyncAPI",
    imgUrl: "/img/youtube.png",
    icon: Youtube
  }
];

export default socials;