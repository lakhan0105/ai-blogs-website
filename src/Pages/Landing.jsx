import React from "react";
import { Button } from "../Components";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import img1 from "../assets/img1.png";

function Landing() {
  return (
    <section className="max-w-7xl mx-auto min-h-[50vh] pt-36 px-2">
      <div className="text-center">
        <h2 className="text-6xl text-center font-bold mb-6">
          Simplify Blogging with AI Technology
        </h2>

        <p className="mb-8 text-xl text-center text-zinc-400 max-w-[65%] mx-auto leading-relaxed">
          Effortlessly create high-quality, SEO-friendly content for your
          audience. Let AI handle the writing, so you can focus on growing your
          blog.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="#"
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-md flex items-center gap-2"
          >
            Try now
            <span className="inline-block">
              <FaExternalLinkAlt />
            </span>
          </a>

          <a
            href="#"
            className="bg-transparent hover:bg-gray-700/50 border border-gray-700 px-4 py-2.5 rounded-md flex items-center gap-2"
          >
            <span className="inline-block">
              <FaVideo />
            </span>
            Watch video
          </a>
        </div>

        {/* IMAGES CONTAINER */}
        <div className="w-1/2 min-h-[350px] mx-auto relative mt-20">
          <img
            src={img1}
            className="absolute w-[80%] bottom-0 left-10 shadow-md h-[250px] rounded-lg"
            alt="img1 not found"
          />

          <img
            src={img1}
            className="absolute h-[220px] top-[8%] right-[-10%] rounded-lg shadow-xl"
            alt=""
          />
        </div>
      </div>
    </section>
  );
}

export default Landing;
