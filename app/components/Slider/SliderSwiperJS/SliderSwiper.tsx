"use client";
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

  const controls = useAnimation();

  const fadeOut = useMemo(
    () => ({
      opacity: 0,
      transition: { duration: 1.5 },
    }),
    []
  );

  useEffect(() => {
    const fadeIn = {
      opacity: 1,
      transition: { duration: 1.5 },
    };

    controls.start(fadeIn);
  }, [controls, selectedBrand]);

  const handleFilterChange = useCallback(
    async (brand: string | null): Promise<void> => {
      await controls.start(fadeOut).then(() => {
        setSelectedBrand((prevBrand) => brand ?? prevBrand);
        setCurrentIndex(0);
      });
    },
    [controls, fadeOut]
  );

  const handleNextItem = useCallback(() => {
    controls.start(fadeOut).then(() => {
      setCurrentIndex((prevIndex) => {
        controls.start({ opacity: 1 });
        return (prevIndex + 1) % filteredItems.length;
      });
    });
  }, [controls, filteredItems, fadeOut]);

  const handlePrevItem = useCallback(() => {
    controls.start(fadeOut).then(() => {
      setCurrentIndex((prevIndex) => {
        controls.start({ opacity: 1 });
        return (prevIndex - 1 + filteredItems.length) % filteredItems.length;
      });
    });
  }, [controls, filteredItems, fadeOut]);

  return (
    <div className="item-background-container">
      <AnimatePresence mode="wait">
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5 }}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <div className="brand-title">
            {filteredItems[currentIndex]?.brand}
          </div>
          <div className="item-title">{filteredItems[currentIndex]?.title}</div>
        </motion.section>
      </AnimatePresence>

      {/* ... (other components) */}

      <AnimatePresence mode="wait">
        <motion.div
          className="brand-filter-sidebar"
          onMouseOver={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{ opacity: 0 }}
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

      {/* ... (other components) */}

      <AnimatePresence mode="wait">
        <motion.div
          key={selectedBrand}
          className="item-image-container"
          initial={{ opacity: 0 }}
          animate={controls}
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

      {/* ... (other components) */}

      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0 }}
          animate={controls}
          exit={{ opacity: 0 }}
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

      {/* ... (other components) */}
    </div>
  );
};

export default SliderSwiperWrapper;
