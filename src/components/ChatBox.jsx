import { useState } from "react";
import { useTranslation } from "react-i18next";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineSupportAgent, MdOutlineImage } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { LuBot } from "react-icons/lu";

export default function ChatBox() {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  if (!isOpen) {
    return (
      <button
        className="fixed z-50 right-7 bottom-7 w-[55px] h-[55px] rounded-full border-coolchat border-2 bg-white flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <img src={LogoOnly} className="w-10 h-10"></img>
      </button>
    );
  } else {
    return (
      <div className="flex flex-col fixed z-50 right-7 bottom-7 w-[420px] h-[580px] bg-white border-[1px] border-[#b9b9b9] rounded-2xl">
        <div className="flex justify-between items-center p-3 border-b-[1px] border-[#b9b9b9] h-[64px]">
          <div className="flex gap-3 items-center">
            <button
              className="bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <FaChevronLeft size={12} />
            </button>
            <div className="w-10 h-10 rounded-full border-coolchat border-2 bg-white flex justify-center items-center">
              <img src={LogoOnly} className="w-8 h-8"></img>
            </div>
            <div>
              <div>CoolChat</div>
              <div className="text-xs">Luôn sẵn sàng hỗ trợ bạn</div>
            </div>
          </div>
          <div className="flex rounded-full bg-gray-100 border-[1px] border-[#b9b9b9]">
            <button className="border-r-[1px] border-[#b9b9b9] px-3 py-2">
              <MdOutlineSupportAgent />
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
        <div className="flex gap-2 justify-between items-center p-3 border-t-[1px] border-[#b9b9b9] h-[64px]">
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
    );
  }
}
