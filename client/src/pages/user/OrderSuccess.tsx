import { motion } from "framer-motion";
import { CheckCircle2, Package, Home } from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";

interface OrderState {
  orderId?: string;
}

const OrderSuccess = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const state = location.state as OrderState | null;

  const orderId = state?.orderId;

  return (
    <div
      className="
        min-h-screen
        w-full
        bg-[#faf7f2]
        pt-[115px]
        pb-10
        px-4
        flex
        justify-center
        items-start
      "
    >
      <motion.div
        initial={{ opacity: 0, y: 25, scale: 0.97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="
          w-full
          max-w-[520px]
          bg-white
          rounded-[28px]
          border
          border-[#eadfd3]
          shadow-[0_18px_50px_rgba(45,35,25,0.12)]
          px-7
          py-8
          text-center
        "
      >
        {/* Success Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{
            delay: 0.15,
            type: "spring",
            stiffness: 180,
          }}
          className="
            mx-auto
            w-16
            h-16
            rounded-full
            bg-green-50
            flex
            items-center
            justify-center
            mb-5
          "
        >
          <CheckCircle2
            size={46}
            strokeWidth={2.2}
            className="text-green-500"
          />
        </motion.div>

        {/* Title */}
        <h1
          className="
            text-3xl
            md:text-4xl
            font-black
            text-[#292724]
            tracking-tight
          "
        >
          Order Placed!
        </h1>

        {/* Description */}
        <p
          className="
            mt-3
            text-[15px]
            md:text-base
            text-[#756f69]
            leading-relaxed
            max-w-[390px]
            mx-auto
          "
        >
          Thank you for ordering from PizzaHub.
          <br />
          Your delicious pizza is being prepared.
        </p>

        {/* Status */}
        <div
          className="
            mt-5
            inline-flex
            items-center
            gap-2
            px-4
            py-2
            rounded-full
            bg-green-50
            text-green-600
            text-sm
            font-bold
          "
        >
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          Order confirmed
        </div>

        {/* Buttons */}
        <div className="mt-7 space-y-3">
          {/* Track Order */}
          <button
            onClick={() => {
              if (orderId) {
                navigate(`/orders/${orderId}`);
              } else {
                navigate("/orders");
              }
            }}
            className="
              w-full
              h-12
              rounded-2xl
              bg-[#C56B3C]
              text-white
              font-bold
              text-base
              flex
              items-center
              justify-center
              gap-2
              shadow-[0_8px_20px_rgba(197,107,60,0.25)]
              hover:bg-[#b85f32]
              hover:-translate-y-[1px]
              transition-all
            "
          >
            <Package size={20} />
            Track My Order
          </button>

          {/* Home */}
          <button
            onClick={() => navigate("/")}
            className="
              w-full
              h-12
              rounded-2xl
              border
              border-[#C56B3C]
              bg-white
              text-[#C56B3C]
              font-bold
              text-base
              flex
              items-center
              justify-center
              gap-2
              hover:bg-[#fff7f2]
              transition-all
            "
          >
            <Home size={20} />
            Back to Home
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default OrderSuccess;