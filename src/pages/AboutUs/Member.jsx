import { motion } from "framer-motion";
import Thang from "@/assets/thang.jpg";
import An from "@/assets/an.jpg";
import Huy from "@/assets/huy.jpg";

export const Member = () => {
  return (
    <section className="py-24 bg-white relative">
      <div className="container relative mx-auto px-8 z-10 max-w-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16 animate-on-scroll"
        >
          <h2 className="text-3xl font-bold mb-4 text-gray-900 relative inline-block">
            Đội ngũ của chúng tôi
            <span className="absolute -bottom-2 left-0 w-full h-1 bg-gradient-to-r from-[#4880FF] to-blue-200 rounded"></span>
          </h2>
          <p className="text-lg text-gray-700 max-w-2xl mx-auto">
            Những người đam mê công nghệ và trải nghiệm khách hàng đứng sau
            CoolChat
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { name: "Lê Đình Huy", role: "Trưởng nhóm Front-end", img: Huy },
            { name: "Phạm Đức Thắng", role: "Trưởng nhóm Back-end", img: Thang },
            { name: "Nguyễn Đức An", role: "Trưởng nhóm AI", img: An },
          ].map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              whileHover={{ y: -5 }}
              className="text-center animate-on-scroll"
            >
              <div className="relative w-48 h-48 mx-auto mb-4 rounded-full overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-[#4880FF]/60 to-blue-200/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10"></div>
                <img
                  src={member.img}
                  alt={member.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>
              <h3 className="text-xl font-semibold mb-1 text-gray-900">
                {member.name}
              </h3>
              <p className="text-transparent bg-clip-text bg-gradient-to-r from-[#4880FF] to-blue-400 font-medium">
                {member.role}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
