import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { forgotPasswordApi, resetPasswordApi } from "../../services/authApi";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthenTop, AuthenBottom, LoadingProcess } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { PASSWORD_PATTERN } from "../../constants/patterns";

function ResetPasswordBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const [showPassword, setShowPassword] = useState(false);
  const url = new URL(window.location.href);
  const tokenEmail = url.searchParams.get("token");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      newPassword: "",
      rePassword: "",
    },
  });

  const onSubmitWithReCAPTCHA = async (data) => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      await resetPasswordApi(tokenEmail, data.newPassword, data.rePassword)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success(t("reset_password_success"));
            navigate("/login");
          }
          // else {
          //   console.log(res);
          //   if (res.data?.token) {
          //     toast.error("Token: " + res.data.token[0]);
          //   } else if (res.data?.new_password) {
          //     toast.error(t('new_password')+": " + res.data.new_password[0]);
          //   } else if (res.data?.new_password2) {
          //     toast.error(t('confirm_password')+": " + res.data.new_password2[0]);
          //   }
          // }
        })
        .catch((err) => {
          console.log(2, err);
        });
    } else {
      toast.error(t("captcha_error"));
    }
    setIsLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="w-full h-full pt-[128px] pb-[64px] xl:px-[400px] lg:px-[200px] md:px-[100px] px-8">
      <LoadingProcess isLoading={isLoading} />
      <AuthenTop />
      <div className="flex justify-center items-center py-8">
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          {t("reset_password")}
        </div>
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
      </div>
      <div className="flex w-full justify-center items-center pb-5">
        <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
        <div className="font-semibold">{t("reset_password_request")}</div>
      </div>
      <div className="mb-24">
        <div className="mb-5">
          <Controller
            control={control}
            name="newPassword"
            rules={{
              required: t("required"),
              pattern: {
                value: PASSWORD_PATTERN,
                message: t("password_inclusion_rule"),
              },
              minLength: {
                value: 8,
                message: t("password_length_rule"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="newPassword"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("new_password")}
                placeholder={t("enter_new_password")}
                value={value}
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
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.newPassword && (
            <div className="text-red-500 text-xs mt-2">
              {errors.newPassword.message}
            </div>
          )}
        </div>
        <div className="mb-5">
          <Controller
            control={control}
            name="rePassword"
            rules={{
              required: t("required"),
              pattern: {
                value: PASSWORD_PATTERN,
                message: t("password_inclusion_rule"),
              },
              minLength: {
                value: 8,
                message: t("password_length_rule"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="rePassword"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("confirm_password")}
                placeholder={t("enter_password_again")}
                value={value}
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
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.rePassword && (
            <div className="text-red-500 text-xs mt-2">
              {errors.rePassword.message}
            </div>
          )}
        </div>
        <Button
          className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
          onClick={handleSubmit(onSubmitWithReCAPTCHA)}
        >
          {t("save")}
        </Button>
      </div>
      <AuthenBottom />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </div>
  );
}

export default ResetPasswordBody;
