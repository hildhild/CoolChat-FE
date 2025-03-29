import { Chip, Progress } from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { useTranslation } from "react-i18next";
import PriceBg from "@/assets/pricebg.png";
import { LoadingProcess } from "../../../components";
import { useState } from "react";
import { initPaymentApi } from "../../../services/subscriptionApi";
import { PaymentCancel } from "./PaymentCancel";
import { PaymentSuccess } from "./PaymentSuccess";

function Subscription() {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);

  const packages = [
    {
      name: t("month_package"),
      price: "350.000",
      credit: "10",
      des: [
        t("package_des1"),
        t("package_des2"),
        t("package_des3"),
        t("package_des4"),
        "_",
      ],
    },
    {
      name: t("quarter_package"),
      price: "750.000",
      credit: "30",
      des: [
        t("package_des1"),
        t("package_des2"),
        t("package_des3"),
        t("package_des4"),
        t("package_des5"),
      ],
    },
    {
      name: t("year_package"),
      price: "2.500.000",
      credit: "120",
      des: [
        t("package_des1"),
        t("package_des2"),
        t("package_des3"),
        t("package_des4"),
        t("package_des5"),
      ],
    },
  ];

  const handleInitPayment = async () => {
    setIsLoading(true);
    await initPaymentApi("SUBSCRIPTION", "STARTER", true).then((res) => {
      console.log(123, res);
      if (res.status === 200) {
        window.open(res.data.checkout_url, "_self");
      }
    });
    setIsLoading(false);
  };

  return (
    <DashboardLayout page="subscription">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">THANH TOÁN</div>
        <div className="bg-white px-5 py-8 rounded-xl mb-8">
          <div className="font-semibold text-lg mb-5">Đang sử dụng</div>
          <div className="flex flex-col items-center">
            <Chip color="success" className="mb-4">
              DÙNG THỬ MIỄN PHÍ
            </Chip>
            <Progress
              color="success"
              aria-label="Loading..."
              value={12}
              className="mb-4"
            />
            <div className="font-semibold">
              Đã sử dụng 0.12 credit / Tổng 1 credit
            </div>
            <div>
              <span className="font-semibold">Hạn sử dụng:</span> 23/09/2025
              (Gói 1 năm)
            </div>
          </div>
        </div>
        <div className="font-semibold text-lg mb-5">Các gói dịch vụ</div>
        <div className="w-full">
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
                  <button
                    className="transition ease-in-out delay-100 hover:-translate-y-1 duration-200 px-[16px] pt-[11.2px] pb-[12.8px] border-[2px] border-[#4880FF] text-[#4880FF] bg-white rounded-full hover:bg-[#4880FF] hover:text-white"
                    onClick={handleInitPayment}
                  >
                    {t("signup_now")}
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
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Subscription;
export { PaymentCancel, PaymentSuccess };
