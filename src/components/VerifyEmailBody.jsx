import React, { useCallback, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Spinner } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { verifyEmailApi } from "../services/authApi";

function VerifyEmailBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const signupData = useSelector((state) => state.signupData.signupData);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);

  const url = new URL(window.location.href);
  const tokenEmail = url.searchParams.get("token");

  const onSubmitWithReCAPTCHA = async () => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      await verifyEmailApi(tokenEmail)
        .then((res) => {
          console.log(res);
          if (res.status === 200) {
            toast.success("Xác minh tài khoản thành công.");
            setIsSuccess(true);
          } else {
            console.log(res);
            toast.error(res.data.token[0]);
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

  useEffect(() => {
    onSubmitWithReCAPTCHA();
  }, []);

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
          Xác minh địa chỉ email
        </div>
        <div className="h-[1px] w-60 bg-slate-200"></div>
      </div>
      <div className="w-full flex justify-center py-12">
        {isLoading ? (
          <Spinner size="lg" />
        ) : isSuccess ? (
          <div className="flex w-full justify-center">
            <Link to="/login" className="mb-7 text-center w-full">
              <i>Đăng nhập ngay</i>{" "}
              <i className="text-coolchat underline">{t("login")}</i>
            </Link>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <Link to="/sign-up" className="mb-7 text-center w-full">
              <i>Vui lòng đăng ký lại tài khoản khác</i>{" "}
              <i className="text-coolchat underline">{t("signup")}</i>
            </Link>
          </div>
        )}
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

export default VerifyEmailBody;
