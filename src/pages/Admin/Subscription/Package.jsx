import { useState } from "react";
import { LoadingProcess } from "../../../components";
import PriceBg from "@/assets/pricebg.png";
import { useTranslation } from "react-i18next";
import { initSubscriptionPaymentApi } from "../../../services/subscriptionApi";
import { motion } from "framer-motion";

const packages = [
  {
    name: "Miễn phí",
    price: "0",
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 100MB",
      "500 truy vấn AI",
      "2 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "FREE",
  },
  {
    name: "Sơ cấp",
    price: "2,000,000",
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 5GB",
      "5,000 truy vấn AI",
      "5 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "STARTER",
  },
  {
    name: "Chuyên nghiệp",
    price: "7,000,000",
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 20GB",
      "20,000 truy vấn AI",
      "20 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "PROFESSIONAL",
  },
];

export const Package = ({tierName}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();

  const handleInitSubscriptionPayment = async (type, name, isNew) => {
    setIsLoading(true);
    await initSubscriptionPaymentApi(type, name, isNew).then((res) => {
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
        {packages.map((onePackage, index) => (
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
              {onePackage.name}
            </div>
            <div
              className={`w-full px-[16px] py-[24px] text-center text-[#4880FF] border-b-[2px] border-gray-200`}
            >
              <div className="flex items-center overflow-hidden w-full justify-center gap-2">
                <motion.span
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[32px] font-bold"
                >
                  {onePackage.price}
                </motion.span>
                <span className="text-[24px]"> vnđ</span>
              </div>
              {/* <div className="text-[16px] text-[#65A30D] font-semibold">
                {onePackage.credit} credits
              </div> */}
            </div>
            <ul className="px-[16px] py-[24px]">
              {onePackage.des.map((feature, index) => (
                <li className="text-[16px] py-4 text-center" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex justify-center items-center">
              {onePackage.name === "Miễn phí" ? (
                <button
                  className={`transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] ${tierName === "FREE" ? "border-success-500 text-success-500 hover:bg-success-500" : "border-red-500 text-red-500 hover:bg-red-500"} bg-white rounded-full  hover:text-white`}
                  disabled
                >
                  {tierName=== "FREE"? "Đang sử dụng" : "Đã sử dụng hết"}
                </button>
              ) : (
                <button
                  className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white"
                  onClick={() =>
                    handleInitSubscriptionPayment(
                      onePackage.type,
                      onePackage.packageName,
                      true
                    )
                  }
                >
                  Mua ngay
                </button>
              )}
            </div>
            {/* <div className="px-[15px] pb-[24px] text-[14px] flex justify-center items-center text-center underline font-semibold">
              <a href="/sign-up" className="hover:text-[#4880FF]">
                {t("start_one_year_free_trial")}
              </a>
            </div> */}
          </div>
        ))}
      </div>
    </>
  );
};
