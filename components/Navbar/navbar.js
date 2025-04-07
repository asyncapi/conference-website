import Link from "next/link";
import Dropdown from "../illustration/dropdown";
import { useState, useEffect, useRef, useCallback } from "react";
import links from "../../config/links.json";
import NavDrop from "./navDrop";
import Hamburger from "../illustration/hamburger";
import { useMediaQuery } from "react-responsive";
import Cancel from "../illustration/cancel";
import Image from "next/image";

function Navbar() {
  const isTablet = useMediaQuery({ maxWidth: "1118px" });
  const [drop, setDrop] = useState(false);
  const [show, setShow] = useState(null);
  const [isSubMenuHovered, setIsSubMenuHovered] = useState(false);
  const menuRef = useRef(null);
  const svg = useRef(null);
  let closeTimeout = useRef(null);

  const handleClosing = useCallback(
    (event) => {
      if (show && !event.target.closest(".subMenu")) {
        setShow(null);
      }
    },
    [show],
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClosing);
    return () => {
      document.removeEventListener("mousedown", handleClosing);
    };
  }, [handleClosing]);

  const handleCloseMenu = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setDrop(false);
    }
    if (svg.current && event.target === svg.current) {
      setDrop(true);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleCloseMenu);
    return () => {
      document.removeEventListener("click", handleCloseMenu);
    };
  }, [menuRef]);

  const handleMouseEnter = (title) => {
    clearTimeout(closeTimeout.current);
    setShow(title);
  };

  const handleMouseLeave = () => {
    closeTimeout.current = setTimeout(() => {
      if (!isSubMenuHovered) {
        setShow(null);
      }
    }, 300);
  };

  const handleSubMenuEnter = () => {
    clearTimeout(closeTimeout.current);
    setIsSubMenuHovered(true);
  };

  const handleSubMenuLeave = () => {
    setIsSubMenuHovered(false);
    setShow(null);
  };

  return (
    <div className="relative">
      <div
        className={`container flex justify-center fixed items-center w-full backdrop-blur ${drop && "bg-[#1B1130]/90"} top-0 z-[99] text-white`}
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
              {links.map((link) => (
                <div href={link.ref} key={link.title}>
                  <div
                    onMouseEnter={() => handleMouseEnter(link.title)}
                    onMouseLeave={handleMouseLeave}
                    className="ml-16 text-[14px] group cursor-pointer relative flex flex-col"
                    data-test={`nav-${link.title}`}
                  >
                    <div>
                      {link.subMenu ? (
                        <div className="flex items-center">
                          {link.title}{" "}
                          {link.subMenu && (
                            <Dropdown
                              color="white"
                              className={`ml-2 transition-transform duration-700 ${
                                show === link.title ? "rotate-180" : "rotate-0"
                              }`}
                            />
                          )}
                        </div>
                      ) : (
                        <Link href={link.ref}>{link.title}</Link>
                      )}
                    </div>
                    <span className="after:absolute after:-bottom-1 after:left-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6  "></span>
                    <span className="after:absolute after:-bottom-1 after:right-1/2 after:w-0 after:transition-all after:h-0.5 after:bg-white after:group-hover:w-3/6"></span>
                    {show === link.title && link.subMenu && (
                      <div
                        className="subMenu absolute z-[9] mt-8 min-w-[150px] whitespace-nowrap rounded-md left-[-15px] gradient-bg px-2 py-1 flex flex-col justify-center space-y-0"
                        onMouseEnter={handleSubMenuEnter}
                        onMouseLeave={handleSubMenuLeave}
                      >
                        {link.subMenu.map((subL) => (
                          <Link
                            href={subL.ref}
                            target={subL.target}
                            key={subL.title}
                            rel="noopener noreferrer"
                          >
                            <div
                              className={`flex items-center ${link.subMenu.length === 1 ? "justify-center" : "justify-start"} min-h-[32px] text-[16px] hover:scale-95 hover:translate-x-1 transition-all`}
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
          {isTablet && (
            <div
              className={`fixed inset-0 z-[98] bg-[#1B1130]/90 backdrop-blur-md transition-all duration-500 ${drop ? "opacity-100" : "opacity-0 -translate-y-full pointer-events-none"
                }`}
            >
              {drop && <NavDrop setDrop={setDrop} ref={menuRef} />}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
