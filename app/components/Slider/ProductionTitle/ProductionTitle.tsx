// ProductionTitle.tsx
import React from "react";
import { DataProp } from "@/app/data/data";

interface ProductionTitleProps {
  selectedBrand: string | null;
  currentIndex: number;
  filteredItems: DataProp[];
  itemsData: DataProp[];
}

const ProductionTitle: React.FC<ProductionTitleProps> = ({
  currentIndex,
  filteredItems,
}) => {
  const currentProduction =
    filteredItems[currentIndex]?.production || "Default Production";

  console.log("currentIndex:", currentIndex);
  console.log("filteredItems:", filteredItems);
  console.log("currentProduction:", currentProduction);

  return (
    <div className="production-title-container">
      <div className="production-title">{currentProduction}</div>
    </div>
  );
};

export default ProductionTitle;
