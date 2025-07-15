import React, { useState, useEffect, JSX } from 'react';
import Select, { MultiValue, StylesConfig } from 'react-select';
import { SelectOptions } from '../../types/types';

const customStyles: StylesConfig<Partial<SelectOptions>, true> = {
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? 'white' : 'black',
    background: state.isSelected ? '#E50E99' : undefined,
    padding: 10,
  }),
  multiValue: () => ({
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    background: 'white',
    textOverflow: 'ellipsis',
    width: '150px',
    display: 'flex',
  }),
  control: () => ({
    display: 'flex',
    padding: '10px',
    borderRadius: '5px',
    background: '#2e2344',
    border: '1px solid #E50E99',
  }),
  singleValue: (provided, state) => {
    const opacity = state.isDisabled ? 0.5 : 1;
    const transition = 'opacity 300ms';
    const color = 'white';

    return { ...provided, opacity, transition, color };
  },
};

interface SelectDropDownProps {
  options: SelectOptions[];
  setValue: (val: string) => void;
  multi: undefined;
  dataTest: string;
}

function SelectDropdown({
  options,
  setValue,
  multi,
  dataTest,
}: SelectDropDownProps): JSX.Element {
  const [selectedOption, setSelectedOption] = useState<Partial<SelectOptions>>(
    {}
  );
  useEffect(() => {
    if (selectedOption?.value) {
      setValue(selectedOption.value);
    }
  }, [selectedOption, setValue]);
  return (
    <div className="relative inline-block w-full">
      <Select
        className={`${dataTest || ''}`}
        styles={customStyles}
        defaultValue={selectedOption}
        onChange={(option: any) => setSelectedOption(option as any)}
        options={options}
        isMulti={multi}
      />
    </div>
  );
}

export default SelectDropdown;
