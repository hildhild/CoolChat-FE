import moment from "moment";
import Chart from "react-apexcharts";

export const ChatPieChart = ({ alltimeData }) => {
  const options = {
    chart: {
      type: "pie",
      toolbar: {
        show: true,
        tools: {
          download: true,
        },
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
    labels: ["Khách hàng", "Nhân viên", "Tự động"],
  };
  const series = alltimeData
    ? [
        alltimeData?.customer_messages,
        alltimeData?.agent_messages,
        alltimeData?.ai_messages,
      ]
    : [0, 0, 0];
  return (
    <div className="bg-white px-5 py-8 rounded-xl flex flex-col">
      <div className="flex w-full justify-between">
        <div className="font-semibold text-lg mb-5">Tin nhắn</div>
        {alltimeData?.first_conversation_date &&
          alltimeData?.last_conversation_date && (
            <div className="italic text-end text-neutral-500 text-sm">
              Thời gian:{" "}
              {moment(alltimeData?.first_conversation_date)
                .format("DD-MM-YYYY")
                .replaceAll("-", "/")}
              {" - "}
              {moment(alltimeData?.last_conversation_date)
                .format("DD-MM-YYYY")
                .replaceAll("-", "/")}
            </div>
          )}
      </div>
      <div className="flex-grow flex items-center">
        <div className="w-full">
          <Chart
            options={options}
            series={series}
            type="pie"
            width="100%"
            height={250}
          />
        </div>
      </div>
    </div>
  );
};
