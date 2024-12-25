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
    <ul className="flex gap-10 capitalize text-zinc-300">
      {navLinksData.map((link) => {
        const { id, linkName, path } = link;

        if (linkName === "My Blogs") {
          return (
            <div key={id}>
              {currUser && (
                <NavLink
                  to={path}
                  className={({ isActive }) => {
                    return isActive ? "text-cyan-400" : "hover:text-zinc-200";
                  }}
                >
                  <li>{linkName}</li>
                </NavLink>
              )}
            </div>
          );
        }

        return (
          <NavLink
            to={path}
            className={({ isActive }) => {
              return isActive ? "text-cyan-400" : "hover:text-zinc-200";
            }}
            key={id}
          >
            <li>{linkName}</li>
          </NavLink>
        );
      })}
    </ul>
  );
}

export default NavLinks;
