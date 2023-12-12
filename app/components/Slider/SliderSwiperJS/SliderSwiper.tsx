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
  // Add console log to check if items is correct
  console.log("SliderSwiper items:", items);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const [showCursor, setShowCursor] = useState(false);
  const contentControls = useAnimation(); // Use useAnimation for content animation
  const [activeIndex, setActiveIndex] = useState(0); // Manage activeIndex state
  const [brandIndices, setBrandIndices] = useState<{ [brand: string]: number }>(
    {}
  );
  const [selectedItem, setSelectedItem] = useState<DataProp | null>(null);
  const [isModalOpen, setModalOpen] = useState(false);

  const brands = useMemo(() => {
    if (!items) {
      return ["Recent"];
    }

    const uniqueBrands = Array.from(
      new Set(
        items.filter((item) => item.brand !== "all").map((item) => item.brand)
      )
    );
    return ["Recent", ...uniqueBrands];
  }, [items]);

  // Filter items by date
  const filteredItems = useMemo(() => {
    if (!items) {
      console.log("No items");
      return []; // Handle the case where items is undefined
    }

    if (selectedBrand === "Recent") {
      // Use the correct logic for sorting and slicing
      return items
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    } else {
      // Use the correct logic for filtering items by brand
      return items.filter((item) => item.brand === selectedBrand);
    }
  }, [selectedBrand, items]);

  console.log("Filtered Items:", filteredItems);

  const totalItems = useMemo(() => {
    return selectedBrand === "Recent"
      ? selectedItem
        ? 1
        : 0 // Check if selectedItem is not null or undefined
      : items?.filter((item) => item.brand === selectedBrand).length ?? 0;
  }, [selectedBrand, items, selectedItem]);

  const arrowControls = useAnimation();

  const { handleNextPrevItems } = useNextPrevHandlers({
    totalItems,
    currentIndex,
    setCurrentIndex,
  });

  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  const openModal = () => {
    const selectedItem = filteredItems[currentIndex];
    if (selectedItem) {
      onItemClicked(selectedItem); // Notify the parent component about the clicked item
    }
  };

  const closeModal = () => {
    setModalOpen(false);
  };

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
          onClick={openModal}
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
                ? filteredItems[0]?.brand // Render the first item of the selected brand
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
                ? filteredItems[0]?.title // Render the title of the first item of the selected brand
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
              key={brand}
              brand={brand}
              selected={brand === selectedBrand}
              onClick={() =>
                setSelectedBrand(brand === selectedBrand ? null : brand)
              } // Toggle null when clicking the already selected brand
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
          onClick={openModal}
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
              itemData={
                filteredItems[currentIndex] ||
                (filteredItems.length > 0 && filteredItems[0])
              }
              time={1}
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
