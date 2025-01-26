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
} from "@nextui-org/react";
import { FaDownload, FaEdit, FaInfoCircle, FaTrash } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainingLegends } from "../../../constants/trainingLegend";
import { LegendItem } from "./LegendItem";
import { LoadingProcess, TableBottom } from "../../../components";
import { dateTimeToString } from "../../../utils";
import { downloadDocumentApi } from "../../../services/documentApi";

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
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const data = documentList?.map((document) => {
    return {
      ...document,
      operation: document,
    };
  });

  const [isEditted, setIsEditted] = useState(false);

  const handleDownloadDocument = async (id, name) => {
    setIsLoading(true);
    await downloadDocumentApi(id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          const link = document.createElement("a");
          link.href = response.download_url;
          link.download = name; 
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
      key: "uploaded_at",
      label: "Thời gian tải lên",
    },
    {
      key: "updated_at",
      label: "Cập nhật lần cuối",
    },
    {
      key: "priority",
      label: "Độ ưu tiên",
    },
    {
      key: "operation",
      label: "Thao tác",
    },
  ];

  const categoryColor = {
    HIGH: "danger",
    MEDIUM: "warning",
    LOW: "primary",
    NONE: "default",
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "priority") {
      return (
        <Select
          aria-label="Select priority"
          color={categoryColor[cellValue]}
          defaultSelectedKeys={[cellValue]}
          size="sm"
          className="w-full"
        >
          <SelectItem key="HIGH">HIGH</SelectItem>
          <SelectItem key="MEDIUM">MEDIUM</SelectItem>
          <SelectItem key="LOW">LOW</SelectItem>
          <SelectItem key="NONE">NONE</SelectItem>
        </Select>
      );
    } else if (columnKey === "uploaded_at" || columnKey === "updated_at") {
      return dateTimeToString(new Date(cellValue));
    } else if (columnKey === "operation") {
      return (
        <div className="flex gap-3">
          <FaInfoCircle className="text-blue-500" />
          {cellValue.document_type !== "FILE" && (
            <FaEdit className="text-black" />
          )}
          {cellValue.document_type !== "URL" && (
            <button onClick={()=>handleDownloadDocument(cellValue.id, cellValue.filename)}>
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

  return (
    <>
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
        <Button color="success" isDisabled={!isEditted}>
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
