import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initChargePaymentApi } from "../../../services/subscriptionApi";
import { LoadingProcess } from "../../../components";
import PriceBg from "@/assets/pricebg.png";

const charges = [
  {
    name: "Truy vấn AI",
    price: "300,000",
    credit: "_",
    des: ["1000 truy vấn", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "AI_QUERIES",
  },
  {
    name: "Kho lưu trữ tài liệu",
    price: "400,000",
    credit: "_",
    des: ["1 GB sử dụng trong 1 tháng", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "STORAGE",
  },
  {
    name: "Tài khoản nhân viên CSKH",
    price: "300,000",
    credit: "_",
    des: ["1 người sử dụng trong 1 tháng", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "HUMAN_AGENTS",
  },
];

export const AddionCharge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [queryPackageQuantity, setQueryPackageQuantity] = useState(0);
  const [storagePackageQuantity, setStoragePackageQuantity] = useState(0);
  const [agentPackageQuantity, setAgentPackageQuantity] = useState(0);

  const handleInitChargePayment = async (type, name, quantity) => {
    setIsLoading(true);
    await initChargePaymentApi(type, name, quantity).then((res) => {
      console.log(123, res);
      if (res.status === 200) {
        window.open(res.data.checkout_url, "_self");
      }
    });
    setIsLoading(false);
  };

  return (
    <>
      <LoadingProcess isLoading={isLoading} />
      <div className={`grid grid-cols-1 md:grid-cols-3 gap-20`}>
        {charges.map((item, index) => (
          <div
            key={index}
            className={`p-[16px] rounded-xl col-span-1 shadow-lg`}
            style={{
              backgroundImage: `url(${PriceBg})`,
              backgroundRepeat: "no-repeat",
              backgroundSize: "cover",
            }}
          >
            <div
              className={`w-full px-[16px] pt-[24px] font-semibol
                      d text-[18px] text-center`}
            >
              {item.name}
            </div>
            <div
              className={`w-full px-[16px] py-[24px] text-center text-[#4880FF] border-b-[2px] border-gray-200`}
            >
              <div>
                <span className="text-[32px] font-bold">{item.price}</span>
                <span className="text-[24px]"> vnđ</span>
              </div>
              <div className="text-[16px] text-[#65A30D] font-semibold">
                {item.credit} credits
              </div>
            </div>
            <ul className="px-[16px] py-[24px]">
              {item.des.map((feature, index) => (
                <li className="text-[16px] py-4 text-center" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex justify-center items-center">
            
              <button
                className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white"
                onClick={() =>
                  handleInitChargePayment(item.type, item.packageName, 1)
                }
              >
                Mua
              </button>
            </div>
            <div className="px-[15px] pb-[24px] text-[14px] flex justify-center items-center text-center underline font-semibold">
              <a href="/sign-up" className="hover:text-[#4880FF]">
                {t("start_one_year_free_trial")}
              </a>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
