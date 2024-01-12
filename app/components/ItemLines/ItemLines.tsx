// ItemLines.tsx
import React from "react";
import { motion } from "framer-motion";
import { Minus } from "lucide-react";
import "./itemlines.scss";

interface Item {
  id: number;
  title: string;
  img: string;
  // ... other properties
}

interface ItemLinesProps {
  items: Item[];
  activeIndex: number;
}

const ItemLines: React.FC<ItemLinesProps> = ({ items, activeIndex }) => {
  return (
    <div className="item-lines">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`item-line-image ${index === activeIndex ? "active" : ""}`}
          initial={{ scale: 0.8, opacity: 0.2 }}
          animate={{ scale: index === activeIndex ? 1.5 : 0.8, opacity: 1 }}
        >
          <Minus size={16} strokeWidth={1.5} stroke="black" />
        </motion.div>
      ))}
    </div>
  );
};

export default ItemLines;
