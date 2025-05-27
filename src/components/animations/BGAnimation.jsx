import Lottie from "lottie-react";
import BG from "../../assets/loties/gradient-background.json";

const BGAnimation = () => {
  return (
    <div className="aspect-auto w-12" id="lottiestart">
      <Lottie
        animationData={BG}
        loop={true}
        autoplay={true}
        className="aspect-auto"
      />
    </div>
  );
};

export default BGAnimation;
