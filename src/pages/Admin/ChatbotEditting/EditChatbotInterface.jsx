import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiBorderRadius } from "react-icons/bi";
import { ChromePicker } from "react-color";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { setChatbotInterface } from "../../../store/slices/ChatbotInterfaceSlice";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { LoadingProcess } from "../../../components";
import { getChatbotConfigApi } from "../../../services/chatbotConfigApi";

export const EditChatbotInterface = ({
  toggleOpenChatbox,
  setToggleOpenChatbox,
  setChatboxConfig,
}) => {
  const chatbotInterfaceConfig = useSelector((state) => state.chatbotInterface);
  const [editConfigData, setEditConfigData] = useState(chatbotInterfaceConfig);
  const dispatch = useDispatch();
  const [isSelectBgColor, setIsSelectBgColor] = useState(false);
  const [isSelectMessageBgColor, setIsSelectMessageBgColor] = useState(false);
  const [isSelectMessageTextColor, setIsSelectMessageTextColor] =
    useState(false);
  const [isSelectMessageBgColorMe, setIsSelectMessageBgColorMe] =
    useState(false);
  const [isSelectMessageTextColorMe, setIsSelectMessageTextColorMe] =
    useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);

  const [configType, setConfigType] = useState("color");

  const [isLoading, setIsLoading] = useState(false);

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
          <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
            <MdOutlineAddPhotoAlternate size={40} />
            <div className="text-[12px] text-center">Tải hình ảnh lên</div>
          </div>
        </div>
        <div className="w-[160px]">
          {/* <div className="mb-2 text-center">Ảnh nền</div> */}
          <Select
            aria-label="Select background image or color"
            defaultSelectedKeys={[configType]}
            size="sm"
            className="w-full mb-2"
            onChange={(e) => setConfigType(e.target.value)}
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
                  backgroundColor: editConfigData.message_background_color,
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
          ) : (
            <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
              <MdOutlineAddPhotoAlternate size={40} />
              <div className="text-[12px] text-center">Tải hình ảnh lên</div>
            </div>
          )}
        </div>
        <div>
          <div className="mb-2 text-center py-1">Màu nền chủ đạo</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{
              backgroundColor: editConfigData.message_background_color,
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
        <div>
          <div className="mb-2 text-center py-1">Màu chữ chủ đạo</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{
              backgroundColor: editConfigData.message_background_color,
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
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <Input
          isDisabled={!isEditable}
          name="main_name"
          type="text"
          variant="bordered"
          label="Tên hiển thị"
          placeholder="Điền tên hiển thị"
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
          value={editConfigData.message_border_radius}
          onChange={handleChangeInput}
        />
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <div className="flex-col items-start flex">
          <div className="mb-2 text-center">Màu nền tin nhắn nhận</div>
          <Button
            isDisabled={!isEditable}
            className="border-[1px] border-gray-300"
            style={{ backgroundColor: editConfigData.message_background_color }}
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
