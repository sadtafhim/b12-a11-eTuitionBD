import React from "react";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import ChooseUs from "./Components/ChooseUs/ChooseUs";
import Hero from "./Components/Hero/Hero";
const Home = () => {
  return (
    <div className="relative bg-[--color-base-100]">
      <Hero />
      <HowItWorks />
      <ChooseUs />
    </div>
  );
};

export default Home;
