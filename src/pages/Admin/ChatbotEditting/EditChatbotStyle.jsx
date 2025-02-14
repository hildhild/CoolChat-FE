import {
  Button,
  Input,
  Radio,
  RadioGroup,
  Select,
  SelectItem,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { FaHandPeace, } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LoadingProcess } from "../../../components";
import { editChatbotToneApi, editGoodbyeMessageApi, editSwitchMessageApi, editWelcomeMessageApi } from "../../../services/chatbotConfigApi";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

export const EditChatbotStyle = ({ refetch }) => {
  const config = useSelector((state) => state.chatbotConfig.config);
  const [isLoading, setIsLoading] = useState(false);
  const [welcomeMessage, setWelcomeMessage] = useState(config?.welcome_message);
  const [goodbyeMessage, setGoodbyeMessage] = useState(config?.goodbye_message);
  const [switchMessage, setSwitchMessage] = useState(config?.human_switch_message);

  const handleChangeChatbotTone = async (tone) => {
    setIsLoading(true);
    await editChatbotToneApi(tone)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Thay đổi tông giọng thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleChangeWelcomeMessage = async () => {
    setIsLoading(true);
    await editWelcomeMessageApi(welcomeMessage)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Thay đổi thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleChangeGoodbyeMessage = async () => {
    setIsLoading(true);
    await editGoodbyeMessageApi(goodbyeMessage)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Thay đổi thành công");
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  const handleChangeSwitchMessage = async () => {
    setIsLoading(true);
    await editSwitchMessageApi(switchMessage)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          refetch();
          toast.success("Thay đổi thành công");
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
      <div className="mb-3 font-semibold">Tông giọng</div>
      {/* <Tabs
        variant="light"
        aria-label="Tông giọng"
        className="mb-5"
        classNames={{
          cursor: "w-full bg-red-500",
          tabContent: "group-data-[selected=true]:text-white",
        }}
        placement={placement}
      >
        <Tab key="friendly" title="Thân thiện, nhiệt tình" />
        <Tab key="formal" title="Chuyên nghiệp, lịch sự" />
        <Tab key="happy" title="Hài hước, vui vẻ" />
        <Tab key="shortly" title="Ngắn gọn, trực tiếp" />
      </Tabs> */}
      <RadioGroup
        value={config?.chatbot_tone}
        onValueChange={(value) => {
          handleChangeChatbotTone(value);
        }}
        orientation="horizontal"
        className="mb-5"
      >
        <Radio value="FRIENDLY">Thân thiện, nhiệt tình</Radio>
        <Radio value="PROFESSIONAL">Chuyên nghiệp, lịch sự</Radio>
        <Radio value="FUNNY">Hài hước, vui vẻ</Radio>
        <Radio value="DIRECT">Ngắn gọn, trực tiếp</Radio>
      </RadioGroup>
      <div className="mb-3 font-semibold">Các tin nhắn mặc định</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
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
            value={welcomeMessage}
            onChange={(e)=>setWelcomeMessage(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <div>Lời chào đầu</div>
            <FaHandPeace className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm" onClick={()=>setWelcomeMessage(config?.welcome_message)} isDisabled={welcomeMessage === config?.welcome_message}>
              Hủy
            </Button>
            <Button color="primary" size="sm" onClick={handleChangeWelcomeMessage} isDisabled={welcomeMessage === config?.welcome_message || !welcomeMessage}>
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
            value={goodbyeMessage}
            onChange={(e)=>setGoodbyeMessage(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <div>Lời tạm biệt</div>
            <MdWavingHand className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm" onClick={()=>setGoodbyeMessage(config?.goodbye_message)}  isDisabled={goodbyeMessage === config?.goodbye_message}>
              Hủy
            </Button>
            <Button color="primary" size="sm" onClick={handleChangeGoodbyeMessage} isDisabled={goodbyeMessage === config?.goodbye_message || !goodbyeMessage}>
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
            value={switchMessage}
            onChange={(e)=>setSwitchMessage(e.target.value)}
          />
          <div className="flex justify-between mt-4">
            <div>Lời chuyển giao</div>
            <FaHandshakeSimple className="text-yellow-300" size={30} />
          </div>
          <div className="flex justify-end gap-5 mt-3">
            <Button color="default" size="sm" onClick={()=>setSwitchMessage(config?.human_switch_message)}  isDisabled={switchMessage === config?.human_switch_message}>
              Hủy
            </Button>
            <Button color="primary" size="sm" onClick={handleChangeSwitchMessage} isDisabled={switchMessage === config?.human_switch_message || !switchMessage}>
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
