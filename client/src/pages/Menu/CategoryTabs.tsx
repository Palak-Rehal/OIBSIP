import { Pizza, Leaf, Beef, Flame, Cake, CupSoda } from "lucide-react";

interface Props {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const categories = [
  {
    name: "All",
    icon: Pizza,
  },
  {
    name: "Veg",
    icon: Leaf,
  },
  {
    name: "Non-Veg",
    icon: Beef,
  },
  {
    name: "Cheese Burst",
    icon: Pizza,
  },
  {
    name: "Spicy",
    icon: Flame,
  },
  {
    name: "Dessert",
    icon: Cake,
  },
  {
    name: "Drinks",
    icon: CupSoda,
  },
];

const CategoryTabs = ({
  activeCategory = "All",
  onCategoryChange,
}: Props) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">

      <div className="flex gap-3 min-w-max pb-2">

        {categories.map(({ name, icon: Icon }) => {

          const active = activeCategory === name;

          return (
            <button
              key={name}
              onClick={() => onCategoryChange?.(name)}
              className={`
                flex items-center gap-2
                px-5 py-3
                rounded-full
                border
                transition-all
                duration-300
                whitespace-nowrap

                ${
                  active
                    ? "bg-[#BD6A3C] text-white border-[#BD6A3C] shadow-lg"
                    : "bg-white text-[#2E2B27] border-[#E7DED3] hover:border-[#BD6A3C] hover:text-[#BD6A3C]"
                }
              `}
            >
              <Icon size={18} />

              <span className="font-semibold">
                {name}
              </span>
            </button>
          );
        })}
      </div>

    </div>
  );
};

export default CategoryTabs;