import React from "react";

function Button({ extraStyles, children, handleOnClick }) {
  return (
    <button
      type="button"
      className={`text-white rounded-lg px-4 py-2 text-sm bg-blue-600 hover:bg-blue-700 font-medium  ${extraStyles}`}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
}

export default Button;
