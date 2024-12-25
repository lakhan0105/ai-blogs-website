import React, { useEffect, useState } from "react";
import { useMyContext } from "../Context/ContextProvider";

function Author({ authorId }) {
  const { getAuthor } = useMyContext();
  const [authorState, setAuthorState] = useState("");

  useEffect(() => {
    const fetchAuthor = async () => {
      const result = await getAuthor(authorId);
      console.log(result);

      if (result?.success) {
        setAuthorState(result?.authorInfo);
      } else {
        console.log("something went wrong in getAuthor!");
      }
    };

    fetchAuthor();
  }, [authorId]);

  return (
    <div className="mt-2 text-sm">
      <p className="italic text-zinc-300/95">
        written by: {authorState?.authorName}
      </p>
    </div>
  );
}

export default Author;
