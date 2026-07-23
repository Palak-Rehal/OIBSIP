import { useEffect, useState } from "react";
import { Package } from "lucide-react";
import { getMyOrders } from "../../api/orderApi";
import OrderCard from "../../components/orders/OrderCard";
import EmptyOrders from "../../components/orders/EmptyOrders";

interface Order {
  _id: string;
  totalAmount: number;
  orderStatus: string;
  paymentMethod: string;
  paymentStatus: string;
  createdAt: string;
  items: any[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const res = await getMyOrders();

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-[#FAF7F2]">
        <h2 className="text-2xl font-bold text-[#2E2B27]">
          Loading Orders...
        </h2>
      </div>
    );
  }

  if (orders.length === 0) {
    return <EmptyOrders />;
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] pt-28 pb-20">

      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center gap-3 mb-10">

          <Package
            size={34}
            className="text-[#BD6A3C]"
          />

          <h1 className="text-4xl font-black text-[#2E2B27]">
            My Orders
          </h1>

        </div>

        <div className="space-y-8">

          {orders.map((order) => (

            <OrderCard
              key={order._id}
              order={order}
            />

          ))}

        </div>

      </div>

    </section>
  );
};

export default Orders;