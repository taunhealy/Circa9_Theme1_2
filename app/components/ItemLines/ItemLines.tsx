"use client";

// ItemLines.jsx

import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import { Minus } from "lucide-react";
import "./ItemLines.scss";

interface ItemLinesProps {
  items: Item[];
  activeIndex: number;
}

interface Item {
  id: number;
  title: string;
  img: string;
  // ... other properties
}

const ItemLines: React.FC<ItemLinesProps> = ({ items, activeIndex }) => {
  const controls = useAnimation();

  useEffect(() => {
    if (controls) {
      // Only apply initial animation on mount
      controls.start({
        opacity: 1,
        scale: 1,
        transition: { duration: 0.5 },
      });
    }
  }, [controls]);

  useEffect(() => {
    // Trigger animation when activeIndex changes
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.5 },
    });
  }, [activeIndex, controls]);

  return (
    <motion.div
      className="item-lines"
      initial={{ opacity: 0, scale: 0.5 }}
      animate={controls}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
    >
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`item-line-image ${index === activeIndex ? "active" : ""}`}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{
            scale: index === activeIndex ? 0.7 : 0.3,
            opacity: 1,
          }}
          transition={{ duration: 2 }} // Adjust the duration as needed
        >
          <Minus size={16} strokeWidth={1.5} stroke="black" />
        </motion.div>
      ))}
      <motion.div
        className="item-ratio"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{ duration: 1 }}
      >
        {`${activeIndex + 1}/${items.length}`}
      </motion.div>
    </motion.div>
  );
};

export default ItemLines;
