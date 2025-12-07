"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

/**

 * @param {React.ReactNode} children 
 * @param {number} distance 
 */
export default function ParallaxSection({ children, distance = 300 }) {
  const ref = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [-distance, distance]);

  return (
    <section
      ref={ref}
      className="relative h-[150vh] md:h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ y }}
        className="z-20 w-full flex justify-center items-center"
      >
        {children}
      </motion.div>

      <motion.div
        style={{
          y: useTransform(
            scrollYProgress,
            [0, 1],
            [distance * 0.5, -distance * 0.5]
          ),
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-8xl font-black opacity-5 pointer-events-none whitespace-nowrap z-10"
      >
        eTuitionBD
      </motion.div>
    </section>
  );
}
