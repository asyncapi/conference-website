import React, { useState, forwardRef } from "react";
import links from "../../config/links.json";
import Link from "next/link";
import Dropdown from "../illustration/dropdown";

const NavDrop = forwardRef((props, ref) => {
  const { setDrop } = props;
  const [show, setShow] = useState(null);
  return (
    <div ref={ref} className="absolute ml-[-20px] top-16 w-full bg-[#1B1130]">
      <div className="flex flex-col p-5 pb-8 w-full">
        {links.map((link) => {
          return (
            <Link href={link.ref} key={link.title}>
              <div
                className="min-h-[50px] cursor-pointer"
                onClick={() =>
                  show === link.title ? setShow(null) : setShow(link.title)
                }
              >
                {link.subMenu ? (
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="text-white">{link.title}</div>
                      <Dropdown
                        className={`transition-transform duration-700 ${
                          show === link.title ? "rotate-0" : "rotate-[-90deg]"
                        }`}
                      />
                    </div>
                    {show && show === link.title && (
                      <div className="flex flex-col py-6 w-full">
                        {link.subMenu.map((sub) => (
                          <Link href={sub.ref} key={sub.ref}>
                            <div
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
                  <div className="text-white" onClick={() => setDrop(false)}>
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
});
NavDrop.displayName = "NavDrop";

export default NavDrop;
