import { Pagination, Select, SelectItem } from "@nextui-org/react";
import { useEffect } from "react";

export const TableBottom = ({
  page,
  setPage,
  pageSize,
  setPageSize,
  pageCount,
  totalCount,
  numOfPages,
}) => {
  useEffect(() => console.log(12, page, numOfPages), [page, pageSize, numOfPages]);

  return (
    <div className="flex flex-col md:flex-row gap-5 justify-between items-center mt-4">
      <div className="flex justify-between items-center gap-3">
        <Select
          variant="bordered"
          label="Số hàng"
          defaultSelectedKeys={[pageSize.toString()]}
          size="sm"
          labelPlacement="outside-left"
          className="w-24"
          onChange={(e) => setPageSize(e.target.value)}
        >
          <SelectItem key="5">5</SelectItem>
          <SelectItem key="10">10</SelectItem>
          <SelectItem key="20">20</SelectItem>
          <SelectItem key="50">50</SelectItem>
        </Select>
        <div className="text-sm text-neutral-500 text-end md:text-start">
          {pageCount === 0
            ? "Không có dữ liệu"
            : `Hiển thị ${(page - 1) * pageSize + 1} đến ${
                (page - 1) * pageSize + pageCount
              } trong tổng ${totalCount} dữ liệu`}
        </div>
      </div>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={numOfPages}
        onChange={(page) => setPage(page)}
      />
    </div>
  );
};
