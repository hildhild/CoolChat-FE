import { useNavigate } from "react-router-dom";
import { AuthenLayout } from "../../../layouts";
import { FaCircleXmark } from "react-icons/fa6";
import { useEffect, useState } from "react";

export const PaymentCancel = () => {
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
