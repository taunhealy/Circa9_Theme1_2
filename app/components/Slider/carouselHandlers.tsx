// carouselHandlers.ts
import { useAnimation, TargetAndTransition } from "framer-motion";
import { useCallback } from "react";

interface CarouselHandlersProps {
  totalItems: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useCarouselHandlers = ({
  totalItems,
  setCurrentIndex,
}: CarouselHandlersProps) => {
  const controls = useAnimation();

  // By using the then method, you ensure that the logic in the callback will execute after the animation is complete

  const handleNextItem = useCallback(() => {
    controls
      .start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      .then(() => {
        setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalItems);
        controls.start({
          opacity: 1,
          transition: { duration: 0.5 },
        } as TargetAndTransition);
      });
  }, [controls, setCurrentIndex, totalItems]);

  const handlePrevItem = useCallback(() => {
    controls
      .start({
        opacity: 0,
        transition: { duration: 0.5 },
      })
      .then(() => {
        setCurrentIndex(
          (prevIndex: number) => (prevIndex - 1 + totalItems) % totalItems
        );
        controls.start({
          opacity: 1,
          transition: { duration: 0.5 },
        } as TargetAndTransition);
      });
  }, [controls, setCurrentIndex, totalItems]);

  return { handleNextItem, handlePrevItem };
};
