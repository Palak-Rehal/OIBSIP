import { useNavigate } from "react-router-dom";
import {
  Clock,
  Leaf,
  ChefHat,
  Truck,
  ShieldCheck,
  Heart,
} from "lucide-react";

const reasons = [
  {
    id: 1,
    icon: ChefHat,
    title: "Freshly Crafted",
    description:
      "Handcrafted by expert chefs using fresh ingredients and authentic recipes.",
  },
  {
    id: 2,
    icon: Leaf,
    title: "Premium Ingredients",
    description:
      "High-quality cheese, fresh vegetables, and carefully selected toppings.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast Delivery",
    description:
      "Hot, fresh pizzas delivered quickly with our trusted delivery service.",
  },
  {
    id: 4,
    icon: Clock,
    title: "Quick Prep",
    description:
      "An optimized kitchen process means no unnecessary delays on your order.",
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description:
      "Strict quality checks on every pizza before it leaves the kitchen.",
  },
  {
    id: 6,
    icon: Heart,
    title: "Made With Love",
    description:
      "Passion and care in every pizza, for a memorable food experience.",
  },
];

const WhyChooseUs = () => {
  const navigate = useNavigate();

  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">

        {/* Compact heading */}
        <div className="text-center mb-12">

          <span className="text-xs font-bold text-[#D8531F] uppercase tracking-[3px]">
            Why Choose Us
          </span>

          <h2 className="mt-2 text-3xl md:text-4xl font-black text-[#22281F]">
            Why Pizza Lovers Choose PizzaHub
          </h2>

          <p className="mt-3 text-gray-500 max-w-xl mx-auto">
            Delicious taste, quality ingredients, and fast service — every
            single time.
          </p>

        </div>

        {/* Compact cards — icon + text in a row, not a tall stack */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">

          {reasons.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  group
                  flex
                  items-start
                  gap-4
                  bg-[#FAF7F2]
                  rounded-2xl
                  p-5
                  border
                  border-[#E7DED3]
                  hover:border-[#D8531F]/40
                  hover:bg-white
                  hover:shadow-lg
                  transition-all
                  duration-300
                "
              >

                <div
                  className="
                    w-11
                    h-11
                    shrink-0
                    flex
                    items-center
                    justify-center
                    rounded-xl
                    bg-[#D8531F]
                    text-white
                    group-hover:scale-110
                    transition
                    duration-300
                  "
                >
                  <Icon size={20} />
                </div>

                <div>
                  <h3 className="font-bold text-[#22281F]">
                    {item.title}
                  </h3>

                  <p className="text-sm text-gray-500 mt-1 leading-relaxed">
                    {item.description}
                  </p>
                </div>

              </div>
            );
          })}

        </div>

        {/* Compact experience banner */}

        <div
          className="
            mt-14
            rounded-[28px]
            bg-[#22281F]
            px-8
            py-10
            text-center
            text-white
          "
        >

          <h3 className="text-2xl md:text-3xl font-black">
            Experience The Perfect Pizza Moment 🍕
          </h3>

          <p className="mt-3 text-gray-300 max-w-lg mx-auto">
            From the first bite to the last slice, PizzaHub brings happiness
            with every order.
          </p>

          <button
            onClick={() => navigate("/menu")}
            className="
              mt-6
              bg-[#D8531F]
              px-7
              py-3.5
              rounded-full
              font-bold
              text-sm
              hover:bg-[#B8431A]
              transition
            "
          >
            Order Your Pizza Now
          </button>

        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;