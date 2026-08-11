import { motion } from "framer-motion";
import { Pizza } from "lucide-react";

interface PizzaPreviewProps {
  size?: string;
  crust?: string;
  cheese?: string;
  toppings?: string[];
}

const PizzaPreview = ({
  size = "Medium",
  crust = "Classic",
  cheese = "Regular",
  toppings = [],
}: PizzaPreviewProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="
        bg-white
        rounded-3xl
        shadow-xl
        border
        border-orange-100
        p-5
        flex
        flex-col
        items-center
        justify-center
        h-full
      "
    >
      <h2 className="text-lg font-bold text-gray-800 mb-4">
        Your Pizza Preview
      </h2>

      {/* Pizza Circle */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        className="
          relative
          w-44
          h-44
          sm:w-52
          sm:h-52
          rounded-full
          bg-orange-400
          shadow-2xl
          flex
          items-center
          justify-center
          border-[10px]
          border-yellow-600
        "
      >
        {/* Cheese Layer */}
        <div
          className="
            absolute
            inset-3
            rounded-full
            bg-yellow-300
          "
        />

        {/* Toppings */}
        <div className="absolute inset-0 flex items-center justify-center flex-wrap gap-2 p-8">
          {toppings.length > 0 ? (
            toppings.map((item, index) => (
              <motion.span
                key={index}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="
                  text-xl
                  bg-white/70
                  rounded-full
                  px-2
                  py-1
                "
              >
                {item}
              </motion.span>
            ))
          ) : (
            <Pizza
              size={45}
              className="text-red-500"
            />
          )}
        </div>
      </motion.div>


      {/* Details */}
      <div
        className="
          mt-5
          w-full
          bg-orange-50
          rounded-2xl
          p-4
          space-y-2
          text-sm
        "
      >
        <div className="flex justify-between">
          <span className="text-gray-600">
            Size
          </span>
          <span className="font-semibold">
            {size}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Crust
          </span>
          <span className="font-semibold">
            {crust}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Cheese
          </span>
          <span className="font-semibold">
            {cheese}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">
            Toppings
          </span>
          <span className="font-semibold">
            {toppings.length}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PizzaPreview;