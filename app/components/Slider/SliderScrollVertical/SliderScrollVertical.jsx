/* eslint-disable @next/next/no-img-element */
// SliderScrollVertical.js
import { useEffect, useRef } from "react";
import "./styles.css";

import Lenis from "@studio-freight/lenis";

const SliderScrollVertical = ({ items, onItemClicked }) => {
  const containerRef = useRef(null);

  const lenis = new Lenis();

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  return (
    <main>
      <div className="overlay">
        <div className="overlay-top"></div>
        <div className="overlay-bottom"></div>
      </div>
      <div ref={containerRef} className="container">
        {items.map((item, index) => (
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
