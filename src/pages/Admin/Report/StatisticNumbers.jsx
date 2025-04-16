import {
  MdOutlineChat,
  MdOutlineSupportAgent,
  MdCalendarMonth,
  MdAccessTime,
} from "react-icons/md";
import { FaArrowTrendUp, FaArrowTrendDown, FaUsers } from "react-icons/fa6";
import { LuBotMessageSquare } from "react-icons/lu";
import { HiOutlineChatAlt2 } from "react-icons/hi";
import moment from "moment";

export const StatisticNumbers = ({ alltimeData }) => {
  return (
    <div className="mb-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-3">
        {/* <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
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
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
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
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
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
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
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
        </div> */}
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
          <div className="flex w-full justify-between mb-2">
            <div className="text-neutral-600 font-semibold max-w-[60%]">
              Tổng số cuộc hội thoại
            </div>
            <div className="rounded-full bg-green-100 size-12 text-green-700 flex items-center justify-center">
              <HiOutlineChatAlt2 size={25} />
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {alltimeData?.total_conversations}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
          <div className="flex w-full justify-between mb-2">
            <div className="text-neutral-600 font-semibold max-w-[60%]">
              Yêu cầu hỗ trợ chưa được xử lý
            </div>
            <div className="rounded-full bg-yellow-50 size-12 text-yellow-400 flex items-center justify-center">
              <MdOutlineSupportAgent size={25} />
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {alltimeData?.human_conversations}
          </div>
        </div>
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
          <div className="flex w-full justify-between mb-2">
            <div className="text-neutral-600 font-semibold max-w-[60%]">
              Tổng số tin nhắn
            </div>
            <div className="rounded-full bg-blue-50 size-12 text-blue-500 flex items-center justify-center">
              <MdOutlineChat size={25} />
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {alltimeData?.total_messages}
          </div>
        </div>
        {/* <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
          <div className="flex w-full justify-between mb-2">
            <div className="text-neutral-600 font-semibold max-w-[60%]">
              Tổng số tin nhắn tự động
            </div>
            <div className="rounded-full bg-blue-100 size-12 text-blue-700 flex items-center justify-center">
              <LuBotMessageSquare size={25} />
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {alltimeData?.ai_messages}
          </div>
        </div> */}
        <div className="bg-white p-5 rounded-xl flex-col flex justify-between">
          <div className="flex w-full justify-between mb-2">
            <div className="text-neutral-600 font-semibold max-w-[60%]">
              Thời lượng trò chuyện trung bình (phút)
            </div>
            <div className="rounded-full bg-red-100 size-12 text-red-700 flex items-center justify-center">
              <MdAccessTime size={25} />
            </div>
          </div>
          <div className="text-3xl font-semibold">
            {alltimeData?.avg_conversation_duration_minutes
              ? alltimeData?.avg_conversation_duration_minutes?.toFixed(1)
              : 0}
          </div>
        </div>
      </div>
      {alltimeData?.first_conversation_date &&
        alltimeData?.last_conversation_date && (
          <div className="italic text-end w-full text-neutral-500 text-sm">
            Số liệu thu thập từ{" "}
            {moment(alltimeData?.first_conversation_date)
              .format("DD-MM-YYYY")
              .replaceAll("-", "/")}{" "}
            đến{" "}
            {moment(alltimeData?.last_conversation_date)
              .format("DD-MM-YYYY")
              .replaceAll("-", "/")}
          </div>
        )}
    </div>
  );
};
