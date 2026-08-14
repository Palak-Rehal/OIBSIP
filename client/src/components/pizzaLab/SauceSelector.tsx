import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Sauce {
  name: string;
  price: number;
}

interface SauceSelectorProps {
  sauces: Sauce[];
  selectedSauce: Sauce;
  setSelectedSauce: (sauce: Sauce) => void;
}

const SauceSelector = ({
  sauces,
  selectedSauce,
  setSelectedSauce,
}: SauceSelectorProps) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#E5501C] text-[#FBF3E4] font-black text-sm flex items-center justify-center">
          3
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Step 3 of 5
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            Choose Your Sauce
          </h3>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-3">
        {sauces.map((sauce) => {
          const isSelected =
            selectedSauce.name === sauce.name;

          return (
            <motion.button
              key={sauce.name}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedSauce(sauce)}
              className={`
                relative flex items-center justify-between p-4 rounded-2xl border
                text-left transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#241A12] border-[#241A12] shadow-md"
                    : "bg-[#F3E8D4] border-[#E7D9BE] hover:bg-white hover:border-[#E5501C]/50"
                }
              `}
            >
              <div>
                <p
                  className={`font-bold ${
                    isSelected
                      ? "text-[#FBF3E4]"
                      : "text-[#241A12]"
                  }`}
                >
                  {sauce.name}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    isSelected
                      ? "text-[#B9A88C]"
                      : "text-[#6B5D4F]"
                  }`}
                >
                  {sauce.price === 0
                    ? "House classic"
                    : "Premium sauce"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`text-sm font-black ${
                    isSelected
                      ? "text-[#F0A93E]"
                      : "text-[#B8431A]"
                  }`}
                >
                  {sauce.price === 0
                    ? "Free"
                    : `+₹${sauce.price}`}
                </span>

                {isSelected && (
                  <span className="w-6 h-6 rounded-full bg-[#E5501C] text-[#FBF3E4] flex items-center justify-center">
                    <Check size={14} strokeWidth={3} />
                  </span>
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SauceSelector;