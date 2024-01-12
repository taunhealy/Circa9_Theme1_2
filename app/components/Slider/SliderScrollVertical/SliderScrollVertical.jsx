"use client";

/* eslint-disable @next/next/no-img-element */
import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

const SliderScrollVertical = ({ itemsData, onItemClicked }) => {
  const el = useRef(null);
  const child = gsap.utils.selector(el);

  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    const panels = child(".panel");

    panels.forEach((panel, index) => {
      gsap.from(panel.querySelector("h1"), {
        x: 0,
        scrollTrigger: {
          trigger: panel,
          scroller: el.current,
          markers: false,
          scrub: true,
          start: "top top",
          end: "bottom bottom",
        },
      });
    });
  }, []);

  return (
    <main ref={el} className="container">
      <div className="overlay">
        <div className="overlay-top"></div>
        <div className="overlay-bottom"></div>
      </div>
      <div className="slider">
        {itemsData.map((item, index) => (
          <section key={index} className="panel">
            <h1 className="title">{item.title}</h1>
            <img src={item.img} alt={item.title} className="image" />
          </section>
        ))}
      </div>
    </main>
  );
};

export default SliderScrollVertical;
