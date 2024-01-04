/* eslint-disable @next/next/no-img-element */
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation, Pagination, Autoplay } from "swiper";
import { DataProp } from "@/app/data/data";
import ItemLines from "../ItemLines/ItemLines";
import "./sliderhorizontal.css";
import "swiper/swiper.min.css";
import "swiper/components/navigation/navigation.min.css";
import "swiper/components/pagination/pagination.min.css";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface HorizontalSliderProps {
  items?: DataProp[];
  onItemClicked: (item: DataProp) => void;
  activeIndex: number;
}

const HorizontalSlider: React.FC<HorizontalSliderProps> = ({
  items,
  onItemClicked,
}) => {
  const handleSlideChange = (swiper: Swiper) => {
    // Handle slide change, if needed
    const activeIndex = swiper.activeIndex;
    if (activeIndex !== undefined && items) {
      onItemClicked(items[activeIndex]);
    }
  };

  return (
    <Swiper
      spaceBetween={10} // Adjust as needed
      slidesPerView={1} // Adjust as needed
      pagination={{ clickable: true }}
      onSlideChange={handleSlideChange}
      loop
      autoplay={{ delay: 2000, disableOnInteraction: false }}
    >
      {items &&
        items.map((item, index) => (
          <SwiperSlide key={index}>
            <div className="swiper-slide">
              {/* Your Image Component Here */}
              <img
                src={`/images/${item?.img}`}
                alt={`Item ${index}`}
                className="swiper-image"
              />
              {/* Item Lines Overlay */}
              <div className="item-lines-overlay">
                <ItemLines items={items} activeIndex={index} />
              </div>
              {/* Titles at Bottom Left */}
              <div className="bottom-left-titles">
                <div className="brand-title">
                  {item?.brand || "Default Brand"}
                </div>
                <div className="item-title">
                  {item?.title || "Default Title"}
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};

export default HorizontalSlider;
