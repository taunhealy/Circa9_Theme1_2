// ProductionTitle.tsx
import React from "react";
import { DataProp } from "@/app/data/data";

interface ProductionTitleProps {
  selectedBrand: string | null;
  currentIndex: number;
  filteredItems: DataProp[];
  itemsData: DataProp[]; // Make sure this is included
}

const ProductionTitle: React.FC<ProductionTitleProps> = ({
  currentIndex,
  filteredItems,
  itemsData, // Include it in the destructuring
}) => {
  const currentProduction =
    filteredItems[currentIndex]?.production || "Default Production";

  console.log("ProductionTitle currentIndex:", currentIndex);
  console.log("ProductionTitle filteredItems:", filteredItems);
  console.log("ProductionTitle currentProduction:", currentProduction);

  return (
    <div className="production-title-container">
      <div className="production-title">{currentProduction}</div>
    </div>
  );
};

export default ProductionTitle;
