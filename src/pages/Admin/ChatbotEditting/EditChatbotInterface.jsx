import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { BiBorderRadius } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import { setChatbotInterface } from "../../../store/slices/ChatbotInterfaceSlice";
import { toast } from "react-toastify";
import { ConfirmModal } from "../../../components/ConfirmModal";
import { LoadingProcess } from "../../../components";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import WhiteBg from "@/assets/whitebg.png";
import PreviewChatBox from "./PreviewChatbox";
import { SelectColor } from "./SelectColor";
import { resetChatbotInterfaceApi } from "../../../services/chatbotConfigApi";
import { setChatbotConfig } from "../../../store/slices/ChatbotConfigSlice";
import { Controller, useForm } from "react-hook-form";

export const EditChatbotInterface = ({}) => {
  const chatbotConfig = useSelector((state) => state.chatbotConfig.config);
  const [previewConfig, setPreviewConfig] = useState(chatbotConfig);
  const dispatch = useDispatch();
  const [isEditable, setIsEditable] = useState(false);
  const [isOpenConfirm, setIsOpenConfirm] = useState(false);
  const [configType, setConfigType] = useState(
    chatbotConfig?.background_image ? "image" : "color"
  );
  const [showPreview, setShowPreview] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const inputAvatarFileRef = useRef(null);
  const [background, setBackground] = useState(null);
  const [backgroundFile, setBackgroundFile] = useState(null);
  const inputBackgroundFileRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
    watch,
    setValue
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

  const handleChangeConfig = (data) => {
    dispatch(setChatbotInterface(data));
    setIsEditable(false);
    toast.success("Chỉnh sửa thành công");
  };

  const handlePreviewConfig = () => {
    setShowPreview(!showPreview);
    setPreviewConfig(getValues());
  };

  const handleCancel = () => {
    reset();
    setPreviewConfig(chatbotConfig);
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
      {showPreview && <PreviewChatBox config={previewConfig} />}
      <ConfirmModal
        isOpen={isOpenConfirm}
        onClose={() => setIsOpenConfirm(false)}
        onConfirm={handleResetDefault}
        title='Khôi phục mặc định'
        description='Bạn có chắc chắn muốn khôi phục lại cấu hình mặc định?'
      />
      <div className='flex gap-8 mb-5'>
        <div>
          <div className='mb-2 text-center py-1'>Ảnh đại diện</div>
          {isEditable && (
            <input
              type='file'
              accept='image/*'
              ref={inputAvatarFileRef}
              style={{ display: 'none' }}
              onChange={handleAvatarChange}
            />
          )}
          <button
            onClick={handleAvatarClick}
            className='overflow-hidden group rounded-2xl aspect-square relative max-w-28 max-h-28 h-28 w-28 border-gray-300 border-2'
          >
            <img
              className={`${
                isEditable
                  ? 'group-hover:grayscale transition-all duration-300 cursor-pointer'
                  : 'cursor-default'
              } w-full h-full object-contain`}
              alt='avatar'
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
                <div className='group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1' />
                <MdOutlineAddPhotoAlternate className='z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
              </>
            )}
          </button>
        </div>
        <div className='w-[160px]'>
          <Select
            aria-label='Select background image or color'
            defaultSelectedKeys={[configType]}
            size='sm'
            className='w-full mb-2'
            onChange={(e) => {
              setConfigType(e.target.value);
              setBackground(null);
              setBackgroundFile(null);
            }}
            isRequired
            isDisabled={!isEditable}
          >
            <SelectItem key='color'>Màu nền trung tâm</SelectItem>
            <SelectItem key='image'>Ảnh nền trung tâm</SelectItem>
          </Select>
          {configType === 'color' ? (
            <SelectColor
              color={watch('primary_background_color')}
              isEditable={isEditable}
              handleChangeColor={(color) => {
                setValue('primary_background_color', color);
              }}
            />
          ) : (
            <div>
              {isEditable && (
                <input
                  type='file'
                  accept='image/*'
                  ref={inputBackgroundFileRef}
                  style={{ display: 'none' }}
                  onChange={handleBackgroundChange}
                />
              )}
              <button
                onClick={handleBackgroundClick}
                className='overflow-hidden group rounded-2xl aspect-square relative max-w-28 max-h-28 h-28 w-28 border-gray-300 border-2'
              >
                <img
                  className={`${
                    isEditable
                      ? 'group-hover:grayscale transition-all duration-300 cursor-pointer'
                      : 'cursor-default'
                  } w-full h-full object-contain`}
                  alt='background'
                  src={
                    background
                      ? background
                      : watch('background_image')
                      ? watch('background_image')
                      : WhiteBg
                  }
                />
                {isEditable && (
                  <>
                    <div className='group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1' />
                    <MdOutlineAddPhotoAlternate className='z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2' />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
        <SelectColor
          title='Màu nền chủ đạo'
          color={watch('secondary_background_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('secondary_background_color', color);
          }}
        />
        <SelectColor
          title='Màu chữ chủ đạo'
          color={watch('primary_font_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('primary_font_color', color);
          }}
        />
      </div>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-5 mb-5'>
        <div>
          <Controller
            control={control}
            name='display_name'
            rules={{
              required: 'Bắt buộc',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type='text'
                variant='bordered'
                label='Tên hiển thị'
                placeholder='Điền tên hiển thị'
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.display_name && (
            <div className='text-red-500 text-xs mt-2'>
              {errors.display_name.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name='description'
            rules={{
              required: 'Bắt buộc',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                type='text'
                variant='bordered'
                label='Tiêu đề phụ'
                placeholder='Điền tiêu đề phụ'
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.description && (
            <div className='text-red-500 text-xs mt-2'>
              {errors.description.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name='font'
            rules={{
              required: 'Bắt buộc',
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={!isEditable}
                name='font_family'
                variant='bordered'
                label='Phông chữ'
                placeholder='Chọn phông chữ'
                selectedKeys={[value]}
                onChange={onChange}
                isRequired
              >
                <SelectItem key='font-sans'>Sans</SelectItem>
                <SelectItem key='font-serif'>Serif</SelectItem>
                <SelectItem key='font-mono'>Monospace</SelectItem>
              </Select>
            )}
          />
          {errors.font && (
            <div className='text-red-500 text-xs mt-2'>
              {errors.font.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name='font_size'
            rules={{
              required: 'Bắt buộc',
            }}
            render={({ field: { onChange, value } }) => (
              <Select
                isDisabled={!isEditable}
                name='font_size'
                variant='bordered'
                label='Kích thước chữ (px)'
                placeholder='Chọn phông chữ'
                selectedKeys={[value]}
                onChange={onChange}
                isRequired
              >
                <SelectItem key='12'>12</SelectItem>
                <SelectItem key='14'>14</SelectItem>
                <SelectItem key='16'>16</SelectItem>
                <SelectItem key='18'>18</SelectItem>
                <SelectItem key='20'>20</SelectItem>
                <SelectItem key='24'>24</SelectItem>
                <SelectItem key='30'>30</SelectItem>
                <SelectItem key='36'>36</SelectItem>
                <SelectItem key='48'>48</SelectItem>
                <SelectItem key='60'>60</SelectItem>
                <SelectItem key='72'>72</SelectItem>
              </Select>
            )}
          />
          {errors.font_size && (
            <div className='text-red-500 text-xs mt-2'>
              {errors.font_size.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={control}
            name='description'
            rules={{
              required: 'Bắt buộc',
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                isDisabled={!isEditable}
                name='border_radius'
                type='text'
                variant='bordered'
                label='Độ bo góc tin nhắn (px)'
                placeholder='Điền độ bo góc tin nhắn'
                startContent={<BiBorderRadius size={20} />}
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.border_radius && (
            <div className='text-red-500 text-xs mt-2'>
              {errors.border_radius.message}
            </div>
          )}
        </div>
      </div>
      <div className='flex flex-col md:flex-row gap-8 mb-8'>
        <SelectColor
          title='Màu nền tin nhắn nhận'
          color={watch('receiving_message_background_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('receiving_message_background_color', color);
          }}
        />
        <SelectColor
          title='Màu chữ tin nhắn nhận'
          color={watch('receiving_message_font_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('receiving_message_font_color', color);
          }}
        />
        <SelectColor
          title='Màu nền tin nhắn gửi'
          color={watch('sending_message_background_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('sending_message_background_color', color);
          }}
        />
        <SelectColor
          title='Màu chữ tin nhắn gửi'
          color={watch('sending_message_font_color')}
          isEditable={isEditable}
          handleChangeColor={(color) => {
            setValue('sending_message_font_color', color);
          }}
        />
      </div>
      {isEditable ? (
        <div className='flex gap-5'>
          <Button color='danger' onClick={handleCancel}>
            HỦY BỎ
          </Button>
          <Button color='primary' onClick={handlePreviewConfig}>
            XEM TRƯỚC
          </Button>
          <Button color='success' onClick={handleSubmit(handleChangeConfig)}>
            LƯU
          </Button>
        </div>
      ) : (
        <div className='flex gap-5'>
          <Button color='default' onClick={() => setIsOpenConfirm(true)}>
            KHÔI PHỤC MẶC ĐỊNH
          </Button>
          <Button color='primary' onClick={() => setIsEditable(true)}>
            CHỈNH SỬA
          </Button>
        </div>
      )}
    </div>
  );
};
