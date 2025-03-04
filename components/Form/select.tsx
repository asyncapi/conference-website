import React, { useState, useEffect } from "react";
import Select from "react-select";

const customStyles = {
  option: (provided: any, state: any) => ({
    ...provided,
    color: state.isSelected ? "white" : "black",
    background: state.isSelected && "#E50E99",
    padding: 10,
  }),
  multiValue: () => ({
    whiteSpace: "nowrap",
    overflow: "hidden",
    background: "white",
    textOverflow: "ellipsis",
    width: "150px",
    display: "flex",
  }),
  control: (_: any, { selectProps: { width } }: { width: number, selectProps: any }) => ({
    // none of react-select's styles are passed to <Control />
    display: "flex",
    padding: "10px",
    borderRadius: "5px",
    background: "#2e2344",
    border: "1px solid #E50E99",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";

    return { ...provided, opacity, transition, color };
  },
};

function Dropdown({ options, title, setValue, multi ,dataTest}: { options: any, title: {value: string, label: string}, setValue: any, multi: boolean, dataTest: string }) {
  const [selectedOption, setSelectedOption] = useState<{value: string, label: string}>(title);
  useEffect(() => {
    if (multi && Array.isArray(selectedOption)) {
      const newValue: any[] = [];
      selectedOption.map((option: any ) => {
        newValue.push(option.value);
      });
      setValue(newValue)
    } else {
      setValue(selectedOption.value);
    }
  }, [selectedOption, multi, setValue]);
  return (
    <div className="relative inline-block w-full">
      <Select
      className={`${dataTest || ""}`}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={options}
        isMulti={multi}
      />
    </div>
  );
}

export default Dropdown;