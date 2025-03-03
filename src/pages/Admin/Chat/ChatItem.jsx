import { Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";
import { formatTimeFromNow } from "../../../utils";
import { useSelector } from "react-redux";

export const ChatItem = ({
  id,
  name,
  senderId,
  senderType,
  content,
  time,
  isNeedToSupport = false,
}) => {
  const navigate = useNavigate();
  const userId = useSelector(state => state.user.userId);

  return (
    <div
      onClick={() => navigate(`/chat/${id}`)}
      className="cursor-pointer w-full grid grid-cols-12 gap-5 lg:gap-0 border-b-[1px] border-gray-200 p-5"
    >
      <div className="col-span-5 lg:col-span-4 font-semibold flex gap-5">
        {name}
        {isNeedToSupport ? (
          <Chip color="warning">Cần hỗ trợ</Chip>
        ) : (
          <div className="w-[89.49px]"></div>
        )}
      </div>
      <div className="col-span-7"><span className="text-sm">{senderType === "SYSTEM" ? "Hệ thống" : senderType === "CUSTOMER" ? "Khách hàng" : senderId === userId ? "Bạn" : "Nhân viên"}: </span>{content}</div>
      <div className="col-span-1 hidden lg:block">{formatTimeFromNow(time)}</div>
    </div>
  );
};
