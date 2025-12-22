import React from "react";
import HowItWorks from "./Components/HowItWorks/HowItWorks";
import ChooseUs from "./Components/ChooseUs/ChooseUs";
import Hero from "./Components/Hero/Hero";
import LatestTuitions from "./Components/LatestTuitions/LatestTuitions";
import LatestTutors from "./Components/LatestTutors/LatestTutors";
const Home = () => {
  return (
    <div className="relative bg-base-100">
      <Hero></Hero>
      <LatestTuitions></LatestTuitions>
      <HowItWorks></HowItWorks>
      <LatestTutors></LatestTutors>
      <ChooseUs></ChooseUs>
    </div>
  );
};

export default Home;
