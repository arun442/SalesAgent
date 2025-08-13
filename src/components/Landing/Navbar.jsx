"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X } from "lucide-react";
import { useRouter } from "next/navigation";

export default function Navbar() {
    const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full top-0 z-50 bg-transparent">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-6 py-4">
        <div className="flex-shrink-0">
          <button onClick={()=> router.push('/')} className="flex items-center cursor-pointer">
            <Image
              src="/gktlogo.png"
              alt="Global Knowledge Technologies Logo"
              width={100}
              height={100}
            />
          </button>
        </div>

        <div className="hidden rounded-3xl md:flex space-x-10 text-gray-800 font-semibold font-poppins  absolute left-1/2 -translate-x-1/2 backdrop-blur-md pl-10 pr-10 pt-2 pb-2 border-amber-50 bg-white/30 border">
          <button onClick={()=> router.push('/')} className="cursor-pointer">Home</button>
          <button onClick={()=> router.push('/Feature')} className="cursor-pointer">Features</button>
          <button onClick={()=> router.push('/About')} className="cursor-pointer">About</button>
        </div>

        <div className="hidden md:block">
          <button
            onClick={()=> router.push('/Login')}
            className="text-white bg-indigo-600 px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition cursor-pointer font-poppins"
          >
            Login
          </button>
        </div>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="p-2 text-gray-800 cursor-pointer">
            <Menu size={28} />
          </button>
        </div>
      </div>

      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setIsOpen(false)} className="text-gray-800 cursor-pointer">
            <X size={28} />
          </button>
        </div>

        <div className="flex flex-col space-y-6 px-6 text-lg font-semibold text-black">
          <button onClick={() => {setIsOpen(false); router.push('/');}} className="cursor-pointer">
            Home
          </button>
          <button onClick={() => {setIsOpen(false);router.push('/Feature')}} className="cursor-pointer">
            Features
          </button>
          <button onClick={() => {setIsOpen(false);router.push('/About')}} className="cursor-pointer">
            About
          </button>
          <button
            onClick={() => {setIsOpen(false);router.push('/Login')}}
            className="text-white bg-indigo-600 px-5 py-2 rounded-full shadow hover:bg-indigo-700 transition cursor-pointer"
          >
            Login
          </button>
        </div>
      </div>

      {isOpen && (
        <div
          className="fixed inset-0 bg-opacity-50"
          onClick={() => setIsOpen(false)}
        />
      )}
    </nav>
  );
}
