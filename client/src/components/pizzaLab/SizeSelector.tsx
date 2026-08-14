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
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#E5501C] text-[#FBF3E4] font-black text-sm flex items-center justify-center">
          1
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Step 1 of 5
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            Choose Your Size
          </h3>
        </div>
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
                relative text-left p-4 rounded-2xl border transition-all duration-200
                ${
                  isSelected
                    ? "bg-[#241A12] border-[#241A12] shadow-md"
                    : "bg-[#F3E8D4] border-[#E7D9BE] hover:border-[#E5501C]/50 hover:bg-white"
                }
              `}
            >
              {isSelected && (
                <span className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#E5501C] text-[#FBF3E4] flex items-center justify-center">
                  <Check size={14} strokeWidth={3} />
                </span>
              )}

              <p
                className={`text-lg font-black ${
                  isSelected
                    ? "text-[#FBF3E4]"
                    : "text-[#241A12]"
                }`}
              >
                {size.name}
              </p>

              <p
                className={`text-xs mt-1 ${
                  isSelected
                    ? "text-[#B9A88C]"
                    : "text-[#6B5D4F]"
                }`}
              >
                {size.description}
              </p>

              <p
                className={`mt-3 font-black ${
                  isSelected
                    ? "text-[#F0A93E]"
                    : "text-[#241A12]"
                }`}
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