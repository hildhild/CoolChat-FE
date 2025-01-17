import {
  Button,
  Checkbox,
  Input,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { LoadingProcess } from "../../components";

import { UserInfo } from "./UserInfo";
import { ChangePassword } from "./ChangePassword";

function Setting() {
  const { t } = useTranslation();
  const [isAccountSetting, setIsAccountSetting] = useState(true);
  const [isNotificationSetting, setIsNotificationSetting] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  
  
  const [isLoading, setIsLoading] = useState(false);
  const userRole = useSelector((state) => state.user.role);

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  return (
    <DashboardLayout page="setting">
      <LoadingProcess isLoading={isLoading} />
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
        <div className="font-semibold mb-6 text-2xl">CÀI ĐẶT</div>
        <Button
          className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
          onClick={() => {
            setIsAccountSetting(!isAccountSetting);
          }}
        >
          <div className="flex gap-3 justify-center items-center">
            <FaUserCircle size={30} />
            <div>Tài khoản</div>
          </div>
          {isAccountSetting ? (
            <CiSquareMinus size={20} />
          ) : (
            <CiSquarePlus size={20} />
          )}
        </Button>
        {isAccountSetting && (
          <div className="bg-white px-5 py-8 rounded-xl mb-8">
            <Tabs
              variant="underlined"
              aria-label="Account Settings"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat",
              }}
            >
              <Tab key="profile" title="Cá nhân">
                <UserInfo/>
              </Tab>
              <Tab key="password" title="Mật khẩu">
                <ChangePassword/>
              </Tab>
            </Tabs>
          </div>
        )}
        {userRole !== "AGENT" && (
          <>
            <Button
              className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8"
              onClick={() => {
                setIsNotificationSetting(!isNotificationSetting);
              }}
            >
              <div className="flex gap-3 justify-center items-center">
                <FaBell size={30} />
                <div>Thông báo và Cảnh báo</div>
              </div>
              {isNotificationSetting ? (
                <CiSquareMinus size={20} />
              ) : (
                <CiSquarePlus size={20} />
              )}
            </Button>
            {isNotificationSetting && (
              <div className="bg-white px-5 py-8 rounded-xl">
                <Tabs
                  variant="underlined"
                  aria-label="Tabs variants"
                  className="mb-4"
                  classNames={{
                    cursor: "w-full bg-coolchat",
                    tabContent: "group-data-[selected=true]:text-coolchat",
                  }}
                >
                  <Tab key="general" title="Chung">
                    <div className="w-full mb-5 text-sm">
                      Bật nhận thông báo/ cảnh báo qua:
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 mb-8 gap-3">
                      <div>
                        <Checkbox defaultSelected radius="sm">
                          Email
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox defaultSelected radius="sm">
                          Ứng dụng
                        </Checkbox>
                      </div>
                      <div>
                        <Checkbox defaultSelected radius="sm">
                          SMS
                        </Checkbox>
                      </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                      <Button color="danger">HỦY BỎ</Button>
                      <Button color="success">LƯU</Button>
                    </div>
                  </Tab>
                  <Tab key="threshold" title="Thiết lập ngưỡng">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-3">
                      <div className="flex justify-center items-center gap-3 mb-5">
                        <Input
                          type="text"
                          variant="bordered"
                          label="Ngưỡng cảnh báo sử dụng token"
                          placeholder="Nhập ngưỡng cảnh báo sử dụng token"
                        />
                        <Switch
                          defaultSelected
                          aria-label="Automatic updates"
                          size="sm"
                        />
                      </div>
                      <div className="flex justify-center items-center gap-3 mb-5">
                        <Input
                          type="text"
                          variant="bordered"
                          label="Ngưỡng bộ nhớ đã dùng"
                          placeholder="Nhập ngưỡng bộ nhớ đã dùng"
                        />
                        <Switch
                          defaultSelected
                          aria-label="Automatic updates"
                          size="sm"
                        />
                      </div>
                      <div className="flex justify-center items-center gap-3 mb-5">
                        <Input
                          type="text"
                          variant="bordered"
                          label="Ngưỡng cảnh báo  lưu lượng truy cập"
                          placeholder="Nhập ngưỡng cảnh báo  lưu lượng truy cập"
                        />
                        <Switch
                          defaultSelected
                          aria-label="Automatic updates"
                          size="sm"
                        />
                      </div>
                    </div>
                    <div className="flex gap-5 justify-end">
                      <Button color="danger">HỦY BỎ</Button>
                      <Button color="success">LƯU</Button>
                    </div>
                  </Tab>
                </Tabs>
              </div>
            )}
          </>
        )}
      </div>
    </DashboardLayout>
  );
}

export default Setting;
