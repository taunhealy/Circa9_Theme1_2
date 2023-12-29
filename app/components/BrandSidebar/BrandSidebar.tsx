// BrandSidebar.tsx
import React, { useRef, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./brandsidebar.css";

interface BrandSidebarProps {
  brands: (string | null)[]; // Adjust the type to allow null if needed
  selectedBrand: string | null;
  onBrandClick: (brand: string) => void;
}

const BrandSidebar: React.FC<BrandSidebarProps> = ({
  brands,
  selectedBrand,
  onBrandClick,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: "up" | "down") => {
    const container = containerRef.current;

    if (container) {
      const scrollAmount = direction === "up" ? -30 : 30;
      container.scrollBy({ top: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <motion.div
      className="brand-sidebar-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
    >
      {brands.length > 3 && (
        <motion.div className="arrow-button" onClick={() => handleScroll("up")}>
          <ChevronUp size={20} strokeWidth={2.5} stroke="black" />
        </motion.div>
      )}

      <div className="brands-list" ref={containerRef}>
        {brands.slice(0, 5).map((brand) => (
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

      {brands.length > 3 && (
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
