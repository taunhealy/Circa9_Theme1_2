/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./sliderscrollvertical.css";
import ItemsData from "@/app/data/data";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SliderScrollVertical = () => {
  const panelsRef = useRef([]); // Use a ref to store panel references
  const panels = panelsRef.current;

  useEffect(() => {
    panelsRef.current = gsap.utils.toArray(".panel");
    const observer = ScrollTrigger.normalizeScroll(true);
    let scrollTween;

    document.addEventListener(
      "touchstart",
      (e) => {
        if (scrollTween) {
          e.preventDefault();
          e.stopImmediatePropagation();
        }
      },
      { capture: true, passive: false }
    );

    const goToSection = (i) => {
      scrollTween = gsap.to(window, {
        scrollTo: { y: panels[i].offsetTop, autoKill: false },
        onStart: () => {
          observer.disable();
          observer.enable();
        },
        duration: 1,
        onComplete: () => (scrollTween = null),
        overwrite: true,
      });
    };

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: (self) => {
          console.log(`Panel ${i} toggled: ${self.isActive}`);
          if (self.isActive && !scrollTween) {
            goToSection(i);
          }
        },
      });
    });

    ScrollTrigger.create({
      start: 0,
      end: "max",
      snap: 1 / (panels.length - 1),
    });

    // Cleanup function
    return () => {
      document.removeEventListener(
        "touchstart",
        (e) => {
          if (scrollTween) {
            e.preventDefault();
            e.stopImmediatePropagation();
          }
        },
        { capture: true, passive: false }
      );
    };
  }, [panels]);

  console.log("ItemsData:", ItemsData);

  return (
    <div className="slider-scroll-vertical">
      {panels.map((panel, index) => (
        <section key={index} className="panel">
          <div className="image-container">
            <img src={ItemsData[index].img} alt={`Image ${index}`} />
          </div>
          <div className="panel-content">
            <h2>{ItemsData[index].title}</h2>
            <p>{ItemsData[index].brand}</p>
          </div>
        </section>
      ))}
    </div>
  );
};

export default SliderScrollVertical;
