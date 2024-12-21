import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

function MyBlogsList() {
  const { currUser, listBlogs } = useMyContext();

  const [blogsList, setBlogsList] = useState();

  const navigate = useNavigate();

  useEffect(() => {
    // if no user, then navigate back to home page
    if (currUser === null) {
      navigate("/");
      return;
    }

    // fetch the blogs comming from useMyContext
    const fetchBlogs = async () => {
      try {
        const result = await listBlogs();
        setBlogsList(result.blogsList);
      } catch (error) {
        console.log(`error while fetching blogs`, error);
      }
    };

    fetchBlogs();
  }, [currUser]);

  return (
    <section className="max-w-5xl mx-auto px-5">
      <div className="max-w-[800px]">
        <h2 className="text-xl font-semibold mt-10">Your Blogs</h2>

        <div className="mt-3">
          {blogsList?.map((item) => {
            const {
              blogTitle,
              blogText,
              blogDesc,
              $id,
              $createdAt,
              $updatedAt,
            } = item;

            return (
              <article
                key={$id}
                className="border-t border-white/30 pt-5 mb-12"
              >
                <h2 className="text-2xl font-bold capitalize mb-2">
                  {blogTitle}
                </h2>
                <p className="max-w-[600px] text-zinc-300">{blogDesc}</p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default MyBlogsList;
