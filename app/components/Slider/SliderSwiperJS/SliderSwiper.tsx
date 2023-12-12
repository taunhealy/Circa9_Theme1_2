// SliderSwiper.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronLeftCircle, ChevronRightCircle } from "lucide-react";
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import "./sliderswiper.scss";
import MuxThumbnail from "../../MuxThumbnail/MuxThumbnail";
import { useNextPrevHandlers } from "@/app/utilities/nextPrevHandlers";
import { DataProp } from "@/app/data/data";
import ItemLines from "../../ItemLines/ItemLines";

interface SliderProps {
  items?: DataProp[];
  onItemClicked: (item: DataProp) => void;
}

const SliderSwiper: React.FC<SliderProps> = ({ items, onItemClicked }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [showCursor, setShowCursor] = useState(false);
  const contentControls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [brandIndices, setBrandIndices] = useState<{ [brand: string]: number }>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<DataProp | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  // Brand filtering logic
  const brands = useMemo(() => {
    if (!items) return ["Recent"];
    const brandsSet = new Set(
      items.map((item) => item.brand !== "all" && item.brand)
    );
    return ["Recent", ...Array.from(brandsSet)];
  }, [items]);

  // Item filtering logic
  const filteredItems = useMemo(() => {
    if (!items) return [];
    return selectedBrand === "Recent"
      ? items
          .filter((item) => item.date)
          .sort(
            (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
          )
          .slice(0, 9)
      : items.filter((item) => item.brand === selectedBrand);
  }, [selectedBrand, items]);

  // Total items logic
  const totalItems = useMemo(() => {
    return selectedBrand === "Recent"
      ? selectedItem
        ? 1
        : 0
      : items?.filter((item) => item.brand === selectedBrand).length ?? 0;
  }, [selectedBrand, items, selectedItem]);

  // Use effect for updating active index
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Modal handling
  const handleModal = () => {
    const selectedItem = filteredItems[currentIndex];
    if (selectedItem) {
      onItemClicked(selectedItem);
    }
  };

  // Current production title
  const currentProduction =
    filteredItems[currentIndex]?.production || "Default Production";

  return (
    <div className="item-background-container">
      <AnimatePresence>
        <motion.section
          key={selectedBrand}
          className="item-titles"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0 }}
          onClick={handleModal}
        >
          {showCursor && <Cursor setShowCursor={setShowCursor} key="cursor" />}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
          >
            <div className="brand-title">
              {filteredItems[currentIndex]
                ? filteredItems[currentIndex]?.brand
                : filteredItems.length > 0
                ? filteredItems[0]?.brand
                : "Default Brand"}
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.2, delay: 0.1 } }}
          >
            <div className="item-title">
              {filteredItems[currentIndex]
                ? filteredItems[currentIndex]?.title
                : filteredItems.length > 0
                ? filteredItems[0]?.title
                : "Default Title"}
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      <div className="production-title-container">
        <div className="production-title">{currentProduction}</div>
      </div>

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
              key={String(brand)} // Ensure 'key' is always a string
              brand={String(brand)} // Ensure 'brand' is always a string
              selected={brand === selectedBrand}
              onClick={() => {
                setSelectedBrand(
                  brand === selectedBrand ? null : String(brand)
                );
                return void 0;
              }}
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
          onClick={handleModal}
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
              time={1}
              itemData={
                filteredItems[currentIndex] ||
                (filteredItems.length > 0 && filteredItems[0])
              }
            />
          </motion.div>
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div className="nextprev-button-wrapper">
          {/* Previous and Next button logic... */}
        </motion.div>
      </AnimatePresence>
      <div className="item-lines-container">
        <ItemLines items={filteredItems} activeIndex={activeIndex} />
        <div className="production-title-container">
          <div className="production-title">{currentProduction}</div>
        </div>
      </div>
    </div>
  );
};

export default SliderSwiper;
