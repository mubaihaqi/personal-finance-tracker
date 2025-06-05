import Lottie from "lottie-react";
import Jawa from "../../assets/loties/jawa.json";

const JawaAnimation = () => {
  return (
    <div className="aspect-video w-64 md:w-96" id="lottiestart">
      <Lottie animationData={Jawa} loop={true} autoplay={true} className="" />
    </div>
  );
};

export default JawaAnimation;
