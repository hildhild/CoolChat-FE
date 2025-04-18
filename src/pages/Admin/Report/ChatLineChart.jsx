import { Select, SelectItem } from "@nextui-org/react";
import Chart from "react-apexcharts";
import { CustomDatePicker } from "../../../components";
import { useEffect, useState } from "react";
import moment from "moment";

const types = {
  total_conversations: "Số cuộc hội thoại",
  total_messages: "Tổng số tin nhắn",
  customer_messages: "Số tin nhắn khách hàng",
  agent_messages: "Số tin nhắn nhân viên",
  ai_messages: "Số tin nhắn tự động",
};

export const ChatLineChart = ({
  alltimeData,
  dailyData,
  selectedDate,
  setSelectedDate,
}) => {
  const [type, setType] = useState("total_conversations");
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
      categories: dailyData?.map((item) =>
        moment(item.date)
          .format("DD-MM-YYYY")
          .replaceAll("-", "/")
      ),
    },
  };
  const series = [
    {
      name: types[type],
      data: dailyData?.map((item) => item[type]),
    },
  ];

  return (
    <div className="bg-white px-5 py-8 rounded-xl mb-5">
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
              <SelectItem key="total_conversations">
                Số cuộc hội thoại
              </SelectItem>
              <SelectItem key="total_messages">Tổng số tin nhắn</SelectItem>
              <SelectItem key="customer_messages">
                Số tin nhắn khách hàng
              </SelectItem>
              <SelectItem key="agent_messages">
                Số tin nhắn nhân viên
              </SelectItem>
              <SelectItem key="ai_messages">Số tin nhắn tự động</SelectItem>
            </Select>
          </div>
          <div className="w-28">
            <CustomDatePicker
              id="monthyear"
              value={selectedDate}
              onChange={(date) => date && setSelectedDate(date)}
              locale="vi"
              showMonthYearPicker
              isClearable={false}
              format="MM/yyyy"
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
        height={400}
      />
    </div>
  );
};
