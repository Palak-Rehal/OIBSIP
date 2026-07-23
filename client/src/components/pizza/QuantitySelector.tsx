import { Minus, Plus } from "lucide-react";

interface Props {
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

const QuantitySelector = ({
  quantity,
  setQuantity,
}: Props) => {
  const decrease = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const increase = () => {
    setQuantity(quantity + 1);
  };

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">Quantity</h2>

      <div className="flex items-center gap-5">

        <button
          onClick={decrease}
          className="w-12 h-12 rounded-full border border-[#E7DED3] bg-white hover:bg-[#BD6A3C] hover:text-white transition flex items-center justify-center"
        >
          <Minus size={20} />
        </button>

        <span className="text-2xl font-bold w-10 text-center">
          {quantity}
        </span>

        <button
          onClick={increase}
          className="w-12 h-12 rounded-full border border-[#BD6A3C] bg-[#BD6A3C] text-white hover:scale-105 transition flex items-center justify-center"
        >
          <Plus size={20} />
        </button>

      </div>
    </div>
  );
};

export default QuantitySelector;