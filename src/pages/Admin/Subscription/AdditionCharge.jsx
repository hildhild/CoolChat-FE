import { useState } from "react";
import { useTranslation } from "react-i18next";
import { initChargePaymentApi } from "../../../services/subscriptionApi";
import { LoadingProcess } from "../../../components";
import PriceBg from "@/assets/pricebg.png";
import { Button, Input } from "@nextui-org/react";
import { motion } from "framer-motion";

const charges = [
  {
    name: "Truy vấn AI",
    price: "300,000",
    credit: "_",
    des: ["1000 truy vấn sử dụng đến hết chu kỳ", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "AI_QUERIES",
  },
  {
    name: "Kho lưu trữ tài liệu",
    price: "400,000",
    credit: "_",
    des: ["1 GB sử dụng đến hết chu kỳ", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "STORAGE",
  },
  {
    name: "Tài khoản nhân viên CSKH",
    price: "300,000",
    credit: "_",
    des: ["1 tài khoản sử dụng đến hết chu kỳ", "Cho mọi gói đăng ký"],
    type: "ADDITIONAL_CHARGE",
    packageName: "HUMAN_AGENTS",
  },
];

export const AddionCharge = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { t } = useTranslation();
  const [queryPackageQuantity, setQueryPackageQuantity] = useState(1);
  const [storagePackageQuantity, setStoragePackageQuantity] = useState(1);
  const [agentPackageQuantity, setAgentPackageQuantity] = useState(1);
  const min = 1;

  const increase = (name) => {
    if (name === "AI_QUERIES") {
      setQueryPackageQuantity((prev) => prev + 1);
    } else if (name === "STORAGE") {
      setStoragePackageQuantity((prev) => prev + 1);
    } else {
      setAgentPackageQuantity((prev) => prev + 1);
    }
  };
  const decrease = (name) => {
    if (name === "AI_QUERIES") {
      setQueryPackageQuantity((prev) => (prev > min ? prev - 1 : prev));
    } else if (name === "STORAGE") {
      setStoragePackageQuantity((prev) => (prev > min ? prev - 1 : prev));
    } else {
      setAgentPackageQuantity((prev) => (prev > min ? prev - 1 : prev));
    }
  };

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
      <div className={`grid grid-cols-1 xl:grid-cols-3 gap-20`}>
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
              <div className="flex items-center overflow-hidden w-full justify-center gap-2">
                <motion.span
                  initial={{ y: -30, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-[32px] font-bold"
                >
                  {item.price}
                </motion.span>
                <span className="text-[24px]"> vnđ</span>
              </div>
              {/* <div className="text-[16px] text-[#65A30D] font-semibold">
                {item.credit} credits
              </div> */}
            </div>
            <ul className="px-[16px] py-[24px]">
              {item.des.map((feature, index) => (
                <li className="text-[16px] py-4 text-center" key={index}>
                  {feature}
                </li>
              ))}
            </ul>
            <div className="px-[16px] py-[24px] border-t-[2px] border-gray-200 flex flex-col gap-5 justify-center items-center">
              <div className="flex items-center space-x-2">
                <Button
                  onClick={() => decrease(item.packageName)}
                  isDisabled={
                    item.packageName === "AI_QUERIES"
                      ? queryPackageQuantity <= min
                      : item.packageName === "STORAGE"
                      ? storagePackageQuantity <= min
                      : agentPackageQuantity <= min
                  }
                  size="sm"
                  color="primary"
                >
                  -
                </Button>
                <Input
                  type="number"
                  value={
                    item.packageName === "AI_QUERIES"
                      ? queryPackageQuantity
                      : item.packageName === "STORAGE"
                      ? storagePackageQuantity
                      : agentPackageQuantity
                  }
                  onChange={(e) => {
                    let val = Number(e.target.value);
                    if (val >= min) {
                      if (item.packageName === "AI_QUERIES") {
                        setQueryPackageQuantity(val);
                      } else if (item.packageName === "STORAGE") {
                        setStoragePackageQuantity(val);
                      } else {
                        setAgentPackageQuantity(val);
                      }
                    }
                  }}
                  className="w-16 text-center"
                  color="primary"
                  size="sm"
                />
                <Button
                  onClick={() => increase(item.packageName)}
                  size="sm"
                  color="primary"
                >
                  +
                </Button>
              </div>

              <button
                className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white"
                onClick={() =>
                  handleInitChargePayment(
                    item.type,
                    item.packageName,
                    item.packageName === "AI_QUERIES"
                      ? queryPackageQuantity
                      : item.packageName === "STORAGE"
                      ? storagePackageQuantity
                      : agentPackageQuantity
                  )
                }
              >
                Mua ngay
              </button>
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
