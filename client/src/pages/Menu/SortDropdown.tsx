import { ArrowUpDown } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SortDropdown = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="flex items-center gap-3">

      <div className="hidden sm:flex items-center gap-2 text-[#2E2B27] font-semibold">

        <ArrowUpDown
          size={18}
          className="text-[#BD6A3C]"
        />

        Sort By

      </div>

      <select
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        className="
          h-12
          px-5
          rounded-full
          border
          border-[#E7DED3]
          bg-white
          shadow-sm
          text-[#2E2B27]
          font-semibold
          outline-none
          cursor-pointer
          transition-all
          duration-300
          hover:border-[#BD6A3C]
          focus:border-[#BD6A3C]
          focus:ring-2
          focus:ring-[#F5D4BF]
        "
      >
        <option value="latest">
          Newest
        </option>

        <option value="priceLow">
          Price : Low → High
        </option>

        <option value="priceHigh">
          Price : High → Low
        </option>

        <option value="rating">
          Highest Rated
        </option>

        <option value="popular">
          Most Popular
        </option>

      </select>

    </div>
  );
};

export default SortDropdown;