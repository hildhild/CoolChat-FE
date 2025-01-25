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
  Pagination,
} from "@nextui-org/react";
import { FaDownload, FaTrash } from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainingLegends } from "../../../constants/trainingLegend";
import { LegendItem } from "./LegendItem";
import { useQuery } from "@tanstack/react-query";
import { getDocumentsApi } from "../../../services/documentApi";
import { LoadingProcess, TableBottom } from "../../../components";
import { dateTimeToString } from "../../../utils";
import useDebounce from "../../../hooks/useDebounce";

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

  const [isEditted, setIsEditted] = useState(false);

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
      key: "id",
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
    } else if (columnKey === "id") {
      return (
        <div className="flex gap-3">
          <FaDownload className="text-blue-500" />
          <FaTrash className="text-red-500" />
        </div>
      );
    } else {
      return cellValue;
    }
  };

  return (
    <>
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
          <TableBody items={documentList ? documentList : []}>
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
