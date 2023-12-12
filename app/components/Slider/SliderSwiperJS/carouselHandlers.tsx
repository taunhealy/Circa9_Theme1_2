// carouselHandlers.ts
import { useCallback } from "react";

interface CarouselHandlersProps {
  totalItems: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useCarouselHandlers = ({
  totalItems,
  setCurrentIndex,
}: CarouselHandlersProps) => {
  const handleNextItem = useCallback(() => {
    setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalItems);
  }, [setCurrentIndex, totalItems]);

  const handlePrevItem = useCallback(() => {
    setCurrentIndex(
      (prevIndex: number) => (prevIndex - 1 + totalItems) % totalItems
    );
  }, [setCurrentIndex, totalItems]);

  return { handleNextItem, handlePrevItem };
};
