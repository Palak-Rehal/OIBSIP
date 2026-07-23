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
    title: "Freshly Crafted Pizzas",
    description:
      "Every pizza is handcrafted by our expert chefs using fresh ingredients and authentic recipes.",
  },
  {
    id: 2,
    icon: Leaf,
    title: "Premium Ingredients",
    description:
      "We use high-quality cheese, fresh vegetables, and carefully selected ingredients for the best taste.",
  },
  {
    id: 3,
    icon: Truck,
    title: "Fast & Reliable Delivery",
    description:
      "Hot and fresh pizzas delivered quickly to your doorstep with our trusted delivery service.",
  },
  {
    id: 4,
    icon: Clock,
    title: "Quick Preparation",
    description:
      "Our optimized kitchen process ensures your order reaches you without unnecessary delays.",
  },
  {
    id: 5,
    icon: ShieldCheck,
    title: "Quality Guaranteed",
    description:
      "Strict quality checks ensure every pizza meets our high standards before delivery.",
  },
  {
    id: 6,
    icon: Heart,
    title: "Made With Love",
    description:
      "We put passion and care into every pizza to create memorable food experiences.",
  },
];

const WhyChooseUs = () => {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Heading */}
        <div className="text-center mb-16">

          <span className="text-[#BD6A3C] font-semibold uppercase tracking-[4px]">
            Why Choose Us
          </span>

          <h2 className="mt-4 text-4xl md:text-5xl font-black text-[#2E2B27]">
            Why Pizza Lovers Choose PizzaHub
          </h2>

          <p className="mt-5 text-gray-500 max-w-2xl mx-auto text-lg">
            We combine delicious taste, quality ingredients, and fast service
            to give you the perfect pizza experience every time.
          </p>

        </div>


        {/* Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">

          {reasons.map((item) => {

            const Icon = item.icon;

            return (
              <div
                key={item.id}
                className="
                  group
                  bg-[#FAF7F2]
                  rounded-[30px]
                  p-8
                  border
                  border-[#E7DED3]
                  hover:bg-white
                  hover:shadow-2xl
                  hover:-translate-y-3
                  transition-all
                  duration-500
                "
              >

                {/* Icon */}
                <div
                  className="
                    w-16
                    h-16
                    flex
                    items-center
                    justify-center
                    rounded-2xl
                    bg-[#BD6A3C]
                    text-white
                    mb-6
                    group-hover:scale-110
                    transition
                    duration-500
                  "
                >
                  <Icon size={30}/>
                </div>


                {/* Content */}
                <h3
                  className="
                    text-2xl
                    font-black
                    text-[#2E2B27]
                    mb-4
                  "
                >
                  {item.title}
                </h3>


                <p
                  className="
                    text-gray-500
                    leading-7
                    text-lg
                  "
                >
                  {item.description}
                </p>


              </div>
            );
          })}

        </div>


        {/* Experience Banner */}

        <div
          className="
            mt-20
            rounded-[35px]
            bg-[#2E2B27]
            px-8
            py-12
            text-center
            text-white
          "
        >

          <h3 className="text-3xl md:text-4xl font-black">
            Experience The Perfect Pizza Moment 🍕
          </h3>

          <p className="mt-4 text-gray-300 text-lg max-w-3xl mx-auto">
            From the first bite to the last slice, PizzaHub brings happiness
            with every order.
          </p>


          <button
            className="
              mt-8
              bg-[#BD6A3C]
              px-8
              py-4
              rounded-full
              font-bold
              hover:bg-[#a95731]
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