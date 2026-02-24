"use client";

import { motion, useMotionValue } from "framer-motion";
import { useRef } from "react";
import {
  SiJavascript,
  SiTypescript,
  SiNextdotjs,
  SiReact,
  SiNodedotjs,
  SiPython,
  SiDjango,
  SiPhp,
  SiPostgresql,
  SiPostman,
  SiExpress,
  SiTailwindcss,
  SiMysql,
  SiFlutter,
  SiDart,
  SiSqlite,
  SiFirebase,
  SiPrisma,
  SiPrismic,
  SiVercel,
  SiGit,
  SiLaravel,
  SiPwa,
} from "react-icons/si";

export function DraggableIcons() {
  const containerRef = useRef<HTMLDivElement>(null);

  const icons = [
    { Icon: SiJavascript, color: "#f7df1e", label: "JavaScript" },
    { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
    { Icon: SiNextdotjs, color: "#000000", label: "Next.js" },
    { Icon: SiReact, color: "#61dafb", label: "React" },
    { Icon: SiNodedotjs, color: "#339933", label: "Node.js" },
    { Icon: SiPython, color: "#3776ab", label: "Python" },
    { Icon: SiDjango, color: "#092e20", label: "Django" },
    { Icon: SiPhp, color: "#777bb4", label: "PHP" },
    { Icon: SiLaravel, color: "#ff2d20", label: "Laravel" },
    { Icon: SiPostman, color: "#ff6c37", label: "Postman" },
    { Icon: SiGit, color: "#f05032", label: "Git" },
    { Icon: SiExpress, color: "#000000", label: "Express" },
    { Icon: SiFlutter, color: "#02569b", label: "Flutter" },
    { Icon: SiDart, color: "#0175c2", label: "Dart" },
    { Icon: SiPrisma, color: "#2d3748", label: "Prisma" },
    { Icon: SiTailwindcss, color: "#06b6d4", label: "Tailwind CSS" },
    { Icon: SiPrismic, color: "#5163ba", label: "Prismic" },
    { Icon: SiVercel, color: "#000000", label: "Vercel" },
    { Icon: SiSqlite, color: "#003b57", label: "SQLite" },
    { Icon: SiFirebase, color: "#ffca28", label: "Firebase" },
    { Icon: SiMysql, color: "#4479a1", label: "MySQL" },
    { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
    { Icon: SiPwa, color: "#5a0fc8", label: "PWA" },
  ];

  return (
    <div
      ref={containerRef}
      className="grid grid-cols-3 gap-6 justify-items-center items-center md:grid-cols-6"
    >
      {icons.map(({ Icon, color, label }, index) => (
        <FloatingIcon key={index} Icon={Icon} color={color} label={label} />
      ))}
    </div>
  );
}

function FloatingIcon({ Icon, color, label }: any) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const ICON_SIZE = 70;

  const floatAmplitude = Math.random() * 10 + 5;
  const floatDuration = Math.random() * 3 + 4;
  const floatDelay = Math.random() * 2;

  return (
    <motion.div
      drag
      dragElastic={0.8}
      style={{ x, y }}
      whileHover={{ scale: 1.15 }}
      animate={{
        y: [0, -floatAmplitude, 0, floatAmplitude, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className="cursor-grab active:cursor-grabbing flex flex-col items-center justify-center select-none"
    >
      <Icon size={ICON_SIZE} color={color} />
      <span className="mt-2 text-sm font-header text-center">{label}</span>
    </motion.div>
  );
}
