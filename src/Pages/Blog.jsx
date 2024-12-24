import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";
import { useParams } from "react-router";
import moment from "moment";
import { FaEdit } from "react-icons/fa";
import { TextEditor } from "../Components";

function Blog() {
  const { getBlog, currUser, updateBlog } = useMyContext();
  const documentId = useParams().id;

  // local state to store the blogdetails of the clicked blog
  const [blogData, setBlogData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showEditBtn, setShowEditBtn] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showTextEditor, setShowTextEditor] = useState(false);

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

  useEffect(() => {
    if (blogData) {
      // show the edit btn if the blog is written by the loggedIn user (currUser)
      if (blogData?.authorId === currUser?.$id) {
        setShowEditBtn(() => {
          return true;
        });
      } else {
        setShowEditBtn(() => {
          return false;
        });
      }
    }
  }, [blogData]);

  // format the blog updated date
  const blogUpdatedDate = moment(new Date(blogData?.$updatedAt)).format(
    "MMMM Do YYYY"
  );

  // function to handle the edit btn
  async function editingMode() {
    setIsEditing(true);
    setShowTextEditor(true);
  }

  // loader
  if (isLoading) {
    return (
      <h2 className="max-w-3xl mx-auto px-5 mt-20 text-3xl">Loading...</h2>
    );
  }

  return (
    <section className="max-w-5xl mx-auto px-5 pt-8 pb-20">
      <div className="mt-10 max-w-3xl mx-auto ">
        {/* BLOG CONTAINER*/}{" "}
        {!showTextEditor && (
          <div>
            {/* blog info container */}
            <div className="border-b border-white/20 py-4 mb-10 flex items-center">
              {/* left */}
              <div className="w-full">
                <h1 className="text-5xl font-bold">{blogData?.blogTitle}</h1>
                <p className="italic text-sm mt-2 px-1 text-zinc-300">
                  updated on: <span className="">{blogUpdatedDate}</span>
                </p>
              </div>

              {/* right (edit button) */}
              {showEditBtn && (
                <button
                  className="mr-2 border border-white/20 bg-gray-800/90 hover:bg-gray-800/40 rounded-2xl px-5 py-1 text- translate-y-[-35%] flex items-center gap-1.5"
                  onClick={editingMode}
                >
                  <span className="text-sm">
                    <FaEdit />
                  </span>
                  Edit
                </button>
              )}
            </div>

            {/* blog content */}
            <div
              className="blog-content "
              dangerouslySetInnerHTML={{ __html: blogData?.blogText }}
            ></div>
          </div>
        )}
        {/* TEXT EDITOR */}
        <div className={`relative transition-all duration-500 ease-in-out`}>
          {showTextEditor && (
            <TextEditor
              passText={blogData?.blogText}
              passTitle={blogData?.blogTitle}
              isEditing={isEditing}
              authorId={blogData?.authorId}
              documentId={documentId}
            />
          )}
        </div>
      </div>
    </section>
  );
}

export default Blog;
