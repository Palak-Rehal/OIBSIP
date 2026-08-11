import { motion } from "framer-motion";

interface Crust {
  name: string;
  price: number;
  description: string;
}

interface CrustSelectorProps {
  crusts: {
    name: string;
    price: number;
  }[];
  selectedCrust: {
    name: string;
    price: number;
  };
  setSelectedCrust: (crust: {
    name: string;
    price: number;
  }) => void;
}

const crusts: Crust[] = [
  {
    name: "Classic",
    description: "Traditional soft crust",
    price: 0,
  },
  {
    name: "Cheese Burst",
    description: "Loaded cheese edge",
    price: 80,
  },
  {
    name: "Thin Crust",
    description: "Crispy & light",
    price: 40,
  },
  {
    name: "Whole Wheat",
    description: "Healthier fiber-rich base",
    price: 30,
  },
  {
    name: "Multigrain",
    description: "Nutty, hearty multigrain base",
    price: 50,
  },
];

const CrustSelector = ({
  selectedCrust,
  setSelectedCrust,
}: CrustSelectorProps) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-bold text-gray-800">
        Select Crust
      </h3>

      <div className="grid gap-3">
        {crusts.map((crust) => {
          const isSelected =
            selectedCrust?.name === crust.name;

          return (
            <motion.button
              type="button"
              key={crust.name}
              whileTap={{ scale: 0.97 }}
              onClick={() => setSelectedCrust(crust)}
              className={`
                w-full
                flex
                items-center
                justify-between
                p-4
                rounded-2xl
                border
                transition-all
                duration-200
                text-left
                ${
                  isSelected
                    ? `
                      bg-orange-500
                      text-white
                      border-orange-500
                      shadow-md
                    `
                    : `
                      bg-white
                      border-orange-100
                      hover:border-orange-400
                      hover:shadow-sm
                    `
                }
              `}
            >
              <div>
                <h4 className="font-semibold text-sm">
                  {crust.name}
                </h4>

                <p
                  className={`
                    text-xs mt-1
                    ${
                      isSelected
                        ? "text-orange-100"
                        : "text-gray-500"
                    }
                  `}
                >
                  {crust.description}
                </p>
              </div>

              <span
                className={`
                  text-sm
                  font-bold
                  whitespace-nowrap
                  ml-4
                  ${
                    isSelected
                      ? "text-white"
                      : "text-orange-600"
                  }
                `}
              >
                {crust.price === 0
                  ? "Free"
                  : `+₹${crust.price}`}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default CrustSelector;