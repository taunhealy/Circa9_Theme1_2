// carouselHandlers.ts
import { useCallback } from "react";
import { DataProp } from "@/app/data/data";

interface CarouselHandlersProps {
  totalItems: number;
  setCurrentIndex: React.Dispatch<React.SetStateAction<number>>;
  brandIndices: { [brand: string]: number };
  setBrandIndices: React.Dispatch<
    React.SetStateAction<{ [brand: string]: number }>
  >;
  selectedBrand: string | null;
  filteredItems: DataProp[];
}

export const useCarouselHandlers = ({
  totalItems,
  setCurrentIndex,
  brandIndices,
  setBrandIndices,
  selectedBrand,
}: CarouselHandlersProps) => {
  const handleNextItem = useCallback(() => {
    setCurrentIndex((prevIndex: number) => {
      const indexKey = `${selectedBrand}_index`;

      if (selectedBrand === "Recent") {
        return (prevIndex + 1) % totalItems;
      } else {
        const storedIndex = brandIndices[indexKey];

        if (storedIndex !== undefined) {
          const nextBrandIndex = (storedIndex + 1) % totalItems;
          setBrandIndices((prevIndices) => ({
            ...prevIndices,
            [indexKey]: nextBrandIndex,
          }));
          return nextBrandIndex;
        } else {
          const nextBrandIndex = (prevIndex + 1) % totalItems;
          setBrandIndices((prevIndices) => ({
            ...prevIndices,
            [indexKey]: nextBrandIndex,
          }));
          return nextBrandIndex;
        }
      }
    });
  }, [
    setCurrentIndex,
    totalItems,
    selectedBrand,
    brandIndices,
    setBrandIndices,
  ]);

  const handlePrevItem = useCallback(() => {
    setCurrentIndex((prevIndex: number) => {
      const indexKey = `${selectedBrand}_index`;

      if (selectedBrand === "Recent") {
        return (prevIndex - 1 + totalItems) % totalItems;
      } else {
        const storedIndex = brandIndices[indexKey];

        if (storedIndex !== undefined) {
          const prevBrandIndex = (storedIndex - 1 + totalItems) % totalItems;
          setBrandIndices((prevIndices) => ({
            ...prevIndices,
            [indexKey]: prevBrandIndex,
          }));
          return prevBrandIndex;
        } else {
          const prevBrandIndex = (prevIndex - 1 + totalItems) % totalItems;
          setBrandIndices((prevIndices) => ({
            ...prevIndices,
            [indexKey]: prevBrandIndex,
          }));
          return prevBrandIndex;
        }
      }
    });
  }, [
    setCurrentIndex,
    totalItems,
    selectedBrand,
    brandIndices,
    setBrandIndices,
  ]);

  return { handleNextItem, handlePrevItem };
};
