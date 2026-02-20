"use client";

import { useState } from "react";
import Header from "./Header";
import HelloPage from "@/app/hello/page";
import ProjectsPage from "@/app/projects/page";

const Container = () => {
  const [active, setActive] = useState(0);

  const pages = [<HelloPage />, <ProjectsPage />, <HelloPage />];

  return (
    <div className="mx-auto w-[97%] border border-gray-800 rounded-md text-white text-3xl font-semibold flex flex-col min-h-[94vh] bg-[#011627]">
      <div className="relative w-full border-b border-gray-800 bg-neutral-900">
        <Header active={active} setActive={setActive} />
      </div>

      <main className="flex flex-1 w-full">{pages[active]}</main>
    </div>
  );
};

export default Container;
