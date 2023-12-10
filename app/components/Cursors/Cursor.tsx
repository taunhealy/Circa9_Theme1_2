"use client";

import React, { useState, useEffect, forwardRef, ForwardedRef } from "react";
import { motion, MotionProps } from "framer-motion";
import "./Cursor";

interface CursorProps {
  setShowCursor: React.Dispatch<React.SetStateAction<boolean>>;
}

const Cursor: React.ForwardRefRenderFunction<HTMLDivElement, CursorProps> = (
  { setShowCursor },
  ref
) => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", updateMousePosition);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
    };
  }, []);

  const cursorVariants: MotionProps["variants"] = {
    default: {
      x: mousePosition.x - 50,
      y: mousePosition.y - 50,
      transition: {
        type: "tween",
      },
    },
  };

  return (
    <motion.div
      className="cursor-hover-brand"
      ref={ref as ForwardedRef<HTMLDivElement>}
      variants={cursorVariants}
      animate="default"
    ></motion.div>
  );
};

export default React.forwardRef<HTMLDivElement, CursorProps>(Cursor);
