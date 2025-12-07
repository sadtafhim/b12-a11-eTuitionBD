import React from "react";
import { FaRegCheckCircle } from "react-icons/fa";
import heroBG from "../../../../assets/hero-bg.jpg";
import { Typewriter } from "react-simple-typewriter";
import { Fade } from "react-awesome-reveal";

const Hero = () => {
  return (
    <div
      className="bg-cover relative bg-center w-full h-screen"
      style={{ backgroundImage: `url(${heroBG})` }}
    >
      <div className="absolute inset-0 bg-linear-to-r from-primary/70 to-accent/60"></div>
      <div className="absolute inset-0 bg-linear-to-t from-black/60 via-transparent to-transparent"></div>

      <div className="absolute inset-0 z-10">
        {/* 4. Layout Wrapper: Centers the content, applies width constraint, and sets up Flex layout */}
        <div className="h-full max-w-7xl mx-auto flex items-center px-4 md:px-6">
          {/* Left Side: Text Content */}
          <div className="flex flex-col gap-6 w-full lg:w-2/3 text-white">
            <h1 className="text-5xl lg:text-6xl font-extrabold leading-tight text-[--color-primary-content] capitalize">
              <Fade cascade damping={0.1}>
                <p>Find your perfect tutor at your fingertips.</p>
              </Fade>
            </h1>

            <p className="text-lg text-[--color-secondary-content] opacity-90">
              <Typewriter
                words={[
                  "Connect with experienced tutors and find personalized lessons",
                  "Over 5,000 tutors ready to help students achieve their academic goals",
                ]}
                loop={true}
                cursor
                cursorStyle="|"
                typeSpeed={40}
                deleteSpeed={30}
                delaySpeed={1800}
              />
            </p>

            {/* Feature List */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm font-medium">
              <div className="flex items-center gap-2 text-[--color-secondary-content] opacity-90">
                <FaRegCheckCircle className="text-[--color-accent] text-xl" />
                Find Your Tutor
              </div>
              <div className="flex items-center gap-2 text-[--color-secondary-content] opacity-90">
                <FaRegCheckCircle className="text-[--color-accent] text-xl" />
                Hire From A Wide Range
              </div>
              <div className="flex items-center gap-2 text-[--color-secondary-content] opacity-90">
                <FaRegCheckCircle className="text-[--color-accent] text-xl" />
                Pay Online
              </div>
            </div>

            {/* CTA Button */}
            <button className="btn btn-accent text-[--color-accent-content] rounded-lg mt-4 w-fit shadow-xl transition-transform hover:scale-[1.02]">
              Get Started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
