import {
  Avatar,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Switch,
  Tab,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  getKeyValue,
  Tabs,
  Pagination,
  Chip,
  Textarea,
} from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import {
  FaUserCircle,
  FaBook,
  FaFacebookSquare,
  FaCode,
  FaFile,
  FaEdit,
  FaFileUpload,
  FaTrash,
} from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import {
  MdOutlineAddPhotoAlternate,
  MdLabel,
  MdSearch,
  MdOutlineCancel,
  MdOutlineTextSnippet,
  MdOutlineImage,
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GiNightSleep } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { LuBot } from "react-icons/lu";
import { IoIosSend } from "react-icons/io";

function ChatbotComparison() {
  const { t } = useTranslation();
  const [isLabel, setIsLabel] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const navigate = useNavigate();

  return (
    <DashboardLayout page="chatbot-training">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="flex gap-5 items-center mb-6">
          <button
            className="hover:opacity-70"
            onClick={() => navigate("/chatbot-training")}
          >
            <FaChevronLeft />
          </button>
          <div className="font-semibold text-2xl">SO SÁNH CHATBOT</div>
        </div>
        <div className="grid grid-cols-2 gap-8 mb-5">
          <div className="rounded-xl bg-gradient-to-t from-[#feada6] to-[#f5efef] overflow-hidden">
            <div className="p-5 w-full text-center border-b-[1px] border-gray-300 bg-[#f5efef] font-bold">
              TRƯỚC KHI ĐÀO TẠO
            </div>
            <div className="h-96 overflow-y-auto">
              <div className="flex gap-3 items-end justify-end p-3 mb-3">
                <div className="bg-coolchat text-white rounded-l-xl rounded-t-xl w-[270px] p-3">
                  <div>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour.{" "}
                  </div>
                  <div className="text-end text-xs">9:32 pm</div>
                </div>
              </div>
              <div className="flex gap-3 items-end justify-start p-3 mb-3">
                <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                  <LuBot size={18} />
                </div>
                <div className="bg-gray-100 rounded-r-xl rounded-t-xl w-[270px] p-3">
                  <div>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.{" "}
                  </div>
                  <div className="text-end text-neutral-400 text-xs">
                    6:30 pm
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="rounded-xl bg-gradient-to-t from-[#96fbc4] to-[#f9f586] overflow-hidden">
            <div className="p-5 w-full text-center border-b-[1px] border-gray-300 bg-[#f9f586] font-bold">
              SAU KHI ĐÀO TẠO
            </div>
            <div className="h-96 overflow-y-auto">
              <div className="flex gap-3 items-end justify-end p-3 mb-3">
                <div className="bg-coolchat text-white rounded-l-xl rounded-t-xl w-[270px] p-3">
                  <div>
                    There are many variations of passages of Lorem Ipsum
                    available, but the majority have suffered alteration in some
                    form, by injected humour.{" "}
                  </div>
                  <div className="text-end text-xs">9:32 pm</div>
                </div>
              </div>
              <div className="flex gap-3 items-end justify-start p-3 mb-3">
                <div className="bg-gray-100 w-7 h-7 flex justify-center items-center rounded-full">
                  <LuBot size={18} />
                </div>
                <div className="bg-gray-100 rounded-r-xl rounded-t-xl w-[270px] p-3">
                  <div>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.{" "}
                  </div>
                  <div className="text-end text-neutral-400 text-xs">
                    6:30 pm
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full flex justify-center">
          <div className="flex gap-2 justify-between items-center p-3 h-[64px] rounded-xl bg-white mb-5 w-[80%]">
            <button className="w-8 h-8 flex justify-center items-center rounded-full">
              <MdOutlineImage size={25} />
            </button>
            <input
              className="flex-grow !bg-white !border-none !outline-none"
              placeholder="Aa"
            ></input>
            <Button
              className="flex justify-center items-center"
              color="primary"
            >
              Gửi
              <IoIosSend size={20} />
            </Button>
          </div>
        </div>
        <div className="flex gap-5 justify-end mb-5">
          <Button color="success" onClick={() => navigate("/chatbot-training")}>
            LƯU VÀ ĐÀO TẠO
          </Button>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default ChatbotComparison;
