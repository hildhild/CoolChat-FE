import { Button, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { FaBook, FaFile, FaEdit } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdLabel } from "react-icons/md";
import { useEffect, useState } from "react";
import { TbWorld } from "react-icons/tb";
import { DocumentList } from "./DocumentList";
import { DocumentFile } from "./DocumentFile";
import { DocumentText } from "./DocumentText";
import { DocumentUrl } from "./DocumentUrl";
import { useQuery } from "@tanstack/react-query";
import { LoadingProcess, ToggleSection } from "../../../components";
import useDebounce from "../../../hooks/useDebounce";
import { getDocumentsApi } from "../../../services/documentApi";
import { toast } from "react-toastify";

function ChatbotTraining() {
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

  return (
    <DashboardLayout page="chatbot-training">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">ĐÀO TẠO CHATBOT</div>
        <ToggleSection title="Gán nhãn tri thức" Icon={MdLabel}>
          <DocumentList
            documentList={data}
            page={page}
            setPage={setPage}
            pageSize={pageSize}
            setPageSize={setPageSize}
            documentType={documentType}
            setDocumentType={setDocumentType}
            priority={priority}
            setPriority={setPriority}
            searchInput={searchInput}
            setSearchInput={setSearchInput}
            total={total}
            documentPages={documentPages}
            documentOfPage={documentOfPage}
            refetch={refetch}
          />
        </ToggleSection>
        <ToggleSection
          title="Cập nhật tri thức"
          Icon={FaBook}
          initIsOpen={false}
        >
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
                <DocumentText refetch={refetch} />
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
                <DocumentUrl refetch={refetch} />
              </Tab>
            </Tabs>
          </div>
        </ToggleSection>
      </div>
    </DashboardLayout>
  );
}

export default ChatbotTraining;
