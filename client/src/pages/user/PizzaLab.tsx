import { motion } from "framer-motion";
import { useState } from "react";
import {
  Flame,
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

// Matches server/src/seeds/inventorySeed.ts exactly
// so stock actually decrements on checkout.
const sauces = [
  {
    name: "Pizza Sauce",
    price: 0,
  },
  {
    name: "Spicy Tomato",
    price: 20,
  },
  {
    name: "BBQ Sauce",
    price: 20,
  },
  {
    name: "Garlic Sauce",
    price: 25,
  },
  {
    name: "Pesto Sauce",
    price: 30,
  },
];

const cheeses = [
  {
    name: "Regular Cheese",
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

const STEPS = [
  "Size",
  "Crust",
  "Sauce",
  "Cheese",
  "Toppings",
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
     BUILD PROGRESS (how far into the ticket you are)
  ------------------------------------------------------- */

  const completedCount =
    1 + // size always has a default
    1 + // crust always has a default
    1 + // sauce always has a default
    1 + // cheese always has a default
    (selectedToppings.length > 0 ? 1 : 0);

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
      className="min-h-screen bg-[#1C1712] text-[#F3E9DA]"
    >
      {/* ===================================================
          HERO HEADER — "the oven glow"
      =================================================== */}

      <section className="relative overflow-hidden border-b border-[#33291D]">

        <div className="absolute -top-32 -right-24 w-[420px] h-[420px] rounded-full bg-[#E5501C]/20 blur-[110px]" />
        <div className="absolute -bottom-40 -left-24 w-[380px] h-[380px] rounded-full bg-[#F0A93E]/10 blur-[110px]" />

        <div className="relative max-w-[1500px] mx-auto px-5 sm:px-8 pt-14 pb-10">

          <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">

            {/* Heading */}

            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A2118] border border-[#443626] text-[#F0A93E] text-xs font-black uppercase tracking-[0.16em]">
                <Flame size={14} />
                Fired to order
              </div>

              <h1 className="mt-5 text-4xl sm:text-5xl lg:text-[64px] font-black tracking-tight leading-[0.95]">
                Build Your
                <span className="block text-[#E5501C]">
                  Perfect Pizza
                </span>
              </h1>

              <p className="mt-4 max-w-xl text-[#B9A88C] text-base sm:text-lg leading-7">
                Pick your base, sauce, cheese and toppings.
                Every pizza gets punched into the kitchen
                exactly the way you build it.
              </p>
            </div>

            {/* Surprise Button */}

            <motion.button
              type="button"
              onClick={randomPizza}
              whileHover={{ y: -3, scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              className="group inline-flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#E5501C] text-[#1C1712] font-black shadow-[0_16px_40px_rgba(229,80,28,0.35)] transition whitespace-nowrap"
            >
              <span className="flex items-center justify-center w-10 h-10 rounded-xl bg-[#1C1712]/10 group-hover:bg-[#1C1712]/20 transition">
                <Wand2 size={19} />
              </span>
              Surprise Me
            </motion.button>
          </div>

          {/* ================================================
              TICKET PROGRESS STRIP
              (signature element — real sequential steps,
              so numbering here actually carries meaning)
          ================================================ */}

          <div className="mt-10 bg-[#241D16] border border-[#3B2F21] rounded-2xl px-5 py-4">

            <div className="flex items-center justify-between mb-3">
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A7A62] font-bold">
                Your Build
              </p>
              <p className="text-[11px] uppercase tracking-[0.2em] text-[#F0A93E] font-bold">
                {completedCount} / {STEPS.length} picked
              </p>
            </div>

            <div className="flex gap-1.5">
              {STEPS.map((step, i) => (
                <div
                  key={step}
                  className="flex-1"
                >
                  <div className="h-1.5 rounded-full bg-[#3B2F21] overflow-hidden">
                    <div
                      className="h-full bg-[#E5501C] rounded-full transition-all duration-500"
                      style={{
                        width:
                          i < completedCount
                            ? "100%"
                            : "0%",
                      }}
                    />
                  </div>
                  <p className="mt-1.5 text-[10px] font-bold text-[#8A7A62]">
                    {i + 1}. {step}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================================================
          MAIN BUILDER
      =================================================== */}

      <main className="max-w-[1500px] mx-auto px-5 sm:px-8 py-10">
        <div className="grid xl:grid-cols-[390px_minmax(0,1fr)_360px] gap-6 items-start">

          {/* =================================================
              LEFT — PREVIEW
          ================================================= */}

          <div className="xl:sticky xl:top-24">
            <PizzaPreview
              size={selectedSize.name}
              crust={selectedCrust.name}
              cheese={selectedCheese.name}
              toppings={selectedToppings}
            />
          </div>

          {/* =================================================
              CENTER — OPTIONS
          ================================================= */}

          <div className="space-y-5">

            <BuilderCard>
              <SizeSelector
                sizes={sizes}
                selectedSize={selectedSize}
                setSelectedSize={setSelectedSize}
              />
            </BuilderCard>

            <BuilderCard>
              <CrustSelector
                crusts={crusts}
                selectedCrust={selectedCrust}
                setSelectedCrust={setSelectedCrust}
              />
            </BuilderCard>

            <BuilderCard>
              <SauceSelector
                sauces={sauces}
                selectedSauce={selectedSauce}
                setSelectedSauce={setSelectedSauce}
              />
            </BuilderCard>

            <BuilderCard>
              <CheeseSelector
                cheeses={cheeses}
                selectedCheese={selectedCheese}
                setSelectedCheese={setSelectedCheese}
              />
            </BuilderCard>

            <BuilderCard>
              <ToppingsSelector
                selectedToppings={selectedToppings}
                setSelectedToppings={
                  setSelectedToppings
                }
              />
            </BuilderCard>

            <PizzaComplexity
              toppingCount={selectedToppings.length}
            />

            <RecommendedPizza />
          </div>

          {/* =================================================
              RIGHT — ORDER TICKET
          ================================================= */}

          <div className="xl:sticky xl:top-24 space-y-5">

            <SummaryCard
              selectedSize={selectedSize}
              selectedCrust={selectedCrust}
              selectedSauce={selectedSauce}
              selectedCheese={selectedCheese}
              selectedToppings={selectedToppings}
              totalPrice={totalPrice}
            />

            <AddToCartButton
              totalPrice={totalPrice}
              selectedSize={selectedSize}
              selectedCrust={selectedCrust}
              selectedSauce={selectedSauce}
              selectedCheese={selectedCheese}
              selectedToppings={selectedToppings}
            />

            <div className="flex items-center justify-center gap-2 text-xs text-[#8A7A62]">
              <ChefHat size={14} />
              Made fresh, right after you order
            </div>

            <div className="flex items-center justify-center gap-2 text-xs text-[#6E6151]">
              <ShoppingBag size={13} />
              Secure checkout · Freshly prepared
            </div>
          </div>
        </div>
      </main>
    </motion.div>
  );
};

/* =========================================================
   SHARED BUILDER CARD WRAPPER
   (every step now lives inside the same parchment shell —
   this is what makes the whole builder feel like one system
   instead of ten differently-styled components)
========================================================= */

const BuilderCard = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <div className="bg-[#FBF3E4] rounded-[28px] border border-[#E7D9BE] p-5 sm:p-6 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
    {children}
  </div>
);

export default PizzaLab;