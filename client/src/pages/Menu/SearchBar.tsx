import { Search, X } from "lucide-react";

interface Props {
  value: string;
  onChange: (value: string) => void;
}

const SearchBar = ({
  value,
  onChange,
}: Props) => {
  return (
    <div className="relative w-full">

      <Search
        size={20}
        className="absolute left-5 top-1/2 -translate-y-1/2 text-[#BD6A3C]"
      />

      <input
        type="text"
        value={value}
        onChange={(e) =>
          onChange(e.target.value)
        }
        placeholder="Search your favourite pizza..."
        className="
          w-full
          h-16
          rounded-full
          bg-white
          border
          border-[#E7DED3]
          pl-14
          pr-14
          text-lg
          shadow-sm
          transition-all
          duration-300
          focus:outline-none
          focus:border-[#BD6A3C]
          focus:shadow-lg
          placeholder:text-gray-400
        "
      />

      {value && (
        <button
          onClick={() => onChange("")}
          className="
            absolute
            right-5
            top-1/2
            -translate-y-1/2
            w-9
            h-9
            rounded-full
            bg-[#FAF7F2]
            hover:bg-[#BD6A3C]
            hover:text-white
            transition
            flex
            items-center
            justify-center
          "
        >
          <X size={18} />
        </button>
      )}

    </div>
  );
};

export default SearchBar;