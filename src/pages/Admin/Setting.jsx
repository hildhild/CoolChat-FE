import { avatar, Avatar, Button, Checkbox, Input, Select, SelectItem, Switch, Tab, Tabs } from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { FaUserCircle, FaBell } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { editUserInfoApi } from "../../services/userApi";
import { setUserData } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";

function Setting() {
  const { t } = useTranslation();
  const [isAccountSetting, setIsAccountSetting] = useState(true);
  const [isNotificationSetting, setIsNotificationSetting] = useState(false);
  const accessToken = useSelector((state) => state.user.accessToken);
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.user);
  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userInfoData, setUserInfoData] = useState(userInfo);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfoData({ ...userInfoData, avatar: URL.createObjectURL(file) });
    }
  };

  useEffect(()=> {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  const handleChangeValue = (e) => {
    const fieldName = e.target.name;
    switch (fieldName) {
      case "name":
        setUserInfoData({ ...userInfoData, name: e.target.value });
        break;
      case "email":
        setUserInfoData({ ...userInfoData, email: e.target.value });
        break;
      case "phoneNumber":
        setUserInfoData({ ...userInfoData, phoneNumber: e.target.value });
        break;
      case "avatar":
        setUserInfoData({ ...userInfoData, avatar: e.target.value });
        break;
      default:
        return;
    }
  };

  const handleChangeProfile = () => {
    editUserInfoApi(userInfoData.name, userInfoData.avatar)
        .then((res) => {
          console.log(123, res);
          if (res.status === 200) {
            dispatch(setUserData(userInfoData));
            toast.success("Thay đổi thông tin thành công.")
            setIsEditProfile(false);
          } else {
            console.log(res);
            if (res.data?.name) {
              toast.error("Tên: " + res.data.name[0]);
            } else if (res.data?.avatar) {
              toast.error("Ảnh đại diện: " + res.data.avatar[0]);
            } 
          }
        })
        .catch((err) => {
          console.log(2, err);
        });
  };


  return (
    <DashboardLayout page="setting">
      <div className="w-full bg-[#f6f5fa] px-5 mt-16 py-7 min-h-[100vh]">
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
            <Tabs variant="underlined" aria-label="Tabs variants" className="mb-4" classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat"
              }}>
              <Tab key="profile" title="Cá nhân">
                <div className="w-full flex justify-center items-center mb-5">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center text-neutral-600 mb-2">
                      <div className="text-sm">Ảnh đại diện</div>
                      {/* <MdOutlineAddPhotoAlternate /> */}
                    </div>
                    <Avatar className="w-20 h-20 bg-white" isBordered radius="sm" src={userInfoData.avatar ? userInfoData.avatar : "https://cdn-icons-png.flaticon.com/512/6676/6676023.png"} />
                    {
                      isEditProfile
                      &&
                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-3"
                      />
                    }
                    
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <div>
                      <Input name="name" onChange={handleChangeValue} isDisabled={!isEditProfile} type="text" variant="bordered" label={t('name')} placeholder={t('enter_your_name')} className="mb-5" value={userInfoData.name}/>
                      <Input name="email" isDisabled type="email" variant="bordered" label="Email" placeholder={t('enter_your_email')} className="mb-5" value={userInfoData.email}/>
                  </div>
                  <div>
                      <Input name="phoneNumber" isDisabled type="text" variant="bordered" label={t('phone')} placeholder={t('enter_your_phone')} className="mb-5" value={userInfoData.phoneNumber}/>
                      <Select 
                        variant="bordered"
                        label={t('role')}
                        className="mb-5" 
                        placeholder={t('select_role')}
                        selectedKeys={[userInfoData.role]}
                        isDisabled
                      >
                        <SelectItem key="OWNER">{t('enterprise_owner')}</SelectItem>
                        <SelectItem key="ADMIN">{t('enterprise_admin')}</SelectItem>
                        <SelectItem key="AGENT">{t('csr')}</SelectItem>
                      </Select>
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  {
                    isEditProfile 
                    ?
                    <>
                      <Button color="danger" onClick={()=>{ setIsEditProfile(false); setUserInfoData(userInfo);}}>HỦY BỎ</Button>
                      <Button color="success" onClick={handleChangeProfile}>LƯU</Button>
                    </>
                    :
                    <Button color="primary" onClick={()=>setIsEditProfile(true)}>CHỈNH SỬA</Button>

                  }
                  
                </div>
              </Tab>
              <Tab key="password" title="Mật khẩu">
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <Input type="password" variant="bordered" label="Mật khẩu hiện tại" placeholder="Nhập mật khẩu hiện tại"className="mb-5"/>
                </div>
                <div className="grid grid-cols-2 gap-5 mb-3">
                    <Input type="password" variant="bordered" label="Mật khẩu mới" placeholder="Nhập mật khẩu mới" className="mb-5"/>
                    <Input type="password" variant="bordered" label="Xác nhận mật khẩu" placeholder="Nhập lại mật khẩu mới" className="mb-5"/>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button color="danger">HỦY BỎ</Button>
                  <Button color="success">LƯU</Button>
                </div>
              </Tab>
            </Tabs>
            
          </div>
        }
        <Button className="flex w-72 justify-between items-center !bg-white shadow-lg font-semibold !rounded-md h-12 mb-8" onClick={() => {setIsNotificationSetting(!isNotificationSetting)}}>
          <div className="flex gap-3 justify-center items-center">
            <FaBell size={30}/>
            <div>Thông báo và Cảnh báo</div>
          </div>
          {
            isNotificationSetting
            ?
            <CiSquareMinus size={20}/>
            :
            <CiSquarePlus size={20}/>
          }
        </Button>
        {
          isNotificationSetting
          &&
          <div className="bg-white px-5 py-8 rounded-xl">
            <Tabs variant="underlined" aria-label="Tabs variants" className="mb-4" classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat"
              }}>
              <Tab key="general" title="Chung">
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
                <div className="flex gap-5 justify-end">
                  <Button color="danger">HỦY BỎ</Button>
                  <Button color="success">LƯU</Button>
                </div>
              </Tab>
              <Tab key="threshold" title="Thiết lập ngưỡng">
                <div className="grid grid-cols-2 gap-5 mb-3">
                  <div className="flex justify-center items-center gap-3 mb-5">
                    <Input type="text" variant="bordered" label="Ngưỡng cảnh báo sử dụng token" placeholder="Nhập ngưỡng cảnh báo sử dụng token"/>
                    <Switch defaultSelected aria-label="Automatic updates" size="sm"/>
                  </div>
                  <div className="flex justify-center items-center gap-3 mb-5">
                    <Input type="text" variant="bordered" label="Ngưỡng bộ nhớ đã dùng" placeholder="Nhập ngưỡng bộ nhớ đã dùng"/>
                    <Switch defaultSelected aria-label="Automatic updates" size="sm"/>
                  </div>
                  <div className="flex justify-center items-center gap-3 mb-5">
                    <Input type="text" variant="bordered" label="Ngưỡng cảnh báo  lưu lượng truy cập" placeholder="Nhập ngưỡng cảnh báo  lưu lượng truy cập"/>
                    <Switch defaultSelected aria-label="Automatic updates" size="sm"/>
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button color="danger">HỦY BỎ</Button>
                  <Button color="success">LƯU</Button>
                </div>
              </Tab>
            </Tabs>
            
          </div>
        }
      </div>
    </DashboardLayout>
  );
}

export default Setting;
