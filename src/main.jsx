import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import { Landing, Login, Register } from "./Pages/index.js";
import ContextProvider from "./Context/ContextProvider.jsx";
import App from "./App.jsx";

// create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route index element={<Landing />}></Route>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>
    </>
  )
);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ContextProvider>
      <RouterProvider router={router}></RouterProvider>
    </ContextProvider>
  </StrictMode>
);
