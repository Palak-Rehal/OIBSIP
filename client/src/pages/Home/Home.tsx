import { Star, Clock } from "lucide-react";
import CategoryFilter from "../../components/ui/sections/CategoryFilter";
import PopularPizzas from "../../components/ui/sections/PopularPizzas";


const Home = () => {
  return (
    <>
      <section className="min-h-[85svh] md:min-h-[80vh] flex items-center pt-24 md:pt-28 pb-16 md:pb-20 bg-[#FAF7F2] overflow-hidden">

        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 px-5 sm:px-6 items-center">

          {/* IMAGE */}
          <div className="flex justify-center relative">

            <div className="absolute w-[300px] h-[300px] bg-[#E7B896] rounded-full blur-3xl opacity-40" />

            <div className="absolute w-[320px] h-[320px] rounded-full border-2 border-dashed border-[#7C9473]/30 animate-spin-slow" />

            <img
              src="/Pizza.png"
              alt="Pizza"
              className="relative w-[320px] md:w-[450px] object-contain drop-shadow-2xl"
            />

            {/* badge */}
            <div className="absolute bottom-2 left-2 bg-white px-4 py-2 rounded-xl shadow">
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[#BD6A3C]" />
                <div>
                  <p className="text-sm font-bold">20–25 min</p>
                  <p className="text-xs text-gray-500">Delivery</p>
                </div>
              </div>
            </div>

            {/* rating */}
            <div className="absolute top-2 right-2 bg-white px-3 py-1 rounded-full shadow flex items-center gap-1">
              <Star size={14} className="text-yellow-500 fill-yellow-500" />
              <span className="text-sm font-bold">4.9</span>
            </div>

          </div>

          {/* TEXT */}
          <div>
            <p className="text-green-700 tracking-widest uppercase text-sm font-semibold">
              Fresh & hot
            </p>

            <h1 className="text-5xl md:text-6xl font-extrabold mt-4">
              Handmade <br />
              <span className="text-[#BD6A3C] italic">Italian Pizza</span>
            </h1>

            <p className="mt-5 text-gray-600 max-w-md">
              Fresh dough, premium cheese, and authentic Italian taste delivered hot.
            </p>

            <button className="mt-8 bg-[#BD6A3C] text-white px-8 py-4 rounded-full hover:scale-105 transition">
              Order Now
            </button>
          </div>

        </div>
      </section>

      <CategoryFilter />
      <PopularPizzas />
    </>
  );
};

export default Home;