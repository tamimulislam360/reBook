import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";

const Loading = () => {
  return (
    <div className="flex justify-center items-center w-full h-full">
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
