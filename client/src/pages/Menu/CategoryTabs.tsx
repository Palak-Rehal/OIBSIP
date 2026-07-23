import {
  Pizza,
  Leaf,
  Beef,
  Flame,
  Star,
} from "lucide-react";

interface Props {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  {
    name: "All",
    icon: Pizza,
    color: "bg-gray-100",
  },
  {
    name: "Veg",
    icon: Leaf,
    color: "bg-green-100",
  },
  {
    name: "Non Veg",
    icon: Beef,
    color: "bg-red-100",
  },
  {
    name: "Spicy",
    icon: Flame,
    color: "bg-orange-100",
  },
  {
    name: "Special",
    icon: Star,
    color: "bg-yellow-100",
  },
];

const CategoryTabs = ({
  activeCategory,
  onCategoryChange,
}: Props) => {
  return (
    <div className="overflow-x-auto scrollbar-hide">

      <div className="flex gap-4 min-w-max py-2">

        {categories.map((category) => {

          const Icon = category.icon;

          const active =
            activeCategory === category.name;

          return (

            <button
              key={category.name}
              onClick={() =>
                onCategoryChange(category.name)
              }
              className={`
                group
                flex
                items-center
                gap-3
                rounded-full
                px-6
                py-3
                transition-all
                duration-300
                whitespace-nowrap
                border

                ${
                  active
                    ? "bg-[#BD6A3C] text-white border-[#BD6A3C] shadow-xl scale-105"
                    : "bg-white border-[#E7DED3] hover:border-[#BD6A3C] hover:shadow-md hover:-translate-y-1"
                }
              `}
            >

              <div
                className={`
                  w-9
                  h-9
                  rounded-full
                  flex
                  items-center
                  justify-center

                  ${
                    active
                      ? "bg-white/20"
                      : category.color
                  }
                `}
              >

                <Icon size={18} />

              </div>

              <span className="font-semibold">
                {category.name}
              </span>

            </button>

          );
        })}

      </div>

    </div>
  );
};

export default CategoryTabs;