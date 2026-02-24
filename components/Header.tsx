"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { label: "_hello", href: "/" },
  { label: "_projects", href: "/projects" },
  { label: "_about-me", href: "/about-me/bio" },
];

export default function Header() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const menuVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { height: "auto", opacity: 1, transition: { duration: 0.3 } },
    exit: { height: 0, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div className="bg-background text-foreground font-header transition-colors duration-300">
      <div className="flex items-center justify-between px-6 py-4 md:py-0">
        <p className="text-base text-muted-foreground font-header tracking-widest">
          James Edward Ofianga
        </p>

        {/* Mobile Toggle */}
        <button
          className="md:hidden text-muted-foreground"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={menuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center">
          {tabs.map((tab, index) => {
            const isActive =
              tab.href === "/"
                ? pathname === "/"
                : pathname.startsWith(tab.href);

            return (
              <div key={tab.href} className="relative flex items-center">
                <Link
                  href={tab.href}
                  className={`relative px-6 py-5 text-base font-header tracking-widest ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  } hover:cursor-pointer hover:bg-accent hover:text-accent-foreground`}
                >
                  {tab.label}

                  {isActive && (
                    <motion.div
                      layoutId="underline"
                      className="absolute left-0 right-0 bottom-0 h-0.5 bg-accent-foreground"
                    />
                  )}
                </Link>

                {index < tabs.length - 1 && (
                  <div className="w-px h-full bg-border" />
                )}
              </div>
            );
          })}
        </div>
      </div>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="md:hidden bg-background flex flex-col border-t border-border overflow-hidden"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
          >
            {tabs.map((tab) => {
              const isActive =
                tab.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(tab.href);

              return (
                <Link
                  key={tab.href}
                  href={tab.href}
                  onClick={() => setMenuOpen(false)}
                  className={`px-6 py-4 text-left text-base font-header tracking-widest ${
                    isActive ? "text-foreground" : "text-muted-foreground"
                  } hover:bg-accent hover:text-accent-foreground`}
                >
                  {tab.label}
                </Link>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
