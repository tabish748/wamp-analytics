import React, { useState, useEffect } from "react";

function Carousel({ children, speed = 2000, fractionOfNext = 0.2, margin = 0, itemsToShowDesktop, itemsToShowMobile }) {
  const [current, setCurrent] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(itemsToShowDesktop);
  const totalItems = React.Children.count(children);
  
  // Update the state on window resize
  useEffect(() => {
    const resizeListener = () => {
      setItemsToShow(window.innerWidth < 768 ? itemsToShowMobile : itemsToShowDesktop);
    };
    
    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    }
  }, [itemsToShowDesktop, itemsToShowMobile]);

  useEffect(() => {
    setItemsToShow(window.innerWidth < 768 ? itemsToShowMobile : itemsToShowDesktop);

    const interval = setInterval(() => {
      setCurrent((current) => (current + 1) % totalItems);
    }, speed);
    return () => clearInterval(interval);
  }, [totalItems, speed, itemsToShowDesktop, itemsToShowMobile]);

  return (
    <div>
      <div className="relative w-full overflow-hidden">
        <div
          className="flex transition-transform duration-1000"
          style={{ transform: `translateX(-${(current * 100) / itemsToShow}%)` }}
        >
          {React.Children.map(children, (child, index) => (
            <div 
              style={{ flex: `0 0 ${100 / itemsToShow}%`, margin: `${margin}px` }} 
              key={index}
            >
              {child}
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center space-x-2 mt-4">
        {Array(totalItems)
          .fill()
          .map((_, i) => (
            <button
              key={i}
              className={`h-3 rounded-full focus:outline-none ${
                current === i ? "w-20 bg-primary-color" : "w-6 bg-gray-300"
              }`}
              onClick={() => setCurrent(i)}
            ></button>
          ))}
      </div>
    </div>
  );
}

export default Carousel;
