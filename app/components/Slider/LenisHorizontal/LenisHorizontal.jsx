/* eslint-disable @next/next/no-img-element */
import { ReactLenis } from "@studio-freight/react-lenis";
import { useEffect, useRef } from "react";
import "./lenishorizontal.css";

const LenisHorizontal = ({ items, onItemClicked }) => {
  const containerRef = useRef(null);

  return (
    <ReactLenis
      root
      options={{ orientation: "horizontal", gestureOrientataion: "both" }}
    >
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
    </ReactLenis>
  );
};

export default LenisHorizontal;
