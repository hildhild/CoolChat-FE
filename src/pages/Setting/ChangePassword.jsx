import { LoadingProcess } from "../../components";
import { Button, Input } from "@nextui-org/react";
import { Controller, useForm } from "react-hook-form";
import { PASSWORD_PATTERN } from "../../constants/patterns";
import { changePasswordApi } from "../../services/userApi";
import { setToken } from "../../store/slices/UserSlice";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { FaEyeSlash, FaEye } from "react-icons/fa";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export const ChangePassword = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
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
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

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
        toast.success("Đổi mật khẩu thành công, vui lòng đăng nhập lại.");
      }
    });
    setIsLoading(false);
  };

  return (
    <div>
      <LoadingProcess isLoading={isLoading} />
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
        <Button
          color="primary"
          onClick={passwordHandleSubmit(handleChangePassword)}
        >
          ĐỔI MẬT KHẨU
        </Button>
      </div>
    </div>
  );
};
