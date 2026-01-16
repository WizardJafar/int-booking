import React from "react";
import LogoLoop from "../ReactBits/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiJavascript,
  SiNodedotjs,
  SiMongodb,
  SiHtml5,
  SiCss3,
  SiExpress,
} from "react-icons/si";

const techLogos = [
  { node: <SiReact />, title: "React" },
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiTypescript />, title: "TypeScript" },
  { node: <SiTailwindcss />, title: "Tailwind" },
  { node: <SiJavascript />, title: "JavaScript" },
  { node: <SiNodedotjs />, title: "Node.js" },
  { node: <SiMongodb />, title: "MongoDB" },
  { node: <SiHtml5 />, title: "HTML5" },
  { node: <SiCss3 />, title: "CSS3" },
  { node: <SiExpress />, title: "Express" },
];

const directions = [
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
  "right",
  "left",
];

const BackgroundLogos = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Blur background */}
      <div className="absolute inset-0 backdrop-blur-[4px] bg-base-200/30"></div>

      {/* Logo lines */}
      <div className="absolute inset-0 flex flex-col gap-6 opacity-40">
        {directions.map((dir, i) => (
          <LogoLoop
            key={i}
            logos={techLogos}
            speed={70 + i * 5}
            direction={dir}
            logoHeight={48}
            gap={55}
            hoverSpeed={0}
            scaleOnHover={false}
            fadeOut
            fadeOutColor=""
            className="text-primary"
          />
        ))}
      </div>
    </div>
  );
};

export default BackgroundLogos;
