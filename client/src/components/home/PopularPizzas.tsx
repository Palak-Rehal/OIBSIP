import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight, Flame } from "lucide-react";
import { getAllPizzas } from "../../api/pizzaApi";
import PizzaCard from "../common/PizzaCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

interface Pizza {
  _id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  totalReviews?: number;
  isFeatured: boolean;
  isAvailable: boolean;
  sizes: {
    size: string;
    price: number;
  }[];
}

const PopularPizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      setLoading(true);

      // Get ALL available pizzas
      const res = await getAllPizzas(
        "",
        "",
        "rating",
        0,
        1000,
        false
      );

      setPizzas(res.data.pizzas || []);
    } catch (err) {
      console.error("Failed to load popular pizzas:", err);
      setPizzas([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative py-20 overflow-hidden bg-[#FAF7F2]">

      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,#F8C89A30,transparent_45%)]" />

      <div className="relative max-w-7xl mx-auto px-5">

        {/* Header */}
        <div className="flex items-end justify-between mb-12">

          <div>

            <span className="inline-flex items-center gap-2 rounded-full bg-orange-100 text-orange-600 px-4 py-2 text-sm font-semibold">

              <Flame size={16} />

              Popular This Week

            </span>

            <h2 className="mt-5 text-5xl font-black text-[#2E2B27]">
              Popular Pizzas
            </h2>

            <p className="mt-3 text-gray-500">
              Freshly baked & most loved pizzas
            </p>

          </div>

          {/* Navigation */}
          <div className="hidden md:flex gap-3">

            <button
              className="
                popular-prev
                h-12
                w-12
                rounded-full
                bg-white
                shadow-lg
                hover:bg-orange-500
                hover:text-white
                transition
                flex
                items-center
                justify-center
              "
            >
              <ChevronLeft size={20} />
            </button>

            <button
              className="
                popular-next
                h-12
                w-12
                rounded-full
                bg-white
                shadow-lg
                hover:bg-orange-500
                hover:text-white
                transition
                flex
                items-center
                justify-center
              "
            >
              <ChevronRight size={20} />
            </button>

          </div>

        </div>

        {/* Loading */}
        {loading ? (

          <div className="text-center py-20 text-gray-500">
            Loading delicious pizzas...
          </div>

        ) : pizzas.length === 0 ? (

          <div className="text-center py-20 text-gray-500">
            No pizzas available.
          </div>

        ) : (

          <Swiper
            modules={[Navigation, Autoplay]}

            navigation={{
              nextEl: ".popular-next",
              prevEl: ".popular-prev",
            }}

            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}

            loop={pizzas.length > 4}

            grabCursor={true}

            spaceBetween={28}

            breakpoints={{
              0: {
                slidesPerView: 1.1,
              },

              640: {
                slidesPerView: 2,
              },

              1024: {
                slidesPerView: 3,
              },

              1280: {
                slidesPerView: 4,
              },
            }}
          >

            {pizzas.map((pizza) => (

              <SwiperSlide key={pizza._id}>

                <PizzaCard pizza={pizza} />

              </SwiperSlide>

            ))}

          </Swiper>

        )}

      </div>

    </section>
  );
};

export default PopularPizzas;