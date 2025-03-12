import {
  Autocomplete,
  AutocompleteItem,
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
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
import { getMembersApi } from "../../../services/orgApi";
import { formatTimeFromNow, truncateString } from "../../../utils";

function Chat() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const userId = useSelector((state) => state.user.userId);
  const userRole = useSelector((state) => state.user.role);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [isActive, setIsActive] = useState("");
  const [customerName, setCustomerName] = useState("");
  const debouncedSearchInput = useDebounce(customerName, 500);
  const [total, setTotal] = useState(0);
  const [totalChatCount, setTotalChatCount] = useState(0);
  const [supportChatCount, setSupportChatCount] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [pageCount, setPageCount] = useState(0);
  const [isLoadingStatus, setIsLoadingStatus] = useState(false);
  const [agentList, setAgentList] = useState([]);
  const [agentId, setAgentId] = useState("");
  const [isNeedSupport, setIsNeedSupport] = useState("");

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "conversation",
      isActive,
      debouncedSearchInput,
      page,
      pageSize,
      agentId,
      isNeedSupport,
    ],
    queryFn: async () => {
      try {
        const res = await getChatConversationsApi(
          isActive,
          debouncedSearchInput,
          page,
          pageSize,
          userRole === "AGENT" ? userId : agentId,
          isNeedSupport
        );
        console.log(44, res);
        if (res.status === 200) {
          setTotal(res.data.count);
          setTotalChatCount(res.data.total_count);
          setSupportChatCount(res.data.assigned_count);
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

  const chatList = data?.map((item) => {
    return {
      ...item,
      support_info: item,
      last_time: item.last_message.timestamp,
    };
  });
  const columns = [
    {
      key: "customer_name",
    },
    {
      key: "support_info",
    },
    {
      key: "last_message",
    },
    {
      key: "last_time",
    },
    {
      key: "is_active",
    },
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "customer_name") {
      return (
        <div className={`font-semibold ${!cellValue && "text-neutral-400"}`}>
          {cellValue ? cellValue : "Không tên"}
        </div>
      );
    } else if (columnKey === "support_info") {
      if (cellValue.agent) {
        return (
          <div className="flex gap-3">
            <Chip color="warning">Cần hỗ trợ</Chip>
            {/* <div>{" > "}</div> */}
            {userRole !== "AGENT" && (
              <Chip color="primary" variant="bordered">
                <div className="flex flex-row gap-2 items-center">
                  <MdOutlineSupportAgent />
                  <div>
                    {cellValue.agent === userId ? "Bạn" : cellValue.agent_name}
                  </div>
                </div>
              </Chip>
            )}
          </div>
        );
      } else {
        return "";
      }
    } else if (columnKey === "last_message") {
      return (
        <div>
          <span>
            {cellValue.sender_type === "SYSTEM"
              ? "Hệ thống"
              : cellValue.sender_type === "CUSTOMER"
              ? "Khách hàng"
              : cellValue.sender === userId
              ? "Bạn"
              : "Nhân viên"}
            :{" "}
          </span>
          {truncateString(cellValue.content, 50)}
        </div>
      );
    } else if (columnKey === "last_time") {
      return <div>{formatTimeFromNow(cellValue)}</div>;
    } else if (columnKey === "is_active") {
      return (
        <Tooltip content={cellValue ? "Đang hoạt động" : "Đã kết thúc"}>
          <div
            className={`w-3 h-3 ${
              cellValue ? "bg-success-400" : "bg-danger-400"
            } rounded-full`}
          ></div>
        </Tooltip>
      );
    } else {
      return cellValue;
    }
  };

  const handleGetMembers = async () => {
    setIsLoadingStatus(true);
    await getMembersApi(1, 99999)
      .then((res) => {
        if (res.status === 200) {
          setAgentList(
            res.data.results.filter((member) => member.role === "AGENT")
          );
        }
      })
      .catch((err) => console.log(err));
    setIsLoadingStatus(false);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
    if (userRole !== "AGENT") {
      handleGetMembers();
    }
  }, []);

  return (
    <DashboardLayout page="chat">
      <LoadingProcess isLoading={isLoading || isLoadingStatus} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh] relative">
        <div className="font-semibold mb-6 text-2xl">HỘI THOẠI</div>
        <div className="flex flex-col lg:flex-row gap-3 justify-between">
          <div className="flex gap-3">
            <Tooltip content="Tất cả">
              <button
                className={`flex justify-between items-center sm:w-[180px] font-semibold gap-5 ${
                  isNeedSupport === ""
                    ? "bg-primary-50 border-primary-100"
                    : "bg-default-50 border-default-100"
                } border-2 py-2 px-3 rounded-xl hover:opacity-70`}
                onClick={() => setIsNeedSupport("")}
              >
                <div className="flex justify-center items-center gap-3">
                  <MdOutlineChat size={20} />
                  <div className="hidden sm:block">Tất cả</div>
                </div>
                <div>{totalChatCount}</div>
              </button>
            </Tooltip>
            <Tooltip content="Cần hỗ trợ">
              <button
                className={`flex justify-between items-center sm:w-[180px] font-semibold gap-5 ${
                  isNeedSupport === "true"
                    ? "bg-primary-50 border-primary-100"
                    : "bg-default-50 border-default-100"
                } border-2 py-2 px-3 rounded-xl hover:opacity-70`}
                onClick={() => setIsNeedSupport("true")}
              >
                <div className="flex justify-center items-center gap-3">
                  <MdOutlineSupportAgent size={20} />
                  <div className="hidden sm:block">Cần hỗ trợ</div>
                </div>
                <div>{supportChatCount}</div>
              </button>
            </Tooltip>
          </div>
          <div className="flex gap-4 justify-between xl:justify-end items-center">
            <Input
              isClearable
              placeholder="Tìm kiếm..."
              size="lg"
              variant="bordered"
              className="bg-white rounded-2xl w-72"
              startContent={<MdSearch size={25} />}
              onChange={(e) => setCustomerName(e.target.value)}
              onClear={() => setCustomerName("")}
            />
            {userRole !== "AGENT" && (
              <Autocomplete
                className="w-44 bg-white rounded-2xl"
                label="Nhân viên"
                variant="bordered"
                size="sm"
                listboxProps={{
                  emptyContent: "Không có dữ liệu",
                }}
                selectedKey={agentId}
                defaultSelectedKey={""}
                onSelectionChange={setAgentId}
                isClearable={false}
              >
                <AutocompleteItem key="">Tất cả</AutocompleteItem>
                {agentList.map((agent) => (
                  <AutocompleteItem key={agent.user_id}>
                    {agent.user_name}
                  </AutocompleteItem>
                ))}
              </Autocomplete>
            )}

            <Select
              aria-label="Select filter type"
              variant="bordered"
              className="w-40 bg-white rounded-2xl"
              label="Trạng thái"
              size="sm"
              onChange={(e) => setIsActive(e.target.value)}
              selectedKeys={[isActive]}
            >
              <SelectItem key="">Tất cả</SelectItem>
              <SelectItem key="true">Đang hoạt động</SelectItem>
              <SelectItem key="false">Đã kết thúc</SelectItem>
            </Select>
            <Button
              variant="bordered"
              color="danger"
              size="sm"
              onClick={() => {
                setCustomerName("");
                setIsActive("");
                setAgentId("");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
        <div
          className={`${
            data?.length !== 0 &&
            data &&
            "bg-white rounded-xl border-[1px] border-gray-200 mb-5 mt-5"
          }`}
        >
          <Table
            selectionBehavior="replace"
            selectionMode="multiple"
            hideHeader
            removeWrapper
            aria-label="Chat conversation"
            className="w-full overflow-x-scroll md:overflow-auto"
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.key}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={chatList ? chatList : []}>
              {(item) => (
                <TableRow
                  key={item.key}
                  onClick={() => navigate(`/chat/${item.id}`)}
                  className="cursor-pointer h-16"
                >
                  {(columnKey) => (
                    <TableCell className="text-md">
                      {renderCell(item, columnKey)}
                    </TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
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
      </div>
    </DashboardLayout>
  );
}

export default Chat;
