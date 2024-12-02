import React, { useCallback, useState } from "react";
import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";
import { Button, Input, Select, SelectItem } from "@nextui-org/react";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";
import ReCAPTCHA from "react-google-recaptcha";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function SignUpBody() {
    const { t } = useTranslation();
    const recaptchaRef = React.useRef();
    const email = useSelector(state => state.signupData.signupData.email);


    const onSubmitWithReCAPTCHA = async () => {
        const token = await recaptchaRef.current.executeAsync();
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
                <div className="text-coolchat font-semibold text-lg mx-5 uppercase">{t('signup')}</div>
                <div className="h-[1px] w-60 bg-slate-200"></div>
            </div>
            <div className="px-40 mb-24">
                <div className="grid grid-cols-2 gap-5">
                    <div>
                        <Input type="text" variant="bordered" label={t('name')} placeholder={t('enter_your_name')} className="mb-5"/>
                        <Input type="email" variant="bordered" label="Email" placeholder={t('enter_company_email')} className="mb-5" value={email}/>
                        <Input type="password" variant="bordered" label={t('password')} placeholder={t('enter_your_password')} className="mb-5"/>
                    </div>
                    <div>
                        <Input type="text" variant="bordered" label={t('phone')} placeholder={t('enter_your_phone')} className="mb-5"/>
                        <Select 
                            variant="bordered"
                            label={t('role')}
                            className="mb-5" 
                            placeholder={t('select_role')}
                        >
                            <SelectItem key="admin">{t('enterprise_admin')}</SelectItem>
                            <SelectItem key="csr">{t('csr')}</SelectItem>
                        </Select>
                        <Input type="password" variant="bordered" label={t('confirm_password')} placeholder={t('enter_password_again')} className="mb-7"/>
                    </div>
                </div>
                <div className="text-[#676C70] mb-7 text-sm">{t('signup_text1')} <i className="text-coolchat underline">{t('privacy_policy')}</i> {t('and')} <i className="text-coolchat underline">{t('terms_of_service')}</i> {t('signup_text2')}</div>
                <Button className="bg-coolchat w-full rounded-full text-white font-semibold mb-7 uppercase" onClick={onSubmitWithReCAPTCHA}>{t('create_new_account')}</Button>
                <div className="flex w-full justify-center">
                    <Link to="/login" className="mb-7 text-center w-full"><i>{t('have_account')}</i> <i className="text-coolchat underline">{t('login')}</i></Link>
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

export default SignUpBody;


