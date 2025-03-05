import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  Input,
  Pagination,
  Select,
  SelectItem,
  Skeleton,
  Tab,
  Tabs,
  Tooltip,
} from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import {
  MdOutlineChat,
  MdOutlineImage,
  MdOutlineSupportAgent,
  MdSearch,
} from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { BsThreeDots } from "react-icons/bs";
import { LuBot, LuBotOff } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";
import { LoadingProcess } from "../../../components";
import { useEffect, useState, useRef } from "react";
import { animateScroll } from "react-scroll";
import { getChatDetailApi } from "../../../services/chatApi";
import { useParams } from "react-router-dom";
import { formatTimeFromNow } from "../../../utils";
import useWebSocket from "react-use-websocket";

function ChatDetail() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [chatDetail, setChatDetail] = useState(null);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState("");
  const { chatId } = useParams();
  const userRole = useSelector((state) => state.user.role);
  const userId = useSelector((state) => state.user.userId);

  const scrollToBottom = () => {
    animateScroll.scrollToBottom({
      containerId: "chat-container",
      duration: 300,
    });
  };

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    `wss://${import.meta.env.VITE_WEBSOCKET_DOMAIN}/ws/chat/agent/${chatId}/`,
    {
      onOpen: () => {
        console.log("WebSocket Connected");
        sendJsonMessage({ type: "fetch_history" }); // Yêu cầu lịch sử tin nhắn
      },
      onClose: () => console.log("WebSocket Disconnected"),
      shouldReconnect: () => true, // Tự động kết nối lại khi mất kết nối
    }
  );

  useEffect(() => {
    console.log("WebSocket message received:", lastJsonMessage);
    if (lastJsonMessage) {
      if (lastJsonMessage.type === "message_history") {
        // Nhận lịch sử tin nhắn
        setMessages(lastJsonMessage.messages);
      } else if (lastJsonMessage.type === "message") {
        // Nhận tin nhắn mới
        setMessages((prev) => [...prev, lastJsonMessage.message]);
      }
    }
  }, [lastJsonMessage]);

  const handleSend = () => {
    if (!messageInput.trim()) return;
    const newMessage = {
      type: "message",
      content: messageInput,
      sender_type: "AGENT",
      sender_id: userId,
    };
    sendJsonMessage(newMessage);
    setMessages((prev) => [
      ...prev,
      {
        content: messageInput,
        sender_type: "AGENT",
        timestamp: new Date().toISOString(),
        sender: userId,
      },
    ]);
    setMessageInput("");
  };

  useEffect(() => scrollToBottom(), [messages]);

  const handleGetChatDetail = async () => {
    setIsLoading(true);
    await getChatDetailApi(chatId)
      .then((res) => {
        console.log(48, res);
        if (res.status === 200) {
          setChatDetail(res.data);
          setMessages(res.data.messages);
        }
      })
      .catch((err) => {
        console.log(48, err);
      });
    setIsLoading(false);
  };

  useEffect(() => {
    handleGetChatDetail();
  }, []);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <DashboardLayout page="chat">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 max-h-[calc(100vh-108px)] relative flex flex-col">
        <Breadcrumbs className="mb-6">
          <BreadcrumbItem href="/chat">
            <div className="font-semibold text-2xl">HỘI THOẠI</div>
          </BreadcrumbItem>
          <BreadcrumbItem>
            <div className="font-semibold text-2xl">CHI TIẾT HỘI THOẠI</div>
          </BreadcrumbItem>
        </Breadcrumbs>

        <div className="flex-grow h-[calc(100vh-224px)] flex flex-col w-full bg-white rounded-2xl overflow-hidden">
          <div className="flex justify-between items-center p-3 border-b-[1px] border-gray-200 h-[64px]">
            <div className="flex gap-5 items-center">
              <button
                className="bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full"
                onClick={() => navigate("/chat")}
              >
                <FaChevronLeft size={12} />
              </button>
              {isLoading || !chatDetail ? (
                <Skeleton className="h-5 w-48 rounded-lg" />
              ) : (
                <>
                  <div className="font-semibold text-lg">
                    {chatDetail?.customer_name
                      ? chatDetail.customer_name
                      : "Không tên"}
                  </div>
                  {chatDetail?.agent && (
                    <div className="flex gap-2">
                      <Chip color="warning">Cần hỗ trợ</Chip>
                      <div>{" >> "}</div>
                      <Chip color="primary" variant="bordered">
                        <div className="flex flex-row gap-2 items-center">
                          <MdOutlineSupportAgent />
                          {chatDetail?.agent === userId
                            ? "Bạn"
                            : chatDetail?.agent_name}
                        </div>
                      </Chip>
                    </div>
                  )}
                  <Tooltip
                    content={
                      chatDetail?.is_active ? "Đang hoạt động" : "Đã kết thúc"
                    }
                  >
                    <div
                      className={`w-3 h-3 ${
                        chatDetail?.is_active
                          ? "bg-success-400"
                          : "bg-danger-400"
                      } rounded-full`}
                    ></div>
                  </Tooltip>
                </>
              )}
            </div>
            <div className="flex rounded-full bg-gray-100 border-[1px] border-[#b9b9b9]">
              <button className="border-r-[1px] border-[#b9b9b9] px-3 py-2">
                <LuBotOff />
              </button>
              <button className="px-3 py-2">
                <BsThreeDots />
              </button>
            </div>
          </div>
          <div className="flex-grow">

          </div>
          <div
            className=" overflow-y-auto overflow-x-hidden flex flex-col"
            id="chat-container"
          >
            {messages.map((item, index) =>
              item.sender_type === "CUSTOMER" ? (
                <div
                  className="flex gap-3 items-end justify-start p-3 mb-3"
                  key={index}
                >
                  <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                    {item.sender_type === "SYSTEM" ? (
                      <LuBot size={18} />
                    ) : item.sender_type === "CUSTOMER" ? (
                      <FaRegUser size={18} />
                    ) : (
                      <MdOutlineSupportAgent size={18} />
                    )}
                  </div>
                  <div className="bg-gray-100 rounded-r-xl rounded-t-xl max-w-[70%] p-3">
                    <div>{item.content} </div>
                    <div className="text-end text-neutral-400 text-xs">
                      {formatTimeFromNow(item.timestamp)}
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="flex gap-3 items-end justify-end p-3 mb-3"
                  key={index}
                >
                  <div className="bg-coolchat text-white rounded-l-xl rounded-t-xl max-w-[70%] p-3">
                    <div>{item.content} </div>
                    <div className="text-end text-xs">
                      {formatTimeFromNow(item.timestamp)}
                    </div>
                  </div>
                  {item.sender !== userId && (
                    <div className="bg-coolchat text-white w-7 h-7 flex justify-center items-center rounded-full">
                      {item.sender_type === "SYSTEM" ? (
                        <LuBot size={18} />
                      ) : item.sender_type === "CUSTOMER" ? (
                        <FaRegUser size={18} />
                      ) : (
                        <MdOutlineSupportAgent size={18} />
                      )}
                    </div>
                  )}
                </div>
              )
            )}
            {/* <div className="flex gap-3 items-end justify-start p-3 mb-3">
              <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                <LuBot size={18} />
              </div>
              <div className="bg-gray-100 rounded-r-xl rounded-t-xl max-w-[70%] p-3">
                <div>
                  It is a long established fact that a reader will be distracted
                  by the readable content of a page when looking at its layout.{" "}
                </div>
                <div className="text-end text-neutral-400 text-xs">6:30 pm</div>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-start p-3 mb-3">
              <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                <FaRegUser size={18} />
              </div>
              <div className="bg-gray-100 rounded-r-xl rounded-t-xl max-w-[70%] p-3">
                <div>OK. </div>
                <div className="text-end text-neutral-400 text-xs">9:30 pm</div>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-end p-3 mb-3">
              <div className="bg-coolchat text-white rounded-l-xl rounded-t-xl max-w-[70%] p-3">
                <div>
                  There are many variations of passages of Lorem Ipsum
                  available, but the majority have suffered alteration in some
                  form, by injected humour.{" "}
                </div>
                <div className="text-end text-xs">9:32 pm</div>
              </div>
            </div> */}
          </div>
          {userRole === "AGENT" && (
            <div className="flex gap-2 justify-between items-center p-3 border-t-[1px] border-gray-200 h-[64px]">
              <button className="w-8 h-8 flex justify-center items-center rounded-full">
                <MdOutlineImage size={25} />
              </button>
              <input
                className="flex-grow !bg-white !border-none !outline-none"
                placeholder="Aa"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={handleKeyDown}
              ></input>
              <Button
                className="flex justify-center items-center"
                color="primary"
                onClick={handleSend}
                isDisabled={readyState !== 1}
              >
                Gửi
                <IoIosSend size={20} />
              </Button>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ChatDetail;
