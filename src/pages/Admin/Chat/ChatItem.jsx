import { Chip } from "@nextui-org/react";
import { useNavigate } from "react-router-dom";

export const ChatItem = ({id, name, content, time, isNeedToSupport = false}) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/chat/${id}`)}
      className="cursor-pointer w-full grid grid-cols-12 border-b-[1px] border-gray-200 p-5"
    >
      <div className="col-span-2 font-semibold">{name}</div>
      <div className="col-span-9 flex gap-5">
        {isNeedToSupport && <Chip color="warning">Cần hỗ trợ</Chip>}
        {content}
      </div>
      <div className="col-span-1">{time}</div>
    </div>
  );
};
