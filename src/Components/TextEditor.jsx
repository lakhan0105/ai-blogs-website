import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

function TextEditor() {
  const { blogText, isLoading, publishBlog, currUser } = useMyContext();

  // state to handle the text editor input (blogText is read-only)
  const [value, setValue] = useState(blogText);
  const navigate = useNavigate();

  useEffect(() => {
    setValue(blogText);
  }, [blogText]);

  // handleUpdateBlogText
  // we can accept the editor content as a html string
  function handleUpdateBlogText(html) {
    setValue(html);
  }

  // handlePublish
  async function handlePublish() {
    if (currUser) {
      const data = { blogText: value, authorId: currUser.$id };
      const result = await publishBlog(data);

      if (result.success) {
        navigate("/");
        console.log("blog published successfully!");
      }
    } else {
      alert("please login to publish the blog!");
    }
  }

  if (isLoading) {
    return <h1 className="text-center">Generating your blog...</h1>;
  }

  if (blogText) {
    return (
      <>
        <button
          className="absolute right-3 top-2 border px-2 py-0.5 rounded-md text-sm bg-green-600 hover:bg-green-500 shadow-sm hover:shadow-md"
          onClick={handlePublish}
        >
          Publish
        </button>

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
