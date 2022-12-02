import React from "react";
import { Player } from "@lottiefiles/react-lottie-player";
import { Link } from "react-router-dom";
import SimpleButton from "../../../components/ConfirmationModal/SimpleButton";

const Banner = () => {
  return (
    <div className="hero min-h-screen bg-heroBg">
      <div className="hero-content -mt-32 sm:mt-0 flex-col md:flex-row-reverse backdrop-blur-[20px]">
        <Player
          src="https://assets3.lottiefiles.com/private_files/lf30_DoHdiF.json"
          className="player hidden sm:block"
          loop
          autoplay
        />
        <div className="text-center md:text-left">
          <h1 className="text-3xl sm:text-5xl font-bold text-secondary">
            Welcome to <span className="text-info">reBook, </span>
            the best book resllers.
          </h1>
          <p className="py-6 text-secondary">
            You are a passionate reader, but you don't have enough money to buy
            a new book? don't worry, we are here for help you. We provide the
            best selling used books for reasonable price.
          </p>
          <Link to="/categories">
            <SimpleButton classes="btn-secondary text-primary">
              get started
            </SimpleButton>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Banner;
