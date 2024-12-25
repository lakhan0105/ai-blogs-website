import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { Link } from "react-router";
import { Author } from "../Components";

function AllBlogs() {
  const {
    getAllBlogs,
    isLoading,
    listFilteredBlogs,
    filterBtnName,
    setFilterBtnName,
  } = useMyContext();

  const [allblogs, setAllBlogs] = useState();

  const categoriesArray = [
    "all",
    "technology",
    "animals",
    "health",
    "celebrations",
  ];

  useEffect(() => {
    const fetchAllBlogs = async () => {
      if (filterBtnName === "all") {
        const result = await getAllBlogs();
        if (result.success) {
          setAllBlogs(result?.documents);
        } else {
          console.log(result?.error);
        }
      } else {
        const result = await listFilteredBlogs(filterBtnName);
        if (result.success) {
          setAllBlogs(result?.documents);
        } else {
          console.log(result?.error);
        }
      }
    };

    fetchAllBlogs();
  }, [filterBtnName]);

  if (isLoading) {
    return <h2 className="max-w-5xl mx-auto text-3xl py-10">Loading...</h2>;
  }

  if (allblogs?.length < 1) {
    return (
      <h2 className="max-w-5xl mx-auto text-3xl py-10">No Blogs found.</h2>
    );
  }

  return (
    <section className="max-w-5xl mx-auto py-10 px-2.5">
      <div className="flex items-start">
        {/* left */}
        <div className="w-full max-w-[800px] text-zinc-200">
          <h2 className="text-xl px-2.5 mb-3">
            {filterBtnName ? `#${filterBtnName}` : "blogs"}
          </h2>

          {allblogs?.map((blog) => {
            const { blogTitle, blogDesc, $id, authorId, $createdAt } = blog;

            return (
              <Link key={$id} to={`/blog/${$id}`}>
                <article
                  key={$id}
                  className="border-b border-gray-700/30 py-9 px-2.5 hover:bg-gray-800/10 hover:rounded "
                >
                  <div>
                    <h2 className="text-3xl font-bold leading-relaxed">
                      {blogTitle}
                    </h2>
                    <p className="max-w-[95%] text-sm leading-relaxed text-zinc-300/95">
                      {blogDesc}
                    </p>
                  </div>

                  {/* author information */}
                  <div>{blog && <Author authorId={authorId} />}</div>
                </article>
              </Link>
            );
          })}
        </div>

        {/* right */}
        <div className="border-l border-gray-700/20 rounded-md w-[350px] ml-6 mt-16 px-6 py-2 pb-24">
          <div className="mt-5">
            <h2 className="mb-6 text-xl">Categories</h2>
            <div className="flex gap-4 flex-wrap">
              {categoriesArray?.map((item, index) => {
                return (
                  <button
                    key={index}
                    name={item}
                    className={`ring-1 ring-cyan-100/20 text-sm text-zinc-300 tracking-wide px-5 py-0.5 shadow-md rounded-xl bg-gray-800/80  hover:shadow-lg hover:ring-1 hover:ring-cyan-100/30 focus:bg-cyan-600 focus:text-white ${
                      filterBtnName === item ? "text-zinc-50 bg-cyan-600" : ""
                    }`}
                    onClick={(e) => {
                      setFilterBtnName(e.target.name);
                    }}
                  >
                    #{item}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AllBlogs;
