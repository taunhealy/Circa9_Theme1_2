import React from "react";
import SliderSwiper from "./components/Slider/SliderSwiperJS/SliderSwiper";
import ItemsData from "@/app/data/data";
import "@/styles/layouts.css";
import "./data/data";
import Card from "./components/Card";
import { DataProp } from "@/app/data/data";

function Page() {
  return (
    <div>
      <SliderSwiper items={ItemsData} />
      <Card itemsData={ItemsData} />
    </div>
  );
}

export default Page;
