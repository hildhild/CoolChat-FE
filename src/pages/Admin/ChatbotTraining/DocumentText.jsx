import { Button, Textarea } from "@nextui-org/react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineTextSnippet } from "react-icons/md";

export const DocumentText = () => {
  return (
    <>
      <div className="font-semibold text-lg mb-3 block lg:hidden">
        Nhập tri thức
      </div>
      <div className="mb-5">Nhập hướng dẫn cho AI dưới dạng viết tay</div>
      <Textarea
        variant="bordered"
        disableAnimation
        disableAutosize
        className="w-full bg-white rounded-xl mb-4"
        classNames={{
          input: "resize-y min-h-[120px]",
        }}
      />
      <div className="mb-3">Các hướng dẫn hiện có (double-tap để đổi tên)</div>
      <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
        <div className="flex items-center justify-between gap-5">
          <MdOutlineTextSnippet className="text-yellow-500" size={30} />
          <div>
            <div className="text-sm font-semibold">note1</div>
            <div className="text-sm text-gray-400">2590 từ</div>
          </div>
        </div>
        <div className="flex gap-3">
          <FaEdit size={20} />
          <MdOutlineCancel className="text-red-500" size={20} />
        </div>
      </div>
      <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
        <div className="flex items-center justify-between gap-5">
          <MdOutlineTextSnippet className="text-yellow-500" size={30} />
          <div>
            <div className="text-sm font-semibold">note2</div>
            <div className="text-sm text-gray-400">1097 từ</div>
          </div>
        </div>
        <div className="flex gap-3">
          <FaEdit size={20} />
          <MdOutlineCancel className="text-red-500" size={20} />
        </div>
      </div>
      <div className="flex justify-end gap-5 mt-5">
        <Button color="default">Hủy</Button>
        <Button color="primary">Lưu</Button>
      </div>
    </>
  );
};
