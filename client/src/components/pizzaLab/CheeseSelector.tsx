import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Cheese {
  name: string;
  price: number;
}

interface CheeseSelectorProps {
  cheeses: Cheese[];
  selectedCheese: Cheese;
  setSelectedCheese: (cheese: Cheese) => void;
}

const CheeseSelector = ({
  cheeses,
  selectedCheese,
  setSelectedCheese,
}: CheeseSelectorProps) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#E5501C] text-[#FBF3E4] font-black text-sm flex items-center justify-center">
          4
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Step 4 of 5
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            Choose Your Cheese
          </h3>
        </div>
      </div>

      <div className="grid sm:grid-cols-3 gap-3">
        {cheeses.map((cheese) => {
          const isSelected =
            selectedCheese.name === cheese.name;

          return (
            <motion.button
              key={cheese.name}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCheese(cheese)}
              className={`
                relative p-4 rounded-2xl border text-left transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#241A12] border-[#241A12] shadow-md"
                    : "bg-[#F3E8D4] border-[#E7D9BE] hover:bg-white hover:border-[#E5501C]/50"
                }
              `}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#E5501C] text-[#FBF3E4] flex items-center justify-center">
                  <Check size={14} strokeWidth={3} />
                </span>
              )}

              <div className="pr-7">
                <p
                  className={`font-bold ${
                    isSelected
                      ? "text-[#FBF3E4]"
                      : "text-[#241A12]"
                  }`}
                >
                  {cheese.name}
                </p>

                <p
                  className={`text-xs mt-1 ${
                    isSelected
                      ? "text-[#B9A88C]"
                      : "text-[#6B5D4F]"
                  }`}
                >
                  {cheese.price === 0
                    ? "Standard portion"
                    : "Extra cheesy"}
                </p>
              </div>

              <p
                className={`mt-3 text-sm font-black ${
                  isSelected
                    ? "text-[#F0A93E]"
                    : "text-[#B8431A]"
                }`}
              >
                {cheese.price === 0
                  ? "Free"
                  : `+₹${cheese.price}`}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CheeseSelector;