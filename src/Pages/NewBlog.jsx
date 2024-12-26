import React, { useEffect, useState } from "react";
import { InputComp, TextEditor } from "../Components/index";
import { useMyContext } from "../Context/ContextProvider";

function NewBlog() {
  const { blogText, isLoading } = useMyContext();

  // state to store the blog text that will appear as typing animation
  const [typingText, setTypingText] = useState("");

  function loadTypingText() {
    setTimeout(() => {
      if (typingText.length === blogText.length) return;

      setTypingText((prev) => {
        if (prev.length < blogText.length) {
          return prev + blogText[prev.length];
        }
        return prev;
      });

      loadTypingText();
    }, 5);
  }

  // run the loadTypingText function when the page loads or blogText changes
  useEffect(() => {
    loadTypingText();
  }, [blogText]);

  return (
    <section className="max-w-3xl mx-auto pt-0 transition-all duration-500">
      {/* INPUT COMPONENT (TO TAKE USER INPUT PROMPT) */}
      <div
        className={`transition-all duration-500 ease-in-out  ${
          blogText || isLoading
            ? "opacity-0 hidden translate-y-5"
            : "opacity-100 block translate-y-0"
        }`}
      >
        <InputComp />
      </div>

      {/* LOADING  */}
      <div
        className={`text-center text-sm transition-all duration-500 ${
          isLoading ? "opacity-100 visible mt-20" : "opacity-0 invisible mt-5"
        }`}
      >
        {isLoading ? <h2>Loading...</h2> : ""}
      </div>

      {/* TEXT EDITOR  */}
      <div
        className={`relative mt-20 transition-all duration-500 ease-in-out ${
          blogText && !isLoading
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-5"
        }`}
      >
        <TextEditor passText={typingText} />
      </div>
    </section>
  );
}

export default NewBlog;
