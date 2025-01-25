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
import { DocumentFile } from "./DocumentFile";
import { DocumentText } from "./DocumentText";
import { DocumentUrl } from "./DocumentUrl";
import { useQuery } from "@tanstack/react-query";
import { LoadingProcess } from "../../../components";
import useDebounce from "../../../hooks/useDebounce";
import { getDocumentsApi } from "../../../services/documentApi";

function ChatbotTraining() {
  const { t } = useTranslation();
  const [isLabel, setIsLabel] = useState(true);
  const [isUpdate, setIsUpdate] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [documentType, setDocumentType] = useState("");
  const [priority, setPriority] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchInput = useDebounce(searchInput, 500);
  const [total, setTotal] = useState(0);
  const [documentPages, setDocumentPages] = useState(0);
  const [documentOfPage, setDocumentOfPage] = useState(0);

  const { data, refetch, isLoading } = useQuery({
    queryKey: [
      "document",
      page,
      pageSize,
      documentType,
      priority,
      debouncedSearchInput,
    ],
    queryFn: async () => {
      try {
        const res = await getDocumentsApi(
          documentType,
          page,
          pageSize,
          priority,
          debouncedSearchInput
        );
        console.log(44, res);
        if (res.status === 200) {
          setTotal(res.data.count);
          setDocumentOfPage(res.data.results.length);
          setDocumentPages(Math.ceil(res.data.count / pageSize));
          console.log(Math.ceil(res.data.count / pageSize));
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

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout page="chatbot-training">
      <LoadingProcess isLoading={isLoading} />
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
          <DocumentList
            documentList={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            setDocumentType={setDocumentType}
            setPriority={setPriority}
            setSearchInput={setSearchInput}
            total={total}
            documentPages={documentPages}
            documentOfPage={documentOfPage}
          />
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
                <DocumentFile refetch={refetch} />
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
                <DocumentText />
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
                <DocumentUrl />
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ChatbotTraining;
