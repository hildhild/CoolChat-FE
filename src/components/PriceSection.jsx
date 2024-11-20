import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PriceBg from "../assets/pricebg.png";

function PriceSection() {
    const { t } = useTranslation();

    const packages = [
        {
            name: t('month_package'),
            price: "350.000",
            credit: "10",
            des: [
                t('package_des1'),
                t('package_des2'),
                t('package_des3'),
                t('package_des4'),
                "_"
            ]
        },
        {
            name: t('quarter_package'),
            price: "750.000",
            credit: "30",
            des: [
                t('package_des1'),
                t('package_des2'),
                t('package_des3'),
                t('package_des4'),
                t('package_des5')
            ]
        },
        {
            name: t('year_package'),
            price: "2.500.000",
            credit: "120",
            des: [
                t('package_des1'),
                t('package_des2'),
                t('package_des3'),
                t('package_des4'),
                t('package_des5')
            ]
        }
    ];

    return (
        <section id="pricing-section" className="py-[64px]">
            <div className="max-w-[1140px] px-[16px] mt-[32px] mx-[auto] relative">
                <div className="text-[24px] md:text-[32px] min-[1140px]:h-[78px] flex items-end font-semibold justify-start py-[10px] mb-[32px] px-[16px]">{t('supported_price')}</div>
                <div className="w-full">
                    <div className={`grid grid-cols-1 md:grid-cols-3 gap-20 mx-[16px]`}>
                        {
                            packages.map( (onePackage, index) => <div key={index} className={`p-[16px] rounded-xl col-span-1 bg-[url(${PriceBg})] shadow-lg`}>
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
                                <ul className="px-[16px] py-[24px]">
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
                                        <button className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white">{t('signup_now')}</button>
                                    </Link>
                                </div>
                                <div className="px-[15px] pb-[24px] text-[14px] flex justify-center items-center text-center underline font-semibold">
                                    <a href="https://agridential-dashboard.australiablockchain.au/register" className="hover:text-[#4880FF]">
                                        {t('start_one_year_free_trial')}
                                    </a>
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
        </section>

    );
}

export default PriceSection;


