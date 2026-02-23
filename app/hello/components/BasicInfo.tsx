"use client";

import { motion, Variants } from "framer-motion";

const BasicInfo = () => {
  const text = "Hello, my name is";

  const container: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
      },
    },
  };

  const letter: Variants = {
    hidden: { y: 0 },
    visible: {
      y: [-8, 0],
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 12,
        repeat: Infinity,
        repeatDelay: 2,
      },
    },
  };

  const fadeUp: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(8px)" },
    visible: (delay: number = 0) => ({
      opacity: 1,
      y: 0,
      filter: "blur(0px)",
      transition: {
        duration: 0.8,
        delay,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <div className="flex flex-col gap-8 p-5 overflow-hidden text-foreground">
      <motion.p
        variants={container}
        initial="hidden"
        animate="visible"
        className="font-body text-base text-muted-foreground tracking-wide"
      >
        {text.split("").map((char, index) => (
          <motion.span
            key={index}
            variants={letter}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        ))}
      </motion.p>

      <motion.h1
        custom={0.2}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="font-sub-body text-6xl md:text-7xl font-bold text-foreground"
      >
        James Edward Ofianga
      </motion.h1>

      <motion.h2
        custom={0.4}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="font-header text-3xl md:text-4xl text-primary pb-6 flex items-center gap-3"
      >
        <span className="text-primary">{">"}</span>
        Full-Stack Developer
      </motion.h2>

      <motion.div
        custom={0.6}
        variants={fadeUp}
        initial="hidden"
        animate="visible"
        className="flex flex-col gap-3 font-body"
      >
        <p className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300">
          <span className="mr-3 text-border">//</span>
          Crafting scalable web experiences
        </p>

        <p className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300">
          <span className="mr-3 text-border">//</span>
          Building modern, performant applications
        </p>
      </motion.div>
    </div>
  );
};

export default BasicInfo;
