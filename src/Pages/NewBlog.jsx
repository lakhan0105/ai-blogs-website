import React from "react";
import { InputComp, TextEditor } from "../Components/index";
import { useMyContext } from "../Context/ContextProvider";

function NewBlog() {
  const { blogText, isLoading } = useMyContext();

  return (
    <section className="max-w-4xl mx-auto pt-0 transition-all duration-500">
      {/* INPUT COMPONENT (TO TAKE USER INPUT) */}
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
        className={`mt-20 text-center text-2xl transition-all duration-500 ${
          isLoading ? "opacity-100 visible" : "opacity-0 invisible"
        }`}
      >
        {isLoading ? <h2>Loading...</h2> : ""}
      </div>

      {/* TEXT EDITOR  */}
      <div
        className={`transition-all duration-500 ease-in-out ${
          blogText && !isLoading
            ? "opacity-100 visible translate-y-0"
            : "opacity-0 invisible translate-y-5"
        }`}
      >
        <TextEditor />
      </div>
    </section>
  );
}

export default NewBlog;
