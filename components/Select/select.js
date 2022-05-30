import React, { useState, useEffect } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    background: state.isSelected && "#E50E99",
    padding: 10,
  }),
  control: () => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    padding: "10px",
    borderRadius: "5px",
    background: "#2e2344",
    color: "green",
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";

    return { ...provided, opacity, transition };
  },
};

function Dropdown({ options, title, setValue, multi }) {
  const [selectedOption, setSelectedOption] = useState(title);
  useEffect(() => {
    if (multi && Array.isArray(selectedOption)) {
      const newValue = [];
      selectedOption.map((option) => {
        newValue.push(option.value);
      });
      setValue(newValue)
    } else {
      setValue(selectedOption.value);
    }
  }, [selectedOption]);
  return (
    <div className="relative inline-block w-full">
      <Select
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti={multi}
      />
      {/* <div className="w-full">
        <button
          onClick={() => {
            if (show) {
              setShow(false);
            } else {
              setShow(true);
            }
          }}
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-tetiary-pink shadow-sm p-4 bg-dark-paint font-medium text-fainted-white hover:bg-tetiary-pink hover:text-white focus:outline-none focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500"
          id="menu-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          {active ? active : title}
          <svg
            className={`-mr-1 ml-2 h-5 w-5 ${show && "rotate-180"}`}
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
      <div
        className="origin-top-right absolute right-0 mt-2 w-full rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none"
        role="menu"
        aria-orientation="vertical"
        aria-labelledby="menu-button"
        tabIndex="-1"
      >
        {show && (
          <div className="py-1" role="none">
            {options.map((option) => {
              return (
                <a
                  key={option}
                  onClick={() => {
                    setActive(option);
                    setShow(false);
                    setValue(option);
                  }}
                  className={`text-gray-700 cursor-pointer hover:bg-tetiary-pink hover:text-white block px-4 py-2 text-sm ${
                    active === option && "bg-tetiary-pink text-white"
                  }`}
                  role="menuitem"
                  tabIndex="-1"
                  id="menu-item-0"
                >
                  {option}
                </a>
              );
            })}
          </div>
        )}
      </div> */}
    </div>
  );
}

export default Dropdown;
