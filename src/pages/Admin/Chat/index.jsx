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
import { useEffect, useState } from "react";
import { ChatItem } from "./ChatItem";
import { useQuery } from "@tanstack/react-query";
import { getChatConversationsApi } from "../../../services/chatApi";
import { LoadingProcess, TableBottom } from "../../../components";
import useDebounce from "../../../hooks/useDebounce";

function Chat() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const [chatType, setChatType] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isActive, setIsActive] = useState("");
  const [customerName, setCustomerName] = useState("");
  const debouncedSearchInput = useDebounce(customerName, 500);
  const [total, setTotal] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [pageCount, setPageCount] = useState(0);

  const { data, refetch, isLoading } = useQuery({
    queryKey: ["conversation", isActive, debouncedSearchInput, page, pageSize],
    queryFn: async () => {
      try {
        const res = await getChatConversationsApi(
          isActive,
          debouncedSearchInput,
          page,
          pageSize
        );
        console.log(44, res);
        if (res.status === 200) {
          setTotal(res.data.count);
          setPageCount(res.data.results.length);
          setNumOfPages(Math.ceil(res.data.count / pageSize));
          return res.data.results;
        } else {
          // toast.error(res.data.detail);
          return [];
        }
      } catch (e) {
        throw new Error("Failed to fetch invitations.");
      }
    },
  });

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout page="chat">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh] relative">
        <div className="font-semibold mb-6 text-2xl">HỘI THOẠI</div>
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <Tooltip content="Tất cả">
              <button
                className={`flex justify-between items-center sm:w-[180px] font-semibold gap-5 ${
                  chatType === "all"
                    ? "bg-primary-50 border-primary-100"
                    : "bg-default-50 border-default-100"
                } border-2 py-2 px-3 rounded-xl hover:opacity-70`}
                onClick={() => setChatType("all")}
              >
                <div className="flex justify-center items-center gap-3">
                  <MdOutlineChat size={20} />
                  <div className="hidden sm:block">Tất cả</div>
                </div>
                <div>12</div>
              </button>
            </Tooltip>
            <Tooltip content="Cần hỗ trợ">
              <button
                className={`flex justify-between items-center sm:w-[180px] font-semibold gap-5 ${
                  chatType === "support"
                    ? "bg-primary-50 border-primary-100"
                    : "bg-default-50 border-default-100"
                } border-2 py-2 px-3 rounded-xl hover:opacity-70`}
                onClick={() => setChatType("support")}
              >
                <div className="flex justify-center items-center gap-3">
                  <MdOutlineSupportAgent size={20} />
                  <div className="hidden sm:block">Cần hỗ trợ</div>
                </div>
                <div>12</div>
              </button>
            </Tooltip>
          </div>
          <div className="flex gap-4 justify-between xl:justify-end items-center">
            <Input
              isClearable
              radius="lg"
              placeholder="Tìm kiếm..."
              variant="bordered"
              className="bg-white rounded-2xl w-72"
              startContent={<MdSearch />}
              onChange={(e) => setCustomerName(e.target.value)}
              onClear={() => setCustomerName("")}
            />
            <Select
              aria-label="Select filter type"
              variant="bordered"
              className="w-20 bg-white rounded-2xl"
              placeholder="Lọc"
            >
              <SelectItem key="year">Năm</SelectItem>
              <SelectItem key="month">Tháng</SelectItem>
            </Select>
          </div>
        </div>
        <div className={`${data?.length !== 0 && "bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-5"}`}>
          {data?.map((item) => (
            <ChatItem
              key={item.id}
              id={item.id}
              name={item.customer_name}
              senderId={item.last_message.sender}
              senderType={item.last_message.sender_type}
              content={item.last_message.content}
              time={item.last_message.timestamp}
            />
          ))}
        </div>
        <TableBottom
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageCount={pageCount}
          totalCount={total}
          numOfPages={numOfPages}
        />
        {/* <div className="flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="flex gap-3 items-center">
            Hiển thị
            <Select
              aria-label="Select page size"
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
            color="primary"
          />
        </div> */}
      </div>
    </DashboardLayout>
  );
}

export default Chat;
