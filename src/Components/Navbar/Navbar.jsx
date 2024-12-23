import React from "react";
import { Button, LogoutBtn, NavLinks } from "../index";
import { Link } from "react-router";
import { useMyContext } from "../../Context/ContextProvider";

function Navbar() {
  const { currUser } = useMyContext();

  return (
    <header className="border-b border-gray-600/50 text-white">
      <nav className="max-w-5xl mx-auto flex justify-between items-center h-[70px] px-5">
        <Link to={"/"}>
          <h2 className="font-bold text-2xl">AI Blogs</h2>
        </Link>

        <NavLinks />

        {!currUser && (
          <Button>
            <Link to="/login">Login</Link>
          </Button>
        )}

        <LogoutBtn />
      </nav>
    </header>
  );
}

export default Navbar;
