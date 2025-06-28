import React, { useState, useRef, useEffect, SetStateAction } from 'react';
import { City } from '../../types/types';

interface IDropdown {
  city: Partial<City>;
  cities: City[];
  setCity: React.Dispatch<SetStateAction<Partial<City>>>;
  handleSpeakers: (arg0: string) => void;
}

function Dropdown({
  city,
  cities,
  setCity,
  handleSpeakers,
}: IDropdown): JSX.Element {
  const [show, setShow] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    //  This checks if the click event occurred outside the dropdown, if true we closes the dropdown.
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <div className="relative inline-block w-full" ref={dropdownRef}>
      <div className="w-full">
        <button
          type="button"
          className="flex justify-between text-white p-4 w-full gap-x-1.5 shadow-sm card-bg hover:bg-gray-50 gradient-bg no-border rounded-md"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setShow(!show)}
        >
          <div>{typeof city === 'string' ? city : city.name}</div>
          <svg
            className="-mr-1 h-5 w-5 text-gray-400"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {show && (
        <div
          className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="rounded-md gradient-bg" role="none">
            {cities &&
              cities.map((item) => {
                return (
                  <div
                    key={item.name}
                    onClick={() => {
                      setCity(item);
                      handleSpeakers(item.name);
                      setShow(false);
                    }}
                    className={`block p-4 text-md text-white cursor-pointer hover:bg-black/10`}
                    role="menuitem"
                    tabIndex={-1}
                    id="menu-item-0"
                  >
                    {item.name}
                  </div>
                );
              })}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dropdown;
