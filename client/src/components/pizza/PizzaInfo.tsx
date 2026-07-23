import {
  Star,
  Clock3,
  CheckCircle2,
  XCircle,
  Leaf,
  Flame,
} from "lucide-react";

interface Props {
  pizza: {
    name: string;
    description: string;
    category: string;
    rating: number;
    totalReviews?: number;
    ingredients: string[];
    isAvailable: boolean;
    isFeatured: boolean;
  };
}

const PizzaInfo = ({ pizza }: Props) => {
  return (
    <div className="space-y-8">

      {/* Category */}
      <div className="flex flex-wrap gap-3">

        <span className="px-4 py-2 rounded-full bg-[#F6E7DD] text-[#BD6A3C] font-semibold text-sm">
          {pizza.category}
        </span>

        <span className="px-4 py-2 rounded-full bg-green-100 text-green-700 font-semibold text-sm flex items-center gap-2">
          <Leaf size={15} />
          Fresh Ingredients
        </span>

        <span className="px-4 py-2 rounded-full bg-red-100 text-red-600 font-semibold text-sm flex items-center gap-2">
          <Flame size={15} />
          Handmade
        </span>

      </div>

      {/* Name */}
      <div>

        <h1 className="text-5xl font-black text-[#2E2B27] leading-tight">
          {pizza.name}
        </h1>

        <div className="flex flex-wrap items-center gap-6 mt-5">

          <div className="flex items-center gap-2">

            <Star
              size={20}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="font-bold text-lg">
              {pizza.rating.toFixed(1)}
            </span>

            <span className="text-gray-500">
              ({pizza.totalReviews || 0} Reviews)
            </span>

          </div>

          <div className="flex items-center gap-2 text-gray-500">

            <Clock3 size={18} />

            20-25 mins

          </div>

        </div>

      </div>

      {/* Description */}
      <div>

        <h2 className="text-xl font-bold mb-3">
          Description
        </h2>

        <p className="text-gray-600 leading-8 text-lg">
          {pizza.description}
        </p>

      </div>

      {/* Ingredients */}
      <div>

        <h2 className="text-xl font-bold mb-5">
          Ingredients
        </h2>

        <div className="flex flex-wrap gap-3">

          {pizza.ingredients.map((ingredient) => (
            <span
              key={ingredient}
              className="
                px-4
                py-2
                rounded-full
                bg-[#FAF7F2]
                border
                border-[#E7DED3]
                text-[#2E2B27]
                font-medium
              "
            >
              {ingredient}
            </span>
          ))}

        </div>

      </div>

      {/* Availability */}
      <div>

        {pizza.isAvailable ? (

          <div className="flex items-center gap-3 text-green-600 font-semibold text-lg">

            <CheckCircle2 size={22} />

            Available Now

          </div>

        ) : (

          <div className="flex items-center gap-3 text-red-600 font-semibold text-lg">

            <XCircle size={22} />

            Currently Out of Stock

          </div>

        )}

      </div>

      {/* Extra Info */}
      <div className="grid md:grid-cols-3 gap-5">

        <div className="rounded-2xl bg-white border border-[#E7DED3] p-5 shadow-sm">

          <h3 className="font-bold text-lg mb-2">
            Delivery
          </h3>

          <p className="text-gray-500">
            20–30 Minutes
          </p>

        </div>

        <div className="rounded-2xl bg-white border border-[#E7DED3] p-5 shadow-sm">

          <h3 className="font-bold text-lg mb-2">
            Quality
          </h3>

          <p className="text-gray-500">
            Freshly Prepared Daily
          </p>

        </div>

        <div className="rounded-2xl bg-white border border-[#E7DED3] p-5 shadow-sm">

          <h3 className="font-bold text-lg mb-2">
            Taste
          </h3>

          <p className="text-gray-500">
            Premium Italian Recipe
          </p>

        </div>

      </div>

    </div>
  );
};

export default PizzaInfo;