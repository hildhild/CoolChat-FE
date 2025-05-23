import {
  Button,
  Chip,
  Progress,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { useTranslation } from "react-i18next";
import PriceBg from "@/assets/pricebg.png";
import {
  ConfirmModal,
  LoadingProcess,
  ToggleSection,
} from "../../../components";
import { useEffect, useState } from "react";
import {
  getActiveSubscriptionInfoApi,
  renewSubscriptionApi,
} from "../../../services/subscriptionApi";
import { PaymentCancel } from "./PaymentCancel";
import { PaymentSuccess } from "./PaymentSuccess";
import { MdOutlineSubscriptions, MdOutlinePayments } from "react-icons/md";
import { PaymentHistory } from "./PaymentHistory";
import { MdOutlineLibraryAddCheck, MdOutlineLibraryAdd } from "react-icons/md";
import { useQuery } from "@tanstack/react-query";
import { dateTimeToString } from "../../../utils";
import { AddionCharge } from "./AdditionCharge";
import { Package } from "./Package";

function Subscription() {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [addtionalPeriod, setAdditionalPeriod] = useState("MONTHLY");
  const [isLoading, setIsLoading] = useState(false);

  const {
    data,
    refetch,
    isLoading: isLoadingInfo,
  } = useQuery({
    queryKey: ["subscriptionInfo"],
    queryFn: async () => {
      try {
        const res = await getActiveSubscriptionInfoApi();
        console.log(13, res);
        if (res.status === 200) {
          return res.data;
        } else {
          // toast.error(res.data.detail);
          return [];
        }
      } catch (e) {
        throw new Error("Failed to fetch payments.");
      }
    },
  });

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

  const handleRenewSubscription = async () => {
    setIsLoading(true);
    await renewSubscriptionApi(addtionalPeriod).then((res) => {
      if (res.status === 200) {
        window.open(res.data.payment_link, "_self");
      }
    });
    setIsLoading(false);
  };

  return (
    <DashboardLayout page="subscription">
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          setAdditionalPeriod("MONTHLY");
          onClose();
        }}
        onConfirm={() => {
          onClose();
          handleRenewSubscription();
        }}
        title="Gia hạn"
        description=<div>
          <div className="italic text-neutral-500  mb-5">
            * Chọn thời hạn để gia hạn thêm thời gian cho gói cước hiện tại
          </div>
          <div className="flex justify-between items-center">
            <div>Thời hạn:</div>
            <Select
              size="sm"
              className="w-28"
              selectedKeys={[addtionalPeriod]}
              onChange={(e) => {
                if (e.target.value) setAdditionalPeriod(e.target.value);
              }}
              selectionMode="single"
            >
              <SelectItem key="MONTHLY">1 tháng</SelectItem>
              <SelectItem key="YEARLY">1 năm</SelectItem>
            </Select>
          </div>
        </div>
      />
      <LoadingProcess isLoading={isLoadingInfo || isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">THANH TOÁN</div>
        <div className="bg-white px-5 py-8 rounded-xl mb-8">
          <div className="font-semibold text-lg mb-5">Đang sử dụng</div>
          <div className="flex flex-col items-center">
            <Chip color="primary" variant="flat" size="lg" className="mb-8">
              {data?.tier_display === "Free"
                ? "DÙNG THỬ MIỄN PHÍ"
                : data?.tier_display === "Starter"
                ? "GÓI SƠ CẤP"
                : "GÓI CHUYÊN NGHIỆP"}
            </Chip>
            {/* <Progress
              color="success"
              aria-label="Loading..."
              value={12}
              className="mb-4"
            />
            <div className="font-semibold">
              Đã sử dụng 0.12 credit / Tổng 1 credit
            </div> */}
            <div className="mb-8 w-full flex flex-col justify-center items-center">
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center mb-3">
                <div
                  className={`col-span-1 font-semibold ${
                    data?.ai_queries_used === data?.total_ai_queries_limit &&
                    "text-red-500"
                  }`}
                >
                  Truy vấn AI:
                </div>
                <Progress
                  color="success"
                  aria-label="Loading..."
                  value={
                    (data?.ai_queries_used / data?.total_ai_queries_limit) * 100
                  }
                  className="col-span-3 lg:col-span-4"
                />
              </div>
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center">
                <div></div>
                <div className="font-semibold w-full text-center col-span-3 lg:col-span-4">
                  Đã sử dụng {data?.ai_queries_used} / Tổng{" "}
                  {data?.total_ai_queries_limit} truy vấn AI
                </div>
              </div>
            </div>
            <div className="mb-8 w-full flex flex-col justify-center items-center">
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center mb-3">
                <div
                  className={`col-span-1 font-semibold ${
                    data?.storage_used_mb === data?.total_storage_limit &&
                    "text-red-500"
                  }`}
                >
                  Kho lưu trữ tài liệu:
                </div>
                <Progress
                  color="warning"
                  aria-label="Loading..."
                  value={
                    (data?.storage_used_mb / data?.total_storage_limit) * 100
                  }
                  className="col-span-3 lg:col-span-4"
                />
              </div>
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center">
                <div></div>
                <div className="font-semibold w-full text-center col-span-3 lg:col-span-4">
                  Đã sử dụng {data?.storage_used_mb} / Tổng{" "}
                  {data?.total_storage_limit} MB kho lưu trữ tài liệu
                </div>
              </div>
            </div>
            <div className="mb-8 w-full flex flex-col justify-center items-center">
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center mb-3">
                <div
                  className={`col-span-1 font-semibold ${
                    data?.human_agents_count ===
                      data?.total_human_agents_limit && "text-red-500"
                  }`}
                >
                  Tài khoản nhân viên CSKH:
                </div>
                <Progress
                  color="primary"
                  aria-label="Loading..."
                  value={
                    (data?.human_agents_count /
                      data?.total_human_agents_limit) *
                    100
                  }
                  className="col-span-3 lg:col-span-4"
                />
              </div>
              <div className="grid-cols-4 lg:grid-cols-5 gap-3 grid w-full items-center">
                <div></div>
                <div className="font-semibold w-full text-center col-span-3 lg:col-span-4">
                  Đã sử dụng {data?.human_agents_count} / Tổng{" "}
                  {data?.total_human_agents_limit} tài khoản nhân viên CSKH
                </div>
              </div>
            </div>
            <div>
              {new Date(data?.current_period_end) >= new Date() ? (
                <div className="flex gap-3 items-center">
                  <span className="font-semibold">Hạn sử dụng:</span>{" "}
                  {dateTimeToString(new Date(data?.current_period_end))}
                  {data?.tier_name !== "FREE" && (
                    <Button
                      size="sm"
                      color="primary"
                      variant="bordered"
                      onClick={onOpen}
                    >
                      Gia hạn
                    </Button>
                  )}
                </div>
              ) : (
                <Chip color="danger" variant="bordered">
                  Đã hết hạn
                </Chip>
              )}
            </div>
          </div>
        </div>
        <ToggleSection title="Các gói dịch vụ" Icon={MdOutlineSubscriptions}>
          <div className="w-full mb-8">
            <Tabs
              size="lg"
              aria-label="integrate"
              className="mb-4 w-full"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-white",
              }}
            >
              <Tab
                key="subscription"
                title={
                  <Tooltip content="Gói đăng ký">
                    <div className="flex gap-3 items-center px-5">
                      <MdOutlineLibraryAddCheck size={20} />
                      <span className="hidden lg:block">Gói đăng ký</span>
                    </div>
                  </Tooltip>
                }
              >
                <Package tierName={data?.tier_name} />
              </Tab>
              <Tab
                key="additional_charge"
                title={
                  <Tooltip content="Gói bổ sung">
                    <div className="flex gap-3 items-center px-5">
                      <MdOutlineLibraryAdd size={20} />
                      <span className="hidden lg:block">Gói bổ sung</span>
                    </div>
                  </Tooltip>
                }
              >
                <AddionCharge />
              </Tab>
            </Tabs>
          </div>
        </ToggleSection>
        <ToggleSection
          title="Lịch sử thanh toán"
          Icon={MdOutlinePayments}
          initIsOpen={false}
        >
          <PaymentHistory />
        </ToggleSection>
      </div>
    </DashboardLayout>
  );
}

export default Subscription;
export { PaymentCancel, PaymentSuccess };
