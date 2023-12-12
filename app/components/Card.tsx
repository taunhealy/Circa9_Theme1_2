"use client";
/* eslint-disable @next/next/no-img-element */
// Card.tsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MuxThumbnailGIF from "./MuxThumbnailGIF/MuxThumbnailGIF";
import "./card.scss";
import { CardProps } from "../data/data";

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
      initial={{ opacity: 0 }} // Set initial opacity to 0
      animate={controls}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ duration: 1.2 }} // Adjust the duration property as needed
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
                  initial={{ opacity: 0.2 }}
                  whileHover={{
                    opacity: 1,
                    transition: { duration: 0.5, delay: 0.1 },
                  }} // Adjust the delay property as needed
                >
                  {hoveredIndex === index ? (
                    <MuxThumbnailGIF
                      className="card-gif"
                      playbackId={item.playbackId}
                    />
                  ) : (
                    <img
                      src={`https://image.mux.com/${item.playbackId}/thumbnail.png?time=0`}
                      alt="Video Thumbnail"
                      className="card-image"
                    />
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
