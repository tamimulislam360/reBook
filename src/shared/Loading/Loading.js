import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <div className="grid place-items-center w-full h-full z-[100] bg-white/20">
      <Player
        src="https://assets4.lottiefiles.com/packages/lf20_2scSKA.json"
        className="player transparent w-32 h-32"
        loop
        autoplay
      />
    </div>
  );
};

export default Loading;
