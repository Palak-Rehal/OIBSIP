import { useNavigate } from "react-router-dom";
import { Pizza, Leaf, Beef, Layers, IceCreamCone, CupSoda } from "lucide-react";

// Labels double as the ?category= value sent to the Menu page, so they
// must match the Pizza model's category enum exactly (server/src/models/Pizza.ts)
// — anything else silently returns zero results there.
const categories = [
  { label: "All pizzas", value: "All", icon: Pizza, tint: "#F3E4D6", text: "#D8531F" },
  { label: "Veg", value: "Veg", icon: Leaf, tint: "#E7EDE3", text: "#5C7350" },
  { label: "Non-Veg", value: "Non-Veg", icon: Beef, tint: "#F3E4D6", text: "#D8531F" },
  { label: "Cheese Burst", value: "Cheese Burst", icon: Layers, tint: "#EFEADC", text: "#9C8A3E" },
  { label: "Dessert", value: "Dessert", icon: IceCreamCone, tint: "#F1E1D9", text: "#A85A2F" },
  { label: "Beverages", value: "Beverages", icon: CupSoda, tint: "#E2E8E7", text: "#4A716C" },
];

const CategoryFilter = () => {
  const navigate = useNavigate();

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
        {categories.map(({ label, value, icon: Icon, tint, text }) => (
          <button
            key={value}
            onClick={() =>
              navigate(
                value === "All"
                  ? "/menu"
                  : `/menu?category=${encodeURIComponent(value)}`
              )
            }
            className="flex flex-col items-center gap-2 shrink-0 group"
          >
            <span
              className="w-14 h-14 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110"
              style={{ backgroundColor: tint }}
            >
              <Icon size={22} strokeWidth={1.8} style={{ color: text }} />
            </span>
            <span
              className="text-[12px] whitespace-nowrap text-[#8A8477] group-hover:text-[#22281F] transition-colors"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 600 }}
            >
              {label}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoryFilter;