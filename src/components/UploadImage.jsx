import { useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";

export const UploadImage = ({ image, setImage, setImageFile, isEditable=true, curImage, defaultImage, size=93 }) => {
  const inputFileRef = useRef(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setImageFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClick = () => {
    if (isEditable) {
      inputFileRef.current.click();
    }
  };

  return (
    <div>
      {isEditable && (
        <input
          type="file"
          accept="image/*"
          ref={inputFileRef}
          style={{ display: "none" }}
          onChange={handleImageChange}
        />
      )}
      <button
        onClick={handleClick}
        className={`overflow-hidden group rounded-2xl aspect-square relative border-gray-300 border-2`}
        style={{
          width: size,
          height: size,
          maxHeight: size,
          maxWidth: size,
        }}
      >
        <img
          className={`${
            isEditable
              ? "group-hover:grayscale transition-all duration-300 cursor-pointer"
              : "cursor-default"
          } w-full h-full object-contain`}
          alt="image"
          src={
            image
              ? image
              : curImage
              ? curImage
              : defaultImage
          }
        />
        {isEditable && (
          <>
            <div className="group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1" />
            <MdOutlineAddPhotoAlternate className="z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </>
        )}
      </button>
    </div>
  );
};
