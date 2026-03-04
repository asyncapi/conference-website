import React, {
  useState,
  forwardRef,
  Dispatch,
  SetStateAction,
  JSX,
} from 'react';
import links from '../../config/links.json';
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { LinkItem } from '../../types/types';

interface INavDropProp {
  setDrop: Dispatch<SetStateAction<boolean>>;
}

const NavDrop = forwardRef<HTMLDivElement, INavDropProp>(
  ({ setDrop }, ref): JSX.Element => {
    const [show, setShow] = useState<string | null>(null);
    return (
      <div
        ref={ref}
        className="z-[99] absolute left-0 top-[74px] w-full h-screen bg-transparent"
      >
        <div className="flex flex-col p-8 pb-8 w-full">
          {links.map((link: LinkItem) => {
            return (
              <Link href={link.ref || '#'} key={link.title}>
                <div
                  className="min-h-[60px] cursor-pointer border-b border-white/10"
                  data-test={`nav-${link.title}`}
                  onClick={(e) =>
                    show === link.title ? setShow(null) : setShow(link.title)
                  }
                >
                  {link.subMenu ? (
                    <div>
                      <div
                        className="flex items-center py-4"
                        onClick={(e) => e.preventDefault()}
                      >
                        <div className="text-white text-xl font-semibold">{link.title}</div>
                        <Dropdown
                          fill="white"
                          className={`ml-2 transition-transform duration-500 ${show === link.title ? 'rotate-180' : 'rotate-0'
                            }`}
                        />
                      </div>
                      {show && show === link.title && (
                        <div className="flex flex-col pb-4 w-full space-y-2">
                          {link.subMenu.map((sub) => (
                            <Link href={sub.ref} key={sub.ref}>
                              <div
                                data-test={`nav-sub-${sub.title}`}
                                onClick={() => setDrop(false)}
                                className="h-[50px] flex items-center px-6 py-3 rounded-lg text-white text-lg font-medium hover:bg-gradient-to-r hover:from-blue-500/30 hover:to-purple-500/30 hover:translate-x-2 transition-all cursor-pointer"
                              >
                                {sub.title}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-white text-xl font-semibold py-4" onClick={() => setDrop(false)}>
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
