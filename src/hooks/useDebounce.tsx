import { useEffect, useState } from "react";

// Trì hoãn việc cập nhật một giá trị cho đến khi người dùng dừng tương tác trong một khoảng thời gian nhất định
export default function useDebounce<T>(value: T, delay: number): T { 
  // State và setter cho giá trị bị trì hoãn
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(
    () => {
      // Cập nhật giá trị bị trì hoãn sau khoảng thời gian delay
      const handler = setTimeout(() => {
        setDebouncedValue(value);
      }, delay);

      // Hủy bỏ timeout nếu value hoặc delay thay đổi trước khi timeout hoàn tất
      return () => {
        clearTimeout(handler);
      };
    },
    [value, delay] // Theo dõi sự thay đổi của value và delay
  );

  return debouncedValue;
}
