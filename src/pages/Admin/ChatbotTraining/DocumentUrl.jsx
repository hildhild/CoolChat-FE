import { Button, Input } from "@nextui-org/react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { addDocumentUrlApi } from "../../../services/documentApi";
import { LoadingProcess } from "../../../components";
import { toast } from "react-toastify";

export const DocumentUrl = ({refetch}) => {
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
      title: "",
      url: "",
      description: "",
    },
  });

  const handleSubmitUrl = async (data) => {
    setIsLoading(true);
    await addDocumentUrlApi(data.url, data.title, data.description)
      .then((res) => {
        console.log(12, res);
        if (res.status === 201) {
          // refetch();
          reset();
          toast.success("Thêm tài liệu thành công");
          refetch();
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <>
      <LoadingProcess isLoading={isLoading}/>
      <div className="font-semibold text-lg mb-3 block lg:hidden">
        Nhập tri thức web
      </div>
      <div className="mb-5">Nhập các thông tin của website để AI crawl</div>
      <div className="grid grid-cols-12 gap-4 mb-10">
        <Controller
          control={control}
          name="title"
          rules={{
            required: "Bắt buộc",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              type="text"
              variant="bordered"
              label="Tiêu đề"
              placeholder="Nhập tiêu đề cho website"
              className="col-span-12 md:col-span-12"
              value={value}
              onChange={onChange}
              isRequired
            />
          )}
        />
        {errors.title && (
          <div className="text-red-500 text-xs">
            {errors.title.message}
          </div>
        )}
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
              label="Đường dẫn"
              placeholder="Nhập đường dẫn đến website"
              className="col-span-12 md:col-span-12"
              value={value}
              onChange={onChange}
              isRequired
            />
          )}
        />
        {errors.url && (
          <div className="text-red-500 text-xs">{errors.url.message}</div>
        )}
        <Controller
          control={control}
          name="description"
          rules={{
            required: "Bắt buộc",
          }}
          render={({ field: { onChange, value } }) => (
            <Input
              type="text"
              variant="bordered"
              label="Mô tả"
              placeholder="Nhập mô tả cho website"
              className="col-span-12 md:col-span-12"
              value={value}
              onChange={onChange}
              isRequired
            />
          )}
        />
        {errors.description && (
          <div className="text-red-500 text-xs">{errors.description.message}</div>
        )}
        {/* <Button color="primary" className="col-span-12 md:col-span-2">
          Thêm
        </Button> */}
      </div>
      {/* <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
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
      </div> */}
      <div className="flex justify-end gap-5 mt-5">
        <Button color="default" onClick={reset}>Hủy</Button>
        <Button color="primary" onClick={handleSubmit(handleSubmitUrl)}>Lưu</Button>
      </div>
    </>
  );
};
