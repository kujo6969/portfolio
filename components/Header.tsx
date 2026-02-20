"use client";

import { useState } from "react";
import { motion } from "framer-motion";

const tabs = ["_hello", "_projects", "Settings"];

interface HeaderProps {
  active: number;
  setActive: (index: number) => void;
}

export default function Header({ active, setActive }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="bg-[#011627]">
      <div className="flex items-center justify-between px-6 py-4 md:py-0">
        <p className="text-base text-gray-500 font-header tracking-widest">
          James Edward Ofianga
        </p>

        <button
          className="md:hidden text-gray-500"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        <div className="hidden md:flex items-center">
          {tabs.map((tab, index) => (
            <div key={index} className="relative flex items-center">
              <button
                onClick={() => setActive(index)}
                className={`relative px-6 py-6 text-base ${
                  active === index ? "text-white" : "text-gray-500"
                } hover:cursor-pointer font-header tracking-widest hover:bg-[#547792] hover:text-white`}
              >
                {tab}

                {active === index && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-[#F6FF99]"
                  />
                )}
              </button>

              {index < tabs.length - 1 && (
                <div className="w-px h-full bg-neutral-700" />
              )}
            </div>
          ))}
        </div>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-[#011627] flex flex-col border-t border-neutral-700">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActive(index);
                setMenuOpen(false);
              }}
              className={`px-6 py-4 text-left text-base ${
                active === index ? "text-white" : "text-gray-500"
              } hover:bg-gray-900 font-header tracking-widest`}
            >
              {tab}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
