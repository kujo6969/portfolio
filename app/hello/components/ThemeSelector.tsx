"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import BasicInfo from "./BasicInfo";

const themes = ["light", "dark", "retro", "cartoon", "cute", "vapor"];

export default function ThemeSelector() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="grid grid-cols-3 gap-4">
      {themes.map((t, i) => (
        <div key={i} className="flex flex-col items-center">
          <button
            onClick={() => setTheme(t)}
            className={`w-36 h-36 overflow-hidden rounded-md shadow-lg transition-transform
              ${theme === t ? "scale-105 ring-2 ring-primary" : "hover:scale-105"}`}
          >
            <div
              className={`${t} w-full h-full relative`}
              style={{
                transform: "scale(0.25)",
                transformOrigin: "top left",
                width: "400%",
                height: "400%",
                pointerEvents: "none",
              }}
            >
              <div className="relative flex items-center justify-center w-full h-full bg-background">
                <div
                  className="pointer-events-none absolute w-125 h-125 rounded-full blur-[120px] opacity-20"
                  style={{
                    background:
                      "linear-gradient(90deg, var(--primary), var(--accent), var(--secondary))",
                  }}
                />
                <div
                  className="pointer-events-none absolute w-75 h-75 rounded-full blur-[160px] opacity-10"
                  style={{
                    background: "var(--accent)",
                  }}
                />
                <div className="relative z-10 w-full h-full gap-2 p-2">
                  <div className="col-span-2">
                    <BasicInfo />
                  </div>
                </div>
              </div>
            </div>
          </button>
          <span className="text-xs mt-1 capitalize">{t}</span>
        </div>
      ))}
    </div>
  );
}
