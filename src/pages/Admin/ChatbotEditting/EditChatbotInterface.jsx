import {
  Button,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Select,
  SelectItem,
  useDisclosure,
} from "@nextui-org/react";
import { BiBorderRadius } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { LoadingProcess, UploadImage } from "../../../components";
import PreviewChatBox from "./PreviewChatbox";
import { SelectColor } from "./SelectColor";
import {
  editChatbotConfigApi,
  resetChatbotInterfaceApi,
} from "../../../services/chatbotConfigApi";
import { setChatbotConfig } from "../../../store/slices/ChatbotConfigSlice";
import { Controller, useForm } from "react-hook-form";

export const EditChatbotInterface = ({setPreviewConfig, setIsPreview}) => {
  const chatbotConfig = useSelector((state) => state.chatbotConfig.config);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [configType, setConfigType] = useState(
    chatbotConfig?.background_image_url ? "image" : "color"
  );
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const [background, setBackground] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue,
  } = useForm({
    mode: "onSubmit",
    defaultValues: chatbotConfig,
  });

  const handleResetDefault = async () => {
    setIsOpenConfirm(false);
    setIsLoading(true);
    await resetChatbotInterfaceApi().then((res) => {
      if (res.status === 200) {
        dispatch(setChatbotConfig(res.data));
        reset;
        toast.success("Khôi phục thành công");
      }
    });
    setIsEditable(false);
    setIsLoading(false);
  };

  const handleChangeConfig = async (data) => {
    setIsLoading(true);
    await editChatbotConfigApi({
      ...data,
      avatar: avatarFile,
      ...(configType === "image" 
        ? { background_image_url: backgroundFile }
        : { background_image_url: null }),
      ...(configType === "image"
        ? { primary_background_color: "#ffffff" }
        : {}),
    })
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          dispatch(setChatbotConfig(res.data));
          setPreviewConfig(res.data);
          setIsEditable(false);
          toast.success("Chỉnh sửa thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });

    setIsLoading(false);
  };

  const handlePreviewConfig = () => {
    setPreviewConfig({
      ...getValues(),
      avatar: avatar,
      background_image_url: background,
    });
    setIsPreview(true);
  };

  const handleCancel = () => {
    reset();
    setPreviewConfig(chatbotConfig);
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
          <UploadImage
            image={avatar}
            setImage={setAvatar}
            setImageFile={setAvatarFile}
            isEditable={isEditable}
            curImage={watch("avatar")}
            defaultImage="https://api.coolchat.software/static/images/default-avatar.png"
            size={130}
          />
        </div>
        <div className="w-[160px]">
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
            <SelectColor
              color={watch("primary_background_color")}
              isEditable={isEditable}
              handleChangeColor={(color) => {
                setValue("primary_background_color", color);
              }}
            />
          ) : (
            <UploadImage
              image={background}
              setImage={setBackground}
              setImageFile={setBackgroundFile}
              isEditable={isEditable}
              curImage={watch("background_image_url")}
              defaultImage="https://cdn-icons-png.flaticon.com/512/4211/4211763.png"
              size={130}
              scale={380 / 337}
            />
          )}
        </div>
        <SelectColor
          title="Màu nền chủ đạo"
          color={watch("secondary_background_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("secondary_background_color", color);
          }}
        />
        <SelectColor
          title="Màu chữ chủ đạo"
          color={watch("primary_font_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("primary_font_color", color);
          }}
        />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
        <div>
          <Controller
            control={control}
            name="display_name"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type="text"
                variant="bordered"
                label="Tên hiển thị"
                placeholder="Điền tên hiển thị"
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.display_name && (
            <div className="text-red-500 text-xs mt-2">
              {errors.display_name.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="description"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type="text"
                variant="bordered"
                label="Tiêu đề phụ"
                placeholder="Điền tiêu đề phụ"
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.description && (
            <div className="text-red-500 text-xs mt-2">
              {errors.description.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="font"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={!isEditable}
                name="font_family"
                variant="bordered"
                label="Phông chữ"
                placeholder="Chọn phông chữ"
                selectedKeys={[value]}
                onChange={onChange}
                isRequired
              >
                <SelectItem key="ARIAL">Arial</SelectItem>
                <SelectItem key="HELVETICA">Helvetica</SelectItem>
                <SelectItem key="VERDANA">Verdana</SelectItem>
                <SelectItem key="TAHOMA">Tahoma</SelectItem>
                <SelectItem key="ROBOTO">Roboto</SelectItem>
                <SelectItem key="OPEN_SANS">Open sans</SelectItem>
              </Select>
            )}
          />
          {errors.font && (
            <div className="text-red-500 text-xs mt-2">
              {errors.font.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="font_size"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={!isEditable}
                name="font_size"
                variant="bordered"
                label="Kích thước chữ (px)"
                placeholder="Chọn phông chữ"
                selectedKeys={[value]}
                onChange={onChange}
                isRequired
              >
                <SelectItem key="12">12</SelectItem>
                <SelectItem key="14">14</SelectItem>
                <SelectItem key="16">16</SelectItem>
                <SelectItem key="18">18</SelectItem>
                <SelectItem key="20">20</SelectItem>
                <SelectItem key="24">24</SelectItem>
              </Select>
            )}
          />
          {errors.font_size && (
            <div className="text-red-500 text-xs mt-2">
              {errors.font_size.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="border_radius"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type="number"
                variant="bordered"
                label="Độ bo góc khung chat (px)"
                placeholder="Điền độ bo góc khung chat"
                startContent={<BiBorderRadius size={20} />}
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.border_radius && (
            <div className="text-red-500 text-xs mt-2">
              {errors.border_radius.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name="border_radius"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type="number"
                variant="bordered"
                label="Độ bo góc tin nhắn (px)"
                placeholder="Điền độ bo góc tin nhắn"
                startContent={<BiBorderRadius size={20} />}
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.border_radius && (
            <div className="text-red-500 text-xs mt-2">
              {errors.border_radius.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col md:flex-row gap-8 mb-8">
        <SelectColor
          title="Màu nền tin nhắn nhận"
          color={watch("receiving_message_background_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("receiving_message_background_color", color);
          }}
        />
        <SelectColor
          title="Màu chữ tin nhắn nhận"
          color={watch("receiving_message_font_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("receiving_message_font_color", color);
          }}
        />
        <SelectColor
          title="Màu nền tin nhắn gửi"
          color={watch("sending_message_background_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("sending_message_background_color", color);
          }}
        />
        <SelectColor
          title="Màu chữ tin nhắn gửi"
          color={watch("sending_message_font_color")}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue("sending_message_font_color", color);
          }}
        />
      </div>
      {isEditable ? (
        <div className="flex gap-5">
          <Button color="danger" onClick={handleCancel}>
            HỦY BỎ
          </Button>
          <Button color="primary" onClick={handlePreviewConfig}>
            XEM TRƯỚC
          </Button>
          <Button color="success" onClick={handleSubmit(handleChangeConfig)}>
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
