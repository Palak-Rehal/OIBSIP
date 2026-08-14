import { motion } from "framer-motion";
import { Pizza } from "lucide-react";

interface PizzaPreviewProps {
  size?: string;
  crust?: string;
  cheese?: string;
  toppings?: string[];
}

const PizzaPreview = ({
  size = "Medium",
  crust = "Classic",
  cheese = "Regular",
  toppings = [],
}: PizzaPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-[#FBF3E4] rounded-[28px] border border-[#E7D9BE] shadow-[0_18px_40px_rgba(0,0,0,0.35)] p-5 flex flex-col items-center"
    >
      <div className="w-full flex items-center justify-between mb-4">
        <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-black">
          Live Preview
        </p>
        <span className="text-xs font-black text-[#B8431A]">
          {toppings.length} toppings
        </span>
      </div>

      {/* Wood board */}
      <div className="w-full rounded-3xl bg-[#241A12] p-6 flex items-center justify-center">

        {/* Pizza Circle */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{
            duration: 24,
            repeat: Infinity,
            ease: "linear",
          }}
          className="
            relative
            w-44 h-44 sm:w-52 sm:h-52
            rounded-full
            bg-[#F0A93E]
            shadow-2xl
            flex items-center justify-center
            border-[10px]
            border-[#C67C1E]
          "
        >
          {/* Cheese Layer */}
          <div className="absolute inset-3 rounded-full bg-[#FBD873]" />

          {/* Toppings */}
          <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-2 p-8">
            {toppings.length > 0 ? (
              toppings.map((item, index) => (
                <motion.span
                  key={index}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="text-xl bg-[#FBF3E4]/80 rounded-full px-2 py-1"
                >
                  {item}
                </motion.span>
              ))
            ) : (
              <Pizza
                size={45}
                className="text-[#E5501C]"
              />
            )}
          </div>
        </motion.div>
      </div>

      {/* Details */}
      <div className="mt-5 w-full bg-[#F3E8D4] border border-[#E7D9BE] rounded-2xl p-4 space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-[#6B5D4F]">Size</span>
          <span className="font-bold text-[#241A12]">{size}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6B5D4F]">Base</span>
          <span className="font-bold text-[#241A12]">{crust}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6B5D4F]">Cheese</span>
          <span className="font-bold text-[#241A12]">{cheese}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#6B5D4F]">Toppings</span>
          <span className="font-bold text-[#241A12]">
            {toppings.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PizzaPreview;