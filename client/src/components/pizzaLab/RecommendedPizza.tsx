import { Flame } from "lucide-react";
import { motion } from "framer-motion";

const RecommendedPizza = () => {
  return (
    <motion.div
      initial={{ opacity: 0, x: 40 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="
      bg-gradient-to-r
      from-orange-500
      to-red-500
      rounded-[30px]
      p-8
      text-white
      "
    >
      <div className="flex items-center gap-3">
        <Flame className="text-yellow-300" />

        <h2 className="text-2xl font-black">
          Chef's Recommendation
        </h2>
      </div>

      <h3 className="text-3xl font-bold mt-6">
        Spicy Paneer Volcano
      </h3>

      <p className="mt-3 text-white/90">
        Cheese Burst • Peri Peri Sauce • Paneer • Corn • Jalapeños • Extra Cheese
      </p>

      <div className="mt-6 flex justify-between items-center">

        <span className="text-4xl font-black">
          ₹449
        </span>

        <span
          className="
          bg-white
          text-orange-600
          px-4
          py-2
          rounded-full
          font-bold
          "
        >
          ⭐ 4.9
        </span>

      </div>
    </motion.div>
  );
};

export default RecommendedPizza;