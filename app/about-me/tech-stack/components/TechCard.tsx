"use client";

import { motion } from "framer-motion";
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

const stacks = [
  {
    title: "Frontend",
    items: [
      { Icon: SiJavascript, color: "#f7df1e", label: "JavaScript" },
      { Icon: SiTypescript, color: "#3178c6", label: "TypeScript" },
      { Icon: SiReact, color: "#61dafb", label: "React" },
      { Icon: SiNextdotjs, color: "#000000", label: "Next.js" },
      { Icon: SiTailwindcss, color: "#06b6d4", label: "Tailwind CSS" },
      { Icon: SiPwa, color: "#5a0fc8", label: "PWA" },
    ],
  },
  {
    title: "Backend",
    items: [
      { Icon: SiNodedotjs, color: "#339933", label: "Node.js" },
      { Icon: SiExpress, color: "#000000", label: "Express" },
      { Icon: SiPython, color: "#3776ab", label: "Python" },
      { Icon: SiDjango, color: "#092e20", label: "Django" },
      { Icon: SiPhp, color: "#777bb4", label: "PHP" },
      { Icon: SiLaravel, color: "#ff2d20", label: "Laravel" },
    ],
  },
  {
    title: "Database",
    items: [
      { Icon: SiPostgresql, color: "#336791", label: "PostgreSQL" },
      { Icon: SiMysql, color: "#4479a1", label: "MySQL" },
      { Icon: SiSqlite, color: "#003b57", label: "SQLite" },
      { Icon: SiFirebase, color: "#ffca28", label: "Firebase" },
    ],
  },
  {
    title: "Mobile",
    items: [
      { Icon: SiFlutter, color: "#02569b", label: "Flutter" },
      { Icon: SiDart, color: "#0175c2", label: "Dart" },
    ],
  },
  {
    title: "Tools & Deployment",
    items: [
      { Icon: SiGit, color: "#f05032", label: "Git" },
      { Icon: SiPostman, color: "#ff6c37", label: "Postman" },
      { Icon: SiPrismic, color: "#5163ba", label: "Prismic" },
      { Icon: SiVercel, color: "#000000", label: "Vercel" },
      { Icon: SiPrisma, color: "#2d3748", label: "Prisma" },
    ],
  },
];

export function TechCard() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
      {stacks.map((stack, i) => (
        <StackCard key={i} title={stack.title} items={stack.items} />
      ))}
    </div>
  );
}

function StackCard({ title, items }: any) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      className="backdrop-blur-xl border rounded-2xl p-6 shadow-2xl"
    >
      <h3 className="text-xl font-semibold mb-6 text-primary font-sub-body">
        {title}
      </h3>

      <div className="grid grid-cols-3 gap-6 justify-items-center">
        {items.map(({ Icon, color, label }: any, index: number) => (
          <FloatingIcon key={index} Icon={Icon} color={color} label={label} />
        ))}
      </div>
    </motion.div>
  );
}

function FloatingIcon({ Icon, color, label }: any) {
  const floatAmplitude = Math.random() * 6 + 4;
  const floatDuration = Math.random() * 3 + 4;
  const floatDelay = Math.random() * 2;

  return (
    <motion.div
      whileHover={{ scale: 1.15 }}
      animate={{
        y: [0, -floatAmplitude, 0, floatAmplitude, 0],
      }}
      transition={{
        duration: floatDuration,
        repeat: Infinity,
        ease: "easeInOut",
        delay: floatDelay,
      }}
      className="flex flex-col items-center text-center"
    >
      <Icon size={45} color={color} />
      <span className="mt-2 text-sm font-header text-center">{label}</span>
    </motion.div>
  );
}
