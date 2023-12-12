// FadeInWhenVisible.tsx
import React, { ReactNode } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface FadeInWhenVisibleProps {
  children: ReactNode;
  onThumbnailClick: () => void; // Add the missing prop here
}

const FadeInWhenVisible: React.FC<FadeInWhenVisibleProps> = ({
  children,
  onThumbnailClick,
}) => {
  const controls = useAnimation();
  const [ref, inView] = useInView();

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    }
  }, [controls, inView]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0 }}
      animate={controls}
      variants={{
        visible: { opacity: 1 },
        hidden: { opacity: 0 },
      }}
      transition={{ duration: 1.2 }}
      onClick={onThumbnailClick} // Add the onClick handler here
    >
      {children}
    </motion.div>
  );
};

export default FadeInWhenVisible;
