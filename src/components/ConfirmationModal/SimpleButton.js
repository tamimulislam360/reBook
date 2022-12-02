import React from "react";

const SimpleButton = ({ children, classes }) => {
  return <button className={`btn ${classes}`}>{children}</button>;
};

export default SimpleButton;
