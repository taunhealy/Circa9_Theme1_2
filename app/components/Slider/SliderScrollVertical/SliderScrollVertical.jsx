import { useLayoutEffect, useRef } from "react";

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./styles.css";

export default function App() {
  const el = useRef(null);
  const child = gsap.utils.selector(el);
  // const tl = gsap.timeline();
  gsap.registerPlugin(ScrollTrigger);

  useLayoutEffect(() => {
    child(".panel").forEach((panel) => {
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
      <section className=" panel red">
        <h1 className="1">page one</h1>
      </section>
      <section className=" panel green">
        <h1 className="2">page two</h1>
      </section>
      <section className=" panel yelow">
        <h1 className="3">page tree</h1>
      </section>
      <section className=" panel blue">
        <h1>page four</h1>
      </section>
      <section className=" panel pink">
        <h1>page five</h1>
      </section>
      <section className=" panel turkey">
        <h1>page six</h1>
      </section>
    </main>
  );
}
