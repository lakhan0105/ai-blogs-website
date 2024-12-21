import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";

import {
  Landing,
  Login,
  MyBlogsList,
  NewBlog,
  Register,
} from "./Pages/index.js";
import ContextProvider from "./Context/ContextProvider.jsx";
import Rootlayout from "./Rootlayout.jsx";

// create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route element={<Rootlayout />}>
        <Route index element={<Landing />}></Route>
        <Route path="/new-blog" element={<NewBlog />}></Route>
        <Route path="/my-blogs" element={<MyBlogsList />}></Route>
      </Route>
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
