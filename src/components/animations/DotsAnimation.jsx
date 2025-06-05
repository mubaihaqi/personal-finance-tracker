import React, { useRef } from "react";
import Lottie from "lottie-react";
import Dots from "../../assets/loties/dots.json";

const DotsAnimation = () => {
  const lottieRef = useRef();

  const handleMouseEnter = () => {
    lottieRef.current.play(); // Play animation
  };

  const handleMouseLeave = () => {
    lottieRef.current.stop(); // Stop animation
  };

  return (
    <div
      className=""
      id="lottiestart"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Lottie
        lottieRef={lottieRef}
        animationData={Dots}
        loop={true}
        autoplay={false}
        className="h-12 aspect-square rotate-90"
      />
    </div>
  );
};

export default DotsAnimation;
