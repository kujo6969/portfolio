"use client";

import Footer from "./Footer";
import Header from "./Header";

const Container = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background text-foreground transition-colors duration-300">
      <div
        className="mx-auto w-[97%]
      border border-border
      rounded-lg
      text-foreground
      text-3xl font-semibold
      flex flex-col
      min-h-[94vh]
      bg-card
      shadow-sm
      transition-colors duration-300"
      >
        <div className="relative w-full border-b border-border bg-background">
          <Header />
        </div>

        <main className="min-h-[80vh]">{children}</main>
        <div className="relative w-full border-t border-border bg-background">
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Container;
