import { Avatar, Button, Checkbox, Input, Select, SelectItem, Tab, Tabs } from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useState } from "react";

function Setting() {
  const { t } = useTranslation();
  const [isAccountSetting, setIsAccountSetting] = useState(true);

  return (
    <DashboardLayout page="setting">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7">
        <div className="font-semibold mb-6 text-2xl">CÀI ĐẶT</div>
        <Button className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8" onClick={() => {setIsAccountSetting(!isAccountSetting)}}>
          <div className="flex gap-3 justify-center items-center">
            <FaUserCircle size={30}/>
            <div>Tài khoản</div>
          </div>
          {
            isAccountSetting
            ?
            <CiSquareMinus size={20}/>
            :
            <CiSquarePlus size={20}/>
          }
        </Button>
        {
          isAccountSetting
          &&
          <div className="bg-white px-5 py-8 rounded-xl mb-8">
            <Tabs variant="underlined" aria-label="Tabs variants" className="mb-4">
              <Tab key="profile" title="Cá nhân"/>
              <Tab key="password" title="Mật khẩu"/>
            </Tabs>
            <div className="w-full flex justify-center items-center mb-5">
              <div className="flex flex-col items-center">
                <div className="flex justify-center items-center text-neutral-600 mb-2">
                  <div className="text-sm mr-2">Ảnh đại diện</div>
                  <MdOutlineAddPhotoAlternate />
                </div>
                <Avatar className="w-20 h-20" isBordered radius="sm" src="https://i.pravatar.cc/150?u=a04258a2462d826712d" />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-5 mb-3">
              <div>
                  <Input type="text" variant="bordered" label={t('name')} placeholder={t('enter_your_name')} className="mb-5"/>
                  <Input type="email" variant="bordered" label="Email" placeholder={t('enter_company_email')} className="mb-5"/>
              </div>
              <div>
                  <Input type="text" variant="bordered" label={t('phone')} placeholder={t('enter_your_phone')} className="mb-5"/>
                  <Select 
                    variant="bordered"
                    label={t('role')}
                    className="mb-5" 
                    placeholder={t('select_role')}
                  >
                    <SelectItem key="admin">{t('enterprise_admin')}</SelectItem>
                    <SelectItem key="csr">{t('csr')}</SelectItem>
                  </Select>
              </div>
            </div>
            <div className="flex gap-5">
              <Button color="danger">HỦY BỎ</Button>
              <Button color="success">LƯU</Button>
            </div>
          </div>
        }
        <Button className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8" onClick={() => {setIsAccountSetting(!isAccountSetting)}}>
          <div className="flex gap-3 justify-center items-center">
            <FaBell size={30}/>
            <div>Thông báo và Cảnh báo</div>
          </div>
          {
            !isAccountSetting
            ?
            <CiSquareMinus size={20}/>
            :
            <CiSquarePlus size={20}/>
          }
        </Button>
        {
          !isAccountSetting
          &&
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs variant="underlined" aria-label="Tabs variants" className="mb-4">
              <Tab key="general" title="Chung"/>
              <Tab key="threshold" title="Thiết lập ngưỡng"/>
            </Tabs>
            <div className="w-full mb-5 text-sm">
              Bật nhận thông báo/ cảnh báo qua:
            </div>
            <div className="grid grid-cols-3 mb-8">
              <div>
                <Checkbox defaultSelected radius="sm">Email</Checkbox>
              </div>
              <div>
                <Checkbox defaultSelected radius="sm">Ứng dụng</Checkbox>
              </div>
              <div>
                <Checkbox defaultSelected radius="sm">SMS</Checkbox>
              </div>
            </div>
            <div className="flex gap-5">
              <Button color="danger">HỦY BỎ</Button>
              <Button color="success">LƯU</Button>
            </div>
          </div>
        }
      </div>
    </DashboardLayout>
  );
}

export default Setting;
