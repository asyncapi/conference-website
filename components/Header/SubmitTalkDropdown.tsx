'use client';

import Link from 'next/link';
import { useEffect, useRef, useState, JSX } from 'react';
import Button from '../Buttons/button';
import DropdownIcon from '../illustration/dropdown';
import { cities } from '../../config/conference-data';
import {
  getOpenCfpVenues,
  getVenueDisplayName,
  getVenuePageUrl,
} from '../../utils/open-cfp';

function SubmitTalkDropdown(): JSX.Element | null {
  const openVenues = getOpenCfpVenues(cities);
  const [show, setShow] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (openVenues.length === 0) {
    return null;
  }

  return (
    <div className="relative" ref={containerRef}>
      <Button
        type="button"
        className="w-64"
        test="submit-talk-dropdown"
        onClick={() => setShow((isOpen) => !isOpen)}
        text={
          <span className="flex items-center justify-center gap-2">
            Submit a Talk
            <DropdownIcon
              fill="white"
              className={`transition-transform duration-300 ${
                show ? 'rotate-180' : 'rotate-0'
              }`}
            />
          </span>
        }
      />
      {show && (
        <div
          className="absolute z-10 mt-2 w-full min-w-64 rounded-md gradient-bg shadow-lg py-1"
          role="menu"
        >
          {openVenues.map((city) => (
            <Link
              key={city.name}
              href={getVenuePageUrl(city)}
              role="menuitem"
              className="block px-4 py-3 text-white hover:bg-white/10 text-sm transition-colors"
              data-test={`submit-talk-${city.name}`}
              onClick={() => setShow(false)}
            >
              {getVenueDisplayName(city)}
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}

export default SubmitTalkDropdown;
