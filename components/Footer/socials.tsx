import { JSX } from 'react';
import LinkedIn from '../illustration/Socials/LinkedIn';
import Github from '../illustration/Socials/Github';
import X from '../illustration/Socials/X';
import Youtube from '../illustration/Socials/Youtube';

const socials = [
  {
    name: 'LinkedIn',
    href: 'https://www.linkedin.com/company/asyncapi',
    icon: LinkedIn,
    iconHoverClass: 'hover:bg-[#0077b5] hover:text-white',
    tooltipHoverClass: 'group-hover:bg-[#0077b5]',
    itemTest: 'footer-icon-linkedin',
    linkTest: 'footer-Linkedin',
    tooltipTest: 'footer-tooltip-linkedin',
  },
  {
    name: 'GitHub',
    href: 'https://github.com/asyncapi',
    icon: Github,
    iconHoverClass: 'hover:bg-[#333] hover:text-white',
    tooltipHoverClass: 'group-hover:bg-[#333]',
    itemTest: 'footer-icon-github',
    linkTest: 'footer-Github',
    tooltipTest: 'footer-tooltip-github',
  },
  {
    name: 'Twitter',
    href: 'https://x.com/asyncapispec',
    icon: X,
    iconHoverClass: 'hover:bg-[#333] hover:text-white',
    tooltipHoverClass: 'group-hover:bg-[#333]',
    itemTest: 'footer-icon-twitter',
    linkTest: 'footer-Twitter(X)',
    tooltipTest: 'footer-tooltip-twitter',
  },
  {
    name: 'YouTube',
    href: 'https://www.youtube.com/asyncapi',
    icon: Youtube,
    iconHoverClass: 'hover:bg-[#ff0000] hover:text-white',
    tooltipHoverClass: 'group-hover:bg-[#ff0000]',
    itemTest: 'footer-icon-youtube',
    linkTest: 'footer-youtube',
    tooltipTest: 'footer-tooltip-youtube',
  },
];

function Socials(): JSX.Element {
  return (
    <ul className="inline-flex list-none justify-center space-x-2" data-test="social-wrapper">
      {socials.map(
        ({ name, href, icon: Icon, iconHoverClass, tooltipHoverClass, itemTest, linkTest, tooltipTest }) => (
          <li
            key={name}
            className={`group relative bg-white rounded-full size-9 flex justify-center items-center cursor-pointer transition-all duration-200 ${iconHoverClass}`}
            data-test={itemTest}
          >
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="w-full h-full flex justify-center items-center"
              data-test={linkTest}
            >
              <span
                className={`absolute -top-11 left-1/2 -translate-x-1/2 text-sm p-2 rounded-md  opacity-0 pointer-events-none transition-all duration-300 whitespace-nowrap group-hover:opacity-100 group-hover:pointer-events-auto ${tooltipHoverClass}`}
                data-test={tooltipTest}
              >
                {name}
              </span>
              <Icon className="h-[1em]" fill="currentColor" />
            </a>
          </li>
        )
      )}
    </ul>
  );
}

export default Socials;