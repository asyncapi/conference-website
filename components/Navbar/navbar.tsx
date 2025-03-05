import Link from "next/link";
import Dropdown from "../illustration/dropdown";
import { useState, useEffect, useRef, useCallback, MouseEvent } from "react";
import links from "../../config/links.json";
import NavDrop from "./navDrop";
import Hamburger from "../illustration/hamburger";
import { useMediaQuery } from "react-responsive";
import Cancel from "../illustration/cancel";
import Image from "next/image";

type LinkType = {
  title: string;
  ref: string;
  subMenu?: SubLinkType[];
};

type SubLinkType = {
  title: string;
  ref: string;
  target?: string;
};

function Navbar() {
  const isTablet = useMediaQuery({ maxWidth: 1118 });
  const [drop, setDrop] = useState<boolean>(false);
  const [show, setShow] = useState<string | null>(null);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const svg = useRef<HTMLButtonElement>(null);
  const closeTimeout = useRef<NodeJS.Timeout | null>(null);

  const handleClosing = useCallback(
    (event: MouseEvent<Document>) => {
      if (show && !(event.target as HTMLElement).closest(".subMenu")) {
        setShow(null);
      }
    },
    [show]
  );

  useEffect(() => {
    const handleClick = (event: MouseEvent<Document>) =>
      handleClosing(event);
    document.addEventListener("mousedown", handleClick as any);
    return () => {
      document.removeEventListener("mousedown", handleClick as any);
    };
  }, [handleClosing]);

  const handleCloseMenu = (event: MouseEvent<Document>) => {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setDrop(false);
    }
    if (svg.current && event.target === svg.current) {
      setDrop(true);
    }
  };

  useEffect(() => {
    const handleClick = (event: MouseEvent<Document>) =>
      handleCloseMenu(event);
    document.addEventListener("click", handleClick as any);
    return () => {
      document.removeEventListener("click", handleClick as any);
    };
  }, []);

  const handleMouseEnter = (title: string) => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setShow(title);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      if (!isSubMenuHovered) setShow(null);
    }, 300);
  };

  const handleSubMenuEnter = () => {
    if (closeTimeout.current) clearTimeout(closeTimeout.current);
    setIsSubMenuHovered(true);
  };

  const handleSubMenuLeave = () => {
    setIsSubMenuHovered(false);
    setShow(null);
  };

  return (
    <div className="relative">
      <div
        className={`container flex justify-center fixed items-center w-full backdrop-blur ${
          drop && "bg-[#1B1130]/90"
        } top-0 z-[99] text-white`}
      >
        <div className="p-5 flex justify-between h-[75px] w-full items-center">
          <div
            className="flex items-center sm:justify-between sm:w-full"
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
            <div data-test="nav-Hamberger">
              {drop ? (
                <button onClick={() => setDrop(false)}>
                  <Cancel />
                </button>
              ) : (
                <button ref={svg} onClick={() => setDrop(true)}>
                  <Hamburger />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center">
              {links.map((link: LinkType) => (
                <div key={link.title}>
                  <div
                    onMouseEnter={() => handleMouseEnter(link.title)}
                    onMouseLeave={handleMouseLeave}
                    className="ml-16 text-[14px] group cursor-pointer relative flex flex-col"
                    data-test={`nav-${link.title}`}
                  >
                    <div>
                      {link.subMenu ? (
                        <div className="flex items-center">
                          {link.title}
                          <Dropdown
                            color="white"
                            className={`ml-2 transition-transform duration-700 ${
                              show === link.title
                                ? "rotate-180"
                                : "rotate-0"
                            }`}
                          />
                        </div>
                      ) : (
                        <Link href={link.ref}>{link.title}</Link>
                      )}
                    </div>

                    <span className="after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>
                    <span className="after:absolute after:-bottom-1 after:right-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>

                    {show === link.title && link.subMenu && (
                      <div
                        className="subMenu absolute z-[9] mt-8 w-[150px] rounded-md left-[-15px] gradient-bg px-2 py-1 flex flex-col justify-center space-y-0"
                        onMouseEnter={handleSubMenuEnter}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        {link.subMenu.map((subL: SubLinkType) => (
                          <Link
                            href={subL.ref}
                            target={subL.target}
                            key={subL.title}
                            rel="noopener noreferrer"
                          >
                            <div
                              className={`flex items-center ${
                                link.subMenu?.length === 1
                                  ? "justify-center"
                                  : "justify-start"
                              } min-h-[32px] text-[16px] hover:scale-95 hover:translate-x-1 transition-all`}
                              data-test={`nav-sub-${subL.title}`}
                            >
                              {subL.title}
                            </div>
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {isTablet && drop && <NavDrop setDrop={setDrop} ref={menuRef} />}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
