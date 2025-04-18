import { Select, SelectItem } from "@nextui-org/react";
import Chart from "react-apexcharts";
import { CustomDatePicker } from "../../../components";
import { useEffect, useState } from "react";

const types = {
  completed_amount: "Tổng chi tiêu (VNĐ)",
  completed_payments: "Số hóa đơn",
  // total_payments: "Tổng số hóa đơn",
  // total_amount: "Tổng số tiền (VNĐ)",
  // subscription_payments: "Số hóa đơn gói đăng ký",
  // subscription_amount: "Số tiền gói đăng ký (VNĐ)",
  // additional_charge_payments: "Số hóa đơn gói bổ sung",
  // additional_charge_amount: "Số tiền gói bổ sung (VNĐ)",
  // pending_payments: "Số hóa đơn đang chờ",
  // failed_payments: "Số hóa đơn đã hủy",
};

export const SubscriptionChart = ({
  alltimeData,
  monthlySubscription,
  selectedDate,
  setSelectedDate,
}) => {
  const [type, setType] = useState("completed_amount");
  const options = {
    chart: {
      id: "basic-bar",
      zoom: {
        enabled: false,
      },
      locales: [
        {
          name: "vi",
          options: {
            toolbar: {
              exportToSVG: "Tải xuống SVG",
              exportToPNG: "Tải xuống PNG",
              exportToCSV: "Tải xuống CSV",
            },
          },
        },
      ],
      defaultLocale: "vi",
    },
    xaxis: {
      categories: monthlySubscription?.map(
        (item) => "T" + item.month.slice(5, 7)
      ),
    },
  };
  const series = [
    {
      name: types[type],
      data: monthlySubscription?.map((item) => item[type]),
    },
  ];

  return (
    <div className="bg-white px-5 py-8 rounded-xl">
      <div className="flex flex-col md:flex-row w-full justify-between items-center mb-5">
        <div className="font-semibold text-lg">{types[type]}</div>
        <div className="flex items-center gap-3">
          <div className="w-52">
            <Select
              aria-label="Select filter type"
              variant="bordered"
              selectedKeys={[type]}
              radius="sm"
              onChange={(e) => setType(e.target.value)}
            >
              <SelectItem key="completed_amount">
                Tổng chi tiêu (VNĐ)
              </SelectItem>
              <SelectItem key="completed_payments">Số hóa đơn</SelectItem>
              {/* <SelectItem key="total_payments">Tổng số hóa đơn</SelectItem>
              <SelectItem key="total_amount">Tổng số tiền (VNĐ)</SelectItem>
              <SelectItem key="subscription_payments">
                Số hóa đơn gói đăng ký
              </SelectItem>
              <SelectItem key="subscription_amount">
                Số tiền gói đăng ký (VNĐ)
              </SelectItem>
              <SelectItem key="additional_charge_payments">
                Số hóa đơn gói bổ sung
              </SelectItem>
              <SelectItem key="additional_charge_amount">
                Số tiền gói bổ sung (VNĐ)
              </SelectItem>
              <SelectItem key="completed_payments">
                Số hóa đơn hoàn thành
              </SelectItem>
              <SelectItem key="pending_payments">
                Số hóa đơn đang chờ
              </SelectItem>
              <SelectItem key="failed_payments">Số hóa đơn đã hủy</SelectItem> */}
            </Select>
          </div>
          <div className="w-28">
            <CustomDatePicker
              id="monthyear"
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              locale="vi"
              showYearPicker
              isClearable={false}
              format="yyyy"
              maxDate={new Date()}
            />
          </div>
        </div>
      </div>
      <Chart
        options={options}
        series={series}
        type="line"
        width="100%"
        height={250}
      />
    </div>
  );
};
