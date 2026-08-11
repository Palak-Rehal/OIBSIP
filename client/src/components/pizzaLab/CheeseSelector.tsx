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
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9A958C] font-bold">
            Step 04
          </p>

          <h3 className="text-xl font-black text-[#22281F] mt-1">
            Choose Your Cheese
          </h3>
        </div>

        <span className="text-sm font-semibold text-[#D8531F]">
          {selectedCheese.name}
        </span>
      </div>

      {/* Cheese Options */}
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
                relative
                p-4
                rounded-2xl
                border
                text-left
                transition-all
                duration-200

                ${
                  isSelected
                    ? `
                      bg-[#FCE4D6]
                      border-[#D8531F]
                      shadow-md
                    `
                    : `
                      bg-[#FAF9F6]
                      border-[#E8DFD4]
                      hover:bg-white
                      hover:border-[#D8531F]/50
                    `
                }
              `}
            >
              {/* Check */}
              {isSelected && (
                <span
                  className="
                    absolute
                    top-3
                    right-3
                    w-6
                    h-6
                    rounded-full
                    bg-[#D8531F]
                    text-white
                    flex
                    items-center
                    justify-center
                  "
                >
                  <Check
                    size={14}
                    strokeWidth={3}
                  />
                </span>
              )}

              <div className="pr-7">
                <p
                  className={`
                    font-bold
                    ${
                      isSelected
                        ? "text-[#B8431A]"
                        : "text-[#22281F]"
                    }
                  `}
                >
                  {cheese.name}
                </p>

                <p className="text-xs text-[#817C73] mt-1">
                  {cheese.price === 0
                    ? "Standard portion"
                    : "Extra cheesy"}
                </p>
              </div>

              <p
                className={`
                  mt-3
                  text-sm
                  font-black
                  ${
                    isSelected
                      ? "text-[#D8531F]"
                      : "text-[#22281F]"
                  }
                `}
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