import React, { useState } from "react";
import { FaArrowCircleUp } from "react-icons/fa";
import { useMyContext } from "../Context/ContextProvider";

function InputComp() {
  const { talkToOpenAi } = useMyContext();
  const [input, setInput] = useState("");

  // handleInputChange
  function handleInputChange(e) {
    const value = e.target.value;
    setInput(value);
  }

  // function to submit the input prompt
  function submitPrompt(e) {
    e.preventDefault();
    console.log(`prompt is : ${input}`);
    talkToOpenAi(input);
  }

  return (
    <form className="max-w-[600px] mx-auto rounded-lg border border-white/20 bg-gray-800 p-2 flex">
      <textarea
        type="text"
        className="w-full bg-transparent  p-0 text-sm focus:outline-none resize-none"
        value={input}
        onChange={handleInputChange}
      />

      <button type="submit" className="ml-2 self-end" onClick={submitPrompt}>
        <span className="text-2xl hover:text-white/90">
          <FaArrowCircleUp />
        </span>
      </button>
    </form>
  );
}

export default InputComp;
