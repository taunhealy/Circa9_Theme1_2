"use client";
// SliderSwiper.tsx
import React, { useState, useMemo } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import "./sliderswiper.scss";
import MuxThumbnail from "../../MuxThumbnail/MuxThumbnail";
import { useNextPrevHandlers } from "@/app/utilities/nextPrevHandlers";
import { DataProp } from "@/app/data/data";

interface SliderProps {
  items: DataProp[];
}

const SliderSwiper: React.FC<SliderProps> = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [showCursor, setShowCursor] = useState(false);
  const contentControls = useAnimation(); // Use useAnimation for content animation

  const brands = useMemo(() => {
    const uniqueBrands = Array.from(
      new Set(
        items.filter((item) => item.brand !== "all").map((item) => item.brand)
      )
    );
    return ["Recent", ...uniqueBrands];
  }, [items]);

  // Filter items by date

  const filteredItems = useMemo(() => {
    if (selectedBrand === "Recent") {
      return items
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    } else {
      return items.filter((item) => item.brand === selectedBrand);
    }
  }, [selectedBrand, items]);

  const totalItems = filteredItems.length;
  const arrowControls = useAnimation();

  const { handleNextPrevItems } = useNextPrevHandlers({
    totalItems,
    currentIndex,
    setCurrentIndex,
  });

  return (
    <div className="item-background-container">
      <AnimatePresence>
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0 }}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
          >
            <div className="brand-title">
              {filteredItems[currentIndex]?.brand}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
          >
            <div className="item-title">
              {filteredItems[currentIndex]?.title}
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          className="brand-filter-sidebar"
          onMouseOver={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 0.6 } }}
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
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          key={selectedBrand}
          className="item-image-container"
          initial={{ opacity: 1 }}
          animate={contentControls}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="thumbnail-container"
            initial={{ opacity: 0, scale: 0.99 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.27, ease: "easeInOut" },
            }}
            exit={{
              opacity: 0,
              scale: 0.99,
              transition: { duration: 0.27, ease: "easeInOut" },
            }}
          >
            <MuxThumbnail
              playbackId={filteredItems[currentIndex]?.playbackId}
              time={5}
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div className="nextprev-button-wrapper">
          {/* Previous and Next button logic... */}
          <motion.button
            title="button-prev"
            type="button"
            className="button-prev"
            onClick={() => handleNextPrevItems("prev")}
            whileHover={{ scale: 1.7 }}
          >
            <motion.div>
              <ChevronLeftCircle size={17} strokeWidth={2.5} stroke="black" />
            </motion.div>
          </motion.button>

          <motion.button
            title="button-next"
            type="button"
            className="button-next"
            onClick={() => handleNextPrevItems("next")}
            whileHover={{ scale: 1.7 }}
          >
            <motion.div>
              <ChevronRightCircle size={17} strokeWidth={2.5} stroke="black" />
            </motion.div>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default SliderSwiper;
