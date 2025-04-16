import { Button, Link } from "@nextui-org/react";
import { BsArrowDown, BsArrowRight } from "react-icons/bs";
import { LuMessageCircle } from "react-icons/lu";
import { motion } from "framer-motion";
import Logo from "@/assets/CoolChat Logo/3.png";

export const Company = () => {
  return (
    <section className="relative py-24 overflow-hidden px-4">
      <div className="absolute inset-0 bg-gradient-to-br from-[#4880FF] via-[#5D8DFF] to-[#3060D8] z-0"></div>
      <div className="absolute inset-0 opacity-20 z-0">
        <svg
          className="w-full h-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          <defs>
            <radialGradient
              id="radialGradient"
              cx="50%"
              cy="50%"
              r="50%"
              fx="50%"
              fy="50%"
            >
              <stop offset="0%" stopColor="white" stopOpacity="0.3" />
              <stop offset="100%" stopColor="white" stopOpacity="0" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="50" fill="url(#radialGradient)" />
        </svg>
      </div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col items-center text-center max-w-3xl mx-auto"
        >
          <div className="relative mb-6">
            <div className="absolute -inset-1 bg-white/30 rounded-full blur-md"></div>
            <div className="relative bg-white/90 text-[#4880FF] p-4 rounded-full">
              <img src={Logo} className="w-16 h-16" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-white drop-shadow-md">
            Về <span className="relative inline-block">CoolChat</span>
          </h1>
          <p className="text-xl mb-10 text-white/90 drop-shadow">
            Chúng tôi đang xây dựng tương lai của dịch vụ chăm sóc khách hàng
            thông qua công nghệ chatbot thông minh
          </p>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              asChild
              className="bg-white text-[#4880FF] hover:bg-white/90 hover:text-[#3060D8] px-8 py-6 text-lg font-medium rounded-full shadow-lg transition-all duration-300"
              onClick={() => {
                console.log(1)
                window.scrollTo({
                  top: document.getElementById("footer").offsetTop,
                  behavior: "smooth",
                });
              }}
            >
              <div className="flex items-center">
                Liên hệ với chúng tôi <BsArrowDown className="ml-2 h-5 w-5" />
              </div>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
