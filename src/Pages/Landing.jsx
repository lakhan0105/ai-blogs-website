import React from "react";
import { Button } from "../Components";
import { FaArrowRightLong } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa6";
import { FaExternalLinkAlt } from "react-icons/fa";
import img1 from "../assets/img1-final.webp";
import img2 from "../assets/two-final.png";

function Landing() {
  return (
    <section className="max-w-7xl mx-auto min-h-[50vh] pt-36 px-2">
      <div className="text-center">
        <h2 className="text-6xl text-center font-bold mb-6">
          Quickly, create blogs using AI
        </h2>

        <p className="mb-8 text-xl text-center text-zinc-400 max-w-[60%] mx-auto leading-relaxed">
          Bring your unique ideas to life with ease. AI ensures every blog is
          engaging, impactful, and effortless to create.
        </p>

        {/* CTA buttons */}
        <div className="flex items-center justify-center gap-4">
          <a
            href="/new-blog"
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
        <div className="w-[700px] min-h-[400px] mx-auto relative mt-28">
          <div className="absolute img-container w-full h-full"></div>
          <div className="absolute bg-gradient-to-b from-gray-900 to-transparent top-0 h-[50%] w-full"></div>
          <div className="absolute bg-gradient-to-b to-gray-900 from-transparent bottom-0 h-[25%] w-full"></div>
          <div className="absolute bg-gradient-to-r from-gray-900 to-transparent top-0 bottom-0 left-0 w-[50%] h-full"></div>
          <div className="absolute bg-gradient-to-l from-gray-900 to-transparent top-0 bottom-0 right-0 w-[50%] h-full"></div>

          <img
            src={img1}
            className="absolute w-[60%] bottom-14 left-[20%] shadow-2xl shadow-white/0 h-[250px] rounded-lg z-100"
            alt="img1 not found"
            loading="lazy"
          />

          <img
            src={img2}
            className="absolute h-[220px] top-[5%] right-[4%] rounded-lg shadow-2xl  z-100"
            alt="img2 not found"
            loading="lazy"
          />
        </div>
      </div>
    </section>
  );
}

export default Landing;
