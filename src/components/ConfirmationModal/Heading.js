import React from "react";

const Heading = ({ children, classes, subHeading, headingClasses, subHeadingClasses }) => {
  return (
    <div className={`p-2 ml-10 my-2 ${classes}`}>
      <h2
        className={`uppercase text-2xl font-bold text-violet-700 ${headingClasses}`}
      >
        {children}
      </h2>
      { subHeading &&
        <p className={`text-secondary ${subHeadingClasses}`}>{subHeading}</p>
      }
    </div>
  );
};

export default Heading;
