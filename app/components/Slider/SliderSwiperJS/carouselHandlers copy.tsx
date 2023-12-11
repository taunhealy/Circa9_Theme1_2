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
    const animation = {
      opacity: 0,
      transition: { duration: 0.2, ease: "easeInOut" },
    };

    const nextAnimation = {
      opacity: 1,
      transition: { duration: 0.2, ease: "easeInOut" },
    };

    // Start the first animation
    (contentControls?.start || defaultControls.start)(animation).then(() => {
      // Update the index and start the second animation
      setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalItems);
      (contentControls?.start || defaultControls.start)(nextAnimation);
    });

    // Arrow bounce effect
    arrowControls?.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.2, ease: "easeInOut" },
    });
  }, [
    contentControls,
    defaultControls,
    setCurrentIndex,
    totalItems,
    arrowControls,
  ]);

  const handlePrevItem = useCallback(() => {
    const animation = {
      opacity: 0,
      transition: { duration: 0.1, ease: "easeInOut" },
    };

    const nextAnimation = {
      opacity: 1,
      transition: { duration: 0.1, ease: "easeInOut" },
    };

    // Start the first animation
    (contentControls?.start || defaultControls.start)(animation).then(() => {
      // Update the index and start the second animation
      setCurrentIndex(
        (prevIndex: number) => (prevIndex - 1 + totalItems) % totalItems
      );
      (contentControls?.start || defaultControls.start)(nextAnimation);
    });

    // Arrow bounce effect
    arrowControls?.start({
      scale: [1, 1.2, 1],
      transition: { duration: 0.1, ease: "easeInOut" },
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
