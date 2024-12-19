import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMyContext } from "../Context/ContextProvider";

function TextEditor() {
  const { blogText, isLoading } = useMyContext();

  // state to handle the text editor input
  const [value, setValue] = useState(blogText);

  useEffect(() => {
    setValue(blogText);
  }, [blogText]);

  // handleUpdateBlogText
  // we can accept the editor content as a html string
  function handleUpdateBlogText(html) {
    setValue(html);
  }

  // handleChangeSelection
  function handleChangeSelection(range, source, editor) {
    // range will return 2 things -> index where the cursor is clicked and length of the selected text
    if (range && range.length > 0) {
      const bounds = editor.getBounds(range.index, range.length);
      console.log(bounds);
    }
  }

  if (isLoading) {
    return <h1 className="text-center">Generating your blog...</h1>;
  }

  if (blogText) {
    return (
      <ReactQuill
        theme="snow"
        value={value}
        onChange={handleUpdateBlogText}
        onChangeSelection={handleChangeSelection}
      ></ReactQuill>
    );
  }
}

export default TextEditor;
