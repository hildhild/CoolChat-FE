import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { editUserInfoApi } from "../../services/userApi";
import { LoadingProcess, UploadImage } from "../../components";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import { useTranslation } from "react-i18next";
import { toast } from "react-toastify";
import { setUserData } from "../../store/slices/UserSlice";

export const UserInfo = () => {
  const { t } = useTranslation();
  const userInfo = useSelector((state) => state.user);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [avatar, setAvatar] = useState(null);
  const [avatarFile, setAvatarFile] = useState(null);
  const {
    control: infoControl,
    handleSubmit: infoHandleSubmit,
    formState: { errors: infoErrors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: userInfo,
  });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChangeProfile = async (data) => {
    setIsLoading(true);
    await editUserInfoApi(data.name, avatarFile, data.phoneNumber)
      .then((res) => {
        console.log(123, res);
        if (res.status === 200) {
          dispatch(
            setUserData({
              email: userInfo.email,
              name: res.data.name,
              avatar_url: res.data?.avatar ? res.data.avatar : userInfo.avatar,
              phone_number: res.data?.phone_number
                ? res.data.phone_number
                : userInfo.phoneNumber,
            })
          );
          toast.success("Thay đổi thông tin thành công.");
          setIsEditProfile(false);
        }
        // else {
        //   console.log(res);
        //   if (res.data?.name) {
        //     toast.error("Tên: " + res.data.name[0]);
        //   } else if (res.data?.avatar) {
        //     toast.error("Ảnh đại diện: " + res.data.avatar[0]);
        //   }
        // }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full flex justify-center items-center mb-5">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center text-neutral-600 mb-2">
            <div className="text-sm">Ảnh đại diện</div>
          </div>
          <UploadImage
            image={avatar}
            setImage={setAvatar}
            setImageFile={setAvatarFile}
            isEditable={isEditProfile}
            curImage={userInfo.avatar}
            defaultImage="https://cdn-icons-png.flaticon.com/512/4194/4194959.png"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mb-5">
        <div>
          <Controller
            control={infoControl}
            name="name"
            rules={{
              required: t("required"),
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="name"
                label={t("name")}
                placeholder={t("enter_your_name")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
                isDisabled={!isEditProfile}
              />
            )}
          />
          {infoErrors.name && (
            <div className="text-red-500 text-xs mt-2">
              {infoErrors.name.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={infoControl}
            name="phoneNumber"
            rules={{
              required: t("required"),
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="phoneNumber"
                label={t("phone")}
                placeholder={t("enter_your_phone")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
                isDisabled={!isEditProfile}
              />
            )}
          />
          {infoErrors.phoneNumber && (
            <div className="text-red-500 text-xs mt-2">
              {infoErrors.phoneNumber.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={infoControl}
            name="email"
            render={({ field: { onChange, value } }) => (
              <Input
                name="email"
                label="Email"
                placeholder={t("enter_your_email")}
                type="email"
                variant="bordered"
                value={value}
                onChange={onChange}
                isDisabled
              />
            )}
          />
          {infoErrors.email && (
            <div className="text-red-500 text-xs mt-2">
              {infoErrors.email.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={infoControl}
            name="role"
            render={({ field: { onChange, value } }) => (
              <Select
                variant="bordered"
                label={t("role")}
                placeholder={t("select_role")}
                selectedKeys={[value]}
                isDisabled
                onChange={onChange}
              >
                <SelectItem key="OWNER">{t("enterprise_owner")}</SelectItem>
                <SelectItem key="ADMIN">{t("enterprise_admin")}</SelectItem>
                <SelectItem key="AGENT">{t("csr")}</SelectItem>
              </Select>
            )}
          />
          {infoErrors.role && (
            <div className="text-red-500 text-xs mt-2">
              {infoErrors.role.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        {isEditProfile ? (
          <>
            <Button
              color="danger"
              onClick={() => {
                setIsEditProfile(false);
                reset();
                setAvatar(null);
                setAvatarFile(null);
              }}
            >
              HỦY BỎ
            </Button>
            <Button
              color="success"
              onClick={infoHandleSubmit(handleChangeProfile)}
            >
              LƯU
            </Button>
          </>
        ) : (
          <Button color="primary" onClick={() => setIsEditProfile(true)}>
            CHỈNH SỬA
          </Button>
        )}
      </div>
    </div>
  );
};
