import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

import pizzaImage from "../../assets/pizza/pizza-base.png";

const PizzaLabBanner = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-14">

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-orange-200
        bg-gradient-to-br
        from-[#FFF9F3]
        via-[#FFF4E8]
        to-[#FFE8D1]
        shadow-xl
        "
      >

        {/* Background Glow */}

        <div className="absolute -top-20 -right-20 w-72 h-72 bg-orange-300/20 rounded-full blur-3xl" />

        <div className="absolute -bottom-24 -left-20 w-72 h-72 bg-yellow-300/20 rounded-full blur-3xl" />

        <div className="grid lg:grid-cols-2 items-center gap-10 px-10 py-10">

          {/* Left */}

          <div>

            <div
              className="
              inline-flex
              items-center
              gap-2
              bg-orange-100
              text-orange-700
              px-4
              py-2
              rounded-full
              font-semibold
              mb-6
              "
            >
              <Sparkles size={18} />

              NEW FEATURE
            </div>

            <h2
              className="
              text-4xl
              lg:text-5xl
              font-extrabold
              text-gray-900
              leading-tight
              "
            >
              Build Your
              <span className="text-orange-600">
                {" "}
                Dream Pizza
              </span>
            </h2>

            <p
              className="
              mt-5
              text-lg
              text-gray-600
              max-w-xl
              leading-relaxed
              "
            >
              Mix your favourite crust, sauces, cheese and
              premium toppings to create a pizza that's
              completely yours.
            </p>

            <div className="flex flex-wrap gap-3 mt-7">

              <span className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium">
                🍕 50+ Ingredients
              </span>

              <span className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium">
                ⚡ Live Preview
              </span>

              <span className="bg-white px-4 py-2 rounded-full shadow text-sm font-medium">
                💰 Instant Price
              </span>

            </div>

            <Link
              to="/pizza-lab"
              className="
              inline-flex
              items-center
              gap-3
              mt-8
              bg-orange-600
              hover:bg-orange-700
              text-white
              px-8
              py-4
              rounded-full
              font-bold
              transition
              shadow-lg
              hover:scale-105
              "
            >
              Build Your Pizza

              <ArrowRight size={20} />

            </Link>

          </div>

          {/* Right */}

          <div className="relative flex justify-center">

            <motion.img
              src={pizzaImage}
              alt="Pizza Lab"
              animate={{
                rotate: [0, 4, -4, 0],
                y: [0, -8, 0],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="
              w-72
              lg:w-96
              drop-shadow-[0_30px_40px_rgba(0,0,0,0.25)]
              "
            />

            <div
              className="
              absolute
              -top-2
              left-5
              bg-white
              shadow-lg
              rounded-2xl
              px-4
              py-2
              "
            >
              ⭐ 4.9 Rating
            </div>

            <div
              className="
              absolute
              bottom-6
              right-0
              bg-orange-600
              text-white
              rounded-2xl
              px-4
              py-2
              shadow-xl
              "
            >
              10K+ Custom Pizzas
            </div>

          </div>

        </div>

      </motion.div>

    </section>
  );
};

export default PizzaLabBanner;