"use client";
// Import necessary modules and components
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import "./sliderswiper.scss";
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import ItemLines from "../../ItemLines/ItemLines";
import MuxThumbnail from "../../MuxThumbnail/MuxThumbnail";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import { DataProp } from "@/app/data/data";

interface SliderProps {
  items: DataProp[];
}

const SliderSwiperWrapper: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [showCursor, setShowCursor] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

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
      const validDateItems = items.filter((item) => item.date);
      return validDateItems
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    } else {
      return items.filter((item) => item.brand === selectedBrand);
    }
  }, [selectedBrand, items]);

  const handleFilterChange = useCallback((brand: string | null): void => {
    setSelectedBrand(brand);
    setCurrentIndex(0);
  }, []);

  const handleNextItem = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % filteredItems.length);
  }, [filteredItems]);

  const handlePrevItem = useCallback(() => {
    setCurrentIndex(
      (prevIndex) =>
        (prevIndex - 1 + filteredItems.length) % filteredItems.length
    );
  }, [filteredItems]);

  const titleControls = useAnimation();
  const imageControls = useAnimation();

  useEffect(() => {
    const animation = {
      opacity: [0, 1],
      scale: [0.8, 1],
      transition: { duration: 0.5 },
    };

    titleControls.start(animation);
    imageControls.start(animation);
  }, [titleControls, imageControls, selectedBrand]);

  return (
    <div className="item-background-container">
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 0, y: 0, scale: 0.5 }} // Updated initial state
          animate={titleControls}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 1.5 }}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <div className="brand-title">
            {filteredItems[currentIndex]?.brand}
          </div>
          <div className="item-title">{filteredItems[currentIndex]?.title}</div>
        </motion.section>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          className="brand-filter-sidebar"
          onMouseOver={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          initial="hidden"
          animate={imageControls}
          exit="exit"
          key="brand-filter"
        >
          {brands.map((brand) => (
            <BrandFilterButton
              key={brand}
              brand={brand}
              selected={brand === selectedBrand}
              onClick={() => handleFilterChange(brand)}
            />
          ))}
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          key={selectedBrand}
          className="item-image-container"
          initial={{ opacity: 0, scale: 0.5 }}
          animate={imageControls}
          exit={{ opacity: 0 }}
        >
          <div className="thumbnail-container">
            <MuxThumbnail
              className="thumbnail-image"
              playbackId={filteredItems[currentIndex]?.playbackId}
              time={15}
            />
          </div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence mode="wait">
        <motion.div
          initial="hidden"
          animate={titleControls}
          exit="exit"
          className="nextprev-button-wrapper"
        >
          <button
            title="button-prev"
            type="button"
            className="button-prev"
            onClick={handlePrevItem}
          >
            <ChevronLeftCircle size={17} strokeWidth={2.5} stroke="black" />
          </button>
          <button
            title="button-next"
            type="button"
            className="button-next"
            onClick={handleNextItem}
          >
            <ChevronRightCircle size={17} strokeWidth={2.5} stroke="black" />
          </button>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        {filteredItems.length > 0 && (
          <motion.div
            key="production-title"
            className="production-title-container"
            initial="hidden"
            animate="show"
            exit="exit"
          >
            {filteredItems[currentIndex]?.production && (
              <div className="production-title">
                {filteredItems[currentIndex]?.production}
              </div>
            )}
          </motion.div>
        )}
        <AnimatePresence>
          <motion.div
            key={selectedBrand}
            className="item-lines-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <ItemLines items={filteredItems} activeIndex={currentIndex} />
          </motion.div>
        </AnimatePresence>
      </AnimatePresence>
    </div>
  );
};

export default SliderSwiperWrapper;
