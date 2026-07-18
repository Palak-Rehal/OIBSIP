import { Search } from "lucide-react";

interface SearchBarProps {
  value?: string;
  onChange?: (value: string) => void;
}

const SearchBar = ({ value = "", onChange }: SearchBarProps) => {
  return (
    <div className="w-full">
      <div className="relative">

        <Search
          size={20}
          className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
        />

        <input
          type="text"
          value={value}
          onChange={(e) => onChange?.(e.target.value)}
          placeholder="Search your favourite pizza..."
          className="
            w-full
            h-14
            rounded-2xl
            border
            border-[#E6DED2]
            bg-white
            pl-12
            pr-4
            text-[#2E2B27]
            placeholder:text-gray-400
            outline-none
            transition-all
            duration-200
            focus:border-[#BD6A3C]
            focus:ring-4
            focus:ring-[#BD6A3C]/20
          "
        />
      </div>
    </div>
  );
};

export default SearchBar;