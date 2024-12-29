import { useTranslation } from "react-i18next";
import GoogleRecaptcha from "@/assets/googleRecaptcha.png";

export const AuthenBottom = () => {
    const { t } = useTranslation();

    return (
        <div className="w-full flex flex-col items-center mb-[20px]">
            <img src={GoogleRecaptcha} className="w-[50%] sm:w-[30%]"></img>
            <div className="max-w-[500px] text-center">{t('recaptcha_des1')} <a href="https://policies.google.com/privacy" className="underline">{t('privacy_policy')}</a> {t('and')} <a href="https://policies.google.com/terms" className="underline">{t('terms_of_service')}</a> {t('recaptcha_des2')}</div>
        </div>
    )
}