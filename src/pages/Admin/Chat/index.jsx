import {
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { MdOutlineChat, MdOutlineSupportAgent, MdSearch } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { ChatItem } from "./ChatItem";

function Chat() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout page="chat">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh] relative">
        <div className="font-semibold mb-6 text-2xl">HỘI THOẠI</div>
        <Tabs
          className="mt-16 xl:mt-0"
          variant="light"
          aria-label="Tabs variants"
          classNames={{
            cursor: "bg-coolchat bg-opacity-10",
            tabContent: "group-data-[selected=true]:text-coolchat",
          }}
        >
          <Tab
            key="all"
            title={
              <Tooltip content="Tất cả">
                <div className="flex justify-between items-center sm:w-[150px] font-semibold gap-5">
                  <div className="flex justify-center items-center gap-3">
                    <MdOutlineChat size={20} />
                    <div className="hidden sm:block">Tất cả</div>
                  </div>
                  <div>12</div>
                </div>
              </Tooltip>
            }
          >
            <div className="bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-3">
              <ChatItem
                id={1}
                name="Jullu Jalal"
                content="Our Bachelor of Commerce program is ACBSP-accredited."
                time="8:38 AM"
              />
              <ChatItem
                id={1}
                name="Jullu Jalal"
                content="Our Bachelor of Commerce program is ACBSP-accredited."
                time="8:38 AM"
                isNeedToSupport={true}
              />
            </div>
            <div className="flex flex-col md:flex-row justify-between items-center gap-5">
              <div className="flex gap-3 items-center">
                Hiển thị
                <Select
                  variant="bordered"
                  className="w-20 bg-white rounded-2xl"
                  size="sm"
                  defaultSelectedKeys={["8"]}
                >
                  <SelectItem key="8">8</SelectItem>
                  <SelectItem key="16">16</SelectItem>
                </Select>
                hàng
              </div>
              <Pagination
                showControls
                total={2}
                initialPage={1}
                variant="light"
                color="default"
              />
            </div>
          </Tab>
          <Tab
            key="support"
            title={
              <Tooltip content="Cần hỗ trợ">
                <div className="flex justify-between items-center sm:w-[150px] font-semibold gap-5">
                  <div className="flex justify-center items-center gap-3">
                    <MdOutlineSupportAgent size={20} />
                    <div className="hidden sm:block">Cần hỗ trợ</div>
                  </div>
                  <div>4</div>
                </div>
              </Tooltip>
            }
          >
            <div className="bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-3">
              <ChatItem
                id={1}
                name="Jullu Jalal"
                content="Our Bachelor of Commerce program is ACBSP-accredited."
                time="8:38 AM"
                isNeedToSupport={true}
              />
            </div>
            <div className="flex justify-between items-center">
              <div className="flex gap-3 items-center">
                Hiển thị
                <Select
                  variant="bordered"
                  className="w-20 bg-white rounded-2xl"
                  size="sm"
                  defaultSelectedKeys={["8"]}
                >
                  <SelectItem key="8">8</SelectItem>
                  <SelectItem key="16">16</SelectItem>
                </Select>
                hàng
              </div>
              <Pagination
                showControls
                total={1}
                initialPage={1}
                variant="light"
                color="default"
              />
            </div>
          </Tab>
        </Tabs>
        <div className="flex gap-4 w-[calc(100%-40px)] justify-between xl:justify-end items-center absolute right-5 top-[88px]">
          <Input
            isClearable
            radius="lg"
            placeholder="Tìm kiếm..."
            variant="bordered"
            className="bg-white rounded-2xl w-72"
            startContent={<MdSearch />}
          />
          <Select
            variant="bordered"
            className="w-20 bg-white rounded-2xl"
            placeholder="Lọc"
          >
            <SelectItem key="year">Năm</SelectItem>
            <SelectItem key="month">Tháng</SelectItem>
          </Select>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default Chat;
