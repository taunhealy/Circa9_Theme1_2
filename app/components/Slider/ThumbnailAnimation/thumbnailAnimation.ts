// thumbnailAnimation.ts
import { TargetAndTransition } from "framer-motion";

export const thumbnailAnimation = async (controls: any) => {
  const animation: TargetAndTransition = {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.27, ease: "easeInOut" },
  };

  const exitAnimation: TargetAndTransition = {
    opacity: 0,
    scale: 0.99,
    transition: { duration: 0.27, ease: "easeInOut" },
  };

  await controls.start(animation);
  await controls.start(exitAnimation);
};
