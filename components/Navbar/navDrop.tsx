import React, {
  useState,
  forwardRef,
  Dispatch,
  SetStateAction,
  JSX,
} from 'react';
import { useRouter } from 'next/router';
import links from '../../config/links.json';
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { LinkItem } from '../../types/types';

interface INavDropProp {
  setDrop: Dispatch<SetStateAction<boolean>>;
  activeSection: string;
}

const NavDrop = forwardRef<HTMLDivElement, INavDropProp>(
  ({ setDrop, activeSection }, ref): JSX.Element => {
    const router = useRouter();
    const [show, setShow] = useState<string | null>(null);

    // Helper function to extract section ID from href
    const getSectionId = (href: string): string => {
      if (href.startsWith('/#')) {
        return href.substring(2);
      }
      return '';
    };

    // Helper function to check if link is active
    const isLinkActive = (href: string): boolean => {
      // Check if it's a hash-based link (section on homepage)
      const sectionId = getSectionId(href);
      if (sectionId !== '') {
        return sectionId === activeSection;
      }

      // Check if it's a route-based link (different page like /editions)
      if (href.startsWith('/') && !href.startsWith('/#')) {
        return router.pathname === href;
      }

      return false;
    };

    return (
      <div
        ref={ref}
        className="z-[99] absolute left-0 top-[74px] w-full h-screen bg-[#1B1130]/90 backdrop-filter backdrop-blur-md"
      >
        <div className="flex flex-col p-5 pb-8 w-full">
          {links.map((link: LinkItem) => {
            return (
              <Link href={link.ref || '#'} key={link.title}>
                <div
                  className="min-h-[50px] cursor-pointer"
                  data-test={`nav-${link.title}`}
                  onClick={(e) =>
                    show === link.title ? setShow(null) : setShow(link.title)
                  }
                >
                  {link.subMenu ? (
                    <div>
                      <div
                        className="flex items-center"
                        onClick={(e) => e.preventDefault()}
                      >
                        <div className="text-white">{link.title}</div>
                        <Dropdown
                          fill="white"
                          className={`ml-2 transition-transform duration-500 ${show === link.title ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </div>
                      {show && show === link.title && (
                        <div className="flex flex-col py-6 w-full">
                          {link.subMenu.map((sub) => (
                            <Link href={sub.ref} key={sub.ref}>
                              <div
                                data-test={`nav-sub-${sub.title}`}
                                onClick={() => setDrop(false)}
                                className="h-[40px] flex navbg items-center p-6 hover:text-black text-white cursor-pointer"
                              >
                                {sub.title}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div
                      className={`text-white ${isLinkActive(link.ref) ? 'font-bold' : ''}`}
                      onClick={() => setDrop(false)}
                    >
                      {link.title}
                    </div>
                  )}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    );
  }
);
NavDrop.displayName = 'NavDrop';

export default NavDrop;
