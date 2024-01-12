// useScrollTrigger.js
import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const useScrollTrigger = (ref) => {
  useEffect(() => {
    const panels = ref.current.querySelectorAll(".panel");

    panels.forEach((panel, index) => {
      ScrollTrigger.create({
        trigger: panel,
        scroller: ref.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        markers: true, // Add markers for debugging
      });
    });
  }, [ref]);
};

export default useScrollTrigger;
