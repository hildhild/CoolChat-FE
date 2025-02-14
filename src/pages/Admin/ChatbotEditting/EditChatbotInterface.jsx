import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiBorderRadius } from "react-icons/bi";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setChatbotInterface } from "../../../store/slices/ChatbotInterfaceSlice";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { LoadingProcess } from "../../../components";
import { getChatbotConfigApi } from "../../../services/chatbotConfigApi";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import WhiteBg from "@/assets/whitebg.png";

export const EditChatbotInterface = ({
  chatbotConfig,
  toggleOpenChatbox,
  setToggleOpenChatbox,
  setChatboxConfig,
}) => {
  const chatbotInterfaceConfig = useSelector((state) => state.chatbotInterface);
  const [editConfigData, setEditConfigData] = useState(chatbotInterfaceConfig);
  const dispatch = useDispatch();

  const [isSelectBgColor, setIsSelectBgColor] = useState(false);
  const [isSelectMainColor, setIsSelectMainColor] = useState(false);
  const [isSelectMainTextColor, setIsSelectMainTextColor] = useState(false);
  const [isSelectMessageBgColor, setIsSelectMessageBgColor] = useState(false);
  const [isSelectMessageTextColor, setIsSelectMessageTextColor] =
    useState(false);
  const [isSelectMessageBgColorMe, setIsSelectMessageBgColorMe] =
    useState(false);
  const [isSelectMessageTextColorMe, setIsSelectMessageTextColorMe] =
    useState(false);

  const [isEditable, setIsEditable] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [configType, setConfigType] = useState(chatbotConfig?.background_image ? "image" : "color");

  const [isLoading, setIsLoading] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const inputAvatarFileRef = useRef(null);
  const [background, setBackground] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const inputBackgroundFileRef = useRef(null);

  const handleResetDefault = () => {
    const defaultConfig = {
      main_name: "CoolChat",
      sub_name: "Luôn sẵn sàng hỗ trợ bạn",
      font_family: "font-sans",
      message_border_radius: "12",
      message_background_color: "#EAF2F6",
      message_text_color: "#000000",
      message_background_color_me: "#4880FF",
      message_text_color_me: "#ffffff",
    };
    dispatch(setChatbotInterface(defaultConfig));
    setEditConfigData(defaultConfig);
    setChatboxConfig(defaultConfig);
    toast.success("Khôi phục thành công");
    setIsOpenConfirm(false);
  };

  const handleChangeInput = (e) => {
    console.log(e);
    const name = e.target.name;
    if (name === "main_name") {
      setEditConfigData({ ...editConfigData, main_name: e.target.value });
    } else if (name === "sub_name") {
      setEditConfigData({ ...editConfigData, sub_name: e.target.value });
    } else if (name === "font_family") {
      setEditConfigData({ ...editConfigData, font_family: e.target.value });
    } else if (name === "message_border_radius") {
      setEditConfigData({
        ...editConfigData,
        message_border_radius: e.target.value,
      });
    } else if (name === "message_background_color") {
      setEditConfigData({
        ...editConfigData,
        message_background_color: e.target.value,
      });
    } else if (name === "message_text_color") {
      setEditConfigData({
        ...editConfigData,
        message_text_color: e.target.value,
      });
    }
  };

  const handleChangeConfig = () => {
    dispatch(setChatbotInterface(editConfigData));
    setIsEditable(false);
    toast.success("Chỉnh sửa thành công");
  };

  const handlePreviewConfig = () => {
    setChatboxConfig(editConfigData);
    setToggleOpenChatbox(!toggleOpenChatbox);
  };

  const handleCancel = () => {
    setEditConfigData(chatbotInterfaceConfig);
    setChatboxConfig(null);
    setIsEditable(false);
  };

  const handleAvatarClick = () => {
    if (isEditable) {
      inputAvatarFileRef.current.click();
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    setAvatarFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setAvatar(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundClick = () => {
    if (isEditable) {
      inputBackgroundFileRef.current.click();
    }
  };

  const handleBackgroundChange = (event) => {
    const file = event.target.files[0];
    setBackgroundFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setBackground(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <LoadingProcess isLoading={isLoading} />
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleResetDefault}
        title="Khôi phục mặc định"
        description="Bạn có chắc chắn muốn khôi phục lại cấu hình mặc định?"
      />
      <div className="flex gap-8 mb-5">
        <div>
          <div className="mb-2 text-center py-1">Ảnh đại diện</div>
          {isEditable && (
            <input
              type="file"
              accept="image/*"
              ref={inputAvatarFileRef}
              style={{ display: "none" }}
              onChange={handleAvatarChange}
            />
          )}
          <button
            onClick={handleAvatarClick}
            className="overflow-hidden group rounded-2xl aspect-square relative max-w-28 max-h-28 h-28 w-28 border-gray-300 border-2"
          >
            <img
              className={`${
                isEditable
                  ? "group-hover:grayscale transition-all duration-300 cursor-pointer"
                  : "cursor-default"
              } w-full h-full object-contain`}
              alt="avatar"
              src={
                avatar
                  ? avatar
                  : chatbotConfig?.avatar
                  ? chatbotConfig?.avatar
                  : LogoOnly
              }
            />
            {isEditable && (
              <>
                <div className="group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1" />
                <MdOutlineAddPhotoAlternate className="z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </>
            )}
          </button>
          {/* <button onClick={handleAvatarClick} className="hover:opacity-70 bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
            <MdOutlineAddPhotoAlternate size={40} />
            <div className="text-[12px] text-center">Tải hình ảnh lên</div>
            </button> */}
        </div>
        <div className="w-[160px]">
          {/* <div className="mb-2 text-center">Ảnh nền</div> */}
          <Select
            aria-label="Select background image or color"
            defaultSelectedKeys={[configType]}
            size="sm"
            className="w-full mb-2"
            onChange={(e) => {
              setConfigType(e.target.value);
              setBackground(null);
              setBackgroundFile(null);
            }}
            isRequired
            isDisabled={!isEditable}
          >
            <SelectItem key="color">Màu nền trung tâm</SelectItem>
            <SelectItem key="image">Ảnh nền trung tâm</SelectItem>
          </Select>
          {configType === "color" ? (
            <div>
              <Button
                isDisabled={!isEditable}
                className="border-[1px] border-gray-300"
                style={{
                  backgroundColor: chatbotConfig?.primary_background_color,
                }}
                onClick={() => setIsSelectBgColor(!isSelectBgColor)}
              ></Button>
              {isSelectBgColor && (
                <div>
                  <div
                    className="fixed top-0 left-0 right-0 bottom-0"
                    onClick={() => setIsSelectBgColor(false)}
                  />
                  <ChromePicker
                    className="z-20 absolute"
                    color={chatbotConfig?.primary_background_color}
                    onChange={(color) => {
                      setEditConfigData({
                        ...editConfigData,
                        message_text_color: color.hex,
                      });
                    }}
                  />
                </div>
              )}
            </div>
          ) : (
            <div>
              {isEditable && (
                <input
                  type="file"
                  accept="image/*"
                  ref={inputBackgroundFileRef}
                  style={{ display: "none" }}
                  onChange={handleBackgroundChange}
                />
              )}
              <button
                onClick={handleBackgroundClick}
                className="overflow-hidden group rounded-2xl aspect-square relative max-w-28 max-h-28 h-28 w-28 border-gray-300 border-2"
              >
                <img
                  className={`${
                    isEditable
                      ? "group-hover:grayscale transition-all duration-300 cursor-pointer"
                      : "cursor-default"
                  } w-full h-full object-contain`}
                  alt="background"
                  src={
                    background
                      ? background
                      : chatbotConfig?.background_image
                      ? chatbotConfig?.background_image
                      : WhiteBg
                  }
                />
                {isEditable && (
                  <>
                    <div className="group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1" />
                    <MdOutlineAddPhotoAlternate className="z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                  </>
                )}
              </button>
              {/* <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
                <MdOutlineAddPhotoAlternate size={40} />
                <div className="text-[12px] text-center">Tải hình ảnh lên</div>
              </div> */}
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 text-center py-1">Màu nền chủ đạo</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{
              backgroundColor: chatbotConfig?.secondary_background_color,
            }}
            onClick={() => setIsSelectMainColor(!isSelectMainColor)}
          ></Button>
          {isSelectMainColor && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMainColor(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.secondary_background_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_text_color: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 text-center py-1">Màu chữ chủ đạo</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{
              backgroundColor: chatbotConfig?.primary_font_color,
            }}
            onClick={() => setIsSelectMainTextColor(!isSelectMainTextColor)}
          ></Button>
          {isSelectMainTextColor && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMainTextColor(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.primary_font_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_text_color: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Input
          isDisabled={!isEditable}
          name="main_name"
          type="text"
          variant="bordered"
          label="Tên hiển thị"
          placeholder="Điền tên hiển thị"
          value={chatbotConfig?.display_name}
          onChange={handleChangeInput}
        />
        <Input
          isDisabled={!isEditable}
          name="sub_name"
          type="text"
          variant="bordered"
          label="Tiêu đề phụ"
          placeholder="Điền tiêu đề phụ"
          value={chatbotConfig?.description}
          onChange={handleChangeInput}
        />
        <Select
          isDisabled={!isEditable}
          name="font_family"
          variant="bordered"
          label="Phông chữ"
          placeholder="Chọn phông chữ"
          selectedKeys={[editConfigData.font_family]}
          onChange={handleChangeInput}
        >
          <SelectItem key="font-sans">Sans</SelectItem>
          <SelectItem key="font-serif">Serif</SelectItem>
          <SelectItem key="font-mono">Monospace</SelectItem>
        </Select>
        <Select
          isDisabled={!isEditable}
          name="font_family"
          variant="bordered"
          label="Kích thước chữ (px)"
          placeholder="Chọn phông chữ"
          selectedKeys={["16"]}
          onChange={handleChangeInput}
        >
          <SelectItem key="12">12</SelectItem>
          <SelectItem key="14">14</SelectItem>
          <SelectItem key="16">16</SelectItem>
          <SelectItem key="18">18</SelectItem>
          <SelectItem key="20">20</SelectItem>
          <SelectItem key="24">24</SelectItem>
          <SelectItem key="30">30</SelectItem>
          <SelectItem key="36">36</SelectItem>
          <SelectItem key="48">48</SelectItem>
          <SelectItem key="60">60</SelectItem>
          <SelectItem key="72">72</SelectItem>
        </Select>
        <Input
          isDisabled={!isEditable}
          name="message_border_radius"
          type="text"
          variant="bordered"
          label="Độ bo góc tin nhắn (px)"
          placeholder="Điền độ bo góc tin nhắn"
          startContent={<BiBorderRadius size={20} />}
          value={chatbotConfig?.border_radius}
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu nền tin nhắn nhận</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{ backgroundColor: chatbotConfig?.receiving_message_background_color }}
            onClick={() => setIsSelectMessageBgColor(!isSelectMessageBgColor)}
          ></Button>
          {isSelectMessageBgColor && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMessageBgColor(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.receiving_message_background_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_background_color: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu chữ tin nhắn nhận</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{ backgroundColor: chatbotConfig?.receiving_message_font_color }}
            onClick={() =>
              setIsSelectMessageTextColor(!isSelectMessageTextColor)
            }
          ></Button>
          {isSelectMessageTextColor && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMessageTextColor(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.receiving_message_font_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_text_color: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu nền tin nhắn gửi</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{
              backgroundColor: chatbotConfig?.sending_message_background_color,
            }}
            onClick={() =>
              setIsSelectMessageBgColorMe(!isSelectMessageBgColorMe)
            }
          ></Button>
          {isSelectMessageBgColorMe && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMessageBgColorMe(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.sending_message_background_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_background_color_me: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu chữ tin nhắn gửi</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{ backgroundColor: chatbotConfig?.sending_message_font_color }}
            onClick={() =>
              setIsSelectMessageTextColorMe(!isSelectMessageTextColorMe)
            }
          ></Button>
          {isSelectMessageTextColorMe && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectMessageTextColorMe(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={chatbotConfig?.sending_message_font_color}
                onChange={(color) => {
                  setEditConfigData({
                    ...editConfigData,
                    message_text_color_me: color.hex,
                  });
                }}
              />
            </div>
          )}
        </div>
      </div>
      {isEditable ? (
        <div className="flex gap-5">
          <Button color="danger" onClick={handleCancel}>
            HỦY BỎ
          </Button>
          <Button color="primary" onClick={handlePreviewConfig}>
            XEM TRƯỚC
          </Button>
          <Button color="success" onClick={handleChangeConfig}>
            LƯU
          </Button>
        </div>
      ) : (
        <div className="flex gap-5">
          <Button color="default" onClick={() => setIsOpenConfirm(true)}>
            KHÔI PHỤC MẶC ĐỊNH
          </Button>
          <Button color="primary" onClick={() => setIsEditable(true)}>
            CHỈNH SỬA
          </Button>
        </div>
      )}
    </div>
  );
};
