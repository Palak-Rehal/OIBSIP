interface Size {
  size: string;
  price: number;
}

interface Props {
  sizes: Size[];
  selectedSize: Size | null;
  onSelect: (size: Size) => void;
}

const SizeSelector = ({
  sizes,
  selectedSize,
  onSelect,
}: Props) => {
  return (
    <div>

      <h2 className="font-bold text-xl mb-4">
        Select Size
      </h2>

      <div className="grid grid-cols-3 gap-4">

        {sizes.map((item) => {

          const active =
            selectedSize?.size === item.size;

          return (
            <button
              key={item.size}
              onClick={() => onSelect(item)}
              className={`rounded-2xl border p-5 transition ${
                active
                  ? "bg-[#BD6A3C] text-white border-[#BD6A3C]"
                  : "bg-white border-[#E7DED3] hover:border-[#BD6A3C]"
              }`}
            >

              <p className="font-bold">
                {item.size}
              </p>

              <p className="mt-2">
                ₹{item.price}
              </p>

            </button>
          );
        })}

      </div>

    </div>
  );
};

export default SizeSelector;