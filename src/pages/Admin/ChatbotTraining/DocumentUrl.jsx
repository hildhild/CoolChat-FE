import { Button, Input } from "@nextui-org/react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";

export const DocumentUrl = () => {
  return (
    <>
      <div className="font-semibold text-lg mb-3 block lg:hidden">
        Nhập tri thức web
      </div>
      <div className="mb-5">Nhập các website để AI crawl</div>
      <div className="grid grid-cols-12 gap-4 mb-10">
        <Input
          type="text"
          variant="bordered"
          placeholder="Nhập đường dẫn đến website"
          className="col-span-12 md:col-span-10"
        />
        <Button color="primary" className="col-span-12 md:col-span-2">
          Thêm
        </Button>
      </div>
      <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
        <div className="flex items-center justify-between gap-5">
          <TbWorld className="text-coolchat" size={30} />
          <div className="text-sm font-semibold">coolchat.software</div>
        </div>
        <div className="flex gap-3">
          <FaEdit size={20} />
          <FaTrash className="text-red-500" size={20} />
        </div>
      </div>
      <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
        <div className="flex items-center justify-between gap-5">
          <TbWorld className="text-coolchat" size={30} />
          <div className="text-sm font-semibold">coolchat.com</div>
        </div>
        <div className="flex gap-3">
          <FaEdit size={20} />
          <FaTrash className="text-red-500" size={20} />
        </div>
      </div>
    </>
  );
};
