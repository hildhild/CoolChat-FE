import { Select, SelectItem } from "@nextui-org/react";
import Chart from "react-apexcharts";
import { CustomDatePicker } from "../../../components";
import { useEffect, useState } from "react";

const types = {
  monthly_revenue: "Tổng chi",
};

export const SubscriptionChart = ({
  alltimeData,
  monthlySubscription,
  selectedDate,
  setSelectedDate,
}) => {
  const [type, setType] = useState("monthly_revenue");
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
      categories: monthlySubscription?.map((item) => item.month.slice(5, 7)),
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
        <div className="font-semibold text-lg mb-5">Đăng ký</div>
        <div className="flex items-center gap-3">
          <div className="w-52">
            <Select
              aria-label="Select filter type"
              variant="bordered"
              selectedKeys={[type]}
              radius="sm"
              onChange={(e) => setType(e.target.value)}
            >
              <SelectItem key="monthly_revenue">Tổng chi</SelectItem>
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
              minDate={new Date(alltimeData?.first_conversation_date)}
              maxDate={new Date(alltimeData?.last_conversation_date)}
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
