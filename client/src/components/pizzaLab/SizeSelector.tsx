import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Size {
  name: string;
  price: number;
  description: string;
}

interface SizeSelectorProps {
  sizes: Size[];
  selectedSize: Size;
  setSelectedSize: (size: Size) => void;
}

const SizeSelector = ({
  sizes,
  selectedSize,
  setSelectedSize,
}: SizeSelectorProps) => {
  return (
    <div>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <p className="text-xs uppercase tracking-[0.18em] text-[#9A958C] font-bold">
            Step 01
          </p>

          <h3 className="text-xl font-black text-[#22281F] mt-1">
            Choose Your Size
          </h3>
        </div>

        <span className="text-sm font-semibold text-[#D8531F]">
          {selectedSize.name}
        </span>
      </div>

      {/* Sizes */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        {sizes.map((size) => {
          const isSelected =
            selectedSize.name === size.name;

          return (
            <motion.button
              key={size.name}
              type="button"
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedSize(size)}
              className={`
                relative
                text-left
                p-4
                rounded-2xl
                border
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
                      hover:border-[#D8531F]/50
                      hover:bg-white
                    `
                }
              `}
            >
              {/* Selected check */}
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
                  <Check size={14} strokeWidth={3} />
                </span>
              )}

              <p
                className={`
                  text-lg
                  font-black
                  ${
                    isSelected
                      ? "text-[#B8431A]"
                      : "text-[#22281F]"
                  }
                `}
              >
                {size.name}
              </p>

              <p className="text-xs text-[#817C73] mt-1">
                {size.description}
              </p>

              <p
                className={`
                  mt-3
                  font-black
                  ${
                    isSelected
                      ? "text-[#D8531F]"
                      : "text-[#22281F]"
                  }
                `}
              >
                ₹{size.price}
              </p>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default SizeSelector;