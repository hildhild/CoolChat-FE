import { Button } from "@nextui-org/react";
import { FaFileUpload, FaTrash } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import {
  BsFiletypePdf,
  BsFiletypeDoc,
  BsFiletypeDocx,
  BsFiletypeTxt,
} from "react-icons/bs";
import { useDropzone } from "react-dropzone";
import { useEffect, useState } from "react";
import { formatFileSize } from "../../../utils";
import { toast } from "react-toastify";
import { LoadingProcess } from "../../../components";
import { addDocumentFileApi } from "../../../services/documentApi";

export const DocumentFile = ({refetch}) => {
  const { t } = useTranslation();
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => console.log(files), [files]);

  const onDrop = (acceptedFiles) => {
    if (files.length === 5) {
      toast.error("Chỉ được tải lên tối đa 5 tệp");
      return;
    }
    const newFiles = acceptedFiles.map((file) =>
      Object.assign(file, {
        preview: URL.createObjectURL(file),
      })
    );
    if (files.length + newFiles.length > 5) {
      toast.error("Chỉ được tải lên tối đa 5 tệp");
      return;
    }
    if (!newFiles.every((file) => file.size <= 20000000 && file.size > 0)) {
      toast.error("Chỉ tải lên các tệp có kích thước không quá 20 MB và không được rỗng");
    }
    setFiles((prevFiles) => [...prevFiles, ...newFiles.filter(file => file.size > 0 && file.size <= 20000000)]);
  };

  const removeFile = (fileName) => {
    setFiles((prevFiles) => prevFiles.filter((file) => file.name !== fileName));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/msword": [".doc"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
      "text/plain": [".txt"],
    },
    multiple: true,
  });

  const handleUploadFiles = async () => {
    if (files.length <= 0) {
      toast.error("Vui lòng chọn tệp để tải lên");
      return;
    }
    setIsLoading(true);
    await addDocumentFileApi(files)
      .then((res) => {
        console.log(12, res);
        if (res.status === 201) {
          refetch();
          setFiles([]);
          toast.success("Tải tài liệu lên thành công");
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
        Tải lên phương tiện
      </div>
      <div className="mb-5">Thêm tài liệu của bạn ở đây</div>
      <div
        className="flex flex-col justify-center items-center border-2 border-dashed border-coolchat rounded-2xl p-6 mb-5 cursor-pointer"
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <FaFileUpload size={50} className="text-coolchat mb-3" />
        <div>Kéo thả các tệp để bắt đầu tải lên</div>
        <div className="flex justify-center items-center py-4">
          <div className="h-[1px] w-12 bg-slate-200"></div>
          <div className="mx-3 uppercase">{t("or")}</div>
          <div className="h-[1px] w-12 bg-slate-200"></div>
        </div>
        <div className="px-3 py-2 border-2 border-coolchat rounded-2xl text-coolchat">
          Chọn từ máy tính
        </div>
      </div>
      <div className="text-sm text-neutral-600 mb-5">
        Chỉ hỗ trợ .pdf, .doc, .docx và .txt. Tối đa 5 tệp, mỗi tệp tối đa 20MB.
      </div>
      <div className="grid grid-cols-1 gap-5">
        <div className="flex justify-between items-center">
          <div>Các tệp đã chọn</div>
          {files.length > 0 && (
            <button
              className="text-red-500 hover:font-semibold"
              onClick={() => setFiles([])}
            >
              Xóa tất cả
            </button>
          )}
        </div>
        {files.length === 0 && (
          <div className="w-full text-center text-neutral-500 text-sm">
            Chưa có tệp được chọn
          </div>
        )}
        {files.map((file) => (
          <div
            className="border-2 rounded-xl flex items-center justify-between px-4 py-2"
            key={file.name}
          >
            <div className="flex items-center justify-between gap-5">
              {file.type === "application/pdf" ? (
                <BsFiletypePdf className="text-[#F15B48]" size={25} />
              ) : file.type === "text/plain" ? (
                <BsFiletypeTxt className="text-[#000]" size={25} />
              ) : file.type ===
                "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ? (
                <BsFiletypeDocx className="text-[#1f5fbf]" size={25} />
              ) : (
                <BsFiletypeDoc className="text-[#1f5fbf]" size={25} />
              )}
              <div>
                <div className="text-sm font-semibold">{file.name}</div>
                <div className="text-sm text-gray-400">
                  {formatFileSize(file.size)}
                </div>
              </div>
            </div>
            <button
              onClick={() => removeFile(file.name)}
              className="hover:opacity-70"
            >
              <FaTrash className="text-red-500" size={20} />
            </button>
          </div>
        ))}
      </div>
      {/* <div>
          <div className="mb-4">Các file hiện có</div>
          <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
            <div className="flex items-center justify-between gap-5">
              <BsFiletypePdf className="text-[#F15B48]" size={25} />
              <div>
                <div className="text-sm font-semibold">document.pdf</div>
                <div className="text-sm text-gray-400">5.3MB</div>
              </div>
            </div>
            <FaTrash className="text-red-500" size={20} />
          </div>
          <div className="border-2 rounded-xl flex items-center justify-between px-4 py-2 mb-3">
            <div className="flex items-center justify-between gap-5">
              <BsFiletypePdf className="text-[#F15B48]" size={25} />
              <div>
                <div className="text-sm font-semibold">document.pdf</div>
                <div className="text-sm text-gray-400">5.3MB</div>
              </div>
            </div>
            <FaTrash className="text-red-500" size={20} />
          </div>
        </div> */}
      <div className="flex justify-end gap-5 mt-5">
        <Button color="default" onClick={() => setFiles([])}>
          Hủy
        </Button>
        <Button color="primary" onClick={handleUploadFiles}>Lưu</Button>
      </div>
    </>
  );
};
