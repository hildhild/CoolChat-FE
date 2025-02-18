import { useCallback, useEffect, useRef, useState } from "react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import Cropper from "react-easy-crop";
import {
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@nextui-org/react";
import { getCroppedImg } from "../utils";

export const UploadImage = ({
  image,
  setImage,
  setImageFile,
  isEditable = true,
  curImage,
  defaultImage,
  size = 93,
  scale = 1 / 1,
}) => {
  const inputFileRef = useRef(null);
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const onCropChange = (crop) => setCrop(crop);
  const onZoomChange = (zoom) => setZoom(zoom);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [croppedAreaPixels, setCroppedAreaPixels] = useState(null);
  const [file, setFile] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  const onCropComplete = useCallback((_, croppedAreaPixels) => {
    setCroppedAreaPixels(croppedAreaPixels);
  }, []);

  const handleCropConfirm = async () => {
    if (croppedAreaPixels) {
      const croppedImage = await getCroppedImg(
        imageUrl,
        croppedAreaPixels,
        file
      );
      setImage(croppedImage.url);
      setImageFile(croppedImage.file);
      setImageUrl(null);
      setFile(null);
      if (inputFileRef.current) {
        inputFileRef.current.value = null;
      }
    }
  };

  useEffect(() => {
    if (imageUrl) {
      onOpen();
    }
  }, [imageUrl]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImageUrl(reader.result);
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
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        onClose={() => {
          setFile(null);
          setImageUrl(null);
          if (inputFileRef.current) {
            inputFileRef.current.value = null;
          }
        }}
        size="xl"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Cắt ảnh</ModalHeader>
              <ModalBody>
                <div className="relative h-[60vh] w-full">
                  <Cropper
                    image={imageUrl}
                    crop={crop}
                    zoom={zoom}
                    aspect={scale}
                    className="object-cover"
                    onCropChange={onCropChange}
                    onZoomChange={onZoomChange}
                    onCropComplete={onCropComplete}
                  />
                </div>
                <input
                  type="range"
                  min={1}
                  max={3}
                  step={0.1}
                  value={zoom}
                  onChange={(e) => setZoom(e.target.value)}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="danger"
                  variant="light"
                  onPress={() => {
                    onClose();
                  }}
                >
                  Hủy bỏ
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    handleCropConfirm();
                  }}
                >
                  Xác nhận
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
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
          src={image ? image : curImage ? curImage : defaultImage}
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
