import React, { useState, useRef, useEffect, SetStateAction, JSX } from 'react';

interface IDropdown<T> {
  selectedItem: T | null;
  items: T[];
  onSelect: (item: T) => void;
  getDisplayValue: (item: T | null) => string;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
}

function Dropdown<T>({
  selectedItem,
  items,
  onSelect,
  getDisplayValue,
  placeholder = "Select an option",
  className = "",
  disabled = false,
}: IDropdown<T>): JSX.Element {
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

  const handleItemSelect = (item: T) => {
    onSelect(item);
    setShow(false);
  };

  const displayValue = getDisplayValue(selectedItem) || placeholder;

  return (
    <div className={`relative inline-block w-full ${className}`} ref={dropdownRef}>
      <div className="w-full">
        <button
          type="button"
          className={`flex justify-between text-white p-4 w-full gap-x-1.5 shadow-sm card-bg hover:bg-gray-50 gradient-bg no-border rounded-md ${
            disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'
          }`}
          id="menu-button"
          aria-expanded={show}
          aria-haspopup="true"
          onClick={() => !disabled && setShow(!show)}
          disabled={disabled}
        >
          <div>{displayValue}</div>
          <svg
            className={`-mr-1 h-5 w-5 text-gray-400 transition-transform ${
              show ? 'rotate-180' : ''
            }`}
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

      {show && !disabled && (
        <div
          className="w-full absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className="rounded-md gradient-bg" role="none">
            {items &&
              items.map((item, i) => {
                const displayText = getDisplayValue(item);
                return (
                  <div
                    key={i}
                    onClick={() => handleItemSelect(item)}
                    className={`block p-4 text-md text-white cursor-pointer hover:bg-black/10`}
                    role="menuitem"
                    tabIndex={-1}
                    id={`menu-item-${i}`}
                  >
                    {displayText}
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
