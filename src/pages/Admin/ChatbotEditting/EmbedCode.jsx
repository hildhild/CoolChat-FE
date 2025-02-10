import { useEffect, useState } from "react";
import { CopyBlock, dracula } from "react-code-blocks";
import { ConfirmModal, LoadingProcess } from "../../../components";
import {
  editAllowedDomainsApi,
  getEmbedCodeApi,
} from "../../../services/chatbotConfigApi";
import { Button, Input, useDisclosure } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaTrash } from "react-icons/fa";
import { TbWorld } from "react-icons/tb";
import { toast } from "react-toastify";

export const EmbedCode = ({ allowedDomains, refetch }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [embedCode, setEmbedCode] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [deleteDomain, setDeleteDomain] = useState(null);

  //   const embedCode = `
  // <script src="https://coolchat.vn/js/chatbox.js"></script>
  // <script>
  //   const coolchat_box = new CoolChat('WYVms6uOzriKKKNPKJ-oW');
  //   coolchat_box.initial();
  // </script>
  // `;

  const getEmbedCode = async () => {
    setIsLoading(true);
    await getEmbedCodeApi().then((res) => {
      console.log(res);
      setEmbedCode(res.data.embed_code);
    });
    setIsLoading(false);
  };

  useEffect(() => {
    getEmbedCode();
  }, []);

  const {
    control,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      domainName: "",
    },
  });

  const handleSubmitDomainName = async (data) => {
    setIsLoading(true);
    await editAllowedDomainsApi([...allowedDomains, data.domainName].join(","))
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          reset();
          toast.success("Thêm tên miền thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleDeleteDomainName = async (domain) => {
    onClose();
    setIsLoading(true);
    await editAllowedDomainsApi(
      allowedDomains.filter((item) => item !== domain).join(",")
    )
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Xóa tên miền thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <div>
      <LoadingProcess isLoading={isLoading} />
      <ConfirmModal
        isOpen={isOpen}
        onClose={() => {
          onClose();
          setDeleteDomain(null);
        }}
        onConfirm={() => handleDeleteDomainName(deleteDomain)}
        title={"Xóa tên miền"}
        description={"Bạn có muốn xóa tên miền này không?"}
      />
      <div className="font-semibold text-lg mb-2">Mã nhúng</div>
      <div className="text-sm mb-3">
        Sao chép và dán dưới cùng của trang bạn, trước kết thúc thẻ{" "}
        <span className="text-red-500">&lt;/body &gt;</span>
      </div>
      <CopyBlock
        text={embedCode}
        language="html"
        wrapLines
        showLineNumbers={true}
        theme={dracula}
        codeBlock
      />
      <div className="font-semibold text-lg mt-5 mb-2">Tên miền cho phép</div>
      <div className="text-sm mb-3">
        Nếu danh sách rỗng, toàn bộ tên miền được cho phép
      </div>
      <div className="mb-5">
        <div className="grid grid-cols-12 gap-3">
          <Controller
            control={control}
            name="domainName"
            rules={{
              required: "Bắt buộc",
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                type="text"
                variant="bordered"
                placeholder="Nhập tên miền cần thêm"
                className="col-span-12 md:col-span-10"
                value={value}
                onChange={onChange}
                isRequired
              />
            )}
          />
          <Button
            color="primary"
            className="col-span-12 md:col-span-2"
            onClick={handleSubmit(handleSubmitDomainName)}
          >
            Thêm
          </Button>
        </div>
        {errors.domainName && (
          <div className="text-red-500 text-xs mt-3">
            {errors.domainName.message}
          </div>
        )}
      </div>
      {allowedDomains.map((domain, index) => (
        <div
          key={index}
          className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3"
        >
          <div className="flex items-center justify-between gap-5">
            <TbWorld className="text-coolchat" size={30} />
            <div className="text-sm font-semibold">{domain}</div>
          </div>
          <button
            onClick={() => {
              onOpen();
              setDeleteDomain(domain);
            }}
            className="hover:opacity-70"
          >
            <FaTrash className="text-red-500" size={20} />
          </button>
        </div>
      ))}
      {allowedDomains.length === 0 && (
        <div className="w-full text-center p-10">Danh sách rỗng</div>
      )}
    </div>
  );
};
