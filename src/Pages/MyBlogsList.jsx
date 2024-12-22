import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { Link, useNavigate } from "react-router";
import UserProfile from "../Components/UserProfile";

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
      <div className="max-w-5xl mx-auto">
        <div className="flex gap-20 items-start mt-10">
          <UserProfile />

          <div className="w-full">
            <h2 className="text-lg">Your Blogs</h2>

            <div className="mt-2">
              {blogsList?.map((item) => {
                const { blogTitle, blogDesc, $id } = item;

                return (
                  <Link key={$id} to={`/blog/${$id}`}>
                    <article className="border-t border-white/30 pt-5 mb-9 ">
                      <h2 className="text-2xl font-bold capitalize mb-2">
                        {blogTitle}
                      </h2>
                      <p className="max-w-[600px] text-zinc-300">{blogDesc}</p>
                    </article>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MyBlogsList;
