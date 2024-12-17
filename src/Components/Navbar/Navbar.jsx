import React from "react";
import { Button, NavLinks } from "../index";

function Navbar() {
  return (
    <header className="border-b border-gray-600/50 text-white">
      <nav className="max-w-5xl mx-auto flex justify-between items-center h-[70px] px-5">
        <h2 className="font-bold text-2xl">AI Blogs</h2>

        <NavLinks />

        <Button>Login</Button>
      </nav>
    </header>
  );
}

export default Navbar;
