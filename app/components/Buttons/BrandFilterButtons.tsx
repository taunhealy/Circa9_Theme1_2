import React from "react";
import "./brandfilterbuttons.scss";

interface BrandFilterButtonProps {
  brand: string | boolean;
  selected: boolean;
  onClick: () => void;
  key: any;
}

const BrandFilterButton: React.FC<BrandFilterButtonProps> = ({
  brand,
  selected,
  onClick,
}) => {
  return (
    <button
      className={`brand-filter-buttons ${selected ? "active" : ""}`}
      type="button"
      title="button-filter-brand"
      onClick={onClick}
    >
      {brand}
    </button>
  );
};

export default BrandFilterButton;
