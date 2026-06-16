import React, { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  scale?: number;
  id?: string;
  key?: React.Key;
}

export default function ScrollReveal({
  children,
  className = "",
  direction = "up",
  delay = 0,
  duration = 0.65,
  distance = 40,
  scale = 1,
  id
}: ScrollRevealProps) {
  // Compute initial states based on direction parameters
  const getInitial = () => {
    const initial: { opacity: number; x?: number; y?: number; scale?: number } = {
      opacity: 0,
      scale: scale
    };

    switch (direction) {
      case "up":
        initial.y = distance;
        break;
      case "down":
        initial.y = -distance;
        break;
      case "left":
        initial.x = distance;
        break;
      case "right":
        initial.x = -distance;
        break;
      default:
        break;
    }

    return initial;
  };

  // Target visible states
  const getAnimate = () => {
    return {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1
    };
  };

  return (
    <motion.div
      id={id}
      initial={getInitial()}
      whileInView={getAnimate()}
      viewport={{ once: true, margin: "-100px" }}
      transition={{
        duration,
        delay,
        ease: [0.16, 1, 0.3, 1] // Custom refined spring-like easeOutExotic curve for high premium feeling
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
