// SliderObserver.tsx
import React, { useEffect, useRef } from "react";
import gsap from "gsap";

interface SliderObserverProps {
  onUp: () => void;
  onDown: () => void;
}

const SliderObserver: React.FC<SliderObserverProps> = ({ onUp, onDown }) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = gsap
      .observer({
        targets: observerRef.current,
        onEnter: () => onUp(),
        onLeave: () => onDown(),
      })
      .scrollTrigger({
        trigger: observerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
      });

    return () => observer.kill(); // Cleanup observer on component unmount
  }, [onUp, onDown]);

  return <div ref={observerRef} style={{ height: "100vh" }} />;
};

export default SliderObserver;
