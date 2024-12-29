import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { forgotPasswordApi } from "../services/authApi";
import { toast } from "react-toastify";
import LoadingProcess from "./LoadingProcess";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN } from "../constants/patterns";
import { AuthenTop } from "./AuthenTop";
import { AuthenBottom } from "./AuthenBottom";

function ForgotPasswordBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "",
    },
  });

  const onSubmitWithReCAPTCHA = async (data) => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      await forgotPasswordApi(data.email)
        .then((res) => {
          if (res.status === 200) {
            toast.success(t("forgot_password_success"));
          } else {
            if (res.data?.email) {
              toast.error("Email: " + res.data.email[0]);
            }
          }
        })
        .catch((err) => {
          console.log(2, err);
        });
    } else {
      toast.error(t("captcha_error"));
    }
    setIsLoading(false);
  };

  return (
    <div className="w-full h-full pt-[128px] pb-[64px] xl:px-[400px] lg:px-[200px] md:px-[100px] px-8">
      <LoadingProcess isLoading={isLoading} />
      <AuthenTop />
      <div className="flex justify-center items-center py-8">
        <div className="h-[1px] w-[15%] md:w-[30%] bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          {t("forgot_password")}
        </div>
        <div className="h-[1px] w-[15%] md:w-[30%] bg-slate-200"></div>
      </div>
      <div className="flex w-full justify-center items-center pb-5">
        <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
        <div className="font-semibold">{t("find_your_account")}</div>
      </div>
      <div className="mb-24">
        <div className="mb-5">
          <Controller
            control={control}
            name="email"
            rules={{
              required: t("required"),
              pattern: {
                value: EMAIL_PATTERN,
                message: t("invalid"),
              },
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="email"
                label="Email"
                placeholder={t("enter_your_email")}
                type="email"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          {errors.email && (
            <div className="text-red-500 text-xs mt-2">
              {errors.email.message}
            </div>
          )}
        </div>
        <div className="text-[#676C70] mb-7 text-sm">
          {t("forgot_password_des1")}
        </div>
        <Button
          className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
          onClick={handleSubmit(onSubmitWithReCAPTCHA)}
        >
          {t("search")}
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

export default ForgotPasswordBody;
