import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <div className="w-screen h-[90vh] flex justify-center items-center">
      <div>
        <Player
          src="https://assets5.lottiefiles.com/packages/lf20_02epxjye.json"
          className="player transparent"
          loop
          autoplay
        />
        <p className="text-center">
          <Link
            to="/"
            className="font-bold text-xl text-violet-600 text-center mt-16"
          >
            Go to Home
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Error;
