import { Button, Chip, Input, Pagination, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { MdOutlineChat, MdOutlineImage, MdOutlineSupportAgent, MdSearch  } from "react-icons/md";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { BsThreeDots } from "react-icons/bs";
import { LuBot, LuBotOff } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";


function ChatDetail() {
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(()=> {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout page="chat">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh] relative">
        <div className="font-semibold mb-6 text-2xl">CHI TIẾT HỘI THOẠI</div>
        <div className="flex flex-col w-full h-[580px] bg-white rounded-2xl">
          <div className="flex justify-between items-center p-3 border-b-[1px] border-gray-200 h-[64px]">
            <div className="flex gap-5 items-center">
              <button
                className="bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full"
                onClick={() => navigate("/chat")}
              >
                <FaChevronLeft size={12} />
              </button>
              <div className="font-semibold text-lg">Jullu Jalal</div>
              <Chip color="warning">Cần hỗ trợ</Chip>
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
          <div className="flex-grow overflow-y-scroll">
            <div className="flex gap-3 items-end justify-start p-3 mb-3">
              <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                <LuBot size={18} />
              </div>
              <div className="bg-gray-100 rounded-r-xl rounded-t-xl w-[270px] p-3">
                <div>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. </div>
                <div className="text-end text-neutral-400 text-xs">6:30 pm</div>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-start p-3 mb-3">
              <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                <FaRegUser size={18} />
              </div>
              <div className="bg-gray-100 rounded-r-xl rounded-t-xl w-[270px] p-3">
                <div>OK. </div>
                <div className="text-end text-neutral-400 text-xs">9:30 pm</div>
              </div>
            </div>
            <div className="flex gap-3 items-end justify-end p-3 mb-3">
              <div className="bg-coolchat text-white rounded-l-xl rounded-t-xl w-[270px] p-3">
                <div>There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour. </div>
                <div className="text-end text-xs">9:32 pm</div>
              </div>
            </div>
          </div>
          <div className="flex gap-2 justify-between items-center p-3 border-t-[1px] border-gray-200 h-[64px]">
            <button className="w-8 h-8 flex justify-center items-center rounded-full">
              <MdOutlineImage size={25} />
            </button>
            <input className="flex-grow !bg-white !border-none !outline-none" placeholder="Aa"></input>
            <Button className="flex justify-center items-center" color="primary">
              Gửi
              <IoIosSend size={20} />
            </Button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ChatDetail;
