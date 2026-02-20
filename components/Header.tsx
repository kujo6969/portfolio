"use client";

import { motion } from "framer-motion";

const tabs = ["_hello", "_projects", "Settings"];

interface HeaderProps {
  active: number;
  setActive: (index: number) => void;
}

export default function Header({ active, setActive }: HeaderProps) {
  return (
    <div className="flex relative bg-[#011627]">
      <div className="relative flex items-center">
        <p className="px-6 py-6 text-base text-gray-500 mr-15 font-header tracking-widest">
          James Edward Ofianga
        </p>
        <div className="w-px h-full bg-neutral-700" />
      </div>
      {tabs.map((tab, index) => (
        <div key={index} className="relative flex items-center">
          <button
            onClick={() => setActive(index)}
            className={`relative px-6 py-6 text-base ${
              active === index ? "text-white" : "text-gray-500"
            } hover:cursor-pointer font-header tracking-widest`}
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
  );
}
