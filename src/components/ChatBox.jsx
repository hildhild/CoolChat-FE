import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import LogoOnly from "@/assets/CoolChat Logo/3.png";
import { FaChevronLeft, FaRegUser } from "react-icons/fa";
import { MdOutlineSupportAgent, MdOutlineImage } from "react-icons/md";
import { BsThreeDots } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { IoIosSend } from "react-icons/io";
import { LuBot } from "react-icons/lu";
import { useSelector } from "react-redux";

export default function ChatBox({ toggleOpenChatbox, config = null }) {
  const { t, i18n } = useTranslation();
  const [isOpen, setIsOpen] = useState(false);
  const chatbotInterfaceConfig = useSelector((state) => state.chatbotInterface);
  const [isFirst, setIsFirst] = useState(true);

  useEffect(() => {
    if (!isFirst) {
      setIsOpen(true);
    } else {
      setIsFirst(false);
    }
  }, [toggleOpenChatbox]);

  if (!isOpen) {
    return (
      <button
        className="fixed z-50 right-7 bottom-7 w-[55px] h-[55px] rounded-full border-coolchat border-2 bg-white flex justify-center items-center"
        onClick={() => setIsOpen(true)}
      >
        <img src={LogoOnly} className="w-10 h-10"></img>
      </button>
    );
  } else {
    return (
      <div className="flex flex-col fixed z-50 right-7 bottom-7 w-[420px] h-[580px] bg-white border-[1px] border-[#b9b9b9] rounded-2xl">
        <div className="flex justify-between items-center p-3 border-b-[1px] border-[#b9b9b9] h-[64px]">
          <div className="flex gap-3 items-center">
            <button
              className="bg-gray-100 w-8 h-8 flex justify-center items-center rounded-full"
              onClick={() => setIsOpen(false)}
            >
              <FaChevronLeft size={12} />
            </button>
            <div className="w-10 h-10 rounded-full border-coolchat border-2 bg-white flex justify-center items-center">
              <img src={LogoOnly} className="w-8 h-8"></img>
            </div>
            <div>
              <div>
                {config ? config.main_name : chatbotInterfaceConfig.main_name}
              </div>
              <div className="text-xs">
                {config ? config.sub_name : chatbotInterfaceConfig.sub_name}
              </div>
            </div>
          </div>
          <div className="flex rounded-full bg-gray-100 border-[1px] border-[#b9b9b9]">
            <button className="border-r-[1px] border-[#b9b9b9] px-3 py-2">
              <MdOutlineSupportAgent />
            </button>
            <button className="px-3 py-2">
              <BsThreeDots />
            </button>
          </div>
        </div>
        <div
          className={`flex-grow overflow-y-scroll ${
            config ? config.font_family : chatbotInterfaceConfig.font_family
          }`}
        >
          <div className="flex gap-3 items-end justify-start p-3 mb-3">
            <div
              className={`w-7 h-7 flex justify-center items-center rounded-full`}
              style={{
                backgroundColor: config
                  ? config.message_background_color
                  : chatbotInterfaceConfig.message_background_color,
              }}
            >
              <LuBot
                size={18}
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color,
                }}
              />
            </div>
            <div
              className={`w-[270px] p-3`}
              style={{
                backgroundColor: config
                  ? config.message_background_color
                  : chatbotInterfaceConfig.message_background_color,
                borderRadius: `${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px 0px`,
              }}
            >
              <div
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color,
                }}
              >
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.{" "}
              </div>
              <div
                className={`text-end text-xs`}
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color + "70",
                }}
              >
                6:30 pm
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-end justify-start p-3 mb-3">
            <div
              className={`w-7 h-7 flex justify-center items-center rounded-full`}
              style={{
                backgroundColor: config
                  ? config.message_background_color
                  : chatbotInterfaceConfig.message_background_color,
              }}
            >
              <FaRegUser
                size={18}
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color,
                }}
              />
            </div>
            <div
              className={`w-[270px] p-3`}
              style={{
                backgroundColor: config
                  ? config.message_background_color
                  : chatbotInterfaceConfig.message_background_color,
                borderRadius: `${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px 0px`,
              }}
            >
              <div
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color,
                }}
              >
                OK.{" "}
              </div>
              <div
                className={`text-end text-xs`}
                style={{
                  color: config
                    ? config.message_text_color
                    : chatbotInterfaceConfig.message_text_color + "70",
                }}
              >
                9:30 pm
              </div>
            </div>
          </div>
          <div className="flex gap-3 items-end justify-end p-3 mb-3">
            <div
              className={`text-white w-[270px] p-3`}
              style={{
                backgroundColor: config
                  ? config.message_background_color_me
                  : chatbotInterfaceConfig.message_background_color_me,
                borderRadius: `${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px 0px ${
                  config
                    ? config.message_border_radius
                    : chatbotInterfaceConfig.message_border_radius
                }px`,
              }}
            >
              <div
                style={{
                  color: config
                    ? config.message_text_color_me
                    : chatbotInterfaceConfig.message_text_color_me,
                }}
              >
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour.{" "}
              </div>
              <div
                className="text-end text-xs"
                style={{
                  color: config
                    ? config.message_text_color_me
                    : chatbotInterfaceConfig.message_text_color_me + "70",
                }}
              >
                9:32 pm
              </div>
            </div>
          </div>
        </div>
        <div className="flex gap-2 justify-between items-center p-3 border-t-[1px] border-[#b9b9b9] h-[64px]">
          <button className="w-8 h-8 flex justify-center items-center rounded-full">
            <MdOutlineImage size={25} />
          </button>
          <input
            className="flex-grow !bg-white !border-none !outline-none"
            placeholder="Aa"
          ></input>
          <Button
            className="flex justify-center items-center"
            style={{
              backgroundColor: config
                ? config.message_background_color_me
                : chatbotInterfaceConfig.message_background_color_me,
              color: config
                ? config.message_text_color_me
                : chatbotInterfaceConfig.message_text_color_me,
              
            }}
          >
            Gửi
            <IoIosSend size={20} />
          </Button>
        </div>
      </div>
    );
  }
}
