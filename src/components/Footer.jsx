import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import ContactPopup from "./ContactPopup"; 
import Logo from "../assets/CoolChat Logo/5.png";

function Footer() {
    const { t } = useTranslation();
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);  // State to manage popup visibility

    const handleContactClick = () => {
        setIsContactPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsContactPopupOpen(false);
    };

    return (
        <div className="bg-[#303030] text-white">
            <div className='w-full max-w-[1140px] px-[32px] my-[0px] mx-[auto]'>
                <div className="md:flex border-b-[0.8px] border-[#8787875c]">
                    <div className="md:w-[200px] px-[32px] sm:px-[16px] py-[32px] grid grid-cols-1 sm:grid-cols-3 md:block w-full">
                        <div className="w-full flex sm:justify-center pr-[30%] sm:pr-0">
                            <img className="object-contain mb-[16px] sm:pr-[20px] md:pr-0" src={Logo} alt="auschain"/>
                        </div>
                        {/* <div className="w-full flex sm:justify-center pr-[30%] sm:pr-0">
                            <img className="object-contain mb-[16px] sm:pr-[20px] md:pr-0" src="songlongLightRow.png" alt="songlong"/>
                        </div>
                        <div className="w-full flex sm:justify-center pr-[30%] sm:pr-0">
                            <img className="object-contain mb-[16px] " src="https://agridential.vn/_next/image?url=https%3A%2F%2Fres.cloudinary.com%2Fagridential%2Fimage%2Fupload%2Fv1570694865%2FLogo%2Flogo_vbc_kijy1j.png&w=1920&q=75" alt="vbc"/>
                        </div> */}
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-4 w-full">
                        <button className="text-[#9a9a9a] transition duration-200 delay-100 no-underline hover:underline-offset-4 hover:underline hover:!text-white px-[32px] py-[32px] col-span-1">
                            <div className="w-full h-full text-start">
                                <div className="text-white pb-[10px] font-semibold">{t('About')}</div>
                                <div className="text-[14px] ">{t('What\'s behind the boards.')}</div>
                            </div>
                        </button>
                        <button className=" text-[#9a9a9a] transition duration-200 delay-100 no-underline hover:underline-offset-4 hover:underline hover:!text-white px-[32px] py-[32px] col-span-1">
                            <div className="w-full h-full text-start">
                                <div className="text-white pb-[10px] font-semibold">{t('Jobs')}</div>
                                <div className="text-[14px]">{t('Learn about open roles on our team.')}</div>
                            </div>
                        </button>
                        <button className="text-[#9a9a9a] transition duration-200 delay-100 no-underline hover:underline-offset-4 hover:underline hover:!text-white px-[32px] py-[32px] col-span-1">
                            <div className="w-full h-full text-start">
                                <div className="text-white pb-[10px] font-semibold">{t('Apps')}</div>
                                <div className="text-[14px]">{t('Download the App for your Desktop or Mobile devices.')}</div>
                            </div>
                        </button>
                        <button
                            className="text-[#9a9a9a] transition duration-200 delay-100 no-underline hover:underline-offset-4 hover:underline hover:!text-white px-[32px] py-[32px] col-span-1"
                            onClick={handleContactClick}  // Trigger the popup on click
                        >
                            <div className="w-full h-full text-start">
                                <div className="text-white pb-[10px] font-semibold">{t('Contact us')}</div>
                                <div className="text-[14px]">{t('Need anything? Get in touch and we can help.')}</div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className="pt-[20px] pb-[32px] text-[13px] block md:flex justify-between px-[32px] sm:px-[16px]">
                    <div className="flex mb-[10px] md:mb-0">
                        <a href="https://agridential.vn/privacy" className="transition duration-200 delay-100 text-[#9a9a9a] mr-[20px] no-underline hover:underline-offset-4 hover:underline hover:text-white">Privacy policy</a>
                        <a href="https://agridential.vn/privacy" className="transition duration-200 delay-100 text-[#9a9a9a] no-underline hover:underline-offset-4 hover:underline hover:text-white">Terms of service</a>
                    </div>
                    <div className="text-[#9a9a9a] ">{t('Bản quyền thuộc công ty Cổ phần CoolChat')}</div>
                </div>
            </div>
            {/* Render the ContactPopup */}
            <ContactPopup isOpen={isContactPopupOpen} onClose={handleClosePopup} />
        </div>
    );
}

export default Footer;
