import React, { useState, useEffect } from "react";
import Select, { SingleValue, MultiValue } from "react-select";

interface Option {
  label: string;
  value: string;
}

interface DropdownProps {
  options: Option[];
  title: Option;
  setValue: (value: string | string[]) => void;
  multi: boolean;
}

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
  control: (_ : any, { selectProps: { width } }: any) => ({
    display: "flex",
    padding: "10px",
    borderRadius: "5px",
    background: "#2e2344",
    border: "2px solid #E50E99",
  }),
  singleValue: (provided: any, state: any) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = "opacity 300ms";
    const color = "white";

    return { ...provided, opacity, transition, color };
  },
};

const Dropdown: React.FC<DropdownProps> = ({ options, title, setValue, multi }) => {
  const [selectedOption, setSelectedOption] = useState<SingleValue<Option> | MultiValue<Option>>(title);

  useEffect(() => {
    if (multi && Array.isArray(selectedOption)) {
      const newValue = selectedOption.map((option) => option.value);
      setValue(newValue);
    } else if (selectedOption) {
      setValue((selectedOption as SingleValue<Option>)!.value);
    }
  }, [multi, selectedOption, setValue]);

  const handleChange = (newValue: SingleValue<Option> | MultiValue<Option>) => {
    setSelectedOption(newValue);
  };

  return (
    <div className="relative inline-block w-full">
      <Select
        styles={customStyles}
        value={selectedOption}
        onChange={handleChange}
        options={options}
        isMulti={multi}
      />
    </div>
  );
}

export default Dropdown;
