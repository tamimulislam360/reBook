import React from "react";
import { FaKey, FaShippingFast, FaThumbsUp } from "react-icons/fa";
import Heading from "../../../components/ConfirmationModal/Heading";

const WhyChoose = () => {
  return (
      <div className="mt-12">
          <Heading>Whe Choose Us</Heading>
        
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3 p-4 justify-items-center">
    <div className="card max-w-96 hover:bg-secondary hover:text-primary text-secondary bg-base-100 shadow-xl">
        <div className="card-body">
            <FaShippingFast className="w-8" />
          <h2 className="card-title">Fast Delivery</h2>
          <p>We have fastest delivery quality. We Deliver your products within 48 hours.</p>
        </div>
      </div>
      
      <div className="card max-w-96 hover:bg-secondary hover:text-primary text-secondary bg-base-100 shadow-xl">
        <div className="card-body">
            <FaKey className="w-8" />
          <h2 className="card-title">Sequre</h2>
          <p>We have the best sequrity team ever. We sequre your products with our best.</p>
        </div>
      </div>
      
      <div className="card max-w-96 hover:bg-secondary hover:text-primary text-secondary bg-base-100 shadow-xl">
        <div className="card-body">
            <FaThumbsUp className="w-8" />
          <h2 className="card-title">Top quality</h2>
          <p>We provide top quality products. You can relax about your product.</p>
        </div>
      </div>
    </div>
          
    </div>
  );
};

export default WhyChoose;
