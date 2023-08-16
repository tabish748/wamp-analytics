import { useState } from "react";
import { BsPlus, BsDash } from "react-icons/bs";

const Accordion = ({ title, children }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="  border-t border-b border-slate-200  overflow-hidden transition-all duration-300 ease-in-out hover:shadow-lg">
      <div
        className={`px-6 py-4 flex justify-between items-center cursor-pointer ${isOpen ? "bg-gray-200" : "bg-white"}`}
        onClick={toggleAccordion}
      >
        <span className="text-lg">{title}</span>
        {isOpen ? <BsDash className="text-xl"/> : <BsPlus className="text-xl" />}
      </div>
      <div className={`${isOpen ? 'max-h-96' : 'max-h-0'} transition-all duration-700 overflow-hidden`}>
        <div className="bg-white px-6 py-4">{children}</div>
      </div>
    </div>
  );
};

export default Accordion;
