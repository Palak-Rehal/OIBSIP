import { motion } from "framer-motion";
import { useState } from "react";
import {
  Sparkles,
  Wand2,
  ChefHat,
  ShoppingBag,
} from "lucide-react";

import PizzaPreview from "../../components/pizzaLab/PizzaPreview";
import SizeSelector from "../../components/pizzaLab/SizeSelector";
import CrustSelector from "../../components/pizzaLab/CrustSelector";
import CheeseSelector from "../../components/pizzaLab/CheeseSelector";
import SauceSelector from "../../components/pizzaLab/SauceSelector";
import ToppingsSelector from "../../components/pizzaLab/ToppingsSelector";
import SummaryCard from "../../components/pizzaLab/SummaryCard";
import AddToCartButton from "../../components/pizzaLab/AddToCartButton";
import PizzaComplexity from "../../components/pizzaLab/PizzaComplexity";
import RecommendedPizza from "../../components/pizzaLab/RecommendedPizza";

/* =========================================================
   OPTIONS
========================================================= */

const sizes = [
  {
    name: "Small",
    price: 149,
    description: '6"',
  },
  {
    name: "Medium",
    price: 249,
    description: '9"',
  },
  {
    name: "Large",
    price: 349,
    description: '12"',
  },
];

const crusts = [
  {
    name: "Classic Hand Tossed",
    price: 0,
  },
  {
    name: "Thin Crust",
    price: 50,
  },
  {
    name: "Cheese Burst",
    price: 80,
  },
];

const sauces = [
  {
    name: "Classic Tomato",
    price: 0,
  },
  {
    name: "BBQ",
    price: 20,
  },
  {
    name: "Peri Peri",
    price: 25,
  },
  {
    name: "Garlic Butter",
    price: 30,
  },
];

const cheeses = [
  {
    name: "Regular",
    price: 0,
  },
  {
    name: "Extra Cheese",
    price: 50,
  },
  {
    name: "Double Cheese",
    price: 90,
  },
];

const toppingOptions = [
  "Extra Cheese",
  "Paneer",
  "Mushroom",
  "Corn",
  "Olives",
  "Onion",
  "Capsicum",
  "Jalapeños",
];

/* =========================================================
   PAGE
========================================================= */

