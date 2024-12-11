import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApi } from "../services/authApi";
import { changeSignupData } from "../store/slices/SignupDataSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";

function SignUpBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const signupData = useSelector((state) => state.signupData.signupData);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("choose");

  const onSubmitWithReCAPTCHA = async () => {
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      signupApi(
        step,
        signupData
      )
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            if (step === "create"){
              toast.success(
                "Đăng ký doanh nghiệp thành công, vui lòng xác minh tài khoản trong thư được gửi qua địa chỉ email của bạn."
              );
            } else if (step === "join"){
              toast.success(
                "Đăng ký tài khoản thành công, vui lòng xác minh tài khoản trong thư được gửi qua địa chỉ email của bạn."
              );
            }
            
          } else {
            console.log(res);
            if (res.data?.email) {
              toast.error("Email: " + res.data.email[0]);
            } else if (res.data?.password) {
              toast.error("Mật khẩu: " + res.data.password[0]);
            } else if (res.data?.password2) {
              toast.error("Xác nhận mật khẩu: " + res.data.password2[0]);
            } else if (res.data?.name) {
              toast.error("Tên doanh nghiệp: " + res.data.name[0]);
            } else if (res.data?.invitation_token) {
              toast.error("Mã giới thiệu: " + res.data.invitation_token[0]);
            } else if (res.data?.description) {
              toast.error("Mô tả: " + res.data.description[0]);
            } else if (res.data?.contact_email) {
              toast.error("Email liên hệ: " + res.data.contact_email[0]);
            } else if (res.data?.contact_phone) {
              toast.error("Số điện thoại liên hệ: " + res.data.contact_phone[0]);
            } else if (res.data?.user_name) {
              toast.error("Tên: " + res.data.user_name[0]);
            } else if (res.data?.user_phone) {
              toast.error("Số điện thoại: " + res.data.user_phone[0]);
            }
          }
        })
        .catch((err) => {
          console.log(2, err);
        });
    } else {
      toast.error("Lỗi recaptcha");
    }
  };

  const handleChangeValue = (e) => {
    const fieldName = e.target.name;
    switch (fieldName) {
      case "invitation_token":
        dispatch(changeSignupData({ ...signupData, invitation_token: e.target.value }));
        break;
      case "name":
        dispatch(changeSignupData({ ...signupData, name: e.target.value }));
        break;
      case "description":
        dispatch(changeSignupData({ ...signupData, description: e.target.value }));
        break;
      case "contact_email":
        dispatch(changeSignupData({ ...signupData, contact_email: e.target.value }));
        break;
      case "contact_phone":
        dispatch(changeSignupData({ ...signupData, contact_phone: e.target.value }));
        break;
      case "user_name":
        dispatch(changeSignupData({ ...signupData, user_name: e.target.value }));
        break;
      case "user_phone":
        dispatch(changeSignupData({ ...signupData, user_phone: e.target.value }));
        break;
      case "email":
        dispatch(changeSignupData({ ...signupData, email: e.target.value }));
        break;
      case "password":
        dispatch(changeSignupData({ ...signupData, password: e.target.value }));
        break;
      case "password2":
        dispatch(
          changeSignupData({ ...signupData, password2: e.target.value })
        );
        break;
      default:
        return;
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
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
          {t("signup")}
        </div>
        <div className="h-[1px] w-60 bg-slate-200"></div>
      </div>
      {
        step === "choose"
        &&
        <div className="px-40 mb-24">
          <button onClick={(() => setStep("create"))} className="flex w-full justify-center items-center py-5 border-2 border-coolchat rounded-full hover:text-coolchat">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("create_org")}</div>
          </button>
          <div className="flex justify-center items-center py-5">
            <div className="h-[1px] w-60 bg-slate-200"></div>
            <div className="text-lg mx-5 uppercase">{t("or")}</div>
            <div className="h-[1px] w-60 bg-slate-200"></div>
          </div>
          <button onClick={(() => setStep("join"))} className="mb-7 flex w-full justify-center items-center py-5 border-2 border-coolchat rounded-full hover:text-coolchat">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("join_org")}</div>
          </button>
          <div className="flex w-full justify-center">
            <Link to="/login" className="mb-7 text-center w-full">
              <i>{t("have_account")}</i>{" "}
              <i className="text-coolchat underline">{t("login")}</i>
            </Link>
          </div>
        </div>
      }
      {
        step === "create"
        &&
        <div className="px-40 mb-24">
          <button className="text-sm text-[#676C70] hover:text-coolchat" onClick={()=>setStep("choose")}>{t('back')}</button>
          <div className="flex w-full justify-center items-center py-5">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("create_org")}</div>
          </div>
          <Input
            onChange={handleChangeValue}
            name="name"
            type="text"
            variant="bordered"
            label={t("org_name")}
            placeholder={t("enter_org_name")}
            className="mb-5"
            value={signupData.name}
          />
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                onChange={handleChangeValue}
                name="description"
                type="text"
                variant="bordered"
                label={t("des")}
                placeholder={t("enter_des")}
                className="mb-5"
                value={signupData.description}
              />
              <Input
                name="contact_phone"
                onChange={handleChangeValue}
                type="text"
                variant="bordered"
                label={t("contact_phone")}
                placeholder={t("enter_contact_phone")}
                className="mb-5"
                value={signupData.contact_phone}
              />
              <Input
                onChange={handleChangeValue}
                name="email"
                type="email"
                variant="bordered"
                label="Email"
                placeholder={t("enter_your_email")}
                className="mb-5"
                value={signupData.email}
              />
              <Input
                onChange={handleChangeValue}
                name="password"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("password")}
                placeholder={t("enter_your_password")}
                className="mb-5"
                value={signupData.password}
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
              />
            </div>
            <div>
              <Input
                onChange={handleChangeValue}
                name="contact_email"
                type="email"
                variant="bordered"
                label={t('contact_email')}
                placeholder={t("enter_contact_email")}
                className="mb-5"
                value={signupData.contact_email}
              />
              <Input
                onChange={handleChangeValue}
                name="user_name"
                type="text"
                variant="bordered"
                label={t("name")}
                placeholder={t("enter_your_name")}
                className="mb-5"
                value={signupData.user_name}
              />
              <Input
                onChange={handleChangeValue}
                name="user_phone"
                type="text"
                variant="bordered"
                label={t("phone")}
                placeholder={t("enter_your_phone")}
                className="mb-5"
                value={signupData.user_phone}
              />
              {/* <Select
                variant="bordered"
                label={t("role")}
                className="mb-5"
                placeholder={t("select_role")}
              >
                <SelectItem key="admin">{t("enterprise_admin")}</SelectItem>
                <SelectItem key="csr">{t("csr")}</SelectItem>
              </Select> */}
              <Input
                onChange={handleChangeValue}
                name="password2"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("confirm_password")}
                placeholder={t("enter_password_again")}
                className="mb-7"
                value={signupData.password2}
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
              />
            </div>
          </div>
          <div className="text-[#676C70] mb-7 text-sm">
            {t("signup_text1")}{" "}
            <i className="text-coolchat underline">{t("privacy_policy")}</i>{" "}
            {t("and")}{" "}
            <i className="text-coolchat underline">{t("terms_of_service")}</i>{" "}
            {t("signup_text2")}
          </div>
          <Button
            className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
            onClick={onSubmitWithReCAPTCHA}
          >
            {t("create_org")}
          </Button>
          <div className="flex w-full justify-center">
            <Link to="/login" className="mb-7 text-center w-full">
              <i>{t("have_account")}</i>{" "}
              <i className="text-coolchat underline">{t("login")}</i>
            </Link>
          </div>
        </div>
      }
      {
        step === "join"
        &&
        <div className="px-40 mb-24">
          <button className="text-sm text-[#676C70] hover:text-coolchat" onClick={()=>setStep("choose")}>{t('back')}</button>
          <div className="flex w-full justify-center items-center py-5">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("join_org")}</div>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <div>
              <Input
                onChange={handleChangeValue}
                name="invitation_token"
                type="text"
                variant="bordered"
                label={t("invitation_code")}
                placeholder={t("enter_invitation_code")}
                className="mb-5"
                value={signupData.invitation_token}
              />
              <Input
                onChange={handleChangeValue}
                name="email"
                type="email"
                variant="bordered"
                label="Email"
                placeholder={t("enter_your_email")}
                className="mb-5"
                value={signupData.email}
              />
              <Input
                onChange={handleChangeValue}
                name="password"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("password")}
                placeholder={t("enter_your_password")}
                className="mb-5"
                value={signupData.password}
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
              />
            </div>
            <div>
              <Input
                onChange={handleChangeValue}
                name="user_name"
                type="text"
                variant="bordered"
                label={t("name")}
                placeholder={t("enter_your_name")}
                className="mb-5"
                value={signupData.user_name}
              />
              <Input
                onChange={handleChangeValue}
                name="user_phone"
                type="text"
                variant="bordered"
                label={t("phone")}
                placeholder={t("enter_your_phone")}
                className="mb-5"
                value={signupData.user_phone}
              />
              {/* <Select
                variant="bordered"
                label={t("role")}
                className="mb-5"
                placeholder={t("select_role")}
              >
                <SelectItem key="admin">{t("enterprise_admin")}</SelectItem>
                <SelectItem key="csr">{t("csr")}</SelectItem>
              </Select> */}
              <Input
                onChange={handleChangeValue}
                name="password2"
                type={showPassword ? "text" : "password"}
                variant="bordered"
                label={t("confirm_password")}
                placeholder={t("enter_password_again")}
                className="mb-7"
                value={signupData.password2}
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
              />
            </div>
          </div>
          <div className="text-[#676C70] mb-7 text-sm">
            {t("signup_text1")}{" "}
            <i className="text-coolchat underline">{t("privacy_policy")}</i>{" "}
            {t("and")}{" "}
            <i className="text-coolchat underline">{t("terms_of_service")}</i>{" "}
            {t("signup_text2")}
          </div>
          <Button
            className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase"
            onClick={onSubmitWithReCAPTCHA}
          >
            {t("join_org")}
          </Button>
          <div className="flex w-full justify-center">
            <Link to="/login" className="mb-7 text-center w-full">
              <i>{t("have_account")}</i>{" "}
              <i className="text-coolchat underline">{t("login")}</i>
            </Link>
          </div>
        </div>
      }
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

export default SignUpBody;
