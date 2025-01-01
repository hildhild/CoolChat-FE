import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import GoogleLogo from "@/assets/googleLogo.png";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { loginApi } from "../services/authApi";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setCompanyName, setToken, setUserData, setUserRole } from "../store/slices/UserSlice";
import { getUserInfoApi } from "../services/userApi";
import { jwtDecode } from "jwt-decode";
import { getOrgInfoApi } from "../services/orgApi";
import { setOrganizationData } from "../store/slices/OrganizationSlice";
import LoadingProcess from "./LoadingProcess";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../constants/patterns";
import { AuthenTop } from "./AuthenTop";
import { AuthenBottom } from "./AuthenBottom";

function LoginBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      email: "", 
      password: "",
    },
  });

  const onSubmitWithReCAPTCHA = async (loginData) => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      await loginApi(loginData.email, loginData.password)
        .then((res) => {
          if (res.status === 200) {
            toast.success(t('login_success'));
            dispatch(setToken(res.data.access));
            localStorage.setItem("token", res.data.access);
            getUserInfoApi().then((res) => {
              if (res.status === 200) {
                dispatch(setUserData(res.data));
              }
            });
            const decoded = jwtDecode(res.data.access);
            dispatch(setUserRole(decoded.organization.role));
            dispatch(setCompanyName(decoded.organization.name));
            if (decoded.organization.role === "AGENT") {
              navigate("../chat");
            } else {
              navigate("../chatbot-training");
            }
            if (decoded.organization.role === "OWNER"){
              getOrgInfoApi().then((res) => {
                if (res.status === 200) {
                  dispatch(setOrganizationData(res.data));
                }
              });
            }
          } else {
            console.log(res);
            if (res.data?.email) {
              toast.error("Email: " + res.data.email[0]);
            } else if (res.data?.password) {
              toast.error(t("password") + " : " + res.data.password[0]);
            } else if (res.data?.detail) {
              toast.error(res.data.detail);
            }
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

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="xl:px-[400px] lg:px-[200px] md:px-[100px] px-8 pt-[128px] pb-[64px]  ">
      <LoadingProcess isLoading={isLoading} />
      <AuthenTop/>
      <div className="flex justify-center items-center py-8 w-full">
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          {t("login")}
        </div>
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
      </div>
      <div className="w-full">
        <Button
          className="bg-white border-[1px] border-[#677283] w-full rounded-xl font-semibold mb-7"
          onClick={onSubmitWithReCAPTCHA}
        >
          <img src={GoogleLogo} className="w-7 h-7"></img>
          {t("continue_with_google_owner")}
        </Button>
        <Button
          className="bg-white border-[1px] border-[#677283] w-full rounded-xl font-semibold mb-7"
          onClick={onSubmitWithReCAPTCHA}
        >
          <img src={GoogleLogo} className="w-7 h-7"></img>
          {t("continue_with_google_admin")}
        </Button>
        <Button
          className="bg-white border-[1px] border-[#677283] w-full rounded-xl font-semibold"
          onClick={onSubmitWithReCAPTCHA}
        >
          <img src={GoogleLogo} className="w-7 h-7"></img>
          {t("continue_with_google_csr")}
        </Button>
      </div>
      <div className="flex justify-center items-center pt-7 w-full">
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
        <div className="text-lg mx-5 uppercase">{t("or")}</div>
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
      </div>
      <div className="flex w-full justify-center items-center py-5">
        <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
        <div className="font-semibold">{t("enter_your_account")}</div>
      </div>
      <div className="mb-24">
        <div className="grid grid-cols-2 gap-5">
          <div className="mb-5">
            <Controller
              control={control}
              name="email"
              rules={{
                required: t('required'),
                pattern: {
                  value: EMAIL_PATTERN,
                  message: t('invalid'),
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
              <div className="text-red-500 text-xs mt-2">{errors.email.message}</div>
            )}
          </div>
          <div className="mb-5">
            <Controller
              control={control}
              name="password"
              rules={{
                required: t('required'),
                pattern: {
                  value: PASSWORD_PATTERN,
                  message: t('password_inclusion_rule'),
                },
                minLength: {
                  value: 8,
                  message: t('password_length_rule'),
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  variant="bordered"
                  label={t("password")}
                  placeholder={t("enter_your_password")}
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
            {errors.password && (
              <div className="text-red-500 text-xs mt-2">{errors.password.message}</div>
            )}
          </div>
        </div>
        <div className="w-full flex justify-end">
          <Link to="/forgot-password" className="text-[#676C70] mb-7 text-sm">
            <i className="text-coolchat underline">{t("forgot_password")}?</i>{" "}
          </Link>
        </div>
        <Button
          className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
          onClick={handleSubmit(onSubmitWithReCAPTCHA)}
        >
          {t("login")}
        </Button>
        <div className="flex w-full justify-center">
          <Link to="/sign-up" className="mb-7 text-center w-full">
            <i>{t("no_account")}</i>{" "}
            <i className="text-coolchat underline">{t("signup")}</i>
          </Link>
        </div>
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

export default LoginBody;
