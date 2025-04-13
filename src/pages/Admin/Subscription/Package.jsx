import { useState } from "react";
import { LoadingProcess } from "../../../components";
import PriceBg from "@/assets/pricebg.png";
import { useTranslation } from "react-i18next";
import { initSubscriptionPaymentApi } from "../../../services/subscriptionApi";
import { motion } from "framer-motion";
import { Select, SelectItem } from "@nextui-org/react";

const packages = [
  {
    name: "Miễn phí",
    price: 0,
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 100MB",
      "500 truy vấn AI",
      "2 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "FREE",
    period: "MONTHLY",
    storage: "100MB",
    query: 500,
    agent: 2,
  },
  {
    name: "Sơ cấp",
    price: 2000000,
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 5GB",
      "5,000 truy vấn AI",
      "5 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "STARTER",
    period: "MONTHLY",
    storage: "5GB",
    query: 5000,
    agent: 5,
  },
  {
    name: "Chuyên nghiệp",
    price: 7000000,
    credit: "_",
    des: [
      "Thời hạn: 1 tháng",
      "Kho lưu trữ tài liệu: 20GB",
      "20,000 truy vấn AI",
      "20 tài khoản nhân viên CSKH",
    ],
    type: "SUBSCRIPTION",
    packageName: "PROFESSIONAL",
    period: "MONTHLY",
    storage: "20GB",
    query: 20000,
    agent: 20,
  },
];

export const Package = ({ tierName }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [subscriptionType, setSubscriptionType] = useState("STARTER");
  const [starterPeriod, setStarterPeriod] = useState("MONTHLY");
  const [professionalPeriod, setProfessionalPeriod] = useState("MONTHLY");

  const handleInitSubscriptionPayment = async (type, name) => {
    setIsLoading(true);
    await initSubscriptionPaymentApi(
      type,
      name,
      subscriptionType === "STARTER" ? starterPeriod : professionalPeriod
    ).then((res) => {
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
                  {onePackage.packageName === "STARTER"
                    ? starterPeriod === "MONTHLY"
                      ? onePackage.price.toLocaleString("en-US")
                      : (onePackage.price * 12).toLocaleString("en-US")
                    : professionalPeriod === "MONTHLY"
                    ? onePackage.price.toLocaleString("en-US")
                    : (onePackage.price * 12).toLocaleString("en-US")}
                </motion.span>
                <span className="text-[24px]"> vnđ</span>
              </div>
              {/* <div className="text-[16px] text-[#65A30D] font-semibold">
                {onePackage.credit} credits
              </div> */}
            </div>
            <ul className="px-[16px] py-[24px]">
              <li className="text-[16px] py-4 flex items-center justify-center gap-3">
                Thời hạn: {onePackage.packageName === "FREE" && "1 tháng"}
                {onePackage.packageName !== "FREE" && (
                  <Select
                    size="sm"
                    className="w-28"
                    selectedKeys={[
                      onePackage.packageName === "STARTER"
                        ? starterPeriod
                        : professionalPeriod,
                    ]}
                    onChange={
                      onePackage.packageName === "STARTER"
                        ? (e) => {
                            if (e.target.value)
                              setStarterPeriod(e.target.value);
                          }
                        : (e) => {
                            if (e.target.value)
                              setProfessionalPeriod(e.target.value);
                          }
                    }
                    selectionMode="single"
                  >
                    <SelectItem key="MONTHLY">1 tháng</SelectItem>
                    <SelectItem key="YEARLY">1 năm</SelectItem>
                  </Select>
                )}
              </li>
              <li className="text-[16px] py-4 text-center">
                Kho lưu trữ tài liệu: {onePackage.storage}
              </li>
              <li className="text-[16px] py-4 text-center">
                {onePackage.packageName === "STARTER"
                  ? starterPeriod === "MONTHLY"
                    ? onePackage.query.toLocaleString("en-US")
                    : (onePackage.query * 12).toLocaleString("en-US")
                  : onePackage.packageName === "PROFESSIONAL"
                  ? professionalPeriod === "MONTHLY"
                    ? onePackage.query.toLocaleString("en-US")
                    : (onePackage.query * 12).toLocaleString("en-US")
                  : onePackage.query.toLocaleString("en-US")}{" "}
                truy vấn AI
              </li>
              <li className="text-[16px] py-4 text-center">
                {onePackage.agent} tài khoản nhân viên CSKH
              </li>
            </ul>
            <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex justify-center items-center">
              {onePackage.name === "Miễn phí" ? (
                <button
                  className={`transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] ${
                    tierName === "FREE"
                      ? "border-success-500 text-success-500 hover:bg-success-500"
                      : "border-red-500 text-red-500 hover:bg-red-500"
                  } bg-white rounded-full  hover:text-white`}
                  disabled
                >
                  {tierName === "FREE" ? "Đang sử dụng" : "Đã sử dụng hết"}
                </button>
              ) : (
                <button
                  className={`transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white ${
                    tierName === onePackage.packageName && "opacity-50"
                  }`}
                  onClick={() => {
                    setSubscriptionType(onePackage.packageName);
                    handleInitSubscriptionPayment(
                      onePackage.type,
                      onePackage.packageName
                    );
                  }}
                  disabled={tierName === onePackage.packageName}
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
      <div className="italic text-sm text-red-500 mt-5">* Lưu ý: Nếu bạn đăng ký mua gói mới thì tất cả tài nguyên còn lại của gói hiện tại sẽ không còn</div>
    </>
  );
};
