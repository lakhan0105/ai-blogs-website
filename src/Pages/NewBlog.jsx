import React from "react";
import { BlogResponse, InputComp } from "../Components/index";

function NewBlog() {
  return (
    <section className="max-w-4xl mx-auto pt-20">
      <InputComp />
      <BlogResponse />
    </section>
  );
}

export default NewBlog;
