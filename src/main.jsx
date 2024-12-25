import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import toast, { Toaster } from "react-hot-toast";

import {
  AllBlogs,
  Blog,
  Landing,
  Login,
  MyBlogsList,
  NewBlog,
  Register,
} from "./Pages/index.js";
import ContextProvider from "./Context/ContextProvider.jsx";
import Rootlayout from "./Rootlayout.jsx";

const notify = () => toast("Here is your toast.");

// create router
const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/register" element={<Register />}></Route>
      <Route path="/login" element={<Login />}></Route>

      <Route element={<Rootlayout />}>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/all-blogs" element={<AllBlogs />}></Route>
        <Route path="/new-blog" element={<NewBlog />}></Route>
        <Route path="/my-blogs" element={<MyBlogsList />}></Route>
        <Route path="/blog/:id" element={<Blog />}></Route>
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
