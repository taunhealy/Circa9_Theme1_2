"use client";

// Card.tsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MuxThumbnail from "./MuxThumbnail/MuxThumbnail";
import MuxGIF from "./MuxGIF/MuxGIF"; // Import your MuxGIF component
import "./card.scss";

interface DataProp {
  id: number;
  title: string;
  brand: string;
  img: string;
  desc: string;
  director: string;
  production: string;
  cinematographer: string;
  editor: string;
  date: string;
  playbackId: string;
}

interface CardProps {
  itemsData: DataProp[];
}

interface FadeInWhenVisibleProps {
  children: React.ReactNode;
  index: number;
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  index,
}) => {
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
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: index / 4 + 0.5,
            ease: "easeInOut",
            delay: (index / 3) * 0.03,
          },
        },
        hidden: { opacity: 0, y: 20 },
      }}
      custom={index}
    >
      {children}
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ itemsData }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div className="card-container">
      <div className="card">
        {itemsData.map((item, index) => (
          <FadeInWhenVisible key={item.id} index={index}>
            <div
              className="card-item"
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={() => setIsHovered(false)}
            >
              <div className="card-image-container">
                <motion.div
                  className="card-image"
                  initial={{ opacity: 0.45 }}
                  whileHover={{ opacity: 1, transition: { duration: 0.05 } }}
                >
                  {isHovered ? (
                    <MuxGIF
                      src={`https://image.mux.com/${item.playbackId}/animated.gif?width=540`}
                      width={1000}
                      height={1000}
                      alt="mux-gif"
                    />
                  ) : (
                    <MuxThumbnail playbackId={item.playbackId} time={15} />
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
