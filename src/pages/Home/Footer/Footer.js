import React from "react";
import { Link } from "react-router-dom";
import rebook from "../../../rebook.png";

const Footer = () => {
  return (
    <footer className="p-10 bg-base-200 text-base-content mt-8">
      <div className="footer">
        <div>
          <img src={rebook} className="w-16 h-16" alt="" />
          <p>reBook.</p>
          <p>Second hand book store website.</p>
        </div>
        <div>
          <span className="footer-title">Important Links</span>
          <Link className="link link-hover">Categories</Link>
          <Link className="link link-hover">Blogs</Link>
        </div>
        <div>
          <span className="footer-title">Contact</span>
          <Link className="link link-hover">About us</Link>
          <Link className="link link-hover">Contact</Link>
        </div>
      </div>
      <div className="flex justify-center items-center p-2">
        <p>Copyright © 2022 - All right reserved by reBook</p>
      </div>
    </footer>
  );
};

export default Footer;
