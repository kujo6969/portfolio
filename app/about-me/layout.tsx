"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Folder, FolderOpenIcon, Triangle } from "lucide-react";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [openSection, setOpenSection] = useState(true);
  const pathname = usePathname();

  const links = [
    { label: "bio", href: "/about-me/bio" },
    { label: "education", href: "/about-me/education" },
    { label: "Skills", href: "/about-me/skills" },
  ];

  return (
    <div className="flex flex-col md:flex-row min-h-[80vh]">
      <aside className="hidden md:flex flex-col w-64 border-r border-border bg-background p-4">
        <button
          onClick={() => setOpenSection(!openSection)}
          className="flex items-center w-full text-left text-sm font-semibold text-muted-foreground mb-3  cursor-pointer"
        >
          <Triangle
            className={`w-4 h-4 transition-transform duration-300 mr-2 ${
              openSection ? "rotate-180" : "rotate-90"
            }`}
            style={{ fill: "var(--accent)" }}
          />
          personal_info
        </button>

        <div
          className={`flex flex-col gap-1 overflow-hidden transition-all duration-300 ${
            openSection ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`px-3 py-2 rounded-md text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex flex-row gap-2 items-center">
                  {isActive ? (
                    <FolderOpenIcon
                      style={{ fill: "var(--accent)", border: 0 }}
                    />
                  ) : (
                    <Folder style={{ fill: "var(--accent)" }} />
                  )}
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      </aside>

      <div className="md:hidden border-b border-border">
        <button
          onClick={() => setOpenSection(!openSection)}
          className="flex items-center w-full p-4 text-sm text-left font-semibold text-muted-foreground cursor-pointer"
        >
          <Triangle
            className={`w-4 h-4 transition-transform duration-300 mr-2 ${
              openSection ? "rotate-180" : "rotate-90"
            }`}
            style={{ fill: "var(--accent)" }}
          />
          personal_info
        </button>

        <div
          className={`flex flex-col overflow-hidden transition-all duration-300 ${
            openSection ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {links.map((link) => {
            const isActive = pathname === link.href;
            console.log(isActive);
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpenSection(false)}
                className={`block w-full px-4 py-3 text-left text-sm transition-colors duration-200 ${
                  isActive
                    ? "bg-accent text-accent-foreground"
                    : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                }`}
              >
                <div className="flex flex-row gap-2 items-center">
                  {isActive ? (
                    <FolderOpenIcon style={{ fill: "var(--accent)" }} />
                  ) : (
                    <Folder style={{ fill: "var(--accent)" }} />
                  )}
                  {link.label}
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <main className="flex-1 p-8 flex items-center justify-center">
        <div className="w-full max-w-3xl text-center">{children}</div>
      </main>
    </div>
  );
}
