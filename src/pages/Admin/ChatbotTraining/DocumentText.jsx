import { Button, Textarea } from "@nextui-org/react";
import { useState } from "react";
import { FaEdit } from "react-icons/fa";
import { MdOutlineCancel, MdOutlineTextSnippet } from "react-icons/md";
import { LoadingProcess } from "../../../components";
import { addDocumentTextApi } from "../../../services/documentApi";
import { toast } from "react-toastify";
import { Controller, useForm } from "react-hook-form";

export const DocumentText = ({ refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      text: "",
    },
  });

  const handleSubmitText = async (data) => {
    setIsLoading(true);
    await addDocumentTextApi(data.text)
      .then((res) => {
        console.log(12, res);
        if (res.status === 201) {
          refetch();
          reset();
          toast.success("Thêm tài liệu thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <>
      <LoadingProcess isLoading={isLoading} />
      <div className="font-semibold text-lg mb-3 block lg:hidden">
        Nhập tri thức
      </div>
      <div className="mb-5">Nhập hướng dẫn cho AI dưới dạng văn bản</div>
      <Controller
        control={control}
        name="text"
        rules={{
          required:"Bắt buộc",
          maxLength: {
            value: 100000,
            message: "Tối đa 100,000 ký tự",
          },
        }}
        render={({ field: { onChange, value } }) => (
          <Textarea
            variant="bordered"
            disableAnimation
            disableAutosize
            className="w-full bg-white rounded-xl mb-4"
            classNames={{
              input: "resize-y min-h-[120px]",
            }}
            value={value}
            onChange={onChange}
            isRequired
          />
        )}
      />
      {errors.text && (
        <div className="text-red-500 text-xs mb-4">
          {errors.text.message}
        </div>
      )}
      <div className="mb-5 flex justify-between items-center">
        <div className="text-sm text-neutral-600">
          Văn bản khi nhập sẽ được lưu dưới dạng tệp txt. Tối đa 100,000 ký tự.
        </div>
        <div>{watch("text").length} từ</div>
      </div>
      {/* <div className="mb-3">Các hướng dẫn hiện có (double-tap để đổi tên)</div> */}
      {/* <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
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
      </div> */}
      <div className="flex justify-end gap-5 mt-5">
        <Button color="default" onClick={() => reset()}>
          Hủy
        </Button>
        <Button color="primary" onClick={handleSubmit(handleSubmitText)}>
          Lưu
        </Button>
      </div>
    </>
  );
};
