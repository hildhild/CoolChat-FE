import { Button, Select, SelectItem } from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { BiExport } from "react-icons/bi";
import {
  MdOutlineChat,
  MdOutlineSupportAgent,
  MdCalendarMonth,
} from "react-icons/md";
import { FaArrowTrendUp, FaArrowTrendDown, FaUsers } from "react-icons/fa6";
import Chart from "react-apexcharts";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
} from "@nextui-org/react";

function Report() {
  const options = {
    chart: {
      id: "basic-bar",
      zoom: {
        enabled: false, // Tắt zoom
      },
    },
    xaxis: {
      categories: [
        "T01",
        "T02",
        "T03",
        "T04",
        "T05",
        "T06",
        "T07",
        "T08",
        "T09",
        "T10",
        "T11",
        "T12",
      ],
    },
  };
  const series = [
    {
      name: "chat",
      data: [30, 40, 45, 50, 49, 60, 70, 91, 95, 117, 120, 121],
    },
  ];

  const rows1 = [
    {
      key: "1",
      city: "Hồ Chí Minh",
      chat_quantity_total: 10,
    },
    {
      key: "2",
      city: "Hà Nội",
      chat_quantity_total: 8,
    },
    {
      key: "3",
      city: "Bình Dương",
      chat_quantity_total: 6,
    },
    {
      key: "4",
      city: "Kon Tum",
      chat_quantity_total: 1,
    },
  ];

  const columns1 = [
    {
      key: "city",
      label: "Tỉnh/thành phố",
    },
    {
      key: "chat_quantity_total",
      label: "Tổng số cuộc hội thoại",
    },
  ];

  const rows2 = [
    {
      key: "1",
      browser: "Chrome",
      chat_quantity_total: 15,
    },
    {
      key: "2",
      browser: "Edge",
      chat_quantity_total: 5,
    },
  ];

  const columns2 = [
    {
      key: "browser",
      label: "Trình duyệt",
    },
    {
      key: "chat_quantity_total",
      label: "Tổng số cuộc hội thoại",
    },
  ];

  return (
    <DashboardLayout page="report">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="w-full flex justify-between">
          <div className="font-semibold mb-6 text-2xl">BÁO CÁO</div>
          <Button className="flex bg-coolchat text-white">
            Xuất
            <BiExport />
          </Button>
        </div>
        <div className="grid grid-cols-4 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between mb-2">
              <div className="text-neutral-600 font-semibold max-w-[70%]">
                Tổng số cuộc hội thoại
              </div>
              <div className="rounded-full bg-blue-100 size-12 text-blue-700 flex items-center justify-center">
                <MdOutlineChat size={25} />
              </div>
            </div>
            <div className="text-3xl font-semibold mb-4">10,000</div>
            <div className="flex gap-2 items-center">
              <FaArrowTrendUp className="text-[#00B69B]" size={20} />
              <div className="text-[#00B69B]">10%</div>
              <div className="text-neutral-600">Tăng từ hôm qua</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between mb-2">
              <div className="text-neutral-600 font-semibold max-w-[70%]">
                Yêu cầu hỗ trợ chưa được xử lý
              </div>
              <div className="rounded-full bg-yellow-50 size-12 text-yellow-400 flex items-center justify-center">
                <MdOutlineSupportAgent size={25} />
              </div>
            </div>
            <div className="text-3xl font-semibold mb-4">10</div>
            <div className="flex gap-2 items-center">
              <FaArrowTrendDown className="text-[#F93C65]" size={20} />
              <div className="text-[#F93C65]">10%</div>
              <div className="text-neutral-600">Giảm từ hôm qua</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between mb-2">
              <div className="text-neutral-600 font-semibold max-w-[70%]">
                Lịch hẹn trong tương lai
              </div>
              <div className="rounded-full bg-red-50 size-12 text-red-500 flex items-center justify-center">
                <MdCalendarMonth size={25} />
              </div>
            </div>
            <div className="text-3xl font-semibold mb-4">25</div>
            <div className="flex gap-2 items-center">
              <FaArrowTrendUp className="text-[#00B69B]" size={20} />
              <div className="text-[#00B69B]">20%</div>
              <div className="text-neutral-600">Tăng từ hôm qua</div>
            </div>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between mb-2">
              <div className="text-neutral-600 font-semibold max-w-[70%]">
                Tỷ lệ giữ chân khách hàng
              </div>
              <div className="rounded-full bg-green-50 size-12 text-green-500 flex items-center justify-center">
                <FaUsers size={25} />
              </div>
            </div>
            <div className="text-3xl font-semibold mb-4">80%</div>
            <div className="flex gap-2 items-center">
              <FaArrowTrendUp className="text-[#00B69B]" size={20} />
              <div className="text-[#00B69B]">5%</div>
              <div className="text-neutral-600">Tăng từ hôm qua</div>
            </div>
          </div>
        </div>
        <div className="bg-white px-5 py-8 rounded-xl mb-8">
          <div className="flex w-full justify-between">
            <div className="font-semibold text-lg mb-5">Cuộc hội thoại</div>
            <div className="w-20">
              <Select
                variant="bordered"
                className="mb-5"
                defaultSelectedKeys={["year"]}
                size="sm"
              >
                <SelectItem key="year">Năm</SelectItem>
                <SelectItem key="month">Tháng</SelectItem>
              </Select>
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
        <div className="grid grid-cols-2 gap-5 mb-8">
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between">
              <div className="font-semibold text-lg mb-5">Vị trí</div>
              <div className="w-32">
                <Select
                  variant="bordered"
                  className="mb-5"
                  defaultSelectedKeys={["internal"]}
                  size="sm"
                >
                  <SelectItem key="internal">Trong nước</SelectItem>
                  <SelectItem key="external">Ngoài nước</SelectItem>
                </Select>
              </div>
            </div>
            <Table removeWrapper aria-label="location">
              <TableHeader columns={columns1}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows1}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between">
              <div className="font-semibold text-lg mb-5">Thiết bị</div>
              <div className="w-32">
                <Select
                  variant="bordered"
                  className="mb-5"
                  defaultSelectedKeys={["browser"]}
                  size="sm"
                >
                  <SelectItem key="browser">Trình duyệt</SelectItem>
                  <SelectItem key="os">Hệ điều hành</SelectItem>
                </Select>
              </div>
            </div>
            <Table removeWrapper aria-label="device">
              <TableHeader columns={columns2}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows2}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Report;
