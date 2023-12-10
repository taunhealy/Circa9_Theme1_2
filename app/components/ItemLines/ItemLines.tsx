// ItemLines.jsx

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image"; // Import the Image component
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
  return (
    <div className="item-lines">
      {items.map((item, index) => (
        <motion.div
          key={item.id}
          className={`item-line-image ${index === activeIndex ? "active" : ""}`}
          initial={{ scale: 0.5, opacity: 0.5 }}
          animate={{ scale: index === activeIndex ? 0.7 : 0.3, opacity: 1 }}
        >
          {/* Replace motion.img with Image component */}
          <Image
            src={item.img}
            alt={item.title}
            width={25} // Set your desired width
            height={5} // Set your desired height
          />
        </motion.div>
      ))}
      <div className="item-ratio">{`${activeIndex + 1}/${items.length}`}</div>
    </div>
  );
};

export default ItemLines;
