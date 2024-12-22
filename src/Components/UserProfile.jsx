import React from "react";
import { useMyContext } from "../Context/ContextProvider";
import { FaUserCircle } from "react-icons/fa";

function UserProfile() {
  const { currUser } = useMyContext();

  console.log(currUser);
  return (
    <article className="px-4 py-3 w-full max-w-[260px] rounded-md bg-gradient-to-b text-black from-blue-100/90 to-blue-200/90 shadow-lg flex items-center gap-3">
      {/* img container */}
      <div className="mb-4 h-full">
        <span className="text-7xl">
          <FaUserCircle />
        </span>
      </div>

      <div className="translate-y-[-0.5rem]">
        <h2 className="capitalize mb-0.5 text-xl font-semibold">
          {currUser?.name}
        </h2>
        <p className="text-xs ">{currUser?.email}</p>
      </div>
    </article>
  );
}

export default UserProfile;
