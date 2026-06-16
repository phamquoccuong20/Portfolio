import React, { useRef, useState, MouseEvent } from "react";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxRotate?: number; // Maximum rotation in degrees
  key?: any;
}

export default function TiltCard({
  children,
  className = "",
  maxRotate = 12,
}: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;

    // Normalize coordinates: -0.5 to 0.5
    const relativeX = (e.clientX - rect.left) / width - 0.5;
    const relativeY = (e.clientY - rect.top) / height - 0.5;

    // Calculate rotation angles
    const rotY = relativeX * maxRotate;
    const rotX = -relativeY * maxRotate; // reverse because moving down angles top forward

    // Calculate local position for shine overlay (0 to 100%)
    const shineX = ((e.clientX - rect.left) / width) * 100;
    const shineY = ((e.clientY - rect.top) / height) * 100;

    setRotate({ x: rotX, y: rotY });
    setCoords({ x: shineX, y: shineY });
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotate({ x: 0, y: 0 });
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl overflow-hidden cursor-pointer transition-all duration-200 ${className}`}
      style={{
        transformStyle: "preserve-3d",
        perspective: "1000px",
        transform: isHovered
          ? `rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) scale(1.02)`
          : "rotateX(0deg) rotateY(0deg) scale(1)",
        boxShadow: isHovered
          ? "0 20px 40px -15px rgba(6, 182, 212, 0.25)"
          : "0 4px 20px -2px rgba(0, 0, 0, 0.3)",
      }}
      id={`tilt-card-${Math.random().toString(36).substr(2, 5)}`}
    >
      {/* Gloss and Shine glow overlay */}
      {isHovered && (
        <div
          className="absolute inset-0 pointer-events-none z-10 mix-blend-color-dodge transition-opacity duration-300"
          style={{
            background: `radial-gradient(circle 180px at ${coords.x}% ${coords.y}%, rgba(255, 255, 255, 0.12), transparent)`,
          }}
          id="tilt-card-shine"
        />
      )}

      {/* Internal Content (Pushed out with translate3d for multilayer parallax) */}
      <div
        className="w-full h-full"
        style={{
          transform: isHovered ? "translateZ(10px)" : "translateZ(0)",
          transition: "transform 0.2s ease-out",
        }}
      >
        {children}
      </div>
    </div>
  );
}
