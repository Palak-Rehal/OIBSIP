import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Crust {
  name: string;
  description: string;
  price: number;
}

interface CrustSelectorProps {
  crusts: {
    name: string;
    price: number;
  }[];
  selectedCrust: {
    name: string;
    price: number;
  };
  setSelectedCrust: (crust: {
    name: string;
    price: number;
  }) => void;
}

// Matches server/src/seeds/inventorySeed.ts exactly
// (category: "Base") so stock decrements correctly.
const crusts: Crust[] = [
  {
    name: "Classic",
    description: "Traditional soft crust",
    price: 0,
  },
  {
    name: "Cheese Burst",
    description: "Loaded cheese edge",
    price: 80,
  },
  {
    name: "Thin Crust",
    description: "Crispy & light",
    price: 40,
  },
  {
    name: "Whole Wheat",
    description: "Healthier fiber-rich base",
    price: 30,
  },
  {
    name: "Multigrain",
    description: "Nutty, hearty multigrain base",
    price: 50,
  },
];

const CrustSelector = ({
  selectedCrust,
  setSelectedCrust,
}: CrustSelectorProps) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#E5501C] text-[#FBF3E4] font-black text-sm flex items-center justify-center">
          2
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Step 2 of 5
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            Choose Your Base
          </h3>
        </div>
      </div>

      <div className="grid gap-3">
        {crusts.map((crust) => {
          const isSelected =
            selectedCrust?.name === crust.name;

          return (
            <motion.button
              type="button"
              key={crust.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCrust(crust)}
              className={`
                w-full flex items-center justify-between p-4 rounded-2xl border
                transition-all duration-200 text-left
                ${
                  isSelected
                    ? "bg-[#241A12] text-[#FBF3E4] border-[#241A12] shadow-md"
                    : "bg-[#F3E8D4] border-[#E7D9BE] hover:border-[#E5501C]/50 hover:bg-white"
                }
              `}
            >
              <div className="flex items-center gap-3">
                {isSelected && (
                  <span className="w-6 h-6 shrink-0 rounded-full bg-[#E5501C] text-[#FBF3E4] flex items-center justify-center">
                    <Check size={13} strokeWidth={3} />
                  </span>
                )}

                <div>
                  <h4
                    className={`font-bold text-sm ${
                      isSelected
                        ? "text-[#FBF3E4]"
                        : "text-[#241A12]"
                    }`}
                  >
                    {crust.name}
                  </h4>

                  <p
                    className={`text-xs mt-1 ${
                      isSelected
                        ? "text-[#B9A88C]"
                        : "text-[#6B5D4F]"
                    }`}
                  >
                    {crust.description}
                  </p>
                </div>
              </div>

              <span
                className={`text-sm font-black whitespace-nowrap ml-4 ${
                  isSelected
                    ? "text-[#F0A93E]"
                    : "text-[#B8431A]"
                }`}
              >
                {crust.price === 0
                  ? "Free"
                  : `+₹${crust.price}`}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CrustSelector;