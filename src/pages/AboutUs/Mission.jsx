import { motion } from "framer-motion";
import Logo from "@/assets/CoolChat Logo/3.png";

export const  Mission = () => {
    return  <section className="py-24 bg-white relative">
    <div className="container mx-auto px-8 max-w-[1200px]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="animate-on-scroll"
        >
          <h2 className="text-3xl font-bold mb-6 text-gray-900 relative inline-block">
            Sứ mệnh của chúng tôi
            <span className="absolute -bottom-2 left-0 w-1/2 h-1 bg-gradient-to-r from-[#4880FF] to-blue-200 rounded"></span>
          </h2>
          <p className="text-lg text-gray-700 mb-6">
            CoolChat ra đời với sứ mệnh giúp các doanh nghiệp tối ưu hóa trải nghiệm chăm sóc khách hàng thông qua
            công nghệ chatbot thông minh, dễ sử dụng và hiệu quả.
          </p>
          <p className="text-lg text-gray-700">
            Chúng tôi tin rằng mọi doanh nghiệp, dù lớn hay nhỏ, đều xứng đáng có công cụ hỗ trợ khách hàng hiện đại
            mà không cần kiến thức kỹ thuật phức tạp.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="relative h-[400px] rounded-2xl overflow-hidden shadow-2xl animate-on-scroll"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-[#4880FF]/80 to-blue-200/80 mix-blend-multiply z-10"></div>
          <img src={Logo} alt="CoolChat Mission" fill className="object-cover absolute top-24" />
          <div className="absolute inset-0 z-20 flex items-start pt-5 justify-center">
            <div className="text-white text-center p-6">
              <h3 className="text-2xl font-bold mb-2">Tầm nhìn</h3>
              <p className="text-white/90">
                Trở thành nền tảng chatbot hàng đầu Việt Nam, phục vụ hơn 10,000 doanh nghiệp
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
}