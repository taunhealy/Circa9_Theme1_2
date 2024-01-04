/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { ChevronRight } from "lucide-react";

import { useNextPrevHandlers } from "@/app/utilities/nextPrevHandlers";
import { DataProp } from "@/app/data/data";
import "./stretchslider.css";

interface StretchSliderProps {
  items?: DataProp[];
  onItemClicked: (item: DataProp) => void;
}

const StretchSlider: React.FC<StretchSliderProps> = ({
  items,
  onItemClicked,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedBrand, setSelectedBrand] = useState<string | null>("Recent");
  const contentControls = useAnimation();
  const [activeIndex, setActiveIndex] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  // Brand filtering logic
  const brands = useMemo(() => {
    if (!items) return ["Recent"];
    const brandsSet = new Set(
      items.filter((item) => item.brand !== "all").map((item) => item.brand)
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

  // Use effect for updating active index
  useEffect(() => {
    setActiveIndex(currentIndex);
  }, [currentIndex]);

  // Reset currentIndex when selectedBrand changes
  useEffect(() => {
    setCurrentIndex(0);
  }, [selectedBrand]);

  // Function to handle item click and navigate to the item
  const handleItemClick = (index: number) => {
    const clickedItem = filteredItems[index];

    if (clickedItem) {
      onItemClicked(clickedItem);
    }
  };

  // Function to open modal
  const handleModal = () => {
    setModalOpen(true);
  };

  // Function to close modal
  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
    <div className="stretch-slider-container">
      <AnimatePresence>
        <motion.section
          className="stretch-slider-titles"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1, transition: { duration: 0.3 } }}
          exit={{ opacity: 0 }}
          onClick={handleModal}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1, transition: { duration: 0.3 } }}
          >
            <div className="stretch-brand-title">
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
            <div className="stretch-item-title">
              {filteredItems[currentIndex]
                ? filteredItems[currentIndex]?.title
                : filteredItems.length > 0
                ? filteredItems[0]?.title
                : "Default Title"}
            </div>
          </motion.div>
        </motion.section>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div
          className="stretch-thumbnail-container"
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
          onClick={() => handleItemClick(currentIndex)}
        >
          <img
            className="stretch-thumbnail-image"
            src={`/images/${filteredItems[currentIndex]?.img}`}
            alt="Thumbnail Image"
            width={1000}
            height={1000}
          />
        </motion.div>
      </AnimatePresence>

      <AnimatePresence>
        <motion.div className="stretch-slider-nextprev-buttons">
          <motion.button
            title="button-next"
            type="button"
            className="button-next"
            onClick={() => handleNextPrevItems("next")}
            animate={{ scale: 1.2 }}
          >
            <motion.div>
              <ChevronRight />
            </motion.div>
          </motion.button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default StretchSlider;
