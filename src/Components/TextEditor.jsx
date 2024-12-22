import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMyContext } from "../Context/ContextProvider";
import { useNavigate } from "react-router";

function TextEditor() {
  const { blogText, isLoading, publishBlog, currUser } = useMyContext();

  // state to handle the text editor input (blogText is read-only)
  const [value, setValue] = useState(blogText);
  const [blogTitle, setBlogTitle] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    setValue(blogText);
  }, [blogText]);

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
      };
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
        {/* button to publish the blog */}
        <button
          className="absolute right-3 top-2 border px-2 py-0.5 rounded-md text-sm bg-green-600 hover:bg-green-500 shadow-sm hover:shadow-md"
          onClick={handlePublish}
        >
          Publish
        </button>

        {/* Input to take the blog title */}
        <input
          className="absolute w-[200px] right-20 top-2 border px-2 py-0.5 rounded text-sm outline-none focus:border-gray-700/40 focus:shadow-sm text-black"
          type="text"
          name="blogTitle"
          placeholder="enter title here"
          value={blogTitle}
          onChange={(e) => {
            setBlogTitle(e.target.value);
          }}
        />

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
