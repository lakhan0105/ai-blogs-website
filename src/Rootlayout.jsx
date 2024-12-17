import React from "react";
import { Navbar } from "./Components/index";
import { Outlet } from "react-router";

function Rootlayout() {
  return (
    <main>
      <Navbar />

      <Outlet />
    </main>
  );
}

export default Rootlayout;
