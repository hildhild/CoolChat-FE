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
  Tooltip,
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
} from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { GiNightSleep } from "react-icons/gi";
import { CiEdit } from "react-icons/ci";
import { TbWorld } from "react-icons/tb";
import { FaFilePdf } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { trainingLegends } from "../../../constants/trainingLegend";
import { DocumentList } from "./DocumentList";


function ChatbotTraining() {
  const { t } = useTranslation();
  const [isLabel, setIsLabel] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);



  return (
    <DashboardLayout page="chatbot-training">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">ĐÀO TẠO CHATBOT</div>
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsLabel(!isLabel);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <MdLabel size={30} />
            <div>Gán nhãn tri thức</div>
          </div>
          {isLabel ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
        </Button>
        {isLabel && (
          <DocumentList/>
        )}
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsUpdate(!isUpdate);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <FaBook size={30} />
            <div>Cập nhật tri thức</div>
          </div>
          {isUpdate ? <CiSquareMinus size={20} /> : <CiSquarePlus size={20} />}
        </Button>
        {isUpdate && (
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs
              size="lg"
              aria-label="integrate"
              className="mb-4 w-full"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-white",
              }}
            >
              <Tab
                key="file"
                title={
                  <Tooltip content="Tải lên phương tiện">
                    <div className="flex gap-3 items-center px-5">
                      <FaFile size={20} />
                      <span className="hidden lg:block">
                        Tải lên phương tiện
                      </span>
                    </div>
                  </Tooltip>
                }
              >
                <div className="font-semibold text-lg mb-3 block lg:hidden">
                  Tải lên phương tiện
                </div>
                <div className="mb-5">Thêm tài liệu của bạn ở đây</div>
                <div className="flex flex-col justify-center items-center border-2 border-dashed border-coolchat rounded-2xl p-6 mb-5">
                  <FaFileUpload size={50} className="text-coolchat mb-3" />
                  <div>Kéo thả các tệp để bắt đầu tải lên</div>
                  <div className="flex justify-center items-center py-4">
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                    <div className="mx-3 uppercase">{t("or")}</div>
                    <div className="h-[1px] w-12 bg-slate-200"></div>
                  </div>
                  <Button variant="bordered" color="primary">
                    Chọn từ máy tính
                  </Button>
                </div>
                <div className="text-sm text-neutral-600 mb-5">
                  Chỉ hỗ trợ .pdf, .doc, .docx và .txt
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <div className="mb-4">Các file vừa upload</div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">Các file hiện có</div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                    <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                      <div className="flex items-center justify-between gap-5">
                        <FaFilePdf className="text-[#F15B48]" size={25} />
                        <div>
                          <div className="text-sm font-semibold">
                            document.pdf
                          </div>
                          <div className="text-sm text-gray-400">5.3MB</div>
                        </div>
                      </div>
                      <MdOutlineCancel className="text-red-500" size={20} />
                    </div>
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-3">
                  <Button color="default">Hủy</Button>
                  <Button color="primary">Lưu</Button>
                </div>
              </Tab>
              <Tab
                key="text"
                title={
                  <Tooltip content="Nhập tri thức">
                    <div className="flex gap-3 items-center px-5">
                      <FaEdit size={20} />
                      <span className="hidden lg:block">Nhập tri thức</span>
                    </div>
                  </Tooltip>
                }
              >
                <div className="font-semibold text-lg mb-3 block lg:hidden">
                  Nhập tri thức
                </div>
                <div className="mb-5">
                  Nhập hướng dẫn cho AI dưới dạng viết tay
                </div>
                <Textarea
                  variant="bordered"
                  disableAnimation
                  disableAutosize
                  className="w-full bg-white rounded-xl mb-4"
                  classNames={{
                    input: "resize-y min-h-[120px]",
                  }}
                />
                <div className="mb-3">
                  Các hướng dẫn hiện có (double-tap để đổi tên)
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <MdOutlineTextSnippet
                      className="text-yellow-500"
                      size={30}
                    />
                    <div>
                      <div className="text-sm font-semibold">note1</div>
                      <div className="text-sm text-gray-400">2590 từ</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20} />
                    <MdOutlineCancel className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <MdOutlineTextSnippet
                      className="text-yellow-500"
                      size={30}
                    />
                    <div>
                      <div className="text-sm font-semibold">note2</div>
                      <div className="text-sm text-gray-400">1097 từ</div>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20} />
                    <MdOutlineCancel className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="flex justify-end gap-5 mt-5">
                  <Button color="default">Hủy</Button>
                  <Button color="primary">Lưu</Button>
                </div>
              </Tab>
              <Tab
                key="web"
                title={
                  <Tooltip content="Nhập tri thức web">
                    <div className="flex gap-3 items-center px-5">
                      <TbWorld size={20} />
                      <span className="hidden lg:block">Nhập tri thức web</span>
                    </div>
                  </Tooltip>
                }
              >
                <div className="font-semibold text-lg mb-3 block lg:hidden">
                  Nhập tri thức web
                </div>
                <div className="mb-5">Nhập các website để AI crawl</div>
                <div className="grid grid-cols-12 gap-4 mb-10">
                  <Input
                    type="text"
                    variant="bordered"
                    placeholder="Nhập đường dẫn đến website"
                    className="col-span-12 md:col-span-10"
                  />
                  <Button color="primary" className="col-span-12 md:col-span-2">
                    Thêm
                  </Button>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <TbWorld className="text-coolchat" size={30} />
                    <div className="text-sm font-semibold">
                      coolchat.software
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20} />
                    <FaTrash className="text-red-500" size={20} />
                  </div>
                </div>
                <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
                  <div className="flex items-center justify-between gap-5">
                    <TbWorld className="text-coolchat" size={30} />
                    <div className="text-sm font-semibold">coolchat.com</div>
                  </div>
                  <div className="flex gap-3">
                    <FaEdit size={20} />
                    <FaTrash className="text-red-500" size={20} />
                  </div>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ChatbotTraining;
