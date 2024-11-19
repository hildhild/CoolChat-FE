import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Fragment, useState } from "react";
import { Link } from "react-router-dom";
import ContactPopup from "./ContactPopup";

function PriceSection() {
    const { t } = useTranslation();
    const [isContactPopupOpen, setIsContactPopupOpen] = useState(false);  // State to manage popup visibility

    const handleContactClick = () => {
        setIsContactPopupOpen(true);
    };

    const handleClosePopup = () => {
        setIsContactPopupOpen(false);
    };

    const features = [
        'Product Origin QR Code',
        'List of Sellers/Distributors',
        'Production Log Traceability',
        'Individual Product Traceability',
        'Standardize Information Display for Consumer Scanning',
        'Verified on the Blockchain',
    ]

    const packages = [
        {
            name: "Gói tháng",
            price: "350.000",
            credit: "10",
            des: [
                "Tự động trả lời bằng AI Chatbot",
                "Hỗ trợ tích hợp và training AI",
                "Hỏi mọi thứ trên ChatGPT",
                "Không giới hạn website"
            ]
        },
        {
            name: "Gói quý",
            price: "750.000",
            credit: "30",
            des: [
                "Tự động trả lời bằng AI Chatbot",
                "Hỗ trợ tích hợp và training AI",
                "Hỏi mọi thứ trên ChatGPT",
                "Không giới hạn website",
                "Ẩn \"Powered by CoolChat\""
            ]
        },
        {
            name: "Gói năm",
            price: "2.500.000",
            credit: "120",
            des: [
                "Tự động trả lời bằng AI Chatbot",
                "Hỗ trợ tích hợp và training AI",
                "Hỏi mọi thứ trên ChatGPT",
                "Không giới hạn website",
                "Ẩn \"Powered by CoolChat\""
            ]
        }
    ];

    return (
        <section id="pricing-section" className="py-[64px]">
            <div className="max-w-[1140px] px-[16px] mt-[32px] mx-[auto] relative">
                <div className="text-[24px] md:text-[32px] min-[1140px]:h-[78px] flex items-end font-semibold justify-start pl-[30px] py-[10px] mb-[32px] px-[16px]">{t('Các gói dịch vụ hỗ trợ')}</div>
                <div className="w-full">
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-20 mx-[16px]`}>
                        {
                            packages.map( (onePackage, index) => <div key={index} className={`p-[16px] rounded-xl col-span-1 bg-[url('src/assets/pricebg.png')] shadow-lg`}>
                                <div className={`w-full px-[16px] pt-[24px] font-semibold text-[18px] text-center`}>
                                    {onePackage.name}
                                </div>
                                <div className={`w-full px-[16px] py-[24px] text-center text-[#4880FF] border-b-[2px] border-gray-200`}>
                                    <div>
                                        <span className="text-[32px] font-bold">{onePackage.price}</span>
                                        <span className="text-[24px]"> vnđ</span>
                                    </div>
                                    <div className="text-[16px] text-[#65A30D] font-semibold">{onePackage.credit} credits</div>
                                </div>
                                <ul className="px-[16px] py-[24px] min-h-[328px]">
                                    {
                                        onePackage.des.map( (feature, index) => 
                                            <li className="text-[16px] py-4 text-center" key={index}>
                                                {feature}
                                            </li>
                                        )
                                    }
                                </ul>
                                <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex justify-center items-center">
                                    <Link to="https://agridential-dashboard.australiablockchain.au/register">
                                        <button className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white">Đăng ký ngay</button>
                                    </Link>
                                </div>
                                <div className="px-[15px] pb-[24px] text-[14px] flex justify-center items-center text-center underline font-semibold">
                                    <a href="https://agridential-dashboard.australiablockchain.au/register" className="hover:text-[#4880FF]">
                                        Bắt đầu 1 năm Dùng thử miễn phí
                                    </a>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <ContactPopup isOpen={isContactPopupOpen} onClose={handleClosePopup} />
        </section>

    );
}

export default PriceSection;


