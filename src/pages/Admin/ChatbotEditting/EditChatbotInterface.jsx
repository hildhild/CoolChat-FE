import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiBorderRadius } from "react-icons/bi";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { setChatbotInterface } from "../../../store/slices/ChatbotInterfaceSlice";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/ConfirmModal";

export const EditChatbotInterface = ({
  toggleOpenChatbox,
  setToggleOpenChatbox,
  setChatboxConfig,
}) => {
  const chatbotInterfaceConfig = useSelector((state) => state.chatbotInterface);
  const [editConfigData, setEditConfigData] = useState(chatbotInterfaceConfig);
  const dispatch = useDispatch();
  const [isSelectBgColor, setIsSelectBgColor] = useState(false);
  const [isSelectTextColor, setIsSelectTextColor] = useState(false);
  const [isSelectBgColorMe, setIsSelectBgColorMe] = useState(false);
  const [isSelectTextColorMe, setIsSelectTextColorMe] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

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

  return (
    <div>
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleResetDefault}
        title="Khôi phục mặc định"
        description="Bạn có chắc chắn muốn khôi phục lại cấu hình mặc định?"
      />
      <div className="flex gap-8 mb-5">
        <div>
          <div className="mb-2 text-center">Ảnh đại diện</div>
          <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
            <MdOutlineAddPhotoAlternate size={40} />
            <div className="text-[12px] text-center">Tải hình ảnh lên</div>
          </div>
        </div>
        <div>
          <div className="mb-2 text-center">Ảnh nền</div>
          <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
            <MdOutlineAddPhotoAlternate size={40} />
            <div className="text-[12px] text-center">Tải hình ảnh lên</div>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-5 mb-5">
        <div>
          <Input
            isDisabled={!isEditable}
            name="main_name"
            type="text"
            variant="bordered"
            label="Tên hiển thị"
            placeholder="Điền tên hiển thị"
            className="mb-5"
            value={editConfigData.main_name}
            onChange={handleChangeInput}
          />
          <Input
            isDisabled={!isEditable}
            name="sub_name"
            type="text"
            variant="bordered"
            label="Tiêu đề phụ"
            placeholder="Điền tiêu đề phụ"
            value={editConfigData.sub_name}
            onChange={handleChangeInput}
          />
        </div>
        <div>
          <Select
            isDisabled={!isEditable}
            name="font_family"
            variant="bordered"
            label="Phông chữ"
            className="mb-5"
            placeholder="Chọn phông chữ"
            selectedKeys={[editConfigData.font_family]}
            onChange={handleChangeInput}
          >
            <SelectItem key="font-sans">Sans</SelectItem>
            <SelectItem key="font-serif">Serif</SelectItem>
            <SelectItem key="font-mono">Monospace</SelectItem>
          </Select>
          <Input
            isDisabled={!isEditable}
            name="message_border_radius"
            type="text"
            variant="bordered"
            label="Độ bo góc tin nhắn"
            placeholder="Điền độ bo góc tin nhắn"
            startContent={<BiBorderRadius size={20} />}
            value={editConfigData.message_border_radius}
            onChange={handleChangeInput}
          />
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu nền tin nhắn nhận</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{ backgroundColor: editConfigData.message_background_color }}
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
                color={editConfigData.message_background_color}
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
            style={{ backgroundColor: editConfigData.message_text_color }}
            onClick={() => setIsSelectTextColor(!isSelectTextColor)}
          ></Button>
          {isSelectTextColor && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectTextColor(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={editConfigData.message_text_color}
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
              backgroundColor: editConfigData.message_background_color_me,
            }}
            onClick={() => setIsSelectBgColorMe(!isSelectBgColorMe)}
          ></Button>
          {isSelectBgColorMe && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectBgColorMe(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={editConfigData.message_background_color_me}
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
            style={{ backgroundColor: editConfigData.message_text_color_me }}
            onClick={() => setIsSelectTextColorMe(!isSelectTextColorMe)}
          ></Button>
          {isSelectTextColorMe && (
            <div>
              <div
                className="fixed top-0 left-0 right-0 bottom-0"
                onClick={() => setIsSelectTextColorMe(false)}
              />
              <ChromePicker
                className="z-20 absolute"
                color={editConfigData.message_text_color_me}
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
