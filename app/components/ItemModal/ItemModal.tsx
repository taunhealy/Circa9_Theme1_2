// ItemModal.tsx
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { DataProp } from "@/app/data/data";
import Image from "next/image";

interface ItemModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItem: DataProp | null;
}

const ItemModal: React.FC<ItemModalProps> = ({
  isOpen,
  onClose,
  selectedItem,
}) => {
  if (!isOpen || !selectedItem) {
    return null;
  }

  const { img, brand, title, production } = selectedItem;

  return (
    <AnimatePresence>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="modal-content"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
        >
          <div className="modal-header">
            <button className="close-button" onClick={onClose}>
              Close
            </button>
          </div>
          <div className="modal-body">
            <Image
              src={`/images/${img}`}
              alt="Modal Image"
              width="800"
              height="800"
            />
            <div className="modal-details">
              <h2>{brand}</h2>
              <h3>{title}</h3>
              <p>{production}</p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ItemModal;
