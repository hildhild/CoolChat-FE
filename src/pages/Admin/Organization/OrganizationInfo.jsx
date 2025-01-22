import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationData } from "../../../store/slices/OrganizationSlice";
import { setCompanyName } from "../../../store/slices/UserSlice";
import { Button, Input } from "@nextui-org/react";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { editOrgInfoApi } from "../../../services/orgApi";
import { toast } from "react-toastify";
import { EMAIL_PATTERN } from "../../../constants/patterns";
import { useTranslation } from "react-i18next";
import { LoadingProcess } from "../../../components";

export const OrganizationInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const inputFileRef = useRef(null);
  const orgInfo = useSelector((state) => state.organization);
  const [orgInfoData, setOrgInfoData] = useState(orgInfo);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const {
    control: editControl,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
    reset
  } = useForm({
    mode: "onSubmit",
    defaultValues: orgInfo,
  });
  const [logo, setLogo] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChangeInfo = async (data) => {
    setIsLoading(true);
    await editOrgInfoApi(
      data.name,
      data.description,
      data.contact_email,
      data.contact_phone,
      data.address,
      logoFile
    )
      .then((res) => {
        if (res.status === 200) {
          dispatch(
            setOrganizationData({
              name: res.data.name,
              description: res.data?.description
                ? res.data.description
                : orgInfo.description,
              logo: res.data?.logo ? res.data.logo : orgInfo.logo,
              contact_email: res.data.contact_email,
              contact_phone: res.data?.contact_phone
                ? res.data.contact_phone
                : orgInfo.contact_phone,
              address: res.data?.address ? res.data.address : orgInfo.address,
            })
          );
          dispatch(setCompanyName(data.name));
          toast.success("Thay đổi thông tin thành công.");
          setIsEditInfo(false);
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setLogoFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoClick = () => {
    if (isEditInfo) {
      inputFileRef.current.click();
    }
  };

  return (
    <div className="bg-white px-5 py-8 rounded-xl mb-8">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full flex justify-center items-center mb-5">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center text-neutral-600 mb-2">
            <div className="text-sm">Logo</div>
            {/* <MdOutlineAddPhotoAlternate /> */}
          </div>
          {isEditInfo && (
            <input
              type="file"
              accept="image/*"
              ref={inputFileRef}
              style={{ display: "none" }}
              onChange={handleImageChange}
            />
          )}
          <button
            onClick={handleLogoClick}
            className="overflow-hidden group rounded-2xl aspect-square relative max-w-24 max-h-24 h-24 w-24 border-gray-300 border-2"
          >
            <img
              className={`${
                isEditInfo
                  ? "group-hover:grayscale transition-all duration-300 cursor-pointer"
                  : "cursor-default"
              } w-full h-full object-contain`}
              alt="avatar"
              src={logo ? logo : orgInfo.logo ? orgInfo.logo : LogoOnly}
            />
            {isEditInfo && (
              <>
                <div className="group-hover:opacity-25 opacity-0 transition-all absolute bg-black inset-0 z-1" />
                <MdOutlineAddPhotoAlternate className="z-2 group-hover:opacity-100 opacity-0 transition-all duration-300 text-4xl text-white absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
              </>
            )}
          </button>
          {/* <Avatar
          className="w-20 h-20 bg-white"
          isBordered
          radius="sm"
          src={orgInfoData.logo ? orgInfoData.logo : LogoOnly}
        /> */}
          {/* {isEditInfo && (
          <input
            id="avatar-input"
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="mt-3"
          />
        )} */}
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mb-3">
        <div>
          <Controller
            control={editControl}
            name="name"
            rules={{
              required: t("required"),
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="name"
                label={t("org_name")}
                placeholder={t("enter_org_name")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
                isDisabled={!isEditInfo}
              />
            )}
          />
          {editErrors.name && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.name.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={editControl}
            name="description"
            render={({ field: { onChange, value } }) => (
              <Input
                name="description"
                label={t("des")}
                placeholder={t("enter_des")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isDisabled={!isEditInfo}
              />
            )}
          />
          {editErrors.description && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.description.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={editControl}
            name="contact_email"
            rules={{
              required: t("required"),
              pattern: {
                value: EMAIL_PATTERN,
                message: t("invalid"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="contact_email"
                label={t("contact_email")}
                placeholder={t("enter_contact_email")}
                type="email"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
                isDisabled={!isEditInfo}
              />
            )}
          />
          {editErrors.contact_email && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.contact_email.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={editControl}
            name="contact_phone"
            render={({ field: { onChange, value } }) => (
              <Input
                name="contact_phone"
                label={t("contact_phone")}
                placeholder={t("enter_contact_phone")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isDisabled={!isEditInfo}
              />
            )}
          />
          {editErrors.contact_phone && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.contact_phone.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={editControl}
            name="address"
            render={({ field: { onChange, value } }) => (
              <Input
                name="address"
                label={t("address")}
                placeholder={t("enter_address")}
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isDisabled={!isEditInfo}
              />
            )}
          />
          {editErrors.address && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.address.message}
            </div>
          )}
        </div>
        <div>
          <Controller
            control={editControl}
            name="subscription_type"
            render={({ field: { onChange, value } }) => (
              <Input
                name="subscription_type"
                label="Gói đăng ký"
                type="text"
                variant="bordered"
                value={value}
                onChange={onChange}
                isDisabled
              />
            )}
          />
          {editErrors.subscription_type && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.subscription_type.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        {isEditInfo ? (
          <>
            <Button
              color="danger"
              onClick={() => {
                setIsEditInfo(false);
                reset();
                setLogo(null);
                setLogoFile(null);
              }}
            >
              HỦY BỎ
            </Button>
            <Button
              color="success"
              onClick={editHandleSubmit(handleChangeInfo)}
            >
              LƯU
            </Button>
          </>
        ) : (
          <Button color="primary" onClick={() => setIsEditInfo(true)}>
            CHỈNH SỬA
          </Button>
        )}
      </div>
    </div>
  );
};
