/* eslint-disable @next/next/no-img-element */
// Card.tsx
import React, { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import MuxThumbnailGIF from "./MuxThumbnailGIF/MuxThumbnailGIF";
import ModalComponent from "./PortfolioItemsModal/ModalComponent"; // Adjust the path

import "./card.scss";
import { CardProps, DataProp } from "../data/data";

export interface CardItemProps {
  item: DataProp;
  onThumbnailClick: (item: DataProp) => void;
}

const CardItem: React.FC<CardItemProps> = ({ item, onThumbnailClick }) => {
  const [hovered, setHovered] = useState(false);

  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  const handleThumbnailClick = () => {
    onThumbnailClick(item);
  };

  return (
    <motion.div
      ref={ref}
      className="card-item"
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ duration: 1.2 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={handleThumbnailClick}
    >
      <div className="card-image-container">
        <motion.div
          className="card-image"
          initial={{ opacity: 0.2 }}
          whileHover={{
            opacity: 1,
            transition: { duration: 0.5, delay: 0.1 },
          }}
        >
          {hovered ? (
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
    </motion.div>
  );
};

const Card: React.FC<CardProps> = ({ itemsData, onThumbnailClick }) => {
  const [selectedItem, setSelectedItem] = useState<DataProp | null>(null);

  const handleThumbnailClick = (item: DataProp) => {
    setSelectedItem(item);
  };

  const handleCloseModal = () => {
    setSelectedItem(null);
  };

  return (
    <div className="card-container">
      <div className="card">
        {itemsData.map((item) => (
          <CardItem
            key={item.id}
            item={item}
            onThumbnailClick={handleThumbnailClick}
          />
        ))}
      </div>

      <ModalComponent
        isOpen={!!selectedItem}
        onClose={handleCloseModal}
        selectedItem={selectedItem}
      />
    </div>
  );
};

export default Card;
