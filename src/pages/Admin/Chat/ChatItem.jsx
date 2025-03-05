import { Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { formatTimeFromNow } from "../../../utils";
import { useSelector } from "react-redux";

export const ChatItem = ({ chat }) => {
  const navigate = useNavigate();
  const userId = useSelector((state) => state.user.userId);

  return (
    <div
      onClick={() => navigate(`/chat/${chat.id}`)}
      className="cursor-pointer w-full grid grid-cols-12 gap-5 lg:gap-0 border-b-[1px] border-gray-200 p-5"
    >
      <div className="col-span-3 lg:col-span-2 font-semibold flex gap-5">
        {chat.customer_name ? chat.customer_name : "Không tên"}
      </div>
      <div className="col-span-2">
        {chat.agent ? (
          <Chip color="warning">Cần hỗ trợ</Chip>
        ) : (
          <div className="w-[89.49px]"></div>
        )}
      </div>
      <div className="col-span-7">
        <span className="text-sm">
          {chat.last_message.sender_type === "SYSTEM"
            ? "Hệ thống"
            : chat.last_message.sender_type === "CUSTOMER"
            ? "Khách hàng"
            : chat.last_message.sender === userId
            ? "Bạn"
            : "Nhân viên"}
          :{" "}
        </span>
        {chat.last_message.content}
      </div>
      <div className="col-span-1 hidden lg:block">
        {formatTimeFromNow(chat.last_message.timestamp)}
      </div>
    </div>
  );
};
