import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setOrganizationData } from "../../../store/slices/OrganizationSlice";
import { setCompanyName } from "../../../store/slices/UserSlice";
import { Button, Input } from "@nextui-org/react";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { editOrgInfoApi } from "../../../services/orgApi";
import { toast } from "react-toastify";
import { EMAIL_PATTERN } from "../../../constants/patterns";
import { useTranslation } from "react-i18next";
import { LoadingProcess, UploadImage } from "../../../components";

export const OrganizationInfo = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const orgInfo = useSelector((state) => state.organization);
  const [isEditInfo, setIsEditInfo] = useState(false);
  const userRole = useSelector((state) => state.user.role);
  const {
    control: editControl,
    handleSubmit: editHandleSubmit,
    formState: { errors: editErrors },
    reset,
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

  return (
    <div className="bg-white px-5 py-8 rounded-xl mb-8">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full flex justify-center items-center mb-5">
        <div className="flex flex-col items-center">
          <div className="flex justify-center items-center text-neutral-600 mb-2">
            <div className="text-sm">Logo</div>
          </div>
          <UploadImage
            image={logo}
            setImage={setLogo}
            setImageFile={setLogoFile}
            isEditable={isEditInfo}
            curImage={orgInfo.logo}
            defaultImage={LogoOnly}
          />
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
                isDisabled={!isEditInfo || userRole !== "OWNER"}
                className={userRole !== "OWNER" && "opacity-100"}
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
                isDisabled={!isEditInfo || userRole !== "OWNER"}
                className={userRole !== "OWNER" && "opacity-100"}
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
                isDisabled={!isEditInfo || userRole !== "OWNER"}
                className={userRole !== "OWNER" && "opacity-100"}
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
                isDisabled={!isEditInfo || userRole !== "OWNER"}
                className={userRole !== "OWNER" && "opacity-100"}
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
                isDisabled={!isEditInfo || userRole !== "OWNER"}
                className={userRole !== "OWNER" && "opacity-100"}
              />
            )}
          />
          {editErrors.address && (
            <div className="text-red-500 text-xs mt-2">
              {editErrors.address.message}
            </div>
          )}
        </div>
        {/* <div>
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
        </div> */}
        <Input
          name="role"
          label="Vai trò"
          type="text"
          variant="bordered"
          value={userRole === 'OWNER' ? "Chủ sở hữu" : userRole === "ADMIN" ? "Quản trị viên" : "Nhân viên CSKH"}
          isDisabled
          className={userRole !== 'OWNER' && `opacity-100`}
        />
      </div>
      {userRole === "OWNER" && (
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
      )}
    </div>
  );
};
