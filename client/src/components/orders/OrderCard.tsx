import {
  CalendarDays,
  Package,
  ChevronRight,
} from "lucide-react";
import { Link } from "react-router-dom";
const IMAGE_URL = "http://localhost:5000";
interface Props {
  order: any;
}

const OrderCard = ({ order }: Props) => {
  const getStatusStyle = (status: string) => {
    switch (status) {
      case "Placed":
        return "bg-blue-100 text-blue-700";

      case "Preparing":
        return "bg-yellow-100 text-yellow-700";

      case "Out For Delivery":
        return "bg-purple-100 text-purple-700";

      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="bg-white rounded-3xl border border-[#E7DED3] shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden">

      <div className="p-7">

        {/* Header */}

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-5">

          <div>

            <h2 className="text-2xl font-black text-[#2E2B27]">
              Order #{order._id.slice(-6).toUpperCase()}
            </h2>

            <div className="flex items-center gap-2 text-gray-500 mt-2">

              <CalendarDays size={16} />

              <span>
                {new Date(order.createdAt).toLocaleDateString()}
              </span>

            </div>

          </div>

          <span
            className={`px-5 py-2 rounded-full font-bold text-sm w-fit ${getStatusStyle(
              order.orderStatus
            )}`}
          >
            {order.orderStatus}
          </span>

        </div>

        {/* Divider */}

        <hr className="my-6 border-[#ECE6DB]" />

        {/* Items */}

        <div className="space-y-4">

          {order.items.map((item: any) => (
            <div
              key={item._id}
              className="flex justify-between items-center"
            >
              <div className="flex items-center gap-4">

                <img
                src={`${IMAGE_URL}${item.pizza.image}`}
                alt={item.pizza.name}
                  className="w-16 h-16 rounded-xl object-cover border border-[#E7DED3]"
                />

                <div>

                  <h3 className="font-bold text-[#2E2B27]">
                    {item.pizza.name}
                  </h3>

                  <p className="text-gray-500 text-sm">
                    {item.size} • Qty {item.quantity}
                  </p>

                </div>

              </div>

              <span className="font-bold text-[#BD6A3C]">
                ₹{item.price * item.quantity}
              </span>

            </div>
          ))}

        </div>

        {/* Footer */}

        <hr className="my-6 border-[#ECE6DB]" />

        <div className="flex flex-col md:flex-row justify-between md:items-center gap-5">

          <div>

            <p className="text-gray-500 text-sm">
              Payment
            </p>

            <h3 className="font-bold">
              {order.paymentMethod}
            </h3>

          </div>

          <div>

            <p className="text-gray-500 text-sm">
              Total Amount
            </p>

            <h2 className="text-3xl font-black text-[#BD6A3C]">
              ₹{order.totalAmount}
            </h2>

          </div>

          <Link
            to={`/orders/${order._id}`}
            className="h-12 px-6 rounded-full bg-[#BD6A3C] hover:bg-[#A85A2F] text-white font-bold flex items-center justify-center gap-2 transition-all duration-300"
          >
            <Package size={18} />

            View Details

            <ChevronRight size={18} />

          </Link>

        </div>

      </div>

    </div>
  );
};

export default OrderCard;