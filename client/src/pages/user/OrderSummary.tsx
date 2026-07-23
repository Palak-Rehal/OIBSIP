import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getOrderById } from "../../api/orderApi";
import OrderCard from "../../components/orders/OrderCard";

const OrderSummary = () => {
  const { id } = useParams();

  const [order, setOrder] = useState<any>(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrder();
  }, []);

  const fetchOrder = async () => {
    try {
      const res = await getOrderById(id!);
      setOrder(res.data.order);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );

  if (!order)
    return (
      <div className="min-h-screen flex justify-center items-center">
        Order Not Found
      </div>
    );

  return (
    <section className="bg-[#FAF7F2] min-h-screen pt-28 pb-20">

      <div className="max-w-6xl mx-auto px-5">

        <h1 className="text-5xl font-black mb-10">
          Order Summary
        </h1>

        <OrderCard order={order} />

      </div>

    </section>
  );
};

export default OrderSummary;