import { motion, useMotionValue, useTransform } from "framer-motion";
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";

const ComponentApp = () => {
  const scrollY = useMotionValue(0);
  const scale = useTransform(scrollY, [0, 100], [0, 1]);
  const opacity = useTransform(scrollY, [0, 100], [0, 1]);

  return (
    <motion.div className="relative">
      <motion.div
        style={{
          width: 40,
          height: 40,
          borderRadius: 20,
          position: "absolute",
          top: "13%",
          marginTop: -85,
          left: "50%",
          marginLeft: -20,
          scale: scale,
          opacity: opacity,
        }}
        className="flex flex-col justify-center items-center"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          className="animate-spin"
          viewBox="0 0 20 20"
        >
          <path
            fill="currentColor"
            fillRule="evenodd"
            d="M11 16a2 2 0 1 1 0 4a2 2 0 0 1 0-4m-6.259-3a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m11.578.5a2 2 0 1 1 0 4a2 2 0 0 1 0-4M18.5 9.319a1.5 1.5 0 1 1 0 3a1.5 1.5 0 0 1 0-3M2.5 6a2.5 2.5 0 1 1 0 5a2.5 2.5 0 0 1 0-5m15.286-.793a1 1 0 1 1 0 2a1 1 0 0 1 0-2M8 0a3 3 0 1 1 0 6a3 3 0 0 1 0-6m7.5 3a.5.5 0 1 1 0 1a.5.5 0 0 1 0-1"
          />
        </svg>
      </motion.div>
      <motion.div
        style={{
          overflow: "hidden",
          position: "relative",
          transform: "translateZ(0)",
        }}
        className="h-screen w-full"
      >
        <motion.div
          style={{ y: scrollY }}
          drag="y"
          dragConstraints={{
            top: 0,
            bottom: 0,
          }}
          transition={{
            ease: [0.32, 0.72, 0, 1],
            duration: 0.5,
          }}
          className="bg-slate-800/10 h-full "
          onDragEnd={(event, info) => {
            console.log(info.offset.y);
          }}
        >
          123
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
