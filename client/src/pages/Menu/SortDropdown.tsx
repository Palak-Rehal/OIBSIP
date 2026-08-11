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

      <div className="hidden sm:flex items-center gap-2 text-[#22281F] font-semibold">

        <ArrowUpDown
          size={18}
          className="text-[#D8531F]"
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
          text-[#22281F]
          font-semibold
          outline-none
          cursor-pointer
          transition-all
          duration-300
          hover:border-[#D8531F]
          focus:border-[#D8531F]
          focus:ring-2
          focus:ring-[#F5D4BF]
        "
      >
        <option value="latest">
          Newest
        </option>

        <option value="price_asc">
          Price : Low → High
        </option>

        <option value="price_desc">
          Price : High → Low
        </option>

        <option value="rating">
          Highest Rated
        </option>

      </select>

    </div>
  );
};

export default SortDropdown;