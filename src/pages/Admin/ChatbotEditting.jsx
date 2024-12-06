import {
  Button,
  Input,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { FaCode } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { MdOutlineAddPhotoAlternate, MdWavingHand } from "react-icons/md";
import { BiBorderRadius } from "react-icons/bi";
import { ChromePicker } from "react-color";
import { FaHandPeace, FaFacebookSquare } from "react-icons/fa";
import { FaHandshakeSimple } from "react-icons/fa6";
import { GrIntegration } from "react-icons/gr";
import { GiNightSleep } from "react-icons/gi";
import { CopyBlock, dracula } from "react-code-blocks";

function ChatbotEditting() {
  const { t } = useTranslation();
  const [isChatbotConfig, setIsChatbotConfig] = useState(true);
  const [isIntegrate, setIsIntegrate] = useState(false);

  const embedCode = `
<script src="https://coolchat.vn/js/chatbox.js"></script>
<script>
  const coolchat_box = new CoolChat('WYVms6uOzriKKKNPKJ-oW');
  coolchat_box.initial();
</script>
`;

  return (
    <DashboardLayout page="chatbot-editting">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">TÙY CHỈNH CHATBOT</div>
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsChatbotConfig(!isChatbotConfig);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <RiComputerLine size={30} />
            <div>Cấu hình chatbot</div>
          </div>
          {isChatbotConfig ? (
            <CiSquareMinus size={20} />
          ) : (
            <CiSquarePlus size={20} />
          )}
        </Button>
        {isChatbotConfig && (
          <div className="bg-white px-5 py-8 rounded-xl mb-8">
            <Tabs
              variant="underlined"
              aria-label="Tabs variants"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat",
              }}
            >
              <Tab key="interface" title="Giao diện">
                <div className="flex gap-8 mb-5">
                  <div>
                    <div className="mb-2 text-center">Ảnh đại diện</div>
                    <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
                      <MdOutlineAddPhotoAlternate size={40} />
                      <div className="text-[12px] text-center">
                        Tải hình ảnh lên
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="mb-2 text-center">Ảnh nền</div>
                    <div className="bg-[#EDF2F6] border-[2px] border-[#8D98AA] text-[#8D98AA] border-dashed flex flex-col gap-2 rounded-2xl items-center justify-center size-[120px] p-3">
                      <MdOutlineAddPhotoAlternate size={40} />
                      <div className="text-[12px] text-center">
                        Tải hình ảnh lên
                      </div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <div>
                    <Input
                      type="text"
                      variant="bordered"
                      label="Tên hiển thị"
                      placeholder="Điền tên hiển thị"
                      className="mb-5"
                    />
                    <Input
                      type="text"
                      variant="bordered"
                      label="Tiêu đề phụ"
                      placeholder="Điền tiêu đề phụ"
                    />
                  </div>
                  <div>
                    <Select
                      variant="bordered"
                      label="Phông chữ"
                      className="mb-5"
                      placeholder="Chọn phông chữ"
                    >
                      <SelectItem key="times_new_roman">
                        Times New Roman
                      </SelectItem>
                      <SelectItem key="arial">Arial</SelectItem>
                    </Select>
                    <Input
                      type="number"
                      variant="bordered"
                      label="Độ bo góc tin nhắn"
                      placeholder="Điền độ bo góc tin nhắn"
                      startContent={<BiBorderRadius size={20} />}
                    />
                  </div>
                </div>
                <div className="flex gap-8 mb-8">
                  <div>
                    <div className="mb-2 text-center">Màu nền</div>
                    <ChromePicker />
                  </div>
                  <div>
                    <div className="mb-2 text-center">Màu chữ</div>
                    <ChromePicker />
                  </div>
                </div>
                <div className="flex gap-5">
                  <Button color="danger">HỦY BỎ</Button>
                  <Button color="primary">XEM TRƯỚC</Button>
                  <Button color="success">LƯU</Button>
                </div>
              </Tab>
              <Tab key="style" title="Phong cách">
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
                      <FaHandshakeSimple
                        className="text-yellow-300"
                        size={30}
                      />
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
              </Tab>
            </Tabs>
          </div>
        )}
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsIntegrate(!isIntegrate);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <GrIntegration size={30} />
            <div>Tích hợp</div>
          </div>
          {isIntegrate ? (
            <CiSquareMinus size={20} />
          ) : (
            <CiSquarePlus size={20} />
          )}
        </Button>
        {isIntegrate && (
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs
              size="lg"
              aria-label="integrate"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-white",
              }}
            >
              <Tab
                key="facebook"
                title={
                  <div className="flex gap-3 items-center px-5">
                    <FaFacebookSquare size={25} />
                    Facebook
                  </div>
                }
              >
                <div className="flex flex-col gap-4 justify-center items-center">
                  <GiNightSleep size={80} />
                  <div>Chưa có trang nào ở đây</div>
                  <Button className="flex" color="primary" size="lg">
                    <FaFacebookSquare size={30} />
                    Kết nối tới Facebook
                  </Button>
                </div>
              </Tab>
              <Tab
                key="embedCode"
                title={
                  <div className="flex gap-3 items-center px-5">
                    <FaCode size={25} />
                    Mã nhúng
                  </div>
                }
              >
                <CopyBlock
                  text={embedCode}
                  language="html"
                  wrapLines
                  showLineNumbers={true}
                  theme={dracula}
                />
              </Tab>
            </Tabs>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}

export default ChatbotEditting;
