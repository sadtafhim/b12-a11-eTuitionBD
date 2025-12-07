import React from "react";
import { motion, useScroll, useSpring } from "motion/react";
import Hero from "./Components/Hero/Hero";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import ChooseUs from "./Components/ChooseUs/ChooseUs";
import ParallaxSection from "./Components/Parallax/Parallax";

const Home = () => {
  const { scrollYProgress } = useScroll();

  // Progress bar animation
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <div className="relative">
      <motion.div
        className="fixed top-0 left-0 h-1 bg-purple-500 origin-left z-50"
        style={{ scaleX }}
      />

      <ParallaxSection distance={300}>
        <Hero></Hero>
      </ParallaxSection>

      <ParallaxSection distance={350}>
        <HowItWorks></HowItWorks>
      </ParallaxSection>

      <ParallaxSection distance={400}>
        <ChooseUs></ChooseUs>
      </ParallaxSection>

      <ParallaxSection distance={450}>
        <div className="text-3xl font-bold p-20 bg-gray-100 rounded-lg shadow-xl">
          Choltese
        </div>
      </ParallaxSection>
    </div>
  );
};

export default Home;
