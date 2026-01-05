import Link from 'next/link';
import Dropdown from '../illustration/dropdown';
import { useState, useEffect, useRef, useCallback, JSX } from 'react';
import { useRouter } from 'next/router';
import links from '../../config/links.json';
import NavDrop from './navDrop';
import Hamburger from '../illustration/hamburger';
import { useMediaQuery } from 'react-responsive';
import Cancel from '../illustration/cancel';
import Image from 'next/image';
import { LinkItem } from '../../types/types';

function Navbar(): JSX.Element {
  const router = useRouter();
  const isTablet = useMediaQuery({ maxWidth: '1118px' });
  const [drop, setDrop] = useState<boolean>(false);
  const [show, setShow] = useState<string | null>(null);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState<boolean>(false);
  const [focusedSubMenuItem, setFocusedSubMenuItem] = useState<number>(-1);
  const [activeSection, setActiveSection] = useState<string>('about');
  const menuRef = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const subMenuRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  //TODO: Refactor Navbar Code
  let closeTimeout = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const handleClosing = useCallback(
    (event: MouseEvent) => {
      const target = event.target as Element;
      if (show && !target.closest('.subMenu')) {
        setShow(null);
        setFocusedSubMenuItem(-1);
      }
    },
    [show]
  );

  useEffect(() => {
    document.addEventListener('mousedown', handleClosing);
    return () => {
      document.removeEventListener('mousedown', handleClosing);
    };
  }, [handleClosing]);

  const handleCloseMenu = (event: MouseEvent) => {
    const target = event.target as Element;
    if (menuRef.current && !menuRef.current.contains(target)) {
      setDrop(false);
    }
    if (svg.current && event.target === svg.current) {
      setDrop(true);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleCloseMenu);
    return () => {
      document.removeEventListener('click', handleCloseMenu);
    };
  }, [menuRef]);

  // Scroll spy for active section detection
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['about', 'speakers', 'tickets', 'sponsors'];
      const scrollPosition = window.scrollY + 150; // Offset for navbar height

      // Default to first section if at top of page
      if (window.scrollY < 100) {
        setActiveSection('about');
        return;
      }

      // Find which section is currently in view
      for (let i = sections.length - 1; i >= 0; i--) {
        const sectionId = sections[i];
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop } = element;
          if (scrollPosition >= offsetTop) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check on mount

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (title: string): void => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setShow(title);
  };

  const handleMouseLeave = (): void => {
    closeTimeout.current = setTimeout(() => {
      if (!isSubMenuHovered) {
        setShow(null);
        setFocusedSubMenuItem(-1);
      }
    }, 300);
  };

  const handleSubMenuEnter = (): void => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }
    setIsSubMenuHovered(true);
  };

  const handleSubMenuLeave = (): void => {
    setIsSubMenuHovered(false);
    setShow(null);
    setFocusedSubMenuItem(-1);
  };

  // Helper function to extract section ID from href
  const getSectionId = (href: string): string => {
    if (href.startsWith('/#')) {
      return href.substring(2); // Remove /# prefix
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
    <div className="relative">
      <div
        className={`container flex justify-center fixed items-center w-full backdrop-blur ${drop && 'bg-[#1B1130]/90'} top-0 z-[99] text-white`}
      >
        <div className="p-5 flex justify-between h-[75px] w-full items-center">
          <div
            className="flex items-center sm:justify-between sm:w-full z-[99]"
            data-test="nav-Home"
          >
            <Link href="/">
              <div className="flex items-center cursor-pointer">
                <Image
                  src="/img/logos/2025-logo.png"
                  alt="conference logo"
                  width={150}
                  height={33}
                />
              </div>
            </Link>
          </div>
          {isTablet ? (
            <div data-test="nav-Hamberger" className="z-[99]">
              {drop ? (
                <button>
                  <Cancel />
                </button>
              ) : (
                <button>
                  <Hamburger ref={svg} />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              {links.map((link: LinkItem) => (
                <div key={link.title}>
                  <div
                    onMouseEnter={() => handleMouseEnter(link.title)}
                    onMouseLeave={handleMouseLeave}
                    className="ml-16 text-[14px] group cursor-pointer relative flex flex-col"
                    data-test={`nav-${link.title}`}
                  >
                    <div>
                      {link.subMenu ? (
                        <button
                          className="flex items-center focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50 rounded px-1 py-1"
                          onClick={() => setShow(show === link.title ? null : link.title)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              setShow(show === link.title ? null : link.title);
                              if (show !== link.title) {
                                setFocusedSubMenuItem(0);
                                setTimeout(() => {
                                  subMenuRefs.current[0]?.focus();
                                }, 50);
                              }
                            }
                            if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              setShow(link.title);
                              setFocusedSubMenuItem(0);
                              setTimeout(() => {
                                subMenuRefs.current[0]?.focus();
                              }, 50);
                            }
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              setShow(link.title);
                              const lastIndex = link.subMenu!.length - 1;
                              setFocusedSubMenuItem(lastIndex);
                              setTimeout(() => {
                                subMenuRefs.current[lastIndex]?.focus();
                              }, 50);
                            }
                            if (e.key === 'Escape') {
                              setShow(null);
                              setFocusedSubMenuItem(-1);
                            }
                          }}
                          aria-expanded={show === link.title}
                          aria-haspopup="true"
                        >
                          {link.title}{' '}
                          {link.subMenu && (
                            <Dropdown
                              fill="white"
                              className={`ml-2 transition-transform duration-700 ${show === link.title ? 'rotate-180' : 'rotate-0'
                                }`}
                            />
                          )}
                        </button>
                      ) : (
                        <Link
                          href={link.ref}
                          className={`transition-all ${isLinkActive(link.ref) ? 'font-bold' : ''}`}
                        >
                          {link.title}
                        </Link>
                      )}
                    </div>
                    {isLinkActive(link.ref) ? (
                      // Show permanent underline when active
                      <>
                        <span className="absolute -bottom-1 left-1/2 w-3/6 h-0.5 bg-white"></span>
                        <span className="absolute -bottom-1 right-1/2 w-3/6 h-0.5 bg-white"></span>
                      </>
                    ) : (
                      // Show hover underline when inactive
                      <>
                        <span className="after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>
                        <span className="after:absolute after:-bottom-1 after:right-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>
                      </>
                    )}
                    {show === link.title && link.subMenu && (
                      <div
                        className="subMenu absolute z-[9] mt-8 min-w-[150px] whitespace-nowrap rounded-md left-[-15px] gradient-bg px-2 py-1 flex flex-col justify-center space-y-0"
                        onMouseEnter={handleSubMenuEnter}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        {link.subMenu.map((subL: LinkItem, index: number) => (
                          <Link
                            href={subL.ref}
                            key={subL.title}
                            rel="noopener noreferrer"
                            ref={(el) => {
                              subMenuRefs.current[index] = el;
                            }}
                            className={`flex items-center ${link.subMenu!.length === 1 ? 'justify-center' : 'justify-start'} min-h-[32px] text-[16px] hover:scale-95 hover:translate-x-1 transition-all focus:outline-none focus:bg-white focus:bg-opacity-20 focus:scale-95 focus:translate-x-1 rounded px-2 py-1`}
                            data-test={`nav-sub-${subL.title}`}
                            onKeyDown={(e) => {
                              const currentIndex = index;
                              const maxIndex = link.subMenu!.length - 1;

                              if (e.key === 'ArrowDown') {
                                e.preventDefault();
                                const nextIndex = currentIndex === maxIndex ? 0 : currentIndex + 1;
                                setFocusedSubMenuItem(nextIndex);
                                subMenuRefs.current[nextIndex]?.focus();
                              }

                              if (e.key === 'ArrowUp') {
                                e.preventDefault();
                                const prevIndex = currentIndex === 0 ? maxIndex : currentIndex - 1;
                                setFocusedSubMenuItem(prevIndex);
                                subMenuRefs.current[prevIndex]?.focus();
                              }

                              if (e.key === 'Escape') {
                                e.preventDefault();
                                setShow(null);
                                setFocusedSubMenuItem(-1);
                                // Focus back to the main menu button
                                const button = e.currentTarget.closest('.subMenu')?.parentElement?.querySelector('button');
                                (button as HTMLButtonElement)?.focus();
                              }

                              if (e.key === 'Tab') {
                                setShow(null);
                                setFocusedSubMenuItem(-1);
                              }
                            }}
                          >
                            {subL.title}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          {isTablet && (
            <div
              className={`fixed inset-0 z-[98] bg-[#1B1130]/90 backdrop-blur-md transition-all duration-500 ${drop
                ? 'opacity-100'
                : 'opacity-0 -translate-y-full pointer-events-none'
                }`}
            >
              {drop && <NavDrop setDrop={setDrop} activeSection={activeSection} ref={menuRef} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
