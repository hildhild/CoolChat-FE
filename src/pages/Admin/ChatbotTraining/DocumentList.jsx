import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Chip,
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { FaDownload, FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainingLegends } from "../../../constants/trainingLegend";
import { LegendItem } from "./LegendItem";
import { LoadingProcess, TableBottom } from "../../../components";
import { dateTimeToString } from "../../../utils";
import {
  downloadDocumentApi,
  updatePrioritiesApi,
} from "../../../services/documentApi";
import { SelectPriority } from "./SelectPriority";
import { toast } from "react-toastify";

const documentType = (type) => {
  return {
    value:
      type === "FILE" ? "Tập tin" : type === "TEXT" ? "Văn bản" : "Website",
    color:
      type === "FILE" ? "success" : type === "TEXT" ? "warning" : "primary",
  };
};

export const DocumentList = ({
  documentList,
  page,
  setPage,
  pageSize,
  setPageSize,
  setDocumentType,
  setPriority,
  setSearchInput,
  total,
  documentPages,
  documentOfPage,
  refetch,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [updatePriorities, setUpdatePriorities] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [curDoc, setCurDoc] = useState(null);

  const data = documentList?.map((document) => {
    return {
      ...document,
      operation: document,
      priorityColumn: {
        id: document.id,
        priority: document.priority,
      },
    };
  });

  const [isEditted, setIsEditted] = useState(false);

  const handleDownloadDocument = async (id) => {
    setIsLoading(true);
    await downloadDocumentApi(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const link = document.createElement("a");
          link.href = response.data.download_url;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const columns = [
    {
      key: "uploader_name",
      label: "Người tải lên",
    },
    {
      key: "document_type",
      label: "Loại hình",
    },
    {
      key: "filename",
      label: "Tên tri thức",
    },
    {
      key: "file_size_display",
      label: "Kích thước tệp",
    },
    {
      key: "uploaded_at",
      label: "Thời gian tải lên",
    },
    {
      key: "updated_at",
      label: "Cập nhật lần cuối",
    },
    {
      key: "priorityColumn",
      label: "Độ ưu tiên",
    },
    {
      key: "operation",
      label: "Thao tác",
    },
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "priorityColumn") {
      return (
        <SelectPriority
          id={cellValue.id}
          value={cellValue.priority}
          setUpdatePriorities={setUpdatePriorities}
        />
      );
    } else if (columnKey === "uploaded_at" || columnKey === "updated_at") {
      return dateTimeToString(new Date(cellValue));
    } else if (columnKey === "operation") {
      return (
        <div className="flex gap-3">
          {cellValue.document_type === "URL" && (
            <button
              onClick={() => {
                onOpen();
                setCurDoc(cellValue);
              }}
              className="hover:opacity-70"
            >
              <FaInfoCircle className="text-blue-500" />
            </button>
          )}
          {cellValue.document_type !== "FILE" && (
            <FaEdit className="text-black" />
          )}
          {cellValue.document_type !== "URL" && (
            <button
              onClick={() => handleDownloadDocument(cellValue.id)}
              className="hover:opacity-70"
            >
              <FaDownload className="text-green-500" />
            </button>
          )}
          <FaTrash className="text-red-500" />
        </div>
      );
    } else if (columnKey === "document_type") {
      return (
        <Chip
          size="sm"
          variant="bordered"
          color={documentType(cellValue).color}
        >
          {documentType(cellValue).value}
        </Chip>
      );
    } else {
      return cellValue;
    }
  };

  const handleUpdatePriority = async () => {
    if (!updatePriorities.every((item) => item.priority)) {
      toast.error("Vui lòng chọn độ ưu tiên cho tài liệu");
      return;
    }
    setIsLoading(true);
    await updatePrioritiesApi(updatePriorities)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Cập nhật thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <>
      {curDoc && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {curDoc.url_title}
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Tiêu đề:</div>{" "}
                    <div className="col-span-4">
                      {curDoc.url_title}
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Đường dẫn:</div>{" "}
                    <div className="col-span-4">
                      <a href={curDoc.url} className="text-coolchat hover:opacity-70" target="_blank">{curDoc.url}</a>
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Mô tả:</div>{" "}
                    <div className="col-span-4">
                      {curDoc.url_description}
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter>
                  <Button color="default" onPress={onClose}>
                    Đóng
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
      <LoadingProcess isLoading={isLoading} />
      <div className="bg-white px-5 py-8 rounded-xl mb-8">
        <div className="flex flex-col lg:flex-row w-full justify-between md:items-center mb-5 gap-5">
          <div>
            <div className="font-semibold text-lg">Tất cả nguồn tri thức</div>
            {/* <div className="text-sm text-[#16C098]">
              Cập nhật 1 phút trước, 5 tri thức mới
            </div> */}
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-between lg:justify-center items-center">
            <Input
              isClearable
              radius="lg"
              placeholder="Tìm kiếm..."
              variant="bordered"
              className="w-full sm:w-72"
              size="lg"
              startContent={<MdSearch size={25} />}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <Select
              aria-label="select type"
              variant="bordered"
              label="Loại hình"
              defaultSelectedKeys={[""]}
              size="sm"
              className="w-[120px]"
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <SelectItem key="">Tất cả</SelectItem>
              <SelectItem key="FILE">FILE</SelectItem>
              <SelectItem key="TEXT">TEXT</SelectItem>
              <SelectItem key="URL">URL</SelectItem>
            </Select>
            <Select
              aria-label="select priority"
              variant="bordered"
              label="Độ ưu tiên"
              defaultSelectedKeys={[""]}
              size="sm"
              className="w-[120px]"
              onChange={(e) => setPriority(e.target.value)}
            >
              <SelectItem key="">Tất cả</SelectItem>
              <SelectItem key="HIGH">HIGH</SelectItem>
              <SelectItem key="MEDIUM">MEDIUM</SelectItem>
              <SelectItem key="LOW">LOW</SelectItem>
              <SelectItem key="NONE">NONE</SelectItem>
            </Select>
          </div>
        </div>
        <Table
          removeWrapper
          aria-label="Chatbot training"
          className="w-full overflow-x-scroll md:overflow-auto"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={data ? data : []}>
            {(item) => (
              <TableRow key={item.key}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
        <TableBottom
          page={page}
          setPage={setPage}
          pageSize={pageSize}
          setPageSize={setPageSize}
          pageCount={documentOfPage}
          totalCount={total}
          numOfPages={documentPages}
        />
      </div>
      <div className="flex gap-5 justify-end mb-5">
        <Button
          color="primary"
          onClick={() => navigate("comparison")}
          isDisabled={!isEditted}
        >
          SO SÁNH CHATBOT
        </Button>
        <Button
          color="success"
          isDisabled={updatePriorities.length <= 0}
          onClick={handleUpdatePriority}
        >
          LƯU VÀ ĐÀO TẠO
        </Button>
      </div>
      <div className="font-semibold text-lg">Chú thích</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 py-5 mb-5">
        {trainingLegends.map((legend, index) => (
          <LegendItem key={legend.id || index} legend={legend} />
        ))}
      </div>
    </>
  );
};
