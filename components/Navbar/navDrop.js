import React, { useState, forwardRef } from 'react';
import links from '../../config/links.json'; // Your link data
import Link from 'next/link';
import Dropdown from '../illustration/dropdown';

const NavDrop = forwardRef((props, ref) => {
  const { setDrop } = props;
  const [show, setShow] = useState(null); // Track which submenu is open
  
  // Toggle the dropdown for a particular menu
  const toggleDropdown = (linkTitle) => {
    setShow(show === linkTitle ? null : linkTitle); // Toggle open/close
  };

  return (
    <div ref={ref} className="absolute ml-[-20px] top-16 w-full bg-[#1B1130]">
      <div className="flex flex-col p-5 pb-8 w-full">
        {links.map((link) => (
          <Link href={link.ref} key={link.title}>
            <div className="min-h-[50px] cursor-pointer">
              <div
                className="flex items-center justify-between"
                onClick={() => toggleDropdown(link.title)}
              >
                <div className="text-white">{link.title}</div>
                {link.subMenu && (
                  <Dropdown
                    className={`transition-transform duration-700 ${
                      show === link.title ? 'rotate-0' : 'rotate-[-90deg]'
                    }`}
                  />
                )}
              </div>

              {/* Display submenu if it is open */}
              {show === link.title && link.subMenu && (
                <div className="flex flex-col py-6 w-full">
                  {link.subMenu.map((sub) => (
                    <Link href={sub.ref} key={sub.ref}>
                      <div
                        onClick={() => setDrop(false)} // Close the menu when a sub-link is clicked
                        className="h-[40px] flex navbg items-center p-6 hover:text-black text-white cursor-pointer"
                      >
                        {sub.title}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
});

NavDrop.displayName = 'NavDrop';

export default NavDrop;
