import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { forgotPasswordApi, resetPasswordApi } from "../services/authApi";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

function ResetPasswordBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const [newPassword, setNewPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const url = new URL(window.location.href);
  const tokenEmail = url.searchParams.get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const onSubmitWithReCAPTCHA = async () => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
        await resetPasswordApi(tokenEmail, newPassword, rePassword)
          .then((res) => {
            console.log(res);
            if (res.status === 200) {
              toast.success("Đặt lại mật khẩu thành công, vui lòng đăng nhập lại.");
              navigate("/login");
            } else {
              console.log(res);
              if (res.data?.token) {
                toast.error("Token: " + res.data.token[0]);
              } else if (res.data?.new_password) {
                toast.error("Mật khẩu mới: " + res.data.new_password[0]);
              } else if (res.data?.new_password2) {
                toast.error("Xác nhận mật khẩu: " + res.data.new_password2[0]);
              } 
            }
          })
          .catch((err) => {
            console.log(2, err);
          });
      } else {
        toast.error("Lỗi recaptcha");
    }
    setIsLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangeValue = (e) => {
    const fieldName = e.target.name;
    switch (fieldName) {
      case "newPassword":
        setNewPassword(e.target.value);
        break;
      case "rePassword":
        setRePassword(e.target.value);
        break;
      default:
        return;
    }
  };

  return (
    <div className="w-full h-full lg:px-[256px] pt-[128px] pb-[64px] px-[32px] md:px-[64px]">
      <div className="w-full flex justify-center mb-[20px]">
        <img src={Logo} className="w-[50%] sm:w-[30%]"></img>
      </div>
      <div className="text-center w-full text-md">{t("authen_text1")}</div>
      <div className="text-center w-full text-md">- {t("authen_text2")}</div>
      <div className="flex justify-center items-center py-8">
        <div className="h-[1px] w-60 bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          ĐẶT LẠI MẬT KHẨU
        </div>
        <div className="h-[1px] w-60 bg-slate-200"></div>
      </div>
      <div className="flex w-full justify-center items-center pb-5">
        <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
        <div className="font-semibold">Vui lòng đặt lại mật khẩu mới</div>
      </div>
      <div className="px-40 mb-24">
        <Input
          name="newPassword"
          type={showPassword ? "text" : "password"}
          variant="bordered"
          label="Mật khẩu mới"
          placeholder="Nhập mật khẩu mới"
          className="mb-5"
          value={newPassword}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleShowPassword}
            >
              {!showPassword ? (
                <FaEyeSlash className="text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-default-400 pointer-events-none" />
              )}
            </button>
          }
          onChange={handleChangeValue}
        />
        <Input
          name="rePassword"
          type={showPassword ? "text" : "password"}
          variant="bordered"
          label="Xác nhận mật khẩu"
          placeholder="Nhập lại mật khẩu mới"
          className="mb-5"
          value={rePassword}
          endContent={
            <button
              aria-label="toggle password visibility"
              className="focus:outline-none"
              type="button"
              onClick={toggleShowPassword}
            >
              {!showPassword ? (
                <FaEyeSlash className="text-default-400 pointer-events-none" />
              ) : (
                <FaEye className="text-default-400 pointer-events-none" />
              )}
            </button>
          }
          onChange={handleChangeValue}
        />
        <Button
          className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
          onClick={onSubmitWithReCAPTCHA}
        >
          Lưu
        </Button>
      </div>
      <div className="w-full flex flex-col items-center mb-[20px]">
        <img src={GoogleRecaptcha} className="w-[50%] sm:w-[30%]"></img>
        <div className="w-[500px] text-center">
          {t("recaptcha_des1")}{" "}
          <a href="https://policies.google.com/privacy" className="underline">
            {t("privacy_policy")}
          </a>{" "}
          {t("and")}{" "}
          <a href="https://policies.google.com/terms" className="underline">
            {t("terms_of_service")}
          </a>{" "}
          {t("recaptcha_des2")}
        </div>
      </div>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </div>
  );
}

export default ResetPasswordBody;
