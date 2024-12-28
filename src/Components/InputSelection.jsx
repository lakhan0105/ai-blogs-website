import React, { useState } from "react";
import CreatableSelect from "react-select/creatable";

const options = [
  { value: "animals", label: "animals" },
  { value: "technology", label: "technology" },
  { value: "health", label: "health" },
];

const customStyles = {
  control: (baseStyles) => ({
    ...baseStyles,
    minHeight: "30px",
    height: "auto",
    padding: "0px",
    border: "none",
    boxShadow: "none",
  }),
  valueContainer: (baseStyles) => ({
    ...baseStyles,
    padding: "0px 0px", // Adjust padding inside the select
    border: "1px solid #1a1a1a",
    borderRadius: "4px",
    width: "100%",
    margin: "0px",
    zIndex: "100",
    overflow: "hidden",
  }),
  input: (baseStyles) => ({
    ...baseStyles,
    margin: "0px", // Remove extra margin
    padding: "0px", // Remove extra padding
  }),
  dropdownIndicator: () => ({
    border: "none",
    translate: "-2px",
  }),
};

function InputSelection({ setSelectedCat }) {
  // function to handleSelectedCat
  function handleChange(array) {
    const arrayOfValues = array.reduce((acc, curr) => {
      const val = curr?.value;
      acc.push(val);
      return acc;
    }, []);

    setSelectedCat(arrayOfValues);
  }

  return (
    <CreatableSelect
      isMulti
      styles={customStyles}
      options={options}
      placeholder="Select or type category"
      onChange={handleChange}
    ></CreatableSelect>
  );
}

export default InputSelection;
