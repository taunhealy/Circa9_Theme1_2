import React from "react";
import "./brandfilterbuttons.scss";
import { motion } from "framer-motion";

interface BrandFilterButtonProps {
  brand: string | boolean;
  selected: boolean;
  onClick: () => void;
  key: any;
}

const BrandFilterButton: React.FC<BrandFilterButtonProps> = ({
  brand,
  selected,
  onClick,
}) => {
  return (
    <motion.div
      className={`brand-filter-buttons ${selected ? "active" : ""}`}
      whileHover={{ scale: 1.01, transition: { duration: 0.6 } }}
      whileTap={{ scale: 1.01 }}
      exit={{
        opacity: 0,
        scale: 1.0,
        transition: { duration: 1.7, ease: "easeOut" }, // Adjust the easing function and duration
      }}
      onClick={onClick}
    >
      {brand}
    </motion.div>
  );
};

export default BrandFilterButton;
