// carouselHandlers.ts
import { useAnimation, TargetAndTransition } from "framer-motion";
import { useCallback } from "react";

interface CarouselHandlersProps {
  totalItems: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  contentControls?: {
    start: (animation: TargetAndTransition) => Promise<any>;
  };
  arrowControls?: {
    start: (animation: TargetAndTransition) => Promise<any>;
  };
}

export const useCarouselHandlers = ({
  totalItems,
  setCurrentIndex,
  contentControls,
  arrowControls,
}: CarouselHandlersProps) => {
  const defaultControls = useAnimation();

  const handleNextItem = useCallback(() => {
    (contentControls?.start || defaultControls.start)({
      opacity: 0,
      transition: { duration: 0.5 },
    }).then(() => {
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalItems);
      (contentControls?.start || defaultControls.start)({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    });

    // Arrow bounce effect
    arrowControls?.start({
      scale: [1, 1.2, 1], // Adjust the scale values as needed
      transition: { duration: 0.3 },
    });
  }, [
    contentControls,
    defaultControls,
    setCurrentIndex,
    totalItems,
    arrowControls,
  ]);

  const handlePrevItem = useCallback(() => {
    (contentControls?.start || defaultControls.start)({
      opacity: 0,
      transition: { duration: 0.5 },
    }).then(() => {
      setCurrentIndex(
        (prevIndex: number) => (prevIndex - 1 + totalItems) % totalItems
      );
      (contentControls?.start || defaultControls.start)({
        opacity: 1,
        transition: { duration: 0.5 },
      });
    });

    // Arrow bounce effect
    arrowControls?.start({
      scale: [1, 1.2, 1], // Adjust the scale values as needed
      transition: { duration: 0.3 },
    });
  }, [
    contentControls,
    defaultControls,
    setCurrentIndex,
    totalItems,
    arrowControls,
  ]);

  return { handleNextItem, handlePrevItem };
};
