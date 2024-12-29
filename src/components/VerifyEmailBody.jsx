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
import { AuthenBottom } from "./AuthenBottom";
import { AuthenTop } from "./AuthenTop";

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
            toast.success(t('verify_email_success'));
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
      toast.error(t('captcha_error'));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    onSubmitWithReCAPTCHA();
  }, []);

  return (
    <div className="w-full h-full xl:px-[400px] lg:px-[200px] md:px-[100px] px-8 pt-[128px] pb-[64px]">
      <AuthenTop/>
      <div className="flex justify-center items-center py-8">
        <div className="h-[1px] w-[10%] md:w-[30%] bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          {t('verify_email')}
        </div>
        <div className="h-[1px] w-[10%] md:w-[30%] bg-slate-200"></div>
      </div>
      <div className="w-full flex justify-center py-12">
        {isLoading ? (
          <Spinner size="lg" />
        ) : isSuccess ? (
          <div className="flex w-full justify-center">
            <Link to="/login" className="mb-7 text-center w-full">
              <i>{t('login_now')}</i>{" "}
              <i className="text-coolchat underline">{t("login")}</i>
            </Link>
          </div>
        ) : (
          <div className="flex w-full justify-center">
            <Link to="/sign-up" className="mb-7 text-center w-full">
              <i>{t('pls_register_other_account')}</i>{" "}
              <i className="text-coolchat underline">{t("signup")}</i>
            </Link>
          </div>
        )}
      </div>
      <AuthenBottom/>
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </div>
  );
}

export default VerifyEmailBody;
