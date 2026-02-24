"use client";

import { motion, Variants } from "framer-motion";
import { useEffect, useState } from "react";

const BasicInfo = () => {
  const text = "Hello, my name is";

  const roles = [
    "Full-Stack Developer",
    "Software Developer",
    "Mobile Developer",
    "Backend Developer",
    "Web Developer",
  ];

  const [roleIndex, setRoleIndex] = useState(0);
  const [typedText, setTypedText] = useState("");
  const [phase, setPhase] = useState<"typing" | "pausing" | "deleting">(
    "typing",
  );

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout: NodeJS.Timeout;

    if (phase === "typing") {
      if (typedText.length < currentRole.length) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length + 1));
        }, 65);
      } else {
        timeout = setTimeout(() => {
          setPhase("pausing");
        }, 1200);
      }
    }

    if (phase === "pausing") {
      timeout = setTimeout(() => {
        setPhase("deleting");
      }, 600);
    }

    if (phase === "deleting") {
      if (typedText.length > 0) {
        timeout = setTimeout(() => {
          setTypedText(currentRole.slice(0, typedText.length - 1));
        }, 40);
      } else {
        setPhase("typing");
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [typedText, phase, roleIndex, roles]);

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

        <span className="relative min-h-10 inline-flex items-center">
          {typedText}

          <motion.span
            className="ml-1 w-0.5 h-[1.2em] bg-primary"
            animate={{ opacity: [0, 1, 0] }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </span>
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
          Welcome to my simple and humble portfolio
        </p>

        <p className="text-lg text-muted-foreground hover:text-foreground transition-colors duration-300">
          <span className="mr-3 text-border">//</span>
          Please explore the journey through this site
        </p>
      </motion.div>
    </div>
  );
};

export default BasicInfo;
