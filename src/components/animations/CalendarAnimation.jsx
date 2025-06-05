import Lottie from "lottie-react";
import Calendar from "../../assets/loties/calendar.json";

const ArrowAnimation = () => {
  return (
    <div className="aspect-auto w-12" id="lottiestart">
      <Lottie
        animationData={Calendar}
        loop={false}
        autoplay={true}
        className="aspect-square"
      />
    </div>
  );
};

export default ArrowAnimation;
