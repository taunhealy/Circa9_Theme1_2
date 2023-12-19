// SliderSwiper.tsx
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";
import BrandFilterButton from "../../Buttons/BrandFilterButtons";
import Cursor from "../../Cursors/Cursor";
import { useNextPrevHandlers } from "@/app/utilities/nextPrevHandlers";
import { DataProp } from "@/app/data/data";
import ItemLines from "../../ItemLines/ItemLines";
import "./sliderswiper.css";
import debounce from "lodash/debounce";

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

    if (selectedBrand === "Recent") {
      return items
        .filter((item) => item.date)
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .slice(0, 9);
    }

    return items.filter((item) => item.brand === selectedBrand);
  }, [selectedBrand, items]);
  // Total items logic
  const totalItems = useMemo(() => {
    return selectedBrand === "Recent"
      ? items?.filter((item) => item.date).length ?? 0
      : items?.filter((item) => item.brand === selectedBrand).length ?? 0;
  }, [selectedBrand, items]);

  const { handleNextPrevItems } = useNextPrevHandlers({
    totalItems,
    currentIndex,
    setCurrentIndex,
  });

  // Function to handle item click and navigate to the item

  const handleItemClick = (
    index: number,
    onSelectItem: (item: DataProp) => void
  ) => {
    const clickedItem = filteredItems[index];

    if (clickedItem) {
      onSelectItem(clickedItem);
    }
  };

  // Use effect for updating active index
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Reset currentIndex when selectedBrand changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedBrand]);

  // Modal handling
  const handleModal = () => {
    const selectedItem = filteredItems[currentIndex];
    if (selectedItem) {
      onItemClicked(selectedItem);
    }
  };

  const debouncedHandleNextPrevItems = debounce(handleNextPrevItems, 125);

  const handleMouseWheel = (event: React.WheelEvent<HTMLDivElement>) => {
    // Use the deltaY property to determine the direction of the wheel scroll
    const direction = event.deltaY > 0 ? "next" : "prev";

    // Call the existing function to handle next/prev items
    debouncedHandleNextPrevItems(direction);
  };

  // Function to handle touchpad scrolling events with debounce
  const handleTouchpadScroll = (event: React.TouchEvent<HTMLDivElement>) => {
    // Determine the touch direction based on the change in Y coordinate
    const direction =
      event.changedTouches[0].clientY > event.touches[0].clientY
        ? "next"
        : "prev";

    // Call the debounced function to handle next/prev items
    debouncedHandleNextPrevItems(direction);
  };
  // Current production title
  const currentProduction =
    filteredItems[currentIndex]?.production || "Default Production";

  const brandFilterAnimation = {
    initial: { opacity: 0, y: -10 },
    hidden: { opacity: 0, y: 0 },
    show: {
      transition: {
        staggerChildren: 0.34,
        duration: 0.5,
      },
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: 0,
      transition: {
        ease: "easeInOut",
        duration: 0.4,
      },
    },
  };

  return (
    <div
      className="item-background-container"
      onWheel={handleMouseWheel}
      onTouchMove={handleTouchpadScroll}
    >
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
          key="brandfilter"
          className="brand-filter-sidebar"
          onMouseOver={() => setShowCursor(true)}
          onMouseLeave={() => setShowCursor(false)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { duration: 2.5 } }}
          exit={{ opacity: 0, transition: { duration: 0.5, delay: 1.2 } }}
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
              transition: { duration: 1.57, ease: "easeInOut" },
            }}
          >
            <motion.img
              className="thumbnail-image"
              src={`https://image.mux.com/${filteredItems[currentIndex]?.playbackId}/thumbnail.png?time=1`}
              alt="Video Thumbnail"
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
              <ChevronRight size={27} strokeWidth={2.5} stroke="black" />
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
              <ChevronRight />
            </motion.div>
          </motion.button>
        </motion.div>
      </AnimatePresence>

      <div className="item-lines-container">
        <ItemLines items={filteredItems} activeIndex={activeIndex} />
      </div>
    </div>
  );
};

export default SliderSwiper;
