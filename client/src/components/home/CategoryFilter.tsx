import { useState } from "react";
import { Pizza, Milk, Leaf, Beef, Flame, CupSoda, Cake } from "lucide-react";

const categories = [
  { label: "All pizzas", icon: Pizza, tint: "#F3E4D6", text: "#BD6A3C" },
  { label: "Cheese", icon: Milk, tint: "#EFEADC", text: "#9C8A3E" },
  { label: "Veggie", icon: Leaf, tint: "#E7EDE3", text: "#5C7350" },
  { label: "Non-veg", icon: Beef, tint: "#F3E4D6", text: "#BD6A3C" },
  { label: "Spicy", icon: Flame, tint: "#F1E1D9", text: "#A85A2F" },
  { label: "Drinks", icon: CupSoda, tint: "#E2E8E7", text: "#4A716C" },
  { label: "Desserts", icon: Cake, tint: "#EFEADC", text: "#9C8A3E" },
];

const CategoryFilter = () => {
  const [active, setActive] = useState("All pizzas");

  return (
    <div className="max-w-7xl mx-auto px-5 sm:px-6 -mt-8 sm:-mt-10 relative z-10">
      <div
        className="
          bg-white rounded-3xl border border-[#EFE9DC]
          shadow-[0_20px_45px_-20px_rgba(46,43,39,0.18)]
          px-4 sm:px-6 py-5
          flex gap-6 sm:gap-10
          overflow-x-auto
          sm:flex-wrap sm:justify-center sm:overflow-visible
        "
      >
        {categories.map(({ label, icon: Icon, tint, text }) => {
          const isActive = active === label;
          return (
            <button
              key={label}
              onClick={() => setActive(label)}
              className="flex flex-col items-center gap-2 shrink-0 group"
            >
              <span
                className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-105"
                style={{
                  backgroundColor: tint,
                  outline: isActive ? `2px solid ${text}` : "none",
                  outlineOffset: "2px",
                }}
              >
                <Icon size={22} strokeWidth={1.8} style={{ color: text }} />
              </span>
              <span
                className={`text-[12px] whitespace-nowrap ${isActive ? "text-[#2E2B27]" : "text-[#8A8477]"}`}
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: isActive ? 700 : 600 }}
              >
                {label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default CategoryFilter;
