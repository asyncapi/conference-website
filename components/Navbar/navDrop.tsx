import React, {
  useState,
  forwardRef,
  Dispatch,
  SetStateAction,
  JSX,
} from 'react';
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { LinkItem } from '../../types/types';
import { isExternalUrl, resolveCfpUrl } from '../../utils/pretalx';
import { links } from '../../config/navigation';
import { usePathname } from 'next/navigation';
import { useSectionTracker } from '../../hooks/useSectionTracker';

interface INavDropProp {
  setDrop: Dispatch<SetStateAction<boolean>>;
}

const NavDrop = forwardRef<HTMLDivElement, INavDropProp>(
  ({ setDrop }, ref): JSX.Element => {
    const [show, setShow] = useState<string | null>(null);
    const pathname = usePathname();
    const { isActive } = useSectionTracker(pathname);

    return (
      <div
        ref={ref}
        className="z-[99] absolute left-0 top-[74px] w-full h-screen bg-[#1B1130]/90 backdrop-filter backdrop-blur-md"
      >
        <div className="flex flex-col p-5 pb-8 w-full">
          {links.map((link: LinkItem) => {
            const resolvedCfpRef = resolveCfpUrl(link.ref);
            const resolvedRef =
              link.ref === 'pretalx'
                ? resolvedCfpRef
                : (resolvedCfpRef ?? link.ref);

            if (!link.subMenu && link.ref === 'pretalx' && !resolvedCfpRef) {
              return null;
            }

            return (
              <Link
                href={resolvedRef || '#'}
                key={link.title}
                target={isExternalUrl(resolvedRef) ? '_blank' : undefined}
                rel={isExternalUrl(resolvedRef) ? 'noreferrer' : undefined}
              >
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
                        <div
                          className={`text-white ${isActive(link) ? 'font-semibold border-l-2 border-[#C6BED9] pl-2 text-[#C6BED9]' : ''}`}
                        >
                          {link.title}
                        </div>
                        <Dropdown
                          fill="white"
                          className={`ml-2 transition-transform duration-500 ${
                            show === link.title ? 'rotate-180' : 'rotate-0'
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
                                className={`h-[40px] flex navbg items-center p-6 hover:text-black text-white cursor-pointer ${
                                  pathname === sub.ref
                                    ? 'font-semibold bg-white/10 text-[#C6BED9]'
                                    : ''
                                }`}
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
                      className={`text-white ${
                        isActive(link)
                          ? 'font-semibold border-l-2 border-[#C6BED9] pl-2 text-[#C6BED9]'
                          : ''
                      }`}
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
