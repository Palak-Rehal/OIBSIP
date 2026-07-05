import { useState } from "react";
import { Heart, ShoppingCart } from "lucide-react";

// Replace these src paths with your real product photos.
const pizzas = [
  {
    name: "Veggie delight",
    desc: "Onion, capsicum, tomato, corn, mushroom",
    price: 249,
    img: "/menu/veggie-delight.jpg",
  },
  {
    name: "Paneer tikka",
    desc: "Paneer, capsicum, onion, tikka sauce",
    price: 299,
    img: "/menu/paneer-tikka.jpg",
  },
  {
    name: "Chicken supreme",
    desc: "Chicken, capsicum, onion, olives, cheese",
    price: 349,
    img: "/menu/chicken-supreme.jpg",
    bestseller: true,
  },
  {
    name: "Pepperoni classic",
    desc: "Pepperoni, cheese, pizza sauce",
    price: 329,
    img: "/menu/pepperoni-classic.jpg",
  },
];

const PopularPizzas = () => {
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const toggleLike = (i: number) =>
    setLiked((prev) => ({ ...prev, [i]: !prev[i] }));

  return (
    <section className="max-w-7xl mx-auto px-5 sm:px-6 pt-14 pb-20">
      <div className="flex items-end justify-between mb-7">
        <h2
          className="text-2xl sm:text-3xl text-[#2E2B27]"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
        >
          Popular pizzas
        </h2>
        <a
          href="#"
          className="hidden sm:flex items-center gap-1 text-[13px] text-[#5C7350] hover:text-[#BD6A3C] transition-colors"
          style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
        >
          View all →
        </a>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {pizzas.map((pizza, i) => (
          <div
            key={pizza.name}
            className="bg-white rounded-2xl border border-[#EFE9DC] p-3 sm:p-4 flex flex-col"
          >
            <div className="relative rounded-xl overflow-hidden bg-[#F3EFE6] aspect-square mb-3">
              <img
                src={pizza.img}
                alt={pizza.name}
                className="w-full h-full object-cover"
              />

              {pizza.bestseller && (
                <span
                  className="absolute top-2 left-2 bg-[#BD6A3C] text-white text-[10px] uppercase tracking-[0.08em] px-2.5 py-1 rounded-full"
                  style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
                >
                  Bestseller
                </span>
              )}

              <button
                aria-label={liked[i] ? "Remove from favorites" : "Add to favorites"}
                onClick={() => toggleLike(i)}
                className="
                  absolute top-2 right-2 w-8 h-8 rounded-full
                  bg-white/90 backdrop-blur
                  flex items-center justify-center
                  shadow-[0_4px_10px_rgba(46,43,39,0.12)]
                "
              >
                <Heart
                  size={15}
                  className={liked[i] ? "text-[#BD6A3C] fill-[#BD6A3C]" : "text-[#A69D8C]"}
                />
              </button>
            </div>

            <h3
              className="text-[15px] text-[#2E2B27] mb-1"
              style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
            >
              {pizza.name}
            </h3>
            <p className="text-[12px] text-[#8A8477] leading-snug mb-3 flex-1">
              {pizza.desc}
            </p>

            <div className="flex items-center justify-between">
              <span
                className="text-[15px] text-[#2E2B27]"
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 800 }}
              >
                ₹{pizza.price}
              </span>
              <button
                className="
                  flex items-center gap-1.5
                  px-3 py-2 rounded-full
                  bg-[#EEF2EA] text-[#5C7350] text-[12px]
                  hover:bg-[#5C7350] hover:text-white
                  transition-colors duration-200
                "
                style={{ fontFamily: "'Manrope', sans-serif", fontWeight: 700 }}
              >
                <ShoppingCart size={13} strokeWidth={2.2} />
                Add
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default PopularPizzas;
