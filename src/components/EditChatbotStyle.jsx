import { Button, Input, Select, SelectItem, Tab, Tabs, Textarea } from "@nextui-org/react";
import { BiBorderRadius } from "react-icons/bi";
import { ChromePicker } from "react-color";
import { FaHandPeace, FaFacebookSquare } from "react-icons/fa";
import { MdOutlineAddPhotoAlternate, MdWavingHand } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";

export const EditChatbotStyle = () => {
  return (
    <div>
      <div className="mb-3">Tông giọng</div>
      <Tabs
        variant="light"
        aria-label="Tông giọng"
        className="mb-5"
        classNames={{
          cursor: "w-full bg-red-500",
          tabContent: "group-data-[selected=true]:text-white",
        }}
      >
        <Tab key="friendly" title="Thân thiện, nhiệt tình" />
        <Tab key="formal" title="Chuyên nghiệp, lịch sự" />
        <Tab key="happy" title="Hài hước, vui vẻ" />
        <Tab key="shortly" title="Ngắn gọn, trực tiếp" />
      </Tabs>
      <div className="mb-3">Các tin nhắn mặc định</div>
      <div className="grid grid-cols-2 gap-5">
        <div className="bg-[#EDF2F6] rounded-2xl p-4">
          <Textarea
            variant="bordered"
            placeholder="Nhập nội dung tin nhắn Lời chào đầu"
            disableAnimation
            disableAutosize
            className="w-full bg-white rounded-xl"
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
          />
          <div className="flex justify-between mt-4">
            <div>Lời chào đầu</div>
            <FaHandPeace className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm">
              Hủy
            </Button>
            <Button color="primary" size="sm">
              Lưu
            </Button>
          </div>
        </div>
        <div className="bg-[#EDF2F6] rounded-2xl p-4">
          <Textarea
            variant="bordered"
            placeholder="Nhập nội dung tin nhắn Lời tạm biệt"
            disableAnimation
            disableAutosize
            className="w-full bg-white rounded-xl"
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
          />
          <div className="flex justify-between mt-4">
            <div>Lời tạm biệt</div>
            <MdWavingHand className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm">
              Hủy
            </Button>
            <Button color="primary" size="sm">
              Lưu
            </Button>
          </div>
        </div>
        <div className="bg-[#EDF2F6] rounded-2xl p-4">
          <Textarea
            variant="bordered"
            placeholder="Nhập nội dung tin nhắn Lời chuyển giao"
            disableAnimation
            disableAutosize
            className="w-full bg-white rounded-xl"
            classNames={{
              input: "resize-y min-h-[40px]",
            }}
          />
          <div className="flex justify-between mt-4">
            <div>Lời chuyển giao</div>
            <FaHandshakeSimple className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm">
              Hủy
            </Button>
            <Button color="primary" size="sm">
              Lưu
            </Button>
          </div>
        </div>
      </div>
      <div className="mt-5">
        <Button color="success">XEM CHATBOT</Button>
      </div>
    </div>
  );
};
