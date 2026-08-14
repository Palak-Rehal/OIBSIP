import { motion } from "framer-motion";
import { Flame } from "lucide-react";

interface Props {
  toppingCount: number;
}

const PizzaComplexity = ({ toppingCount }: Props) => {
  let title = "Beginner";
  let width = "20%";

  if (toppingCount >= 2) {
    title = "Classic";
    width = "45%";
  }

  if (toppingCount >= 4) {
    title = "Gourmet";
    width = "75%";
  }

  if (toppingCount >= 6) {
    title = "Pizza Monster";
    width = "100%";
  }

  return (
    <div className="bg-[#FBF3E4] rounded-[28px] border border-[#E7D9BE] p-5 sm:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">

      <div className="flex items-center gap-3 mb-4">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#F0A93E] text-[#1C1712] flex items-center justify-center">
          <Flame size={18} />
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Build Level
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            {title}
          </h3>
        </div>
      </div>

      <div className="w-full h-3 bg-[#E7D9BE] rounded-full overflow-hidden">
        <motion.div
          animate={{ width }}
          transition={{ duration: 0.5 }}
          className="h-full rounded-full bg-gradient-to-r from-[#F0A93E] to-[#E5501C]"
        />
      </div>

      <p className="text-sm text-[#6B5D4F] mt-3">
        {toppingCount} topping
        {toppingCount === 1 ? "" : "s"} selected
      </p>
    </div>
  );
};

export default PizzaComplexity;