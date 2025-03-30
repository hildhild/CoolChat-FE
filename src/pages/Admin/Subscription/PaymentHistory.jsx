import { useEffect, useState } from "react";
import { LoadingProcess, TableBottom } from "../../../components";
import { getPaymentsApi } from "../../../services/subscriptionApi";
import { useQuery } from "@tanstack/react-query";
import { dateTimeToString } from "../../../utils";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";

export const PaymentHistory = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [paymentId, setPaymentId] = useState(null);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [pageCount, setPageCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
  const [numOfPages, setNumOfPages] = useState(0);
  const [paymentList, setPaymentList] = useState([]);

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
          setPaymentList(res.data.results.map((item) => {return {...item, payment_name: item}}));
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
  ];

  const renderCell = (item, columnKey) => {
    const cellValue = item[columnKey];
    if (columnKey === "created_at") {
      const date = new Date(cellValue);
      return dateTimeToString(date);
    } else if (columnKey === "payment_name") {
     return cellValue.additional_charge_type ? cellValue.additional_charge_type : cellValue.subscription_tier
    } else {
      return cellValue;
    }
  };

  return (
    <div>
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
