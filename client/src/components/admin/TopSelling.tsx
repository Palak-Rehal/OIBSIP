import {
  TrendingUp,
  ShoppingBag,
  ArrowUpRight,
} from "lucide-react";

interface Pizza {
  name: string;
  image: string;
  orders: number;
  revenue: string;
}

const pizzas: Pizza[] = [
  {
    name: "Margherita Pizza",
    image:
      "https://images.unsplash.com/photo-1604068549290-dea0e4a305ca",
    orders: 145,
    revenue: "₹32,500",
  },
  {
    name: "Farmhouse Pizza",
    image:
      "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38",
    orders: 120,
    revenue: "₹28,800",
  },
  {
    name: "Pepperoni Pizza",
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591",
    orders: 98,
    revenue: "₹24,200",
  },
];

const rankStyles = [
  "bg-[#F3E1D3] text-[#BD6A3C]",
  "bg-[#F1EEE9] text-[#766E64]",
  "bg-[#F7EBDD] text-[#9A6A42]",
];

const TopSelling = () => {
  return (
    <div className="w-full">

      {/* ================= HEADER ================= */}

      <div className="mb-5 flex items-center justify-between">

        <div className="flex items-center gap-3">

          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#F3E1D3] text-[#BD6A3C]">
            <TrendingUp size={17} />
          </div>

          <div>
            <h2 className="text-base font-black tracking-tight text-[#292622]">
              Top Selling Pizzas
            </h2>

            <p className="mt-0.5 text-[11px] text-[#938A80]">
              Best performing items
            </p>
          </div>

        </div>

        <button
          className="
            flex
            items-center
            gap-1
            rounded-lg
            px-2
            py-1.5
            text-[11px]
            font-bold
            text-[#BD6A3C]
            transition
            hover:bg-[#FAF3ED]
          "
        >
          View all
          <ArrowUpRight size={13} />
        </button>

      </div>


      {/* ================= PRODUCTS ================= */}

      <div className="space-y-2.5">

        {pizzas.map((pizza, index) => (

          <div
            key={pizza.name}
            className="
              group
              flex
              items-center
              gap-3
              rounded-2xl
              border
              border-[#EEE8E1]
              bg-[#FCFAF7]
              px-3
              py-2.5
              transition-all
              duration-200
              hover:-translate-y-[1px]
              hover:border-[#E4D3C5]
              hover:bg-white
              hover:shadow-[0_8px_20px_rgba(46,43,39,0.06)]
            "
          >

            {/* Rank */}

            <div
              className={`
                flex
                h-6
                w-6
                shrink-0
                items-center
                justify-center
                rounded-lg
                text-[10px]
                font-black
                ${rankStyles[index] || "bg-gray-100 text-gray-600"}
              `}
            >
              {index + 1}
            </div>


            {/* Pizza Image */}

            <div className="relative shrink-0">

              <img
                src={pizza.image}
                alt={pizza.name}
                className="
                  h-12
                  w-12
                  rounded-xl
                  object-cover
                  shadow-sm
                  transition-transform
                  duration-300
                  group-hover:scale-105
                "
              />

              <div
                className="
                  absolute
                  -bottom-1
                  -right-1
                  flex
                  h-5
                  w-5
                  items-center
                  justify-center
                  rounded-full
                  border-2
                  border-white
                  bg-[#292622]
                  text-white
                "
              >
                <ShoppingBag size={9} />
              </div>

            </div>


            {/* Details */}

            <div className="min-w-0 flex-1">

              <h3
                className="
                  truncate
                  text-[13px]
                  font-black
                  text-[#302C28]
                "
              >
                {pizza.name}
              </h3>

              <div className="mt-1 flex items-center gap-1.5">

                <span className="text-[10px] font-semibold text-[#91877C]">
                  {pizza.orders} orders
                </span>

                <span className="h-1 w-1 rounded-full bg-[#C9C0B7]" />

                <span className="text-[10px] font-semibold text-[#26924D]">
                  Popular
                </span>

              </div>

            </div>


            {/* Revenue */}

            <div className="shrink-0 text-right">

              <p className="text-[13px] font-black text-[#292622]">
                {pizza.revenue}
              </p>

              <p className="mt-0.5 text-[9px] font-medium text-[#A1988E]">
                Revenue
              </p>

            </div>

          </div>

        ))}

      </div>


      {/* ================= FOOTER ================= */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          rounded-xl
          bg-[#F8F3EE]
          px-3
          py-2.5
        "
      >

        <div className="flex items-center gap-2">

          <span className="h-1.5 w-1.5 rounded-full bg-[#26924D]" />

          <span className="text-[10px] font-semibold text-[#756C62]">
            Top performers this month
          </span>

        </div>

        <span className="text-[10px] font-black text-[#BD6A3C]">
          {pizzas.length} items
        </span>

      </div>

    </div>
  );
};

export default TopSelling;