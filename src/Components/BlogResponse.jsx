import React from "react";
import { useMyContext } from "../Context/ContextProvider";
// import DOMPurify from "dompurify"; // Sanitize the HTML

function BlogResponse() {
  const { blogText } = useMyContext();
  console.log(blogText);

  // const sanitizedHtml = DOMPurify.sanitize(blogText);

  if (blogText) {
    return <></>;
  }
}

export default BlogResponse;
