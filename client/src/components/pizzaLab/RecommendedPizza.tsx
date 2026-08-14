import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const RecommendedPizza = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="
        rounded-[28px]
        p-8
        text-[#FBF3E4]
        bg-gradient-to-br from-[#E5501C] to-[#8F2A10]
        border border-[#C23F14]
        shadow-[0_18px_40px_rgba(0,0,0,0.35)]
      "
    >
      <div className="flex items-center gap-3">
        <Flame className="text-[#F0A93E]" />
        <p className="text-[10px] uppercase tracking-[0.22em] font-black text-[#FBD873]">
          Chef's Special
        </p>
      </div>

      <h3 className="text-3xl font-black mt-4">
        Spicy Paneer Volcano
      </h3>

      <p className="mt-3 text-[#F3D9C8]">
        Cheese Burst · Spicy Tomato · Paneer · Corn ·
        Jalapeños · Extra Cheese
      </p>

      <div className="mt-6 flex justify-between items-center">
        <span className="text-4xl font-black">
          ₹449
        </span>

        <span className="bg-[#FBF3E4] text-[#B8431A] px-4 py-2 rounded-full font-black text-sm">
          ⭐ 4.9
        </span>
      </div>
    </motion.div>
  );
};

export default RecommendedPizza;