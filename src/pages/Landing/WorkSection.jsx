import { motion } from "framer-motion";

export const WorkSection = () => {
  return (
    <section className="py-24 relative" id="work-section">
      <div className="absolute inset-0 bg-gradient-to-b from-white via-gray-50 to-white"></div>
      <div className="container relative mx-auto px-8 md:px-8 z-10 max-w-[1140px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 animate-on-scroll"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-4 relative inline-block">
            Cách CoolChat hoạt động
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#4880FF] to-blue-200 rounded"></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Quy trình đơn giản để bắt đầu với chatbot chăm sóc khách hàng của
            bạn
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              step: 1,
              title: "Đăng ký & Thiết lập",
              description:
                "Tạo và quản lý tổ chức của bạn, dùng thử hoặc đăng ký với đa dạng các gói để sử dụng",
              gradient: "from-[#4880FF] to-blue-300",
            },
            {
              step: 2,
              title: "Tùy chỉnh & Huấn luyện",
              description:
                "Tùy chỉnh giao diện chatbot và huấn luyện kho tri thức tùy chỉnh để hiểu nhu cầu cụ thể của khách hàng bạn.",
              gradient: "from-[#4880FF] to-blue-300",
            },
            {
              step: 3,
              title: "Tích hợp & Triển khai",
              description:
                "Tích hợp chatbot vào website của bạn và bắt đầu phục vụ khách hàng một cách tốt nhất.",
              gradient: "from-[#4880FF] to-blue-300",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative animate-on-scroll"
            >
              <div className="bg-white p-8 rounded-xl shadow-lg relative z-10 h-full border border-gray-100 hover:border-[#4880FF]/30 transition-colors duration-300">
                <div
                  className={`w-14 h-14 bg-gradient-to-r ${item.gradient} rounded-full flex items-center justify-center text-white font-bold mb-6 shadow-lg`}
                >
                  {item.step}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">
                  {item.title}
                </h3>
                <p className="text-gray-700">{item.description}</p>
              </div>
              {index < 2 && (
                <div className="hidden md:block absolute top-1/2 right-0 w-1/2 h-0.5 bg-gradient-to-r from-[#4880FF] to-blue-300 z-0 transform translate-x-1/2"></div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
