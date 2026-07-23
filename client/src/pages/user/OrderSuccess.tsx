import { CheckCircle2, ShoppingBag, Home } from "lucide-react";
import { Link } from "react-router-dom";

const OrderSuccess = () => {
  return (
    <section className="min-h-screen bg-[#FAF7F2] flex items-center justify-center px-5 py-20">

      <div className="max-w-xl w-full bg-white rounded-[32px] border border-[#E7DED3] shadow-xl p-10 text-center">

        {/* Success Icon */}

        <div className="w-28 h-28 rounded-full bg-green-100 flex items-center justify-center mx-auto">

          <CheckCircle2
            size={70}
            className="text-green-600"
          />

        </div>

        {/* Heading */}

        <h1 className="mt-8 text-4xl font-black text-[#2E2B27]">
          Order Placed Successfully!
        </h1>

        <p className="mt-5 text-gray-600 leading-8">
          Thank you for choosing
          <span className="font-bold text-[#BD6A3C]">
            {" "}PizzaHub
          </span>
          .
          <br />
          Your delicious pizza is now being prepared by our chefs.
        </p>

        {/* Order Details */}

        <div className="mt-10 bg-[#FAF7F2] rounded-2xl border border-[#E7DED3] p-6">

          <div className="flex justify-between py-3">
            <span className="text-gray-500">
              Order Status
            </span>

            <span className="font-bold text-yellow-600">
              Preparing
            </span>
          </div>

          <hr />

          <div className="flex justify-between py-3">
            <span className="text-gray-500">
              Estimated Delivery
            </span>

            <span className="font-bold">
              20 - 30 Minutes
            </span>
          </div>

          <hr />

          <div className="flex justify-between py-3">
            <span className="text-gray-500">
              Payment
            </span>

            <span className="font-bold text-green-600">
              Confirmed
            </span>
          </div>

        </div>

        {/* Buttons */}

        <div className="mt-10 space-y-4">

          <Link
            to="/orders"
            className="w-full h-14 rounded-full bg-[#BD6A3C] hover:bg-[#A85A2F] text-white font-bold flex items-center justify-center gap-3 transition-all duration-300"
          >
            <ShoppingBag size={20} />
            View My Orders
          </Link>

          <Link
            to="/"
            className="w-full h-14 rounded-full border-2 border-[#BD6A3C] text-[#BD6A3C] hover:bg-[#BD6A3C] hover:text-white font-bold flex items-center justify-center gap-3 transition-all duration-300"
          >
            <Home size={20} />
            Back To Home
          </Link>

        </div>

      </div>

    </section>
  );
};

export default OrderSuccess;