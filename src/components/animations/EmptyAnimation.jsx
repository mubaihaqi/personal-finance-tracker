import React, { useRef } from "react";
import Lottie from "lottie-react";
import Empty from "../../assets/loties/empty.json";

const ArrowAnimation = () => {
  const lottieRef = useRef();

  return (
    <div className="h-auto" id="lottiestart">
      <Lottie
        lottieRef={lottieRef}
        animationData={Empty}
        loop={false}
        autoplay={true}
        className="h-72 !object-cover"
      />
    </div>
  );
};

export default ArrowAnimation;
