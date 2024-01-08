/* eslint-disable @next/next/no-img-element */
"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";

import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import "./sliderscrollvertical.css";
import ItemsData from "@/app/data/data";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

const SliderScrollVertical = () => {
  useEffect(() => {
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

    const goToSection = (i, panels) => {
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

    const panels = gsap.utils.toArray(".panel");

    panels.forEach((panel, i) => {
      ScrollTrigger.create({
        trigger: panel,
        start: "top bottom",
        end: "+=199%",
        onToggle: (self) => {
          console.log(`Panel ${i} toggled: ${self.isActive}`);
          if (self.isActive && !scrollTween) {
            goToSection(i, panels);
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
  }, []);

  console.log("ItemsData:", ItemsData);

  return (
    <div className="slider-scroll-vertical">
      {ItemsData.map((item, index) => {
        console.log(`Rendering item ${index}:`, item);

        return (
          <section key={index} className="panel">
            <div className="image-container">
              <Image
                className="thumbnail-image"
                src="/images/marcell-rubies-cKGtI-S5EPY-unsplash.webp" // Hardcoded path for testing
                alt="Thumbnail Image"
                width="500"
                height="500"
              />
            </div>
            <div className="panel-content">
              <h2>{item.title}</h2>
              <p>{item.brand}</p>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default SliderScrollVertical;
