// CustomCursor.tsx
import React, { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "./CustomCursor.scss";

const CustomCursor: React.FC = () => {
  const [cursorStyle, setCursorStyle] = useState<string>("default");

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX } = e;
      const screenWidth = window.innerWidth;

      // Change cursor style based on mouse position relative to the screen
      if (clientX < screenWidth * 0.5) {
        setCursorStyle("left-arrow");
      } else {
        setCursorStyle("right-arrow");
      }
    };

    document.addEventListener("mousemove", handleMouseMove);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  return (
    <div className={`custom-cursor ${cursorStyle}`}>
      {cursorStyle === "left-arrow" && (
        <ChevronLeft size={30} strokeWidth={2.5} />
      )}
      {cursorStyle === "right-arrow" && (
        <ChevronRight size={30} strokeWidth={2.5} />
      )}
    </div>
  );
};

export default CustomCursor;
