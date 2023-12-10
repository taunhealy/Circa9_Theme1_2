import React from "react";

interface DirectorsProps {
  filterFunction: (director: string) => void;
  directors: string[]; // Assuming this is an array of unique directors
}

const Directors: React.FC<DirectorsProps> = ({ filterFunction, directors }) => {
  return (
    <div className="btn-container">
      {directors.map((director, idx) => (
        <button
          type="button"
          key={idx}
          className="filter-btn"
          onClick={() => filterFunction(director)}
        >
          {director}
        </button>
      ))}
    </div>
  );
};

export default Directors;
