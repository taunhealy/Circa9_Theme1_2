// nextPrevHandlers.ts
import { useCallback } from "react";

interface NextPrevHandlersProps {
  totalItems: number;
  currentIndex: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
}

export const useNextPrevHandlers = ({
  totalItems,
  currentIndex,
  setCurrentIndex,
}: NextPrevHandlersProps) => {
  const handleNextPrevItems = useCallback(
    (direction: "next" | "prev") => {
      if (direction === "next") {
        setCurrentIndex((prevIndex: number) => (prevIndex + 1) % totalItems);
      } else {
        setCurrentIndex(
          (prevIndex: number) => (prevIndex - 1 + totalItems) % totalItems
        );
      }
    },
    [setCurrentIndex, totalItems]
  );

  return { handleNextPrevItems };
};
