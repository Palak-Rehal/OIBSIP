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
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9A958C] font-bold">
            Step 03
          </p>

          <h3 className="text-xl font-black text-[#22281F] mt-1">
            Choose Your Sauce
          </h3>
        </div>

        <span className="text-sm font-semibold text-[#D8531F]">
          {selectedSauce.name}
        </span>
      </div>

      {/* Sauce Options */}
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
                relative
                flex
                items-center
                justify-between
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
              <div>
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
                  {sauce.name}
                </p>

                <p className="text-xs text-[#817C73] mt-1">
                  {sauce.price === 0
                    ? "Classic flavour"
                    : "Premium sauce"}
                </p>
              </div>

              <div className="flex items-center gap-3">
                <span
                  className={`
                    text-sm
                    font-black
                    ${
                      isSelected
                        ? "text-[#D8531F]"
                        : "text-[#22281F]"
                    }
                  `}
                >
                  {sauce.price === 0
                    ? "Free"
                    : `+₹${sauce.price}`}
                </span>

                {isSelected && (
                  <span className="
                    w-6
                    h-6
                    rounded-full
                    bg-[#D8531F]
                    text-white
                    flex
                    items-center
                    justify-center
                  ">
                    <Check
                      size={14}
                      strokeWidth={3}
                    />
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