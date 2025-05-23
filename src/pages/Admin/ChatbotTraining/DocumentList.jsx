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
  CircularProgress,
  Tooltip,
} from "@nextui-org/react";
import {
  FaDownload,
  FaEdit,
  FaHistory,
  FaInfoCircle,
  FaTrash,
} from "react-icons/fa";
import { MdSearch } from "react-icons/md";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { trainingLegends } from "../../../constants/trainingLegend";
import { LegendItem } from "./LegendItem";
import { ConfirmModal, LoadingProcess, TableBottom } from "../../../components";
import { dateTimeToString } from "../../../utils";
import {
  deleteDocumentApi,
  downloadDocumentApi,
  editDocumentNameApi,
  editUrlDocumentApi,
  getTrainingStatusApi,
  restoreDocumentApi,
  trainApi,
  updatePrioritiesApi,
} from "../../../services/documentApi";
import { SelectPriority } from "./SelectPriority";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";
import { FaRegCircleCheck, FaRegCircleXmark } from "react-icons/fa6";
import { BsFiletypeTxt, BsFiletypeDocx, BsFiletypePdf } from "react-icons/bs";

const translateDocumentType = (type) => {
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
  documentType,
  setDocumentType,
  priority,
  setPriority,
  searchInput,
  setSearchInput,
  total,
  documentPages,
  documentOfPage,
  refetch,
  canTrain,
}) => {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [updatePriorities, setUpdatePriorities] = useState([]);
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const [isNotPending, setIsNotPending] = useState(false);
  const {
    isOpen: isOpenDelete,
    onOpen: onOpenDelete,
    onClose: onCloseDelete,
  } = useDisclosure();
  const {
    isOpen: isOpenRestore,
    onOpen: onOpenRestore,
    onClose: onCloseRestore,
  } = useDisclosure();
  const {
    isOpen: isOpenEdit,
    onOpen: onOpenEdit,
    onClose: onCloseEdit,
    onOpenChange: onOpenChangeEdit,
  } = useDisclosure();
  const [curDoc, setCurDoc] = useState(null);

  const handleCheckTrainStatus = async () => {
    setIsLoading(true);
    const res = await getTrainingStatusApi();
    if (res.data.is_training === false) {
      setIsNotPending(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    handleCheckTrainStatus();
  }, []);

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

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: curDoc,
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
      key: "content_type",
      label: "Loại tệp",
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
      key: "training_status",
      label: "Đào tạo",
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
    } else if (columnKey === "content_type") {
      if (!cellValue) {
        return "";
      } else if (cellValue === "application/pdf") {
        return (
          <div className="flex justify-center">
            <BsFiletypePdf className="text-[#FF261B] text-2xl" />
          </div>
        );
      } else if (cellValue.includes("text/plain")) {
        return (
          <div className="flex justify-center">
            <BsFiletypeTxt className="text-2xl" />
          </div>
        );
      } else if (cellValue === "application/msword") {
        return "DOC";
      } else {
        return (
          <div className="flex justify-center">
            <BsFiletypeDocx className="text-[#3670FF] text-2xl" />
          </div>
        );
      }
    } else if (columnKey === "training_status") {
      return cellValue === "TRAINED" ? (
        <div className="flex justify-center">
          <FaRegCircleCheck className="text-success" />
        </div>
      ) : cellValue === "PENDING" ? (
        <div className="flex justify-center">
          <div class="w-4 h-4 border-2 border-gray-300 border-t-blue-500 rounded-full animate-spin"></div>
        </div>
      ) : (
        <div className="flex justify-center">
          <FaRegCircleXmark className="text-danger" />
        </div>
      );
    } else if (columnKey === "operation") {
      return (
        <div className="flex gap-3 items-center">
          {cellValue.document_type === "URL" ? (
            <Tooltip content="Chi tiết">
              <button
                onClick={() => {
                  onOpen();
                  setCurDoc(cellValue);
                }}
                className="hover:opacity-70"
              >
                <FaInfoCircle className="text-blue-500" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Tải xuống">
              <button
                onClick={() => handleDownloadDocument(cellValue.id)}
                className="hover:opacity-70"
              >
                <FaDownload className="text-green-500" />
              </button>
            </Tooltip>
          )}
          <Tooltip content="Chỉnh sửa">
            <button
              className="hover:opacity-70"
              onClick={() => {
                onOpenEdit();
                setCurDoc(cellValue);
                reset(cellValue);
              }}
            >
              <FaEdit className="text-black" />
            </button>
          </Tooltip>
          {cellValue.is_deleted ? (
            <Tooltip content="Khôi phục">
              <button
                onClick={() => {
                  onOpenRestore();
                  setCurDoc(cellValue);
                }}
                className="hover:opacity-70"
              >
                <FaHistory className="text-green-500" />
              </button>
            </Tooltip>
          ) : (
            <Tooltip content="Xóa">
              <button
                onClick={() => {
                  onOpenDelete();
                  setCurDoc(cellValue);
                }}
                className="hover:opacity-70"
              >
                <FaTrash className="text-red-500" />
              </button>
            </Tooltip>
          )}
        </div>
      );
    } else if (columnKey === "document_type") {
      return (
        <Chip
          size="sm"
          variant="bordered"
          color={translateDocumentType(cellValue).color}
        >
          {translateDocumentType(cellValue).value}
        </Chip>
      );
    } else {
      return cellValue;
    }
  };

  const handleTrain = async () => {
    await trainApi()
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Đang chờ đào tạo");
          setIsNotPending(false);
          const interval = setInterval(async () => {
            try {
              const res = await getTrainingStatusApi();
              if (res.data.is_training === false) {
                clearInterval(interval);
                if (
                  res.data.document_counts.total ===
                  res.data.document_counts.trained
                ) {
                  toast.success("Đào tạo thành công");
                } else {
                  toast.error("Đào tạo thất bại, vui lòng thử lại");
                }
                setIsNotPending(true);
                refetch();
              } else {
                console.log("⏳ Training in progress...");
              }
            } catch (err) {
              console.error("❌ Error while checking training status:", err);
              clearInterval(interval);
            }
          }, 1000);
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
  };

  const handleUpdatePriority = async () => {
    await updatePrioritiesApi(updatePriorities)
      .then(async (res) => {
        console.log(12, res);
        if (res.status === 200) {
          setUpdatePriorities([]);
          toast.success("Cập nhật thành công");
          handleTrain();
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
  };

  const handleSave = async () => {
    setIsLoading(true);
    if (updatePriorities.length === 0) {
      await handleTrain();
    } else {
      if (!updatePriorities.every((item) => item.priority)) {
        toast.error("Vui lòng chọn độ ưu tiên cho tri thức");
        setIsLoading(false);
        return;
      }
      await handleUpdatePriority();
    }
    setIsLoading(false);
  };

  const handleConfirmDelete = async () => {
    onCloseDelete();
    setIsLoading(true);
    await deleteDocumentApi(curDoc.id)
      .then((res) => {
        if (res.status === 204) {
          setCurDoc(null);
          // refetch();
          if (curDoc.training_status !== "UNTRAINED") {
            toast.success("Tri thức sẽ được xoá khi đào tạo");
          } else {
            toast.success("Xóa tri thức thành công");
          }
          refetch();
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleConfirmRestore = async () => {
    onCloseRestore();
    setIsLoading(true);
    await restoreDocumentApi(curDoc.id)
      .then((res) => {
        if (res.status === 200) {
          setCurDoc(null);
          // refetch();
          toast.success("Tri thức đã được khôi phục");
          refetch();
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleConfirmEdit = async (data) => {
    onCloseEdit();
    setIsLoading(true);
    if (data.document_type === "URL") {
      await editUrlDocumentApi(
        data.id,
        data.filename,
        data.url,
        data.url_description
      )
        .then((res) => {
          if (res.status === 200) {
            setCurDoc(null);
            // refetch();
            toast.success("Chỉnh sửa tri thức thành công");
            refetch();
          }
        })
        .catch((err) => {
          console.log(2, err);
        });
    } else {
      await editDocumentNameApi(data.id, data.filename)
        .then((res) => {
          if (res.status === 200) {
            setCurDoc(null);
            // refetch();
            toast.success("Chỉnh sửa tri thức thành công");
            refetch();
          }
        })
        .catch((err) => {
          console.log(2, err);
        });
    }
    setIsLoading(false);
  };

  return (
    <>
      <ConfirmModal
        isOpen={isOpenDelete}
        onClose={() => {
          onCloseDelete();
          setCurDoc(null);
        }}
        onConfirm={handleConfirmDelete}
        title="Xóa tri thức"
        description="Bạn có muốn xóa tri thức này không?"
      />
      <ConfirmModal
        isOpen={isOpenRestore}
        onClose={() => {
          onCloseRestore();
          setCurDoc(null);
        }}
        onConfirm={handleConfirmRestore}
        title="Khôi phục tri thức"
        description="Bạn có muốn khôi phục tri thức này không?"
      />
      <Modal
        isOpen={isOpenEdit}
        onOpenChange={onOpenChangeEdit}
        onClose={() => {
          onCloseEdit();
          setCurDoc(null);
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Chỉnh sửa tri thức
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-6 items-center">
                  <div className="col-span-2">
                    Tên tri thức <span className="text-red-500">(*)</span>:
                  </div>{" "}
                  <Controller
                    control={control}
                    name="filename"
                    rules={{
                      required: "Bắt buộc",
                    }}
                    render={({ field: { onChange, value } }) => (
                      <Input
                        type="text"
                        variant="bordered"
                        placeholder="Nhập tên tri thức"
                        className="col-span-4"
                        size="sm"
                        value={value}
                        onChange={onChange}
                        isRequired
                      />
                    )}
                  />
                  <div className="col-span-2"></div>
                  {errors.filename && (
                    <div className="text-red-500 text-xs col-span-4 mt-2">
                      {errors.filename.message}
                    </div>
                  )}
                </div>
                {curDoc.document_type === "URL" && (
                  <>
                    {/* <div className="grid grid-cols-6 items-center">
                      <div className="col-span-2">
                        Đường dẫn <span className="text-red-500">(*)</span>:
                      </div>{" "}
                      <Controller
                        control={control}
                        name="url"
                        rules={{
                          required: "Bắt buộc",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            type="text"
                            variant="bordered"
                            placeholder="Nhập đường dẫn"
                            className="col-span-4"
                            size="sm"
                            value={value}
                            onChange={onChange}
                            isRequired
                          />
                        )}
                      />
                      <div className="col-span-2"></div>
                      {errors.url && (
                        <div className="text-red-500 text-xs col-span-4 mt-2">
                          {errors.url.message}
                        </div>
                      )}
                    </div> */}
                    <div className="grid grid-cols-6 items-center">
                      <div className="col-span-2">
                        Mô tả <span className="text-red-500">(*)</span>:
                      </div>{" "}
                      <Controller
                        control={control}
                        name="url_description"
                        rules={{
                          required: "Bắt buộc",
                        }}
                        render={({ field: { onChange, value } }) => (
                          <Input
                            type="text"
                            variant="bordered"
                            placeholder="Nhập mô tả"
                            className="col-span-4"
                            size="sm"
                            value={value}
                            onChange={onChange}
                            isRequired
                          />
                        )}
                      />
                      <div className="col-span-2"></div>
                      {errors.url_description && (
                        <div className="text-red-500 text-xs col-span-4 mt-2">
                          {errors.url_description.message}
                        </div>
                      )}
                    </div>
                  </>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="default" onPress={onClose}>
                  Đóng
                </Button>
                <Button
                  color="primary"
                  onPress={handleSubmit(handleConfirmEdit)}
                >
                  Lưu
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      {curDoc && curDoc.document_type === "URL" && (
        <Modal
          isOpen={isOpen}
          onOpenChange={onOpenChange}
          onClose={() => {
            onClose();
            setCurDoc(null);
          }}
        >
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {curDoc.url_title}
                </ModalHeader>
                <ModalBody>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Tên tri thức:</div>{" "}
                    <div className="col-span-4">{curDoc.url_title}</div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Đường dẫn:</div>{" "}
                    <div className="col-span-4">
                      <a
                        href={curDoc.url}
                        className="text-coolchat hover:opacity-70 break-words"
                        target="_blank"
                      >
                        {curDoc.url}
                      </a>
                    </div>
                  </div>
                  <div className="grid grid-cols-6">
                    <div className="col-span-2">Mô tả:</div>{" "}
                    <div className="col-span-4">{curDoc.url_description}</div>
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
              onClear={() => setSearchInput("")}
              value={searchInput}
            />
            <Select
              aria-label="select type"
              variant="bordered"
              label="Loại hình"
              selectedKeys={[documentType]}
              size="sm"
              className="w-[120px]"
              onChange={(e) => setDocumentType(e.target.value)}
            >
              <SelectItem key="">Tất cả</SelectItem>
              <SelectItem key="FILE">Tập tin</SelectItem>
              <SelectItem key="TEXT">Văn bản</SelectItem>
              <SelectItem key="URL">Website</SelectItem>
            </Select>
            <Select
              aria-label="select priority"
              variant="bordered"
              label="Độ ưu tiên"
              selectedKeys={[priority]}
              size="sm"
              className="w-[120px]"
              onChange={(e) => setPriority(e.target.value)}
            >
              <SelectItem key="">Tất cả</SelectItem>
              <SelectItem key="HIGH">Cao</SelectItem>
              <SelectItem key="MEDIUM">Trung bình</SelectItem>
              <SelectItem key="LOW">Thấp</SelectItem>
            </Select>
            <Button
              variant="bordered"
              color="danger"
              size="sm"
              onClick={() => {
                setSearchInput("");
                setDocumentType("");
                setPriority("");
              }}
            >
              Xóa bộ lọc
            </Button>
          </div>
        </div>
        <Table
          removeWrapper
          aria-label="Chatbot training"
          className="w-full overflow-x-scroll md:overflow-auto"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                align={
                  ["training_status", "content_type"].includes(column.key)
                    ? "center"
                    : "start"
                }
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={data ? data : []}>
            {(item) => (
              <TableRow
                key={item.key}
                className={`${item.is_deleted && "opacity-50"}`}
              >
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
        <div className="text-red-500 italic text-sm mt-5">
          * Lưu ý: Những tri thức bị làm mờ là những tri thức đã được xóa nhưng
          vẫn còn đào tạo, chọn LƯU VÀ ĐÀO TẠO để hủy đào tạo và xóa vĩnh viễn
          các tri thức này
        </div>
      </div>
      <div className="flex gap-5 justify-end mb-5">
        {/* <Button
          color="primary"
          onClick={() => navigate("comparison")}
          isDisabled={!isEditted}
        >
          SO SÁNH CHATBOT
        </Button> */}
        <Button
          color="success"
          onClick={handleSave}
          isDisabled={
            !isNotPending ||
            (!canTrain && isNotPending && updatePriorities.length <= 0)
          }
        >
          LƯU VÀ ĐÀO TẠO
        </Button>
      </div>
      {/* <div className="font-semibold text-lg">Chú thích</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-5 py-5 mb-5">
        {trainingLegends.map((legend, index) => (
          <LegendItem key={legend.id || index} legend={legend} />
        ))}
      </div> */}
    </>
  );
};
