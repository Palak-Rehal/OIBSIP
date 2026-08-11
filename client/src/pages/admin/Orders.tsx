import { useEffect, useMemo, useState } from "react";
import {
  Search,
  ShoppingBag,
  Filter,
  Eye,
} from "lucide-react";

import {
  getAllOrders,
  updateOrderStatus,
} from "../../api/adminApi";

interface OrderItem {
  pizza?: {
    name: string;
  };

  name?: string;

  quantity: number;

  price: number;
}

interface Order {
  _id: string;

  user?: {
    name: string;
    email: string;
  };

  items: OrderItem[];

  totalAmount: number;

  paymentStatus: string;

  paymentMethod: string;

  status: string;

  createdAt: string;
}

const Orders = () => {

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] =
    useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const fetchOrders = async () => {

    try {

      const res = await getAllOrders();

      setOrders(res.data.orders || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }

  };

  useEffect(() => {

    fetchOrders();

  }, []);

  const filteredOrders = useMemo(() => {

    return orders.filter((order) => {

      const matchesSearch =

        order.user?.name
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        order.user?.email
          ?.toLowerCase()
          .includes(search.toLowerCase()) ||

        order._id
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesStatus =

        statusFilter === "All" ||

        order.status === statusFilter;

      return matchesSearch && matchesStatus;

    });

  }, [orders, search, statusFilter]);

  const handleStatusChange = async (

    id: string,

    status: string

  ) => {

    try {

      await updateOrderStatus(id, status);

      fetchOrders();

    } catch (err) {

      console.log(err);

    }

  };

  return (

    <div className="min-h-screen bg-[#F8F6F3] p-6 lg:p-10">

      <div className="max-w-7xl mx-auto">

              {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">

        <div>

          <h1 className="text-4xl font-black text-[#2E2B27]">
            Orders Management
          </h1>

          <p className="text-gray-500 mt-2">
            Manage customer orders, payments and delivery status.
          </p>

        </div>

        <div className="flex flex-wrap gap-3 w-full lg:w-auto">

          {/* Search */}

          <div className="relative flex-1 lg:w-72">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-2xl border border-gray-200 bg-white pl-11 pr-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#BD6A3C]"
            />

          </div>

          {/* Filter */}

          <div className="relative">

            <Filter
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="rounded-2xl border border-gray-200 bg-white pl-11 pr-8 py-3 focus:outline-none focus:ring-2 focus:ring-[#BD6A3C]"
            >
              <option>All</option>
              <option>Pending</option>
              <option>Preparing</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <p className="text-gray-500">
            Total Orders
          </p>

          <h2 className="text-4xl font-black mt-2">
            {orders.length}
          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <p className="text-gray-500">
            Pending Orders
          </p>

          <h2 className="text-4xl font-black text-orange-500 mt-2">

            {
              orders.filter(
                (o) => o.status !== "Delivered"
              ).length
            }

          </h2>

        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border">

          <p className="text-gray-500">
            Delivered
          </p>

          <h2 className="text-4xl font-black text-green-600 mt-2">

            {
              orders.filter(
                (o) => o.status === "Delivered"
              ).length
            }

          </h2>

        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-3xl shadow-sm border overflow-hidden">

        <div className="flex items-center gap-3 px-6 py-5 border-b">

          <ShoppingBag
            className="text-[#BD6A3C]"
          />

          <h2 className="text-2xl font-black">
            Customer Orders
          </h2>

        </div>

        {loading ? (

          <div className="py-20 text-center">

            Loading...

          </div>

        ) : filteredOrders.length === 0 ? (

          <div className="py-20 text-center text-gray-500">

            No Orders Found

          </div>

        ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead className="bg-[#FAF7F2]">

                <tr className="text-left text-sm uppercase text-gray-500">

                  <th className="px-6 py-4">
                    Order
                  </th>

                  <th className="px-6 py-4">
                    Customer
                  </th>

                  <th className="px-6 py-4">
                    Pizza
                  </th>

                  <th className="px-6 py-4">
                    Amount
                  </th>

                  <th className="px-6 py-4">
                    Payment
                  </th>

                  <th className="px-6 py-4">
                    Status
                  </th>

                  <th className="px-6 py-4">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>               

         {filteredOrders.map((order) => (

                  <tr
                    key={order._id}
                    className="border-b hover:bg-[#FAF7F2] transition"
                  >

                    {/* Order ID */}

                    <td className="px-6 py-5">

                      <h4 className="font-bold text-[#2E2B27]">
                        #{order._id.slice(-6)}
                      </h4>

                      <p className="text-xs text-gray-400 mt-1">
                        {new Date(
                          order.createdAt
                        ).toLocaleDateString()}
                      </p>

                    </td>

                    {/* Customer */}

                    <td className="px-6 py-5">

                      <p className="font-semibold">
                        {order.user?.name || "Unknown User"}
                      </p>

                      <p className="text-sm text-gray-500">
                        {order.user?.email}
                      </p>

                    </td>

                    {/* Pizza */}

                    <td className="px-6 py-5">

                      {order.items?.[0]?.pizza?.name ||
                        order.items?.[0]?.name ||
                        "Customized Pizza"}

                    </td>

                    {/* Amount */}

                    <td className="px-6 py-5 font-bold">
                      ₹{order.totalAmount}
                    </td>

                    {/* Payment */}

                    <td className="px-6 py-5">

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          order.paymentStatus === "Paid"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                        }`}
                      >
                        {order.paymentStatus}
                      </span>

                    </td>

                    {/* Status */}

                    <td className="px-6 py-5">

                      <select
                        value={order.status}
                        onChange={(e) =>
                          handleStatusChange(
                            order._id,
                            e.target.value
                          )
                        }
                        className="rounded-xl border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#BD6A3C]"
                      >
                        <option value="Pending">
                          Pending
                        </option>

                        <option value="Preparing">
                          Preparing
                        </option>

                        <option value="Out for Delivery">
                          Out for Delivery
                        </option>

                        <option value="Delivered">
                          Delivered
                        </option>

                        <option value="Cancelled">
                          Cancelled
                        </option>

                      </select>

                    </td>

                    {/* View */}

                    <td className="px-6 py-5">

                      <button
                        onClick={() =>
                          setSelectedOrder(order)
                        }
                        className="flex items-center gap-2 bg-[#BD6A3C] hover:bg-[#a85b33] text-white px-4 py-2 rounded-xl transition"
                      >

                        <Eye size={16} />

                        View

                      </button>

                    </td>

                  </tr>

                ))}

              </tbody>

            </table>

          </div>

        )}

      </div>

      </div>


      {/* ================= ORDER DETAILS MODAL ================= */}

      {selectedOrder && (

        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">

          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-xl p-8 relative">


            {/* Close Button */}

            <button
              onClick={() => setSelectedOrder(null)}
              className="absolute right-5 top-5 text-gray-500 hover:text-black text-xl"
            >
              ✕
            </button>



            {/* Header */}

            <h2 className="text-2xl font-bold text-[#2E2B27] mb-6">
              Order Details
            </h2>



            {/* Customer Info */}

            <div className="space-y-3 mb-6">

              <p>
                <span className="font-semibold">
                  Customer:
                </span>{" "}
                {selectedOrder.user?.name || "Unknown"}
              </p>


              <p>
                <span className="font-semibold">
                  Email:
                </span>{" "}
                {selectedOrder.user?.email || "N/A"}
              </p>


              <p>
                <span className="font-semibold">
                  Order ID:
                </span>{" "}
                #{selectedOrder._id}
              </p>


              <p>
                <span className="font-semibold">
                  Date:
                </span>{" "}
                {new Date(
                  selectedOrder.createdAt
                ).toLocaleString()}
              </p>

            </div>



            {/* Items */}

            <h3 className="font-bold text-lg mb-3">
              Items
            </h3>


            <div className="space-y-3 max-h-60 overflow-y-auto">

              {selectedOrder.items?.map(
                (item:any, index:number) => (

                  <div
                    key={index}
                    className="flex justify-between items-center bg-[#FAF7F2] rounded-xl p-4"
                  >

                    <div>

                      <p className="font-semibold">
                        {
                          item.pizza?.name ||
                          item.name ||
                          "Customized Pizza"
                        }
                      </p>


                      {item.size && (

                        <p className="text-sm text-gray-500">
                          Size: {item.size}
                        </p>

                      )}


                      {item.toppings?.length > 0 && (

                        <p className="text-sm text-gray-500">
                          Toppings:{" "}
                          {item.toppings.join(", ")}
                        </p>

                      )}

                    </div>


                    <div className="font-bold">
                      ₹{item.price}
                    </div>


                  </div>

                )
              )}

            </div>



            {/* Payment + Status */}

            <div className="mt-6 border-t pt-5 space-y-3">


              <p>

                <span className="font-semibold">
                  Total Amount:
                </span>{" "}

                ₹{selectedOrder.totalAmount}

              </p>



              <p>

                <span className="font-semibold">
                  Payment:
                </span>{" "}

                {selectedOrder.paymentStatus}

              </p>



              <p>

                <span className="font-semibold">
                  Status:
                </span>{" "}

                {selectedOrder.status}

              </p>


            </div>



            {/* Footer Button */}

            <button
              onClick={() => setSelectedOrder(null)}
              className="mt-6 w-full bg-[#BD6A3C] hover:bg-[#a85b33] text-white py-3 rounded-xl font-semibold transition"
            >

              Close

            </button>


          </div>

        </div>

      )}


    </div>

  );

};


export default Orders;