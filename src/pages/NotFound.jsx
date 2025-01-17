import NotFoundImage from "@/assets/404.jpg";
import { useSelector } from "react-redux";

export const NotFound = () => {
  const accessToken = useSelector((state) => state.user.accessToken);
  const userRole = useSelector((state) => state.user.role);

  return (
    <div className="w-[100vw] h-[100vh] p-24">
      <div className="grid grid-cols-2">
        <div className="flex justify-center items-center">
          <img src={NotFoundImage} className="w-full"></img>
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="text-3xl font-semibold mb-16">
            Trang bạn tìm không tồn tại
          </div>
          <div className="animate-bounce">
            <svg
              className="mx-auto h-24 w-24 text-coolchat"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
              ></path>
            </svg>
          </div>
          <p className="mt-6 text-gray-700 text-lg">
            Quay về{" "}
            <a href={!accessToken ? "/" : userRole === "AGENT" ? "/chat" : "/chatbot-training"} className="text-red-500 hover:font-semibold">
              Trang chủ
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
};
