// BrandSidebar.tsx
import React from "react";
import { motion } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import "./brandsidebar.css";

interface BrandSidebarProps {
  brands: (string | null)[]; // Adjust the type to allow null if needed
  selectedBrand: string | null;
  onBrandClick: (brand: string) => void;
  onBrandNavigate: (direction: "up" | "down") => void;
}

const BrandSidebar: React.FC<BrandSidebarProps> = ({
  brands,
  selectedBrand,
  onBrandClick,
  onBrandNavigate,
}) => {
  return (
    <motion.div
      className="brand-sidebar-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { duration: 2.5 } }}
      exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
    >
      <motion.div
        className="arrow-button"
        onClick={() => onBrandNavigate("up")}
      >
        <ChevronUp size={20} strokeWidth={2.5} stroke="black" />
      </motion.div>

      {brands.map((brand) => (
        <motion.div
          key={brand || null} // Ensure key is a valid type (string, number, or null)
          className={`brand-filter-button ${
            brand === selectedBrand ? "selected" : ""
          }`}
          onClick={() => brand && onBrandClick(brand)}
        >
          {brand}
        </motion.div>
      ))}
      <motion.div
        className="arrow-button"
        onClick={() => onBrandNavigate("down")}
      >
        <ChevronDown size={20} strokeWidth={2.5} stroke="black" />
      </motion.div>
    </motion.div>
  );
};

export default BrandSidebar;
