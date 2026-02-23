"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(true);
  const pathname = usePathname();

  const links = [
    { label: "Basic Info", href: "/about-me/basic" },
    { label: "Education", href: "/about-me/education" },
    { label: "Skills", href: "/about-me/skills" },
  ];

  return (
    <div className="flex min-h-[80vh]">
      <aside className="w-64 border-r border-border bg-background p-4">
        <button
          onClick={() => setOpen(!open)}
          className="w-full text-left font-semibold text-muted-foreground mb-3"
        >
          Personal Info {open ? "▾" : "▸"}
        </button>

        {open && (
          <div className="flex flex-col gap-1">
            {links.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`px-3 py-2 rounded-md text-sm ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              );
            })}
          </div>
        )}
      </aside>

      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}
