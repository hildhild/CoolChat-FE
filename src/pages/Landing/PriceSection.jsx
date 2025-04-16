import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import PriceBg from "../../assets/pricebg.png";
import { Select, SelectItem } from "@nextui-org/react";
import { motion } from "framer-motion";
import { useState } from "react";

function PriceSection() {
  const { t } = useTranslation();
  const [subscriptionType, setSubscriptionType] = useState("STARTER");
  const [starterPeriod, setStarterPeriod] = useState("MONTHLY");
  const [professionalPeriod, setProfessionalPeriod] = useState("MONTHLY");

  // const packages = [
  //   {
  //     name: t("month_package"),
  //     price: "350.000",
  //     credit: "10",
  //     des: [
  //       t("package_des1"),
  //       t("package_des2"),
  //       t("package_des3"),
  //       t("package_des4"),
  //       "_",
  //     ],
  //   },
  //   {
  //     name: t("quarter_package"),
  //     price: "750.000",
  //     credit: "30",
  //     des: [
  //       t("package_des1"),
  //       t("package_des2"),
  //       t("package_des3"),
  //       t("package_des4"),
  //       t("package_des5"),
  //     ],
  //   },
  //   {
  //     name: t("year_package"),
  //     price: "2.500.000",
  //     credit: "120",
  //     des: [
  //       t("package_des1"),
  //       t("package_des2"),
  //       t("package_des3"),
  //       t("package_des4"),
  //       t("package_des5"),
  //     ],
  //   },
  // ];

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

  return (
    <section id="pricing-section" className="py-[64px]">
      <div className="max-w-[1200px] px-[16px] mt-[32px] mx-[auto] relative">
        <motion.div className="text-3xl font-bold text-gray-900 min-[1200px]:h-[78px] flex items-end justify-start py-[10px] mb-[32px] px-[16px]">
          {t("supported_price")}
        </motion.div>
        <div className="w-full">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-20 mx-[16px]`}>
            {/* {packages.map((onePackage, index) => (
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
                  <div>
                    <span className="text-[32px] font-bold">
                      {onePackage.price}
                    </span>
                    <span className="text-[24px]"> vnđ</span>
                  </div>
                  <div className="text-[16px] text-[#65A30D] font-semibold">
                    {onePackage.credit} credits
                  </div>
                </div>
                <ul className="px-[16px] py-[24px]">
                  {onePackage.des.map((feature, index) => (
                    <li className="text-[16px] py-4 text-center" key={index}>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex justify-center items-center">
                  <a href="/sign-up">
                    <button className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white">
                      {t("signup_now")}
                    </button>
                  </a>
                </div>
                <div className="px-[15px] pb-[24px] text-[14px] flex justify-center items-center text-center underline font-semibold">
                  <a href="/sign-up" className="hover:text-[#4880FF]">
                    {t("start_one_year_free_trial")}
                  </a>
                </div>
              </div>
            ))} */}
            {packages.map((onePackage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true }}
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
                  <a href="/sign-up">
                    <button
                      className={`transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white`}
                    >
                      {onePackage.name === "Miễn phí"
                        ? "Đăng ký ngay"
                        : "Mua ngay"}
                    </button>
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default PriceSection;
