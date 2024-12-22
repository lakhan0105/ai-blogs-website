import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { useParams } from "react-router";
import moment from "moment";

function Blog() {
  const { getBlog } = useMyContext();
  const documentId = useParams().id;

  // local state to store the blogdetails of the clicked blog
  const [blogData, setBlogData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // pass the docId to the getBlog() function from useMyContext
    const fetchBlog = async () => {
      const result = await getBlog(documentId);
      if (result.success) {
        setIsLoading(false);
        setBlogData(result.blogDetails);
      } else {
        setIsLoading(false);
        console.log(result.error);
      }
    };

    fetchBlog();
  }, [documentId]);

  // format the blog updated date
  const blogUpdatedDate = moment(new Date(blogData?.$updatedAt)).format(
    "MMMM Do YYYY"
  );

  if (isLoading) {
    return (
      <h2 className="max-w-3xl mx-auto px-5 mt-20 text-3xl">Loading...</h2>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-5 pt-8 pb-20">
      <div className="mt-10 max-w-3xl mx-auto">
        <div className="border-b border-white/20 pb-4 mb-10">
          <h1 className="text-5xl font-bold mt-10">{blogData?.blogTitle}</h1>

          <p className="italic text-sm mt-2 px-1 text-zinc-300">
            updated on: <span className="">{blogUpdatedDate}</span>
          </p>
        </div>

        <div
          className="blog-content "
          dangerouslySetInnerHTML={{ __html: blogData?.blogText }}
        ></div>
      </div>
    </section>
  );
}

export default Blog;
