import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import LogoOnly from "@/assets/CoolChat Logo/3.png"
import GoogleLogo from "@/assets/googleLogo.png"
import { Link, useNavigate } from "react-router-dom";


function LoginBody() {
    const { t } = useTranslation();
    const recaptchaRef = React.useRef();
    const navigate = useNavigate();
    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current.executeAsync();
        navigate('../chatbot-training');
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
                <div className="text-coolchat font-semibold text-lg mx-5 uppercase">{t('login')}</div>
                <div className="h-[1px] w-60 bg-slate-200"></div>
            </div>
            <div className="px-40">
            <Button className="bg-white border-[1px] border-[#677283] w-full rounded-xl font-semibold mb-7" onClick={onSubmitWithReCAPTCHA}>
                <img src={GoogleLogo} className="w-7 h-7"></img>
                {t('continue_with_google_admin')}
            </Button>
            <Button className="bg-white border-[1px] border-[#677283] w-full rounded-xl font-semibold" onClick={onSubmitWithReCAPTCHA}>
                <img src={GoogleLogo} className="w-7 h-7"></img>
                {t('continue_with_google_csr')}
            </Button>
            </div>
            <div className="flex justify-center items-center pt-7">
                <div className="h-[1px] w-60 bg-slate-200"></div>
                <div className="text-lg mx-5 uppercase">{t('or')}</div>
                <div className="h-[1px] w-60 bg-slate-200"></div>
            </div>
            <div className="flex w-full justify-center items-center py-5">
                <img src={LogoOnly} className="w-10 h-10 mr-2"></img>
                <div className="font-semibold">{t('enter_your_account')}</div>
            </div>
            <div className="px-40 mb-24">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input type="email" variant="bordered" label="Email" placeholder={t('enter_your_email')} className="mb-5"/>
                    </div>
                    <div>
                        <Input type="password" variant="bordered" label={t('password')} placeholder={t('enter_your_password')} className="mb-5"/>
                    </div>
                </div>
                <div className="w-full flex justify-end">
                    <Link to="/forgot-password" className="text-[#676C70] mb-7 text-sm"><i className="text-coolchat underline">{t('forgot_password')}?</i> </Link>
                </div>
                <Button className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase" onClick={onSubmitWithReCAPTCHA}>{t('login')}</Button>
                <div className="flex w-full justify-center">
                    <Link to="/sign-up" className="mb-7 text-center w-full"><i>{t('no_account')}</i> <i className="text-coolchat underline">{t('signup')}</i></Link>
                </div>
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

export default LoginBody;


