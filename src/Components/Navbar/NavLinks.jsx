import React, { useState } from "react";
import { NavLink } from "react-router";
import { useMyContext } from "../../Context/ContextProvider";

const navLinksData = [
  { id: 1, linkName: "Explore", path: "/all-blogs" },
  { id: 2, linkName: "Create", path: "/new-blog" },
  { id: 3, linkName: "My Blogs", path: "/my-blogs" },
];

function NavLinks() {
  const { currUser } = useMyContext();

  return (
    <ul className="flex gap-10 capitalize">
      {navLinksData.map((link) => {
        const { id, linkName, path } = link;

        if (linkName === "My Blogs") {
          return (
            <>
              {currUser && (
                <li key={id} className="hover:text-blue-400">
                  <NavLink to={path}>{linkName}</NavLink>
                </li>
              )}
            </>
          );
        }

        return (
          <li key={id} className="hover:text-blue-400">
            <NavLink to={path}>{linkName}</NavLink>
          </li>
        );
      })}
    </ul>
  );
}

export default NavLinks;
