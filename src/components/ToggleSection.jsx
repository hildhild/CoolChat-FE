import { Button } from "@nextui-org/react";
import { useState } from "react";
import { CiSquareMinus, CiSquarePlus } from "react-icons/ci";

export const ToggleSection = ({ children, title, Icon, initIsOpen = true }) => {
  const [isOpen, setIsOpen] = useState(initIsOpen);
  return (
    <div>
      <Button
        className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <div className="flex gap-3 justify-center items-center">
          <Icon size={30} />
          <div>{title}</div>
        </div>
        {isOpen ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
      </Button>
      {
        isOpen && children
      }
    </div>
  );
};
