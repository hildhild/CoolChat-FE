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


function ForgotPasswordBody() {
    const { t } = useTranslation();
    const recaptchaRef = React.useRef();
    const [email, setEmail] = useState("");

    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current.executeAsync();
        if (token) {
            forgotPasswordApi(email)
              .then((res) => {
                console.log(res);
                if (res.status === 200) {
                  toast.success("Tài khoản tồn tại, vui lòng kiểm tra hòm thư của bạn để đặt lại mật khẩu.");
                } else {
                  console.log(res);
                  if (res.data?.email) {
                    toast.error("Email: " + res.data.email[0]);
                  }
                }
              })
              .catch((err) => {
                console.log(2, err);
              });
        } else {
            toast.error("Lỗi recaptcha");
        }
    }

    return (
        <div className="w-full h-full lg:px-[256px] pt-[128px] pb-[64px] px-[32px] md:px-[64px]">
            
            <div className="w-full flex justify-center mb-[20px]">
                <img src={Logo} className="w-[50%] sm:w-[30%]"></img>
            </div>
            <div className="text-center w-full text-md">{t('authen_text1')}</div>
            <div className="text-center w-full text-md">- {t('authen_text2')}</div>
            <div className="flex justify-center items-center py-8">
                <div className="h-[1px] w-60 bg-slate-200"></div>
                <div className="text-coolchat font-semibold text-lg mx-5 uppercase">{t('forgot_password')}</div>
                <div className="h-[1px] w-60 bg-slate-200"></div>
            </div>
            <div className="flex w-full justify-center items-center pb-5">
                <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
                <div className="font-semibold">{t('find_your_account')}</div>
            </div>
            <div className="px-40 mb-24">
                <Input type="email" variant="bordered" label="Email" placeholder={t('enter_your_email')} className="mb-5" value={email} onChange={(e) => setEmail(e.target.value)}/>
                <div className="text-[#676C70] mb-7 text-sm">{t('forgot_password_des1')}</div>
                <Button className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase" onClick={onSubmitWithReCAPTCHA}>{t('search')}</Button>
            </div>
            <div className="w-full flex flex-col items-center mb-[20px]">
                <img src={GoogleRecaptcha} className="w-[50%] sm:w-[30%]"></img>
                <div className="w-[500px] text-center">{t('recaptcha_des1')} <a href="https://policies.google.com/privacy" className="underline">{t('privacy_policy')}</a> {t('and')} <a href="https://policies.google.com/terms" className="underline">{t('terms_of_service')}</a> {t('recaptcha_des2')}</div>
            </div>
            <ReCAPTCHA
                ref={recaptchaRef}
                size="invisible"
                sitekey={import.meta.env.VITE_RECAPTCHA_SITE_KEY}
            />

        </div>
    );
}

export default ForgotPasswordBody;


