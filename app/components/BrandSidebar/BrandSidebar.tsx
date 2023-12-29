// BrandSidebar.tsx
import React, { useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./brandsidebar.css";

interface BrandSidebarProps {
  brands: (string | null)[];
  selectedBrand: string | null;
  onBrandClick: (brand: string) => void;
}

const BrandSidebar: React.FC<BrandSidebarProps> = ({
  brands,
  selectedBrand,
  onBrandClick,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  const handleScroll = (direction: "up" | "down") => {
    const maxStartIndex = Math.max(0, brands.length - 5);

    if (direction === "up") {
      setStartIndex((prevIndex) => Math.max(0, prevIndex - 5));
    } else {
      setStartIndex((prevIndex) => Math.min(maxStartIndex, prevIndex + 5));
    }
  };

  return (
    <motion.div
      className="brand-sidebar-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
    >
      {brands.length > 9 && (
        <motion.div className="arrow-button" onClick={() => handleScroll("up")}>
          <ChevronUp size={20} strokeWidth={2.5} stroke="black" />
        </motion.div>
      )}

      <div className="brands-list">
        {brands.slice(startIndex, startIndex + 9).map((brand) => (
          <motion.div
            key={brand || null}
            className={`brand-filter-button ${
              brand === selectedBrand ? "selected" : ""
            }`}
            onClick={() => brand && onBrandClick(brand)}
          >
            {brand}
          </motion.div>
        ))}
      </div>

      {brands.length > 9 && (
        <motion.div
          className="arrow-button"
          onClick={() => handleScroll("down")}
        >
          <ChevronDown size={20} strokeWidth={2.5} stroke="black" />
        </motion.div>
      )}
    </motion.div>
  );
};

export default BrandSidebar;
