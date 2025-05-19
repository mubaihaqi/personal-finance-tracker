import React, { useRef } from "react";
import Lottie from "lottie-react";
import Arrow from "../../assets/loties/arrow.json";

const ArrowAnimation = () => {
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
        animationData={Arrow}
        loop={true}
        autoplay={false}
        className="aspect-square rotate-90"
      />
    </div>
  );
};

export default ArrowAnimation;
