import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";
import InputSelection from "./InputSelection";
import toast, { Toaster } from "react-hot-toast";

function TextEditor({ passText, passTitle, isEditing, authorId, documentId }) {
  const { isLoading, publishBlog, updateBlog, currUser } = useMyContext();

  // state to handle the text editor input (blogText is read-only)
  const [value, setValue] = useState(passText);
  const [blogTitle, setBlogTitle] = useState(passTitle || "");
  const [selectedCat, setSelectedCat] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    setValue(passText);
  }, [passText]);

  // handleUpdateBlogText
  // we can accept the editor content as a html string
  function handleUpdateBlogText(html) {
    setValue(html);
  }

  // function to create description (returns a desc text extracted from the value)
  function createDesc() {
    if (!value) return;
    const parsed = new DOMParser().parseFromString(value, "text/html");
    const pTags = parsed.querySelectorAll("p");
    let textContent = "";

    // extract text from each p tag
    pTags.forEach((item) => {
      console.log(textContent.length);
      textContent += `${item.textContent} `;
    });

    const finalDesc = [...textContent.slice(0, 180), "..."].join("");
    return finalDesc;
  }

  // handlePublish
  async function handlePublish() {
    if (currUser) {
      // const desc = value
      const blogDesc = createDesc();
      const data = {
        blogTitle,
        blogText: value,
        authorId: currUser.$id,
        blogDesc,
        blogCategories: selectedCat,
      };
      const result = await publishBlog(data);

      if (result.success) {
        toast.success("blog published successfully!");
        navigate("/");
      } else if (result?.success === false) {
        toast.error(
          "could not publish the blog, something went wrong in publishBlog"
        );
      }
    } else {
      toast.error("please login to publish the blog!");
    }
  }

  // handleUpdateBlog (eidts and updates the blog in the appwrite)
  async function handleUpdateBlog() {
    // check if the loggedIn user has the permission to update
    if (authorId !== currUser?.$id) {
      console.log("sorry, you do not have the permission to edit this blog!");
      return;
    }

    const data = { blogTitle, blogText: value, blogCategories: selectedCat };
    const result = await updateBlog(documentId, data);

    if (result?.success) {
      navigate("/");
      toast.success("edited successfully!");
    } else {
      console.log("could not edit the blog!");
    }
  }

  if (isLoading) {
    return <h1 className="text-center">Generating your blog...</h1>;
  }

  if (passText) {
    return (
      <>
        {/* button to publish the blog */}
        <button
          className="absolute right-3 top-2 border px-2 py-0.5 rounded-md text-sm bg-green-600 hover:bg-green-500 shadow-sm hover:shadow-md"
          onClick={isEditing ? handleUpdateBlog : handlePublish}
        >
          {isEditing ? "Update" : "Publish"}
        </button>

        {/* Input to take the blog title */}
        <input
          className="absolute w-[150px] left-0 top-[-30px] border px-2 py-0.5 rounded text-sm outline-none focus:border-gray-700/40 focus:shadow-sm text-black"
          type="text"
          name="blogTitle"
          placeholder="enter title here"
          value={blogTitle}
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
        />

        <div className="absolute min-w-[250px] max-w-[350px] right-[80px] top-1.5 text-black text-sm">
          <InputSelection setSelectedCat={setSelectedCat} />
        </div>

        {/* React-quill text editor */}
        <ReactQuill
          theme="snow"
          value={value}
          onChange={handleUpdateBlogText}
        ></ReactQuill>
      </>
    );
  }
}

export default TextEditor;
