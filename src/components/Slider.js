import React from 'react';

const Slider = ({ children, itemsInMobileView = 3, itemsInDesktopView = 6 }) => {
  const items = React.Children.toArray(children);
  const totalItems = items.length;
  const clonedItems = [...items, ...items]; // Double items array to simulate infinite loop

  return (
    <div className="overflow-hidden w-full">
      <div className="whitespace-nowrap animate-marquee">
        {clonedItems.map((item, index) => (
          <div key={index} 
               style={{
                 width: `${100/itemsInDesktopView}%`,
                 '@media (max-width: 640px)': { width: `${100/itemsInMobileView}%` },
               }}
               className="inline-block">
            {item}
          </div>
        ))}
      </div>

      <style jsx>{`
        .animate-marquee {
          animation: marquee ${totalItems * 2}s linear infinite;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-100%); }
        }
      `}</style>
    </div>
  );
};
export default Slider;
