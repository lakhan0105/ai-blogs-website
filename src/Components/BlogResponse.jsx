import React from "react";
import { useMyContext } from "../Context/ContextProvider";
import DOMPurify from "dompurify"; // Sanitize the HTML

function BlogResponse() {
  const { blogText } = useMyContext();
  console.log(blogText);

  const sanitizedHtml = DOMPurify.sanitize(blogText);

  if (blogText) {
    return (
      <section className="mt-10 blog-response border py-14 px-10 rounded-lg border-white/10 text-zinc-200 bg-gray-900">
        <div dangerouslySetInnerHTML={{ __html: sanitizedHtml }} />
      </section>
    );
  }
}

export default BlogResponse;
