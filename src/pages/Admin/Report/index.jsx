import { Button, Select, SelectItem } from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { BiExport } from "react-icons/bi";
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
import { StatisticNumbers } from "./StatisticNumbers";
import { LoadingProcess } from "../../../components";
import {
  getMonthlySubscriptionApi,
  getOrgUsageApi,
  getReportAllTimeApi,
  getReportDailyApi,
} from "../../../services/reportApi";
import { getFirstAndLastDayString } from "../../../utils";
import { useEffect, useState } from "react";
import { ChatLineChart } from "./ChatLineChart";
import { ChatPieChart } from "./ChatPieChat";
import { SubscriptionChart } from "./SubscriptionChart";

function Report() {
  const [isLoading, setIsLoading] = useState(false);
  const [alltimeData, setAlltimeData] = useState(null);
  const [dailyData, setDailyData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [monthlySubscription, setMonthlySubscription] = useState([]);
  const [subscriptionSelectedDate, setSubscriptionSelectedDate] = useState(
    new Date()
  );

  const handleGetAlltimeReport = async () => {
    setIsLoading(true);
    await getReportAllTimeApi().then((res) => {
      if (res.status === 200) {
        setAlltimeData(res.data);
      }
    });
    setIsLoading(false);
  };

  const handleGetDailyReport = async (firstDate, lastDate) => {
    setIsLoading(true);
    await getReportDailyApi(firstDate, lastDate).then((res) => {
      if (res.status === 200) {
        setDailyData(res.data.results);
      }
    });
    setIsLoading(false);
  };

  const handleMonthlySubscriptionReport = async () => {
    setIsLoading(true);
    await getMonthlySubscriptionApi().then((res) => {
      console.log(1, res);
      if (res.status === 200) {
        setMonthlySubscription(res.data.results);
      }
    });
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetAlltimeReport();
  }, []);

  useEffect(() => {
    const firstAndLastDate = getFirstAndLastDayString(
      new Date(selectedDate).getFullYear(),
      new Date(selectedDate).getMonth() + 1
    );
    handleGetDailyReport(firstAndLastDate.firstDay, firstAndLastDate.lastDay);
  }, [selectedDate]);

  useEffect(() => {
    const year = new Date(subscriptionSelectedDate).getFullYear();
    handleMonthlySubscriptionReport(
      year.toString() + "-01",
      year.toString() + "-12"
    );
  }, [subscriptionSelectedDate]);

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
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="w-full flex justify-between">
          <div className="font-semibold mb-6 text-2xl">BÁO CÁO</div>
          {/* <Button className="flex bg-coolchat text-white">
            Xuất
            <BiExport />
          </Button> */}
        </div>
        <StatisticNumbers alltimeData={alltimeData} />
        <ChatLineChart
          alltimeData={alltimeData}
          dailyData={dailyData}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-8">
          {/* <div className="bg-white p-5 rounded-xl">
            <div className="flex w-full justify-between">
              <div className="font-semibold text-lg mb-5">Vị trí</div>
              <div className="w-32">
                <Select
                  aria-label="Select location type"
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
                  aria-label="Select device type"
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
          </div> */}
          <ChatPieChart alltimeData={alltimeData} />
          <SubscriptionChart
            alltimeData={alltimeData}
            monthlySubscription={monthlySubscription}
            selectedDate={subscriptionSelectedDate}
            setSelectedDate={setSubscriptionSelectedDate}
          />
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Report;
