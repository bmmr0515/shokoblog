"use client";

import React, { useEffect, useState } from "react";

interface HeroRevealProps {
  children: React.ReactNode;
  delay?: number; // ms
  className?: string;
}

export const HeroReveal: React.FC<HeroRevealProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // prefers-reduced-motion チェック
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsVisible(true);
      return;
    }

    const timer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    return () => clearTimeout(timer);
  }, [delay]);

  return (
    <div
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0px)" : "translateY(24px)",
        transition: `opacity 750ms cubic-bezier(0.16, 1, 0.3, 1), transform 750ms cubic-bezier(0.16, 1, 0.3, 1)`,
        willChange: "opacity, transform",
      }}
      className={className}
    >
      {children}
    </div>
  );
};
