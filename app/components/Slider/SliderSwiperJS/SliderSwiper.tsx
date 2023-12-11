"use client";

// SliderSwiper.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { useCarouselHandlers } from "./carouselHandlers";
import { DataProp } from "@/app/data/data";
import "./sliderswiper.scss";
import MuxThumbnail from "../../MuxThumbnail/MuxThumbnail";
import { useAnimation } from "framer-motion";

interface SliderProps {
  items: DataProp[];
}

const SliderSwiper: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [showCursor, setShowCursor] = useState(false);

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(
        items.filter((item) => item.brand !== "all").map((item) => item.brand)
      )
    );
    return ["Recent", ...uniqueBrands];
  }, [items]);

  const filteredItems = useMemo(() => {
    if (selectedBrand === "Recent") {
      // logic for Recent
      return items
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    } else {
      return items.filter((item) => item.brand === selectedBrand);
    }
  }, [selectedBrand, items]);

  // Assuming you have the totalItems value available
  const totalItems = filteredItems.length;
  const arrowControls = useAnimation();

  // Usage of useCarouselHandlers hook
  const { handleNextItem, handlePrevItem } = useCarouselHandlers({
    totalItems: filteredItems.length,
    setCurrentIndex,
    arrowControls,
  });

  return (
    <div className="item-background-container">
      <AnimatePresence>
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.5 } }}
          exit={{ opacity: 0 }}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <div className="brand-title">
            {filteredItems[currentIndex]?.brand}
          </div>
          <div className="item-title">{filteredItems[currentIndex]?.title}</div>
        </motion.section>
      </AnimatePresence>

      {/* ... (other components) */}

      <motion.div
        className="brand-filter-sidebar"
        onMouseOver={() => setShowCursor(true)}
        onMouseLeave={() => setShowCursor(false)}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, transition: { duration: 1 } }}
        exit={{ opacity: 0 }}
      >
        {brands.map((brand) => (
          <BrandFilterButton
            key={brand}
            brand={brand}
            selected={brand === selectedBrand}
            onClick={() => setSelectedBrand(brand)}
          />
        ))}
      </motion.div>

      {/* ... (other components) */}

      <AnimatePresence>
        <motion.div
          key={selectedBrand}
          className="item-image-container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
        >
          <div className="thumbnail-container">
            {/* Uncomment the thumbnail component */}
            <MuxThumbnail
              playbackId={filteredItems[currentIndex]?.playbackId}
              time={5}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* ... (other components) */}

      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 1 } }}
          exit={{ opacity: 0 }}
          className="nextprev-button-wrapper"
        >
          {/* Previous Button */}
          <motion.button
            title="button-prev"
            type="button"
            className="button-prev"
            onClick={handlePrevItem}
            whileHover={{ scale: 1.3 }}
          >
            <ChevronLeftCircle size={17} strokeWidth={2.5} stroke="black" />
          </motion.button>

          {/* Next Button */}
          <motion.button
            title="button-next"
            type="button"
            className="button-next"
            onClick={handleNextItem}
            whileHover={{ scale: 1.3 }}
          >
            <ChevronRightCircle size={17} strokeWidth={2.5} stroke="black" />
          </motion.button>
        </motion.div>
      </AnimatePresence>

      {/* ... (other components) */}
    </div>
  );
};

export default SliderSwiper;
