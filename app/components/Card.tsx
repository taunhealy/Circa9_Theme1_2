"use client";

// Card.tsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MuxThumbnail from "./MuxThumbnail/MuxThumbnail";
import MuxGIF from "./MuxThumbnailGIF/MuxThumbnailGIF"; // Import your MuxGIF component
import "./card.scss";
import { CardProps } from "../data/data";
import MuxThumbnailGIF from "./MuxThumbnailGIF/MuxThumbnailGIF";
interface FadeInWhenVisibleProps {
  children: React.ReactNode;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({ children }) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial="hidden"
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
    >
      {children}
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ itemsData }) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="card-container">
      <div className="card">
        {itemsData.map((item, index) => (
          <FadeInWhenVisible key={item.id}>
            <div
              className="card-item"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div className="card-image-container">
                <motion.div
                  className="card-image"
                  initial={{ opacity: 0.45 }}
                  whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                >
                  {hoveredIndex === index ? (
                    <MuxThumbnailGIF playbackId={item.playbackId} />
                  ) : (
                    <MuxThumbnail playbackId={item.playbackId} time={10} />
                  )}
                </motion.div>
              </div>
            </div>
          </FadeInWhenVisible>
        ))}
      </div>
    </div>
  );
};

export default Card;
