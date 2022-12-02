import React from "react";

const Heading = ({ children, classes }) => {
  return (
    <h2
      className={`uppercase isolate p-2 px-8 inline-block text-2xl font-bold text-white ml-10 my-2 relative before:block before:absolute before:inset-0 before:-skew-x-12 before:w-full before:-z-10 before:bg-info ${classes}`}
    >
      {children}
    </h2>
  );
};

export default Heading;
