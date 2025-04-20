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
import { FaHandPeace } from "react-icons/fa";
import { MdWavingHand } from "react-icons/md";
import { FaHandshakeSimple } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { LoadingProcess } from "../../../components";
import {
  changeLimitationApi,
  editChatbotToneApi,
  editGoodbyeMessageApi,
  editSwitchMessageApi,
  editWelcomeMessageApi,
} from "../../../services/chatbotConfigApi";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

export const EditChatbotLimitation = ({ refetch }) => {
  const config = useSelector((state) => state.chatbotConfig.config);
  const [isLoading, setIsLoading] = useState(false);
  const userInfo = useSelector((state) => state.user);
  const [isEdit, setIsEdit] = useState(false);
  const { t } = useTranslation();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    mode: "onSubmit",
    defaultValues: { rate_limit_threshold: config?.rate_limit_threshold },
  });

  const handleChangeLimitation = async (data) => {
    setIsLoading(true);
    await changeLimitationApi(data.rate_limit_threshold)
      .then((res) => {
        console.log(12, res);
        if (res.status === 200) {
          setIsEdit(false);
          refetch();
          toast.success("Thay đổi giới hạn truy vấn thành công");
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
      <div className="grid grid-cols-1 gap-2 md:gap-5 mb-5">
        <div>
          <Controller
            control={control}
            name="rate_limit_threshold"
            rules={{
              required: t("required"),
            }}
            render={({ field: { onChange, value } }) => (
              <Input
                name="rate_limit_threshold"
                label="Số lượng truy vấn tối đa trong 1 giờ"
                placeholder="Nhập số lượng"
                type="number"
                variant="bordered"
                value={value}
                onChange={onChange}
                isRequired
                isDisabled={!isEdit}
              />
            )}
          />
          {errors.rate_limit_threshold && (
            <div className="text-red-500 text-xs mt-2">
              {errors.rate_limit_threshold.message}
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-5 justify-end">
        {isEdit ? (
          <>
            <Button
              color="danger"
              onClick={() => {
                setIsEdit(false);
                reset();
              }}
            >
              HỦY BỎ
            </Button>
            <Button
              color="success"
              onClick={handleSubmit(handleChangeLimitation)}
            >
              LƯU
            </Button>
          </>
        ) : (
          <Button color="primary" onClick={() => setIsEdit(true)}>
            CHỈNH SỬA
          </Button>
        )}
      </div>
    </div>
  );
};
