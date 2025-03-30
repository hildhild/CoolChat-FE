import { useLocation, useNavigate } from "react-router-dom";
import { AuthenLayout } from "../../../layouts";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";
import { cancelPaymentApi } from "../../../services/subscriptionApi";
import { toast } from "react-toastify";
import { LoadingProcess } from "../../../components";

export const PaymentCancel = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const orderId = queryParams.get("orderCode");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelPayment = async () => {
    if (orderId) {
      setIsLoading(true);
      await cancelPaymentApi(orderId);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    handleCancelPayment();
    const interval = setInterval(() => {
      setCount((prev) => prev - 1);
    }, 1000);

    setTimeout(() => {
      navigate("/subscription");
    }, 5000);

    return () => {
      clearInterval(interval);
    };
  }, [navigate]);

  return (
    <AuthenLayout>
      <LoadingProcess isLoading={isLoading}/>
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <FaCircleXmark className="text-9xl text-danger-500 animate-bounce" />
        <div className="font-semibold text-4xl pb-8 pt-5">
          Quá trình thanh toán đã được hủy
        </div>
        <div className="flex gap-3 items-center">
          Quay lại trang Thanh toán sau
          <div className="px-5 py-2 border-1 border-neutral-200 rounded-lg">
            {count}s
          </div>
        </div>
      </div>
    </AuthenLayout>
  );
};
