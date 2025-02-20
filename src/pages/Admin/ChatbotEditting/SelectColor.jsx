import { Button } from "@nextui-org/react";
import { useState } from "react";
import { ChromePicker } from "react-color";

export const SelectColor = ({ title = "", color, isEditable, handleChangeColor }) => {
  const [isSelectColor, setIsSelectColor] = useState(false);

  return (
    <div className="flex-col items-start flex">
      {title && <div className="mb-2 py-1">{title}</div>}
      <Button
        isDisabled={!isEditable}
        className="border-[1px] border-gray-300"
        style={{
          backgroundColor: color,
        }}
        onClick={() => setIsSelectColor(!isSelectColor)}
      ></Button>
      {isSelectColor && (
        <div>
          <div
            className="fixed top-0 left-0 right-0 bottom-0"
            onClick={() => setIsSelectColor(false)}
          />
          <ChromePicker
            className="z-20 absolute"
            color={color}
            onChange={(color) => {
              handleChangeColor(color.hex);
            }}
          />
        </div>
      )}
    </div>
  );
};