const PizzaLab = () => {
  /* -------------------------------------------------------
     SELECTED OPTIONS
  ------------------------------------------------------- */

  const [selectedSize, setSelectedSize] = useState(
    sizes[1]
  );

  const [selectedCrust, setSelectedCrust] = useState(
    crusts[0]
  );

  const [selectedSauce, setSelectedSauce] = useState(
    sauces[0]
  );

  const [selectedCheese, setSelectedCheese] = useState(
    cheeses[0]
  );

  const [selectedToppings, setSelectedToppings] =
    useState<string[]>([]);

  /* -------------------------------------------------------
     PRICE
  ------------------------------------------------------- */

  const toppingPrice =
    selectedToppings.length * 40;

  const totalPrice =
    selectedSize.price +
    selectedCrust.price +
    selectedSauce.price +
    selectedCheese.price +
    toppingPrice;

  /* -------------------------------------------------------
     SURPRISE ME
  ------------------------------------------------------- */

  const randomPizza = () => {
    const randomSize =
      sizes[
      Math.floor(Math.random() * sizes.length)
      ];

    const randomCrust =
      crusts[
      Math.floor(Math.random() * crusts.length)
      ];

    const randomSauce =
      sauces[
      Math.floor(Math.random() * sauces.length)
      ];

    const randomCheese =
      cheeses[
      Math.floor(Math.random() * cheeses.length)
      ];

    const randomCount =
      Math.floor(Math.random() * 6);

    const randomToppings = [
      ...toppingOptions,
    ]
      .sort(() => Math.random() - 0.5)
      .slice(0, randomCount);

    setSelectedSize(randomSize);
    setSelectedCrust(randomCrust);
    setSelectedSauce(randomSauce);
    setSelectedCheese(randomCheese);
    setSelectedToppings(randomToppings);
  };

  /* =======================================================
     UI
  ======================================================= */

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="
        min-h-screen
        bg-[#F7F5F0]
        text-[#22281F]
      "
    >
      {/* ===================================================
          HERO HEADER
      =================================================== */}

      <section className="relative overflow-hidden">
        {/* Decorative background */}

        <div className="
          absolute
          -top-32
          -right-32
          w-96
          h-96
          rounded-full
          bg-[#D8531F]/10
          blur-3xl
        " />

        <div className="
          absolute
          -bottom-40
          -left-20
          w-80
          h-80
          rounded-full
          bg-[#5B8C5A]/10
          blur-3xl
        " />

        <div className="
          relative
          max-w-[1500px]
          mx-auto
          px-5
          sm:px-8
          pt-10
          pb-8
        ">
          <div className="
            flex
            flex-col
            lg:flex-row
            lg:items-end
            lg:justify-between
            gap-8
          ">
            {/* Heading */}

            <div>
              <div className="
                inline-flex
                items-center
                gap-2
                px-4
                py-2
                rounded-full
                bg-white
                border
                border-[#E8DFD4]
                shadow-sm
                text-[#D8531F]
                text-sm
                font-bold
              ">
                <Sparkles size={16} />
                Premium Pizza Experience
              </div>

              <h1 className="
                mt-5
                text-4xl
                sm:text-5xl
                lg:text-6xl
                font-black
                tracking-tight
              ">
                Build Your
                <span className="
                  block
                  text-[#D8531F]
                ">
                  Perfect Pizza
                </span>
              </h1>

              <p className="
                mt-4
                max-w-2xl
                text-[#6D6A63]
                text-base
                sm:text-lg
                leading-7
              ">
                Choose your size, crust, sauce, cheese
                and favourite toppings. Create a pizza
                that's completely yours.
              </p>
            </div>

            {/* Surprise Button */}

            <motion.button
              type="button"
              onClick={randomPizza}
              whileHover={{
                y: -3,
                scale: 1.02,
              }}
              whileTap={{
                scale: 0.97,
              }}
              className="
                group
                inline-flex
                items-center
                justify-center
                gap-3
                px-6
                py-4
                rounded-2xl
                bg-[#22281F]
                text-white
                font-bold
                shadow-xl
                shadow-black/10
                transition
                whitespace-nowrap
              "
            >
              <span className="
                flex
                items-center
                justify-center
                w-10
                h-10
                rounded-xl
                bg-white/10
                group-hover:bg-[#D8531F]
                transition
              ">
                <Wand2 size={19} />
              </span>

              Surprise Me
            </motion.button>
          </div>

          {/* Progress-style indicators */}

          <div className="
            mt-8
            flex
            flex-wrap
            items-center
            gap-3
          ">
            <div className="
              flex
              items-center
              gap-2
              px-4
              py-2
              rounded-full
              bg-white
              border
              border-[#E8DFD4]
              text-sm
              font-semibold
              text-[#55514A]
            ">
              <ChefHat
                size={16}
                className="text-[#D8531F]"
              />
              Made your way
            </div>

            <div className="
              px-4
              py-2
              rounded-full
              bg-[#FCE4D6]
              text-[#B8431A]
              text-sm
              font-bold
            ">
              {selectedToppings.length} toppings
            </div>

            <div className="
              px-4
              py-2
              rounded-full
              bg-[#EAF2E8]
              text-[#5B8C5A]
              text-sm
              font-bold
            ">
              Fresh ingredients
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN BUILDER
      =================================================== */}

      <main className="
        max-w-[1500px]
        mx-auto
        px-5
        sm:px-8
        pb-16
      ">
        <div className="
          grid
          xl:grid-cols-[390px_minmax(0,1fr)_360px]
          gap-6
          items-start
        ">
          {/* =================================================
              LEFT — PREVIEW
          ================================================= */}

          <div className="xl:sticky xl:top-24">
            <div className="
              rounded-[30px]
              bg-white
              border
              border-[#E8DFD4]
              shadow-[0_20px_60px_rgba(50,40,30,0.08)]
              overflow-hidden
            ">
              {/* Card header */}

              <div className="
                px-6
                pt-6
                flex
                items-center
                justify-between
              ">
                <div>
                  <p className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-[#9A958C]
                    font-bold
                  ">
                    Live Preview
                  </p>

                  <h2 className="
                    mt-1
                    text-xl
                    font-black
                  ">
                    Your Creation
                  </h2>
                </div>

                <div className="
                  w-10
                  h-10
                  rounded-xl
                  bg-[#FCE4D6]
                  text-[#D8531F]
                  flex
                  items-center
                  justify-center
                ">
                  <ShoppingBag size={18} />
                </div>
              </div>

              <div className="p-5">
                <PizzaPreview
                  size={selectedSize.name}
                  crust={selectedCrust.name}
                  cheese={selectedCheese.name}
                  toppings={selectedToppings}
                />
              </div>

              {/* Mini summary */}

              <div className="
                mx-5
                mb-5
                p-4
                rounded-2xl
                bg-[#F7F5F0]
                border
                border-[#ECE5DA]
              ">
                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">
                  <span className="text-[#817C73]">
                    Size
                  </span>

                  <span className="font-bold">
                    {selectedSize.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                  text-sm
                  mb-2
                ">
                  <span className="text-[#817C73]">
                    Crust
                  </span>

                  <span className="font-bold text-right">
                    {selectedCrust.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                  text-sm
                ">
                  <span className="text-[#817C73]">
                    Toppings
                  </span>

                  <span className="font-bold">
                    {selectedToppings.length}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* =================================================
              CENTER — OPTIONS
          ================================================= */}

          <div className="space-y-5">
            {/* Size */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
              shadow-[0_12px_40px_rgba(50,40,30,0.05)]
            ">
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </div>

            {/* Crust */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
              shadow-[0_12px_40px_rgba(50,40,30,0.05)]
            ">
              <CrustSelector
                crusts={crusts}
                selectedCrust={selectedCrust}
                setSelectedCrust={setSelectedCrust}
              />
            </div>

            {/* Sauce */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
              shadow-[0_12px_40px_rgba(50,40,30,0.05)]
            ">
              <SauceSelector
                sauces={sauces}
                selectedSauce={selectedSauce}
                setSelectedSauce={setSelectedSauce}
              />
            </div>

            {/* Cheese */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
              shadow-[0_12px_40px_rgba(50,40,30,0.05)]
            ">
              <CheeseSelector
                cheeses={cheeses}
                selectedCheese={selectedCheese}
                setSelectedCheese={setSelectedCheese}
              />
            </div>

            {/* Toppings */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
              shadow-[0_12px_40px_rgba(50,40,30,0.05)]
            ">
              <ToppingsSelector
                selectedToppings={selectedToppings}
                setSelectedToppings={
                  setSelectedToppings
                }
              />
            </div>

            {/* Complexity */}

            <div className="
              bg-white
              rounded-[28px]
              border
              border-[#E8DFD4]
              p-5
              sm:p-6
            ">
              <PizzaComplexity
                toppingCount={
                  selectedToppings.length
                }
              />
            </div>

            <RecommendedPizza />
          </div>

          {/* =================================================
              RIGHT — SUMMARY
          ================================================= */}

          <div className="xl:sticky xl:top-24 space-y-5">
            <div className="
              rounded-[30px]
              bg-[#22281F]
              text-white
              p-6
              shadow-[0_20px_60px_rgba(34,40,31,0.20)]
              overflow-hidden
              relative
            ">
              <div className="
                absolute
                -top-20
                -right-20
                w-48
                h-48
                rounded-full
                bg-[#D8531F]/20
                blur-3xl
              " />

              <div className="
                relative
                flex
                items-center
                justify-between
                mb-5
              ">
                <div>
                  <p className="
                    text-xs
                    uppercase
                    tracking-[0.18em]
                    text-white/50
                    font-bold
                  ">
                    Order Summary
                  </p>

                  <h2 className="
                    text-2xl
                    font-black
                    mt-1
                  ">
                    Your Pizza
                  </h2>
                </div>

                <div className="
                  w-11
                  h-11
                  rounded-2xl
                  bg-white/10
                  flex
                  items-center
                  justify-center
                ">
                  <Sparkles
                    size={19}
                    className="text-[#F4A27A]"
                  />
                </div>
              </div>

              <div className="
                relative
                space-y-2
                text-sm
                text-white/65
              ">
                <div className="
                  flex
                  justify-between
                ">
                  <span>Size</span>

                  <span className="
                    text-white
                    font-semibold
                  ">
                    {selectedSize.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                ">
                  <span>Crust</span>

                  <span className="
                    text-white
                    font-semibold
                    text-right
                    max-w-[170px]
                  ">
                    {selectedCrust.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                ">
                  <span>Sauce</span>

                  <span className="
                    text-white
                    font-semibold
                  ">
                    {selectedSauce.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                ">
                  <span>Cheese</span>

                  <span className="
                    text-white
                    font-semibold
                  ">
                    {selectedCheese.name}
                  </span>
                </div>

                <div className="
                  flex
                  justify-between
                ">
                  <span>Toppings</span>

                  <span className="
                    text-white
                    font-semibold
                  ">
                    {selectedToppings.length}
                  </span>
                </div>
              </div>

              <div className="
                relative
                border-t
                border-white/10
                mt-5
                pt-5
                flex
                items-end
                justify-between
              ">
                <div>
                  <p className="
                    text-xs
                    uppercase
                    tracking-wider
                    text-white/45
                    font-bold
                  ">
                    Total
                  </p>

                  <p className="
                    text-4xl
                    font-black
                    mt-1
                  ">
                    ₹{totalPrice}
                  </p>
                </div>

                <div className="
                  px-3
                  py-2
                  rounded-xl
                  bg-[#D8531F]
                  text-xs
                  font-bold
                ">
                  Fresh
                </div>
              </div>
            </div>

            {/* Existing detailed summary */}

            <SummaryCard
              selectedSize={selectedSize}
              selectedCrust={selectedCrust}
              selectedSauce={selectedSauce}
              selectedCheese={selectedCheese}
              selectedToppings={selectedToppings}
              totalPrice={totalPrice}
            />

            {/* Add to cart */}

            <AddToCartButton
              totalPrice={totalPrice}
              selectedSize={selectedSize}
              selectedCrust={selectedCrust}
              selectedSauce={selectedSauce}
              selectedCheese={selectedCheese}
              selectedToppings={selectedToppings}
            />

            <p className="
              text-center
              text-xs
              text-[#9A958C]
            ">
              🔒 Secure checkout · Freshly prepared
            </p>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

export default PizzaLab;