import {
  avatar,
  Avatar,
  Button,
  Checkbox,
  Input,
  Select,
  SelectItem,
  Switch,
  Tab,
  Tabs,
} from "@nextui-org/react";
import { DashboardLayout } from "../../layouts";
import { FaUserCircle, FaBell, FaEyeSlash, FaEye } from "react-icons/fa";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { MdOutlineAddPhotoAlternate } from "react-icons/md";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { changePasswordApi, editUserInfoApi } from "../../services/userApi";
import { setToken, setUserData } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";
import { LoadingProcess } from "../../components";
import { Controller, useForm } from "react-hook-form";
import { PASSWORD_PATTERN } from "../../constants/patterns";

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
  const [changePasswordForm, setChangePasswordForm] = useState({
    current_password: "",
    new_password: "",
    new_password2: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control: infoControl,
    handleSubmit: infoHandleSubmit,
    formState: { errors: infoErrors },
  } = useForm({
    mode: "onSubmit",
    defaultValues: userInfo,
  });

  const {
    control: passwordControl,
    handleSubmit: passwordHandleSubmit,
    formState: { errors: passwordErrors },
    watch: passwordWatch,
  } = useForm({
    mode: "onSubmit",
    defaultValues: {
      current_password: "",
      new_password: "",
      new_password2: "",
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUserInfoData({ ...userInfoData, avatar: URL.createObjectURL(file) });
    }
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/login");
    }
  }, []);

  const handleChangeProfile = async (data) => {
    setIsLoading(true);
    await editUserInfoApi(data.name, data.avatar, data.phoneNumber)
      .then((res) => {
        console.log(123, res);
        if (res.status === 200) {
          dispatch(setUserData(data));
          toast.success("Thay đổi thông tin thành công.");
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
    setIsLoading(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleChangePassword = async (data) => {
    setIsLoading(true);
    await changePasswordApi(
      data.current_password,
      data.new_password,
      data.new_password2
    ).then((res) => {
      console.log(res);
      if (res.status === 200) {
        dispatch(setToken(""));
        localStorage.setItem("token", "");
        navigate("/login");
        toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại.");
      } else {
        if (res?.data.current_password) {
          toast.error("Mật khẩu hiện tại: " + res.data.current_password[0]);
        } else if (res?.data.new_password) {
          toast.error("Mật khẩu mới: " + res.data.new_password[0]);
        } else if (res?.data.new_password2) {
          toast.error("Xác nhận mật khẩu mới: " + res.data.new_password2[0]);
        }
      }
    });
    setIsLoading(false);
  };

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
              aria-label="Tabs variants"
              className="mb-4"
              classNames={{
                cursor: "w-full bg-coolchat",
                tabContent: "group-data-[selected=true]:text-coolchat",
              }}
            >
              <Tab key="profile" title="Cá nhân">
                <div className="w-full flex justify-center items-center mb-5">
                  <div className="flex flex-col items-center">
                    <div className="flex justify-center items-center text-neutral-600 mb-2">
                      <div className="text-sm">Ảnh đại diện</div>
                      {/* <MdOutlineAddPhotoAlternate /> */}
                    </div>
                    <Avatar
                      className="w-20 h-20 bg-white"
                      isBordered
                      radius="sm"
                      src={
                        userInfoData.avatar
                          ? userInfoData.avatar
                          : "https://cdn-icons-png.flaticon.com/512/6676/6676023.png"
                      }
                    />
                    {isEditProfile && (
                      <input
                        id="avatar-input"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="mt-3"
                      />
                    )}
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-5 mb-5">
                  <div>
                    <Controller
                      control={infoControl}
                      name="name"
                      rules={{
                        required: t("required"),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="name"
                          label={t("name")}
                          placeholder={t("enter_your_name")}
                          type="text"
                          variant="bordered"
                          value={value}
                          onChange={onChange}
                          isRequired
                          isDisabled={!isEditProfile}
                        />
                      )}
                    />
                    {infoErrors.name && (
                      <div className="text-red-500 text-xs mt-2">
                        {infoErrors.name.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={infoControl}
                      name="phoneNumber"
                      rules={{
                        required: t("required"),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="phoneNumber"
                          label={t("phone")}
                          placeholder={t("enter_your_phone")}
                          type="text"
                          variant="bordered"
                          value={value}
                          onChange={onChange}
                          isRequired
                          isDisabled={!isEditProfile}
                        />
                      )}
                    />
                    {infoErrors.phoneNumber && (
                      <div className="text-red-500 text-xs mt-2">
                        {infoErrors.phoneNumber.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={infoControl}
                      name="email"
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="email"
                          label="Email"
                          placeholder={t("enter_your_email")}
                          type="email"
                          variant="bordered"
                          value={value}
                          onChange={onChange}
                          isDisabled
                        />
                      )}
                    />
                    {infoErrors.email && (
                      <div className="text-red-500 text-xs mt-2">
                        {infoErrors.email.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={infoControl}
                      name="role"
                      render={({ field: { onChange, value } }) => (
                        <Select
                          variant="bordered"
                          label={t("role")}
                          placeholder={t("select_role")}
                          selectedKeys={[value]}
                          isDisabled
                          onChange={onChange}
                        >
                          <SelectItem key="OWNER">
                            {t("enterprise_owner")}
                          </SelectItem>
                          <SelectItem key="ADMIN">
                            {t("enterprise_admin")}
                          </SelectItem>
                          <SelectItem key="AGENT">{t("csr")}</SelectItem>
                        </Select>
                      )}
                    />
                    {infoErrors.role && (
                      <div className="text-red-500 text-xs mt-2">
                        {infoErrors.role.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  {isEditProfile ? (
                    <>
                      <Button
                        color="danger"
                        onClick={() => {
                          setIsEditProfile(false);
                          setUserInfoData(userInfo);
                        }}
                      >
                        HỦY BỎ
                      </Button>
                      <Button color="success" onClick={infoHandleSubmit(handleChangeProfile)}>
                        LƯU
                      </Button>
                    </>
                  ) : (
                    <Button
                      color="primary"
                      onClick={() => setIsEditProfile(true)}
                    >
                      CHỈNH SỬA
                    </Button>
                  )}
                </div>
              </Tab>
              <Tab key="password" title="Mật khẩu">
                <div className="grid grid-cols-1 gap-2 md:gap-5 mb-5">
                  <div>
                    <Controller
                      control={passwordControl}
                      name="current_password"
                      rules={{
                        required: t("required"),
                        pattern: {
                          value: PASSWORD_PATTERN,
                          message: t("password_inclusion_rule"),
                        },
                        minLength: {
                          value: 8,
                          message: t("password_length_rule"),
                        },
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="current_password"
                          type={showPassword ? "text" : "password"}
                          variant="bordered"
                          label="Mật khẩu hiện tại"
                          placeholder="Nhập mật khẩu hiện tại"
                          value={value}
                          endContent={
                            <button
                              aria-label="toggle password visibility"
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleShowPassword}
                            >
                              {!showPassword ? (
                                <FaEyeSlash className="text-default-400 pointer-events-none" />
                              ) : (
                                <FaEye className="text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          onChange={onChange}
                          isRequired
                        />
                      )}
                    />
                    {passwordErrors.current_password && (
                      <div className="text-red-500 text-xs mt-2">
                        {passwordErrors.current_password.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={passwordControl}
                      name="new_password"
                      rules={{
                        required: t("required"),
                        pattern: {
                          value: PASSWORD_PATTERN,
                          message: t("password_inclusion_rule"),
                        },
                        minLength: {
                          value: 8,
                          message: t("password_length_rule"),
                        },
                        validate: (value) =>
                          value !== passwordWatch("current_password") ||
                          "Mật khẩu mới không được trùng mật khẩu hiện tại",
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="new_password"
                          type={showPassword ? "text" : "password"}
                          variant="bordered"
                          label="Mật khẩu mới"
                          placeholder="Nhập mật khẩu mới"
                          value={value}
                          endContent={
                            <button
                              aria-label="toggle password visibility"
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleShowPassword}
                            >
                              {!showPassword ? (
                                <FaEyeSlash className="text-default-400 pointer-events-none" />
                              ) : (
                                <FaEye className="text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          onChange={onChange}
                          isRequired
                        />
                      )}
                    />
                    {passwordErrors.new_password && (
                      <div className="text-red-500 text-xs mt-2">
                        {passwordErrors.new_password.message}
                      </div>
                    )}
                  </div>
                  <div>
                    <Controller
                      control={passwordControl}
                      name="new_password2"
                      rules={{
                        required: t("required"),
                        pattern: {
                          value: PASSWORD_PATTERN,
                          message: t("password_inclusion_rule"),
                        },
                        minLength: {
                          value: 8,
                          message: t("password_length_rule"),
                        },
                        validate: (value) =>
                          value === passwordWatch("new_password") ||
                          t("unmatched_password"),
                      }}
                      render={({ field: { onChange, value } }) => (
                        <Input
                          name="new_password2"
                          type={showPassword ? "text" : "password"}
                          variant="bordered"
                          label="Xác nhận mật khẩu mới"
                          placeholder="Nhập lại mật khẩu mới"
                          value={value}
                          endContent={
                            <button
                              aria-label="toggle password visibility"
                              className="focus:outline-none"
                              type="button"
                              onClick={toggleShowPassword}
                            >
                              {!showPassword ? (
                                <FaEyeSlash className="text-default-400 pointer-events-none" />
                              ) : (
                                <FaEye className="text-default-400 pointer-events-none" />
                              )}
                            </button>
                          }
                          onChange={onChange}
                          isRequired
                        />
                      )}
                    />
                    {passwordErrors.new_password2 && (
                      <div className="text-red-500 text-xs mt-2">
                        {passwordErrors.new_password2.message}
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex gap-5 justify-end">
                  <Button color="primary" onClick={passwordHandleSubmit(handleChangePassword)}>
                    ĐỔI MẬT KHẨU
                  </Button>
                </div>
              </Tab>
            </Tabs>
          </div>
        )}
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
                <div className="grid grid-cols-3 mb-8">
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
                <div className="grid grid-cols-2 gap-5 mb-3">
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
      </div>
    </DashboardLayout>
  );
}

export default Setting;
