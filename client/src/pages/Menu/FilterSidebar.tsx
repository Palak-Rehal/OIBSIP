import {
  SlidersHorizontal,
  Sparkles,
  IndianRupee,
  RotateCcw,
} from "lucide-react";
import { useEffect, useState } from "react";

interface Props {
  maxPrice: number;
  featured: boolean;
  onPriceChange: (value: number) => void;
  onFeaturedChange: (value: boolean) => void;
}

const FilterSidebar = ({
  maxPrice,
  featured,
  onPriceChange,
  onFeaturedChange,
}: Props) => {
  const [price, setPrice] = useState(maxPrice);

  useEffect(() => {
    setPrice(maxPrice);
  }, [maxPrice]);

  const resetFilters = () => {
    setPrice(1000);
    onPriceChange(1000);
    onFeaturedChange(false);
  };

  return (
    <div className="sticky top-28 rounded-[30px] border border-[#E7DED3] bg-white shadow-xl overflow-hidden">

      {/* Header */}

      <div className="bg-[#BD6A3C] px-6 py-5 text-white">

        <div className="flex items-center gap-3">

          <SlidersHorizontal size={22} />

          <h2 className="text-2xl font-bold">
            Filters
          </h2>

        </div>

        <p className="text-sm text-[#F8E8DD] mt-2">
          Find your perfect pizza.
        </p>

      </div>

      <div className="p-6">

        {/* Price */}

        <div>

          <div className="flex items-center gap-2 mb-5">

            <IndianRupee
              size={18}
              className="text-[#BD6A3C]"
            />

            <h3 className="font-bold text-[#2E2B27]">
              Maximum Price
            </h3>

          </div>

          <input
            type="range"
            min={100}
            max={1000}
            step={50}
            value={price}
            onChange={(e) => {
              const value = Number(e.target.value);

              setPrice(value);

              onPriceChange(value);
            }}
            className="w-full accent-[#BD6A3C]"
          />

          <div className="mt-5 rounded-2xl bg-[#FAF7F2] p-4 flex justify-between">

            <span className="text-gray-500">
              Selected
            </span>

            <span className="font-black text-xl text-[#BD6A3C]">
              ₹{price}
            </span>

          </div>

        </div>

        {/* Featured */}

        <div className="mt-8">

          <label className="flex justify-between items-center rounded-2xl border border-[#E7DED3] px-5 py-4 cursor-pointer hover:border-[#BD6A3C] transition">

            <div>

              <div className="flex items-center gap-2">

                <Sparkles
                  size={18}
                  className="text-[#BD6A3C]"
                />

                <span className="font-semibold">
                  Featured Only
                </span>

              </div>

              <p className="text-sm text-gray-500 mt-1">
                Show chef recommendations.
              </p>

            </div>

            <input
              type="checkbox"
              checked={featured}
              onChange={(e) =>
                onFeaturedChange(e.target.checked)
              }
              className="w-5 h-5 accent-[#BD6A3C]"
            />

          </label>

        </div>

        {/* Reset */}

        <button
          onClick={resetFilters}
          className="mt-8 w-full h-12 rounded-full border border-[#BD6A3C] text-[#BD6A3C] font-bold flex items-center justify-center gap-2 hover:bg-[#BD6A3C] hover:text-white transition"
        >
          <RotateCcw size={18} />

          Reset Filters

        </button>

      </div>

    </div>
  );
};

export default FilterSidebar;