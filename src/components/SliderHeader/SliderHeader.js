import React from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';

const SliderHeader = ({children, classes, subHeading, headingClasses, subHeadingClasses, arrowClasses, nextClasses, prevClasses, arrowPrevButtonClass, arrowNextButtonClass}) => {
    return (
        <div className={`flex items-center justify-between p-3 shadow-lg border border-secondary/20 my-4 ${classes}`}>
         <div>
         <h2 className={`text-xl sm:text-2xl uppercase font-bold text-violet-700 ${headingClasses}`}>{children}</h2>
          {subHeading &&
            <p className={`text-secondary ${subHeadingClasses}`}>{subHeading}</p>
          }
         </div>
          <div>
            <div className={`btn btn-outline btn-xs rounded-none btn-secondary ${arrowPrevButtonClass} ${arrowClasses} ${prevClasses}`}><FaAngleLeft/></div>
            <div className={`btn btn-outline btn-xs rounded-none btn-secondary ${arrowNextButtonClass} ${arrowClasses} ${nextClasses}`}><FaAngleRight/></div>
          </div>
        </div>
    );
};

export default SliderHeader;