import { useEffect, useState } from "react";
import { ConfirmModal, LoadingProcess, TableBottom } from "../../../components";
import {
  cancelPaymentApi,
  getPaymentsApi,
} from "../../../services/subscriptionApi";
import { useQuery } from "@tanstack/react-query";
import { dateTimeToString } from "../../../utils";
import {
  Chip,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";
import { FaXmark } from "react-icons/fa6";
import { toast } from "react-toastify";
import { FaInfoCircle } from "react-icons/fa";

export const PaymentHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [paymentList, setPaymentList] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleCancel = async (id) => {
    setIsLoading(true);
    await cancelPaymentApi(id).then((res) => {
      if (res.status === 200) {
        refetch();
      }
    });
    setIsLoading(false);
  };

  const checkExpiredPayment = (data) => {
    data.forEach((item) => {
      if (item.status === "PENDING") {
        const createdDate = new Date(item.created_at);
        const now = new Date();
        const diffInMs = now - createdDate;
        const diffInDays = diffInMs / (1000 * 60 * 60 * 24);

        if (diffInDays >= 1) {
          if (item.payos_order_id) {
            handleCancel(item.payos_order_id);
          }
        }
      }
    });
  };

  const {
    data,
    refetch,
    isLoading: isLoadingPayments,
  } = useQuery({
    queryKey: ["payment", page, pageSize],
    queryFn: async () => {
      try {
        const res = await getPaymentsApi(page, pageSize);
        console.log(13, res);
        if (res.status === 200) {
          setTotalCount(res.data.count);
          setPageCount(res.data.results.length);
          setNumOfPages(Math.ceil(res.data.count / pageSize));
          setPaymentList(
            res.data.results.map((item) => {
              return { ...item, payment_name: item, operation: item };
            })
          );
          checkExpiredPayment(res.data.results);
          return res.data.results;
        } else {
          // toast.error(res.data.detail);
          return [];
        }
      } catch (e) {
        throw new Error("Failed to fetch payments.");
      }
    },
  });

  const columns = [
    {
      key: "description",
      label: "Tên",
    },
    {
      key: "payment_type",
      label: "Loại",
    },
    {
      key: "amount",
      label: "Số tiền (VNĐ)",
    },
    {
      key: "status",
      label: "Trạng thái",
    },
    {
      key: "created_at",
      label: "Thời gian tạo",
    },
    {
      key: "operation",
      label: "Thao tác",
    },
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "created_at") {
      const date = new Date(cellValue);
      return dateTimeToString(date);
    } else if (columnKey === "payment_name") {
      return cellValue.additional_charge_type
        ? cellValue.additional_charge_type
        : cellValue.subscription_tier;
    } else if (columnKey === "amount") {
      return cellValue.toLocaleString("en-US");
    } else if (columnKey === "payment_type") {
      return cellValue === "ADDITIONAL_CHARGE" ? "Gói bổ sung" : "Gói đăng ký";
    } else if (columnKey === "status") {
      return (
        <Chip
          color={
            cellValue === "FAILED"
              ? "danger"
              : cellValue === "PENDING"
              ? "primary"
              : "success"
          }
          variant="bordered"
        >
          {cellValue === "FAILED"
            ? "Đã Hủy"
            : cellValue === "PENDING"
            ? "Đang Chờ"
            : "Thành Công"}
        </Chip>
      );
    } else if (columnKey === "operation") {
      if (cellValue.status === "PENDING") {
        return (
          <div className="flex gap-3">
            <Tooltip content="Thanh toán">
              <a href={cellValue.payos_payment_link} className="flex">
                <button className="hover:opacity-70">
                  <FaInfoCircle className="text-blue-500" />
                </button>
              </a>
            </Tooltip>
          </div>
        );
      } else {
        return <></>;
      }
    } else if (columnKey === "description") {
      if (cellValue.includes("Starter")) {
        return cellValue.replace("Starter", "Sơ cấp");
      } else if (cellValue.includes("Professional")) {
        return cellValue.replace("Professional", "Chuyên nghiệp");
      } else {
        return cellValue;
      }
    } else {
      return cellValue;
    }
  };

  const handleConfirmModal = async () => {
    onClose();
    setIsLoading(true);
    await cancelPaymentApi(paymentId).then((res) => {
      if (res.status === 200) {
        toast.success("Hủy thanh toán thành công");
        refetch();
      }
    });
    setIsLoading(false);
  };

  return (
    <div>
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setPaymentId(null);
        }}
        onConfirm={handleConfirmModal}
        title="Hủy thanh toán"
        description="Bạn có muốn hủy quá trình thanh toán này không?"
      />
      <LoadingProcess isLoading={isLoading || isLoadingPayments} />
      <div className="bg-white px-5 py-8 rounded-xl">
        <Table
          className="w-full overflow-x-scroll md:overflow-auto"
          removeWrapper
          aria-label="payment"
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn key={column.key}>{column.label}</TableColumn>
            )}
          </TableHeader>
          <TableBody items={paymentList ? paymentList : []}>
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
          pageCount={pageCount}
          totalCount={totalCount}
          numOfPages={numOfPages}
        />
      </div>
    </div>
  );
};
