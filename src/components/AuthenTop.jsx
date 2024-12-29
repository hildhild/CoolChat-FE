import { useTranslation } from "react-i18next";
import Logo from "@/assets/CoolChat Logo/2.png";

export const AuthenTop = () => {
    const { t } = useTranslation();

    return (
        <>
            <div className="w-full flex justify-center mb-[20px]">
                <img src={Logo} className="w-[50%] sm:w-[30%]"></img>
            </div>
            <div className="text-center w-full text-md">{t('authen_text1')}</div>
            <div className="text-center w-full text-md">- {t('authen_text2')}</div>
        </>
    )
}