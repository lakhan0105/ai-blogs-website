import React from "react";
import { NavLink } from "react-router";

const navLinksData = [
  { id: 1, linkName: "home", path: "/" },
  { id: 2, linkName: "About", path: "/" },
  { id: 3, linkName: "Services", path: "/" },
  { id: 4, linkName: "My Blogs", path: "/my-blogs" },
];

function NavLinks() {
  return (
    <ul className="flex gap-10 capitalize">
      {navLinksData.map((link) => {
        const { id, linkName, path } = link;

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
