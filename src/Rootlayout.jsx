import React from "react";
import { Navbar } from "./Components/index";
import { Outlet } from "react-router";
import { Toaster } from "react-hot-toast";

function Rootlayout() {
  return (
    <main>
      <Toaster />
      <>
        <Navbar />

        <Outlet />
      </>
    </main>
  );
}

export default Rootlayout;
