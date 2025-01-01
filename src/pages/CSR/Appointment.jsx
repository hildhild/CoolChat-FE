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
  useDisclosure,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import {
  FaUserCircle,
  FaBook,
  FaFacebookSquare,
  FaCode,
  FaFile,
  FaEdit,
  FaFileUpload,
  FaTrash,
  FaInfoCircle,
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

function Appointment() {
  const { t } = useTranslation();
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  const rows = [
    {
      key: "1",
      code: "00001",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "new",
      id: "1",
    },
    {
      key: "2",
      code: "00002",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "new",
      id: "1",
    },
    {
      key: "3",
      code: "00003",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "new",
      id: "1",
    },
    {
      key: "4",
      code: "00004",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "done",
      id: "1",
    },
    {
      key: "5",
      code: "00005",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "done",
      id: "1",
    },
    {
      key: "6",
      code: "00006",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "done",
      id: "1",
    },
    {
      key: "7",
      code: "00007",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "done",
      id: "1",
    },
    {
      key: "8",
      code: "00008",
      name: "Jullu Jalal",
      phone: "0357677888",
      message: "Tôi muốn hoàn lại đơn hàng này...",
      time: "5:00 12/12/2024",
      status: "done",
      id: "1",
    },
  ];

  const columns = [
    {
      key: "code",
      label: "Mã",
    },
    {
      key: "name",
      label: "Tên khách hàng",
    },
    {
      key: "phone",
      label: "Số điện thoại",
    },
    {
      key: "message",
      label: "Lời nhắn",
    },
    {
      key: "time",
      label: "Thời gian hẹn",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key: "id",
      label: "Thao tác",
    },
  ];

  const statusColor = {
    done: "success",
    new: "primary",
  };

  const statusText = {
    done: "Hoàn thành",
    new: "Sắp tới",
  };

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "status") {
      return (
        <Chip color={statusColor[cellValue]} size="sm" className="w-full">
          {statusText[cellValue]}
        </Chip>
      );
    } else if (columnKey === "id") {
      return (
        <button onClick={onOpen}>
          <FaInfoCircle size={20} color="#006FEE" />
        </button>
      );
    } else {
      return cellValue;
    }
  };

  return (
    <DashboardLayout page="appointment">
      <Modal isOpen={isOpen} size="sm" onClose={onClose}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 text-center border-b-[1px] border-gray-200">
                Chi tiết lịch hẹn - 000001
              </ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">Tên khách hàng:</div>
                  <div className="col-span-7 font-semibold">Jullu Jalal</div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">Số điện thoại:</div>
                  <div className="col-span-7 font-semibold">0357677888</div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">Lời nhắn:</div>
                  <div className="col-span-7 font-semibold">
                    Tôi muốn hoàn lại đơn hàng này vì nó đã không còn nguyên vẹn
                    khi đến tay tôi.
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">Thời gian hẹn:</div>
                  <div className="col-span-7 font-semibold">
                    5:00 12/12/2024
                  </div>
                </div>
                <div className="grid grid-cols-12">
                  <div className="col-span-5">Trạng thái:</div>
                  <div className="col-span-7 font-semibold">
                    <Chip
                      color="primary"
                      size="md"
                      className="w-full"
                    >
                      Sắp tới
                    </Chip>
                  </div>
                </div>
              </ModalBody>
              <ModalFooter className="flex justify-center">
                <Button
                  color="primary"
                  onPress={() => {
                    onClose();
                    navigate("/chat/1");
                  }}
                >
                  Hỗ trợ
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">LỊCH HẸN</div>
        <>
          <div className="bg-white px-5 py-8 rounded-xl mb-8">
            <div className="flex w-full justify-between mb-5">
              <Input
                isClearable
                radius="lg"
                placeholder="Tìm kiếm..."
                variant="bordered"
                className="w-72"
                size="lg"
                startContent={<MdSearch size={25} />}
              />
              <Select
                variant="bordered"
                label="Sắp xếp theo"
                defaultSelectedKeys={["newest"]}
                size="sm"
                className="w-[120px]"
              >
                <SelectItem key="newest">Mới nhất</SelectItem>
                <SelectItem key="oldest">Cũ nhất</SelectItem>
              </Select>
            </div>
            <Table removeWrapper aria-label="chatbot-training">
              <TableHeader columns={columns}>
                {(column) => (
                  <TableColumn key={column.key}>{column.label}</TableColumn>
                )}
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                  <TableRow key={item.key}>
                    {(columnKey) => (
                      <TableCell className="py-5">
                        {renderCell(item, columnKey)}
                      </TableCell>
                    )}
                  </TableRow>
                )}
              </TableBody>
            </Table>
            <div className="flex justify-between items-center mt-4">
              <div className="text-sm text-neutral-500">
                Hiển thị 1 đến 8 trong 256K dữ liệu
              </div>
              <Pagination showControls total={10} initialPage={1} />
            </div>
          </div>
        </>
      </div>
    </DashboardLayout>
  );
}

export default Appointment;
