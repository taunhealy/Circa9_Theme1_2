/* eslint-disable @next/next/no-img-element */
import { useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";
import ItemsData from "@/app/data/data";

const SliderScrollVertical = ({ itemsData, onItemClicked }) => {
  const el = useRef(null);
  const child = gsap.utils.selector(el);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    child(".panel").forEach((panel, index) => {
      gsap.from(panel.querySelector("h1"), {
        x: 0,
        scrollTrigger: {
          trigger: panel,
          scroller: el.current,
          markers: true,
          scrub: true,
        },
      });
    });
  }, []);

  return (
    <main ref={el} className="container">
      {itemsData.map((item, index) => (
        <section key={index} className="panel">
          <h1 className="title">{item.title}</h1>
          {/* You can also include the image here */}
          <img src={item.img} alt={item.title} className="image" />
        </section>
      ))}
    </main>
  );
};

export default SliderScrollVertical;
