import React from "react";

function FormRow({ label, type, name, value, onChange }) {
  return (
    <div className="flex flex-col mb-8">
      <label htmlFor={name} className="text-sm">
        {label}
      </label>

      <input
        type={type}
        name={name}
        className="outline-none mt-2 text-black py-0.5 px-1 rounded-md"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormRow;
