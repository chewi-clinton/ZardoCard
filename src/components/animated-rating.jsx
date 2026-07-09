"use client";

import { useEffect, useState } from "react";

export function AnimatedRating({ value = 4.9, duration = 900 }) {
  const [display, setDisplay] = useState(1);

  useEffect(() => {
    const start = performance.now();
    let frame;
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      setDisplay(1 + (value - 1) * progress);
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, duration]);

  return (
    <h2 className="bg-gradient-to-r from-accent to-[#1a1a1a] bg-clip-text text-center text-5xl font-extrabold text-transparent sm:text-6xl">
      Rated {display.toFixed(1)}/5
    </h2>
  );
}
