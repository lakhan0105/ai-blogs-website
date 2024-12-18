import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";

function InputComp() {
  const [input, setInput] = useState("");

  // handleInputChange
  function handleInputChange(e) {
    const value = e.target.value;
    setInput(value);
  }

  return (
    <form className="min-w-[600px] rounded-lg border border-white/20 bg-gray-800 p-2 flex">
      <textarea
        type="text"
        className="w-full bg-transparent  p-0 text-sm focus:outline-none resize-none"
        value={input}
        onChange={handleInputChange}
      />

      <button type="submit" className="ml-2 self-end">
        <span className="text-2xl hover:text-white/90">
          <FaArrowCircleUp />
        </span>
      </button>
    </form>
  );
}

export default InputComp;
