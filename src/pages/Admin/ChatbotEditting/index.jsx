import { Button, Tab, Tabs, Tooltip } from "@nextui-org/react";
import { DashboardLayout } from "../../../layouts";
import { FaCode } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { RiComputerLine } from "react-icons/ri";
import { FaFacebookSquare } from "react-icons/fa";
import { GrIntegration } from "react-icons/gr";
import { GiNightSleep } from "react-icons/gi";
import { useDispatch, useSelector } from "react-redux";
import { EditChatbotInterface } from "./EditChatbotInterface";
import { EditChatbotStyle } from "./EditChatbotStyle";
import { getChatbotConfigApi } from "../../../services/chatbotConfigApi";
import { LoadingProcess, ToggleSection } from "../../../components";
import { EmbedCode } from "./EmbedCode";
import { setChatbotConfig } from "../../../store/slices/ChatbotConfigSlice";
import PreviewChatBox from "./PreviewChatbox";

function ChatbotEditting() {
  const [allowedDomains, setAllowedDomains] = useState([]);
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const chatbotConfig = useSelector((state) => state.chatbotConfig.config);
  const [previewConfig, setPreviewConfig] = useState(chatbotConfig);
  const [isPreview, setIsPreview] = useState(false);

  const handleGetChatbotConfig = async () => {
    setIsLoading(true);
    await getChatbotConfigApi()
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          setAllowedDomains(
            res.data.allowed_domains.split(",").filter((item) => item !== "")
          );
          dispatch(setChatbotConfig(res.data));
        }
      })
      .catch((err) => {
        console.log(2, err);
      });
    setIsLoading(false);
  };

  return (
    <DashboardLayout page="chatbot-editting">
      <PreviewChatBox
        config={previewConfig}
        isPreview={isPreview}
        setIsPreview={setIsPreview}
      />
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">TÙY CHỈNH CHATBOT</div>
        <ToggleSection title="Cấu hình chatbot" Icon={RiComputerLine}>
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
                <EditChatbotInterface
                  setPreviewConfig={setPreviewConfig}
                  setIsPreview={setIsPreview}
                />
              </Tab>
              <Tab key="style" title="Phong cách">
                <EditChatbotStyle refetch={handleGetChatbotConfig} />
              </Tab>
            </Tabs>
          </div>
        </ToggleSection>
        <ToggleSection title="Tích hợp" Icon={GrIntegration} initIsOpen={false}>
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
                key="embedCode"
                title={
                  <Tooltip content="Mã nhúng">
                    <div className="flex gap-3 items-center px-5">
                      <FaCode size={25} />
                      <span className="hidden md:block">Mã nhúng</span>
                    </div>
                  </Tooltip>
                }
              >
                <EmbedCode
                  allowedDomains={chatbotConfig.allowed_domains
                    .split(",")
                    .filter((item) => item !== "")}
                  refetch={handleGetChatbotConfig}
                />
              </Tab>
              <Tab
                key="facebook"
                title={
                  <Tooltip content="Facebook">
                    <div className="flex gap-3 items-center px-5">
                      <FaFacebookSquare size={25} />
                      <span className="hidden md:block">Facebook</span>
                    </div>
                  </Tooltip>
                }
              >
                <div className="font-semibold text-lg mb-3 block lg:hidden">
                  Facebook
                </div>
                <div className="text-red-500 italic">* Tính năng sẽ được hoàn thiện trong tương lai</div>
                <div className="flex flex-col gap-4 justify-center items-center">
                  <GiNightSleep size={80} />
                  <div>Chưa có trang nào ở đây</div>
                  <Button className="flex" color="primary" size="lg">
                    <FaFacebookSquare size={30} />
                    Kết nối tới Facebook
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </div>
        </ToggleSection>
      </div>
    </DashboardLayout>
  );
}

export default ChatbotEditting;
