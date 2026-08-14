import { motion } from "framer-motion";
import { Check } from "lucide-react";

interface Topping {
  name: string;
  price: number;
  emoji: string;
}

interface ToppingsSelectorProps {
  selectedToppings: string[];
  setSelectedToppings: React.Dispatch<React.SetStateAction<string[]>>;
}

const toppings: Topping[] = [
  {
    name: "Extra Cheese",
    price: 40,
    emoji: "🧀",
  },
  {
    name: "Paneer",
    price: 50,
    emoji: "🥘",
  },
  {
    name: "Corn",
    price: 30,
    emoji: "🌽",
  },
  {
    name: "Olives",
    price: 35,
    emoji: "🫒",
  },
  {
    name: "Mushroom",
    price: 45,
    emoji: "🍄",
  },
  {
    name: "Jalapeno",
    price: 25,
    emoji: "🌶️",
  },
];

const ToppingsSelector = ({
  selectedToppings,
  setSelectedToppings,
}: ToppingsSelectorProps) => {

  const toggleTopping = (name: string) => {
    if (selectedToppings.includes(name)) {
      setSelectedToppings(
        selectedToppings.filter(
          (item) => item !== name
        )
      );
    } else {
      setSelectedToppings([
        ...selectedToppings,
        name,
      ]);
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="flex items-center gap-3 mb-5">
        <span className="w-9 h-9 shrink-0 rounded-xl bg-[#E5501C] text-[#FBF3E4] font-black text-sm flex items-center justify-center">
          5
        </span>

        <div>
          <p className="text-[10px] uppercase tracking-[0.2em] text-[#9C8767] font-bold">
            Step 5 of 5
          </p>
          <h3 className="text-xl font-black text-[#241A12] mt-0.5">
            Choose Your Toppings
          </h3>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
        {toppings.map((item) => {
          const selected = selectedToppings.includes(
            item.name
          );

          return (
            <motion.div
              key={item.name}
              whileTap={{ scale: 0.95 }}
              onClick={() => toggleTopping(item.name)}
              className={`
                relative cursor-pointer rounded-2xl border p-4 transition
                ${
                  selected
                    ? "bg-[#241A12] border-[#241A12] shadow-md"
                    : "bg-[#F3E8D4] border-[#E7D9BE] hover:bg-white hover:border-[#E5501C]/50"
                }
              `}
            >
              {selected && (
                <div className="absolute top-2 right-2 bg-[#E5501C] text-[#FBF3E4] rounded-full p-1">
                  <Check size={13} strokeWidth={3} />
                </div>
              )}

              <div className="text-3xl mb-2">
                {item.emoji}
              </div>

              <h4
                className={`font-bold text-sm ${
                  selected
                    ? "text-[#FBF3E4]"
                    : "text-[#241A12]"
                }`}
              >
                {item.name}
              </h4>

              <p
                className={`text-xs mt-1 font-black ${
                  selected
                    ? "text-[#F0A93E]"
                    : "text-[#B8431A]"
                }`}
              >
                +₹{item.price}
              </p>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
};

export default ToppingsSelector;