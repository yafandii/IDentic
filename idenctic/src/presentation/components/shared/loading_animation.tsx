import Lottie from "lottie-react";
import React from "react";
import loading from "../../../../public/lottie/loading_animation.json";

interface LoadingAnimationProps {
  isOpen: boolean;
}

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ isOpen }) => {
  return (
    <div
      tabIndex={-1}
      aria-hidden="true"
      className={`${
        isOpen ? "block" : "hidden"
      } fixed inset-0 flex  items-center justify-center z-50 overflow-x-hidden overflow-y-auto  w-full overflow-x-hidden overflow-y-auto md:inset-0 h-full max-h-full bg-black bg-opacity-30`}
    >
      <Lottie
        animationData={loading}
        autoPlay
        loop={true}
        cellPadding={100}
        className="h-24 w-full animate-zoom-in"
      />
    </div>
  );
};

export default LoadingAnimation;
