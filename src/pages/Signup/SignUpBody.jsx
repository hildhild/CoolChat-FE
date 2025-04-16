import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { signupApi } from "../../services/authApi";
import { changeSignupData } from "../../store/slices/SignupDataSlice";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { LoadingProcess, AuthenTop, AuthenBottom } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { EMAIL_PATTERN, PASSWORD_PATTERN } from "../../constants/patterns";

function SignUpBody() {
  const { t } = useTranslation();
  const recaptchaRef = React.useRef();
  const signupData = useSelector((state) => state.signupData.signupData);
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [step, setStep] = useState("choose");
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const {
    control: createControl,
    handleSubmit: createHandleSubmit,
    formState: { errors: createErrors },
    watch: createWatch,
    reset: createReset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      name: signupData.name,
      description: signupData.description,
      contact_phone: signupData.contact_phone,
      email: signupData.email,
      password: signupData.password,
      contact_email: signupData.contact_email,
      user_name: signupData.user_name,
      user_phone: signupData.user_phone,
      password2: signupData.password2,
    },
  });

  const {
    control: joinControl,
    handleSubmit: joinHandleSubmit,
    formState: { errors: joinErrors },
    watch: joinWatch,
    reset: joinReset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      invite_code: signupData.invitation_token,
      user_name: signupData.user_name,
      user_phone: signupData.user_phone,
      password: signupData.password,
      password2: signupData.password2,
    },
  });

  const onSubmitWithReCAPTCHA = async (data) => {
    setIsLoading(true);
    const token = await recaptchaRef.current.executeAsync();
    if (token) {
      await signupApi(step, data)
        .then((res) => {
          console.log(res);
          if (res.status === 201) {
            if (step === "create") {
              toast.success(t("create_org_success"));
              createReset();
            } else if (step === "join") {
              joinReset();
              navigate("/login");
              toast.success(t("join_org_success"));
            }
          }
          // else {
          //   console.log(res);
          //   if (res.data?.email) {
          //     toast.error("Email: " + res.data.email[0]);
          //   } else if (res.data?.password) {
          //     toast.error(t('password') + ": " + res.data.password[0]);
          //   } else if (res.data?.password2) {
          //     toast.error(t('confirm_password') + ": " + res.data.password2[0]);
          //   } else if (res.data?.name) {
          //     toast.error(t('org_name') + ": " + res.data.name[0]);
          //   } else if (res.data?.invite_code) {
          //     toast.error(t('invitation_code') + ": " + res.data.invite_code[0]);
          //   } else if (res.data?.description) {
          //     toast.error(t('description') + ": " + res.data.description[0]);
          //   } else if (res.data?.contact_email) {
          //     toast.error(t('contact_email') + ": " + res.data.contact_email[0]);
          //   } else if (res.data?.contact_phone) {
          //     toast.error(
          //       t('confirm_phone') + ": " + res.data.contact_phone[0]
          //     );
          //   } else if (res.data?.user_name) {
          //     toast.error(t('name') + ": " + res.data.user_name[0]);
          //   } else if (res.data?.user_phone) {
          //     toast.error(t('phone') + ": " + res.data.user_phone[0]);
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
    <div className="w-full h-full xl:px-[400px] lg:px-[200px] md:px-[100px] px-8  pt-[128px] pb-[64px]">
      <LoadingProcess isLoading={isLoading} />
      <AuthenTop />
      <div className="flex justify-center items-center py-8">
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
        <div className="text-coolchat font-semibold text-lg mx-5 uppercase">
          {t("signup")}
        </div>
        <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
      </div>
      {step === "choose" && (
        <div className="mb-24">
          <button
            onClick={() => setStep("create")}
            className="flex w-full justify-center items-center py-5 border-2 border-coolchat rounded-full hover:text-coolchat"
          >
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("create_org")}</div>
          </button>
          <div className="flex justify-center items-center py-5">
            <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
            <div className="text-lg mx-5 uppercase">{t("or")}</div>
            <div className="h-[1px] w-[20%] md:w-[30%] bg-slate-200"></div>
          </div>
          <button
            onClick={() => setStep("join")}
            className="mb-7 flex w-full justify-center items-center py-5 border-2 border-coolchat rounded-full hover:text-coolchat"
          >
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
      )}
      {step === "create" && (
        <div className="mb-24">
          <button
            className="text-sm text-[#676C70] hover:text-coolchat"
            onClick={() => setStep("choose")}
          >
            {t("back")}
          </button>
          <div className="flex w-full justify-center items-center py-5">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("create_org")}</div>
          </div>
          <div className="mb-2 md:mb-5">
            <Controller
              control={createControl}
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
                  className="mb-2"
                />
              )}
            />
            {createErrors.name && (
              <div className="text-red-500 text-xs">
                {createErrors.name.message}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5 mb-5">
            <div>
              <Controller
                control={createControl}
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
                  />
                )}
              />
              {createErrors.description && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.description.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
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
                  />
                )}
              />
              {createErrors.contact_email && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.contact_email.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
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
                  />
                )}
              />
              {createErrors.contact_phone && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.contact_phone.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
                name="user_name"
                rules={{
                  required: t("required"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="user_name"
                    label={t("name")}
                    placeholder={t("enter_your_name")}
                    type="text"
                    variant="bordered"
                    value={value}
                    onChange={onChange}
                    isRequired
                  />
                )}
              />
              {createErrors.user_name && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.user_name.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
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
              {createErrors.email && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.email.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
                name="user_phone"
                rules={{
                  required: t("required"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="user_phone"
                    label={t("phone")}
                    placeholder={t("enter_your_phone")}
                    type="text"
                    variant="bordered"
                    value={value}
                    onChange={onChange}
                    isRequired
                  />
                )}
              />
              {createErrors.user_phone && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.user_phone.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
                name="password"
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
              {createErrors.password && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.password.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={createControl}
                name="password2"
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
                  validate: (value) =>
                    value === createWatch("password") ||
                    t("unmatched_password"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="password2"
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
              {createErrors.password2 && (
                <div className="text-red-500 text-xs mt-2">
                  {createErrors.password2.message}
                </div>
              )}
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
            onClick={createHandleSubmit(onSubmitWithReCAPTCHA)}
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
      )}
      {step === "join" && (
        <div className="mb-24">
          <button
            className="text-sm text-[#676C70] hover:text-coolchat"
            onClick={() => setStep("choose")}
          >
            {t("back")}
          </button>
          <div className="flex w-full justify-center items-center py-5">
            <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
            <div className="font-semibold">{t("join_org")}</div>
          </div>
          <div className="mb-2 md:mb-5">
            <Controller
              control={joinControl}
              name="invite_code"
              rules={{
                required: t("required"),
                maxLength: {
                  value: 8,
                  message: "Mã giới thiệu phải có 8 ký tự",
                },
                minLength: {
                  value: 8,
                  message: "Mã giới thiệu phải có 8 ký tự",
                },
              }}
              render={({ field: { onChange, value } }) => (
                <Input
                  name="invite_code"
                  label={t("invitation_code")}
                  placeholder={t("enter_invitation_code")}
                  type="text"
                  variant="bordered"
                  value={value}
                  onChange={onChange}
                  isRequired
                />
              )}
            />
            {joinErrors.invite_code && (
              <div className="text-red-500 text-xs mt-2">
                {joinErrors.invite_code.message}
              </div>
            )}
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-5 mb-5">
            <div>
              <Controller
                control={joinControl}
                name="user_name"
                rules={{
                  required: t("required"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="user_name"
                    label={t("name")}
                    placeholder={t("enter_your_name")}
                    type="text"
                    variant="bordered"
                    value={value}
                    onChange={onChange}
                    isRequired
                  />
                )}
              />
              {joinErrors.user_name && (
                <div className="text-red-500 text-xs mt-2">
                  {joinErrors.user_name.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={joinControl}
                name="user_phone"
                rules={{
                  required: t("required"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="user_phone"
                    label={t("phone")}
                    placeholder={t("enter_your_phone")}
                    type="text"
                    variant="bordered"
                    value={value}
                    onChange={onChange}
                    isRequired
                  />
                )}
              />
              {joinErrors.user_phone && (
                <div className="text-red-500 text-xs mt-2">
                  {joinErrors.user_phone.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={joinControl}
                name="password"
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
              {joinErrors.password && (
                <div className="text-red-500 text-xs mt-2">
                  {joinErrors.password.message}
                </div>
              )}
            </div>
            <div>
              <Controller
                control={joinControl}
                name="password2"
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
                  validate: (value) =>
                    value === joinWatch("password") || t("unmatched_password"),
                }}
                render={({ field: { onChange, value } }) => (
                  <Input
                    name="password2"
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
              {joinErrors.password2 && (
                <div className="text-red-500 text-xs mt-2">
                  {joinErrors.password2.message}
                </div>
              )}
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
            onClick={joinHandleSubmit(onSubmitWithReCAPTCHA)}
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
      )}
      <AuthenBottom />
      <ReCAPTCHA
        ref={recaptchaRef}
        size="invisible"
        sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
      />
    </div>
  );
}

export default SignUpBody;
