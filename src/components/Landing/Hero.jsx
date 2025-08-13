import {  Facebook, File, Instagram, LineChart, LinkIcon, MessageCircle, PhoneCall, Twitter } from "lucide-react";
import Navbar from "./Navbar";

export default function Hero() {
  return (
    <div className="relative bg-[#f2fdfb] overflow-hidden min-h-screen">
      <Navbar />
       <div className="absolute top-20 left-20 hidden items-center justify-center bg-white rounded-full shadow-lg w-14 h-14 md:flex ">
        <Facebook className="text-blue-500 w-7 h-7" />
      </div>
      <div className="absolute top-20 right-20 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
        <Instagram className="text-pink-500 w-7 h-7" />
      </div>

      <div className="absolute left-20 bottom-20 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
        <LineChart className="text-green-500 w-7 h-7" />
      </div>
      <div className="absolute right-20 bottom-20 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
        <PhoneCall className="text-sky-500 w-7 h-7" />
      </div>

      <div className="absolute left-6 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
        <MessageCircle className="text-green-500 w-7 h-7" />
      </div>
      <div className="absolute right-6 top-1/2 transform -translate-y-1/2 hidden md:flex items-center justify-center bg-white rounded-full shadow-lg w-14 h-14">
        <File className="text-blue-500 w-7 h-7" />
      </div>

      <div className="absolute inset-0 flex justify-center items-center z-10 opacity-80">
        <svg
          viewBox="0 0 800 800"
          width="700"
          height="700"
          xmlns="http://www.w3.org/2000/svg"
          className="absolute top-0 left-1/2 -translate-x-1/2 -z-10 animate-pulse"
        >
          <circle cx="400" cy="400" r="370" fill="#93c5fd" opacity="0.15" />
          <circle cx="400" cy="400" r="320" fill="#60a5fa" opacity="0.25" />
          <circle cx="400" cy="400" r="250" fill="#3b82f6" opacity="0.35" />
          <circle cx="400" cy="400" r="190" fill="#2563eb" opacity="0.4" />
          <circle cx="400" cy="400" r="90" fill="#1d4ed8" opacity="0.5" />
        </svg>
      </div>
      <section className="relative z-10 pt-10 md:pt-32 px-6 flex justify-center items-center flex-col text-center min-h-screen max-w-7xl mx-auto">
        <h1 className="text-xl md:text-4xl font-semibold text-gray-800 mb-6 font-poppins">
          Meet AIA — Your Intelligent Business Growth Partner
        </h1>
        <p className="text-gray-700 text-md dm:text-xl max-w-3xl mx-auto mb-10 font-roboto">
          Empower your business with AIA, a collaborative AI Agent system
          designed to drive market research, lead generation, content creation,
          campaign strategy, and sales outreach — seamlessly aligned to your
          business goals.
        </p>

        <div className="flex justify-center gap-6">
          <a
            href="#demo"
            className="bg-[#0056D2] text-white px-1 py-1 md:px-8 md:py-4 text-sm md:text-base rounded-full font-semibold hover:bg-blue-500 transition cursor-pointer"
          >
            Get a Personalized Demo
          </a>
          <a
            href="/Feature"
            className="border-2 border-[#0056D2] text-blue-800 px-1 py-1 md:px-8 md:py-4 text-sm md:text-base rounded-full font-semibold hover:bg-blue-500 hover:text-white transition cursor-pointer"
          >
            Explore Features
          </a>
        </div>
      </section>
    </div>
  );
}
