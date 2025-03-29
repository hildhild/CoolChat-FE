import { useNavigate } from "react-router-dom";
import { AuthenLayout } from "../../../layouts";
import { FaCircleCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";

export const PaymentSuccess = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(5);

  useEffect(() => {
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
      <div className="h-[calc(100vh-64px)] flex flex-col items-center justify-center">
        <FaCircleCheck className="text-9xl text-success-500 animate-bounce" />
        <div className="font-semibold text-4xl pb-8 pt-5">
          Thanh toán thành công
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
