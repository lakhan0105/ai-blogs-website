import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { Link } from "react-router";

function AllBlogs() {
  const { getAllBlogs, isLoading } = useMyContext();

  const [allblogs, setAllBlogs] = useState();

  useEffect(() => {
    const fetchAllBlogs = async () => {
      const result = await getAllBlogs();
      if (result.success) {
        setAllBlogs(result?.documents);
      } else {
        console.log(result?.error);
      }
    };

    fetchAllBlogs();
  }, []);

  if (isLoading) {
    return <h2 className="max-w-5xl mx-auto text-3xl py-10">Loading...</h2>;
  }

  return (
    <section className="max-w-5xl mx-auto py-10 px-2.5">
      <div>
        {/* left */}
        <div className="w-full max-w-[700px] ">
          <h2 className="text-xl px-2.5 mb-3">Featured Blogs</h2>

          {allblogs?.map((blog) => {
            const { blogTitle, blogDesc, $id, authorId, $createdAt } = blog;

            return (
              <Link key={$id} to={`/blog/${$id}`}>
                <article
                  key={$id}
                  className="border-b border-white/20 py-9 px-2.5 hover:bg-gray-800/10 hover:rounded"
                >
                  <div>
                    <h2 className="text-3xl font-bold leading-relaxed">
                      {blogTitle}
                    </h2>
                    <p className="max-w-[95%] text-sm leading-relaxed">
                      {blogDesc}
                    </p>
                  </div>

                  {/* <div>img</div> */}
                </article>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default AllBlogs;
