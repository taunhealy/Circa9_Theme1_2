// ItemLines.jsx

import React, { useEffect, useMemo } from "react";
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

  const lines = useMemo(() => {
    return items.map((item, index) => ({
      id: item.id,
      isActive: index === activeIndex,
    }));
  }, [items, activeIndex]);

  useEffect(() => {
    controls.start({
      opacity: 1,
      scale: 1,
      transition: { duration: 0.8 },
    });
  }, [controls]);

  useEffect(() => {
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
      {lines.map((line) => (
        <motion.div
          key={line.id}
          className={`item-line-image ${line.isActive ? "active" : ""}`}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{
            scale: line.isActive ? 0.7 : 0.3,
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
