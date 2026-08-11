import { motion } from "framer-motion";

interface Props {
  toppingCount: number;
}

const PizzaComplexity = ({ toppingCount }: Props) => {

  let title = "Beginner";
  let color = "bg-green-500";
  let width = "25%";

  if (toppingCount >= 2) {
    title = "Classic";
    color = "bg-yellow-500";
    width = "50%";
  }

  if (toppingCount >= 4) {
    title = "Gourmet";
    color = "bg-orange-500";
    width = "75%";
  }

  if (toppingCount >= 6) {
    title = "Pizza Monster";
    color = "bg-red-500";
    width = "100%";
  }

  return (
    <div
      className="
      bg-white/5
      backdrop-blur-xl
      border
      border-orange-500/20
      rounded-[30px]
      p-8
      "
    >
      <h2 className="text-2xl font-bold mb-4">
        🍕 Pizza Complexity
      </h2>

      <p className="text-gray-400 mb-6">
        {title}
      </p>

      <div className="w-full h-4 bg-gray-700 rounded-full overflow-hidden">

        <motion.div
          animate={{ width }}
          transition={{ duration: 0.5 }}
          className={`${color} h-full rounded-full`}
        />

      </div>

      <p className="text-sm text-gray-500 mt-4">
        {toppingCount} toppings selected
      </p>
    </div>
  );
};

export default PizzaComplexity;