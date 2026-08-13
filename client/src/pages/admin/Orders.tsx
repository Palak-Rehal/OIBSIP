import { useEffect, useMemo, useState } from "react";

import {
  Search,
  ShoppingBag,
  Filter,
  Eye,
  X,
  CalendarDays,
  CreditCard,
  User,
  Package,
  IndianRupee,
  CheckCircle2,
  Clock3,
  Truck,
  XCircle,
  ChevronDown,
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

  size?: string;

  toppings?: string[];
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

  orderStatus: string;

  createdAt: string;
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [statusFilter, setStatusFilter] = useState("All");

  const [selectedOrder, setSelectedOrder] =
    useState<Order | null>(null);

  const [updatingId, setUpdatingId] = useState<string | null>(
    null
  );

  // ================= FETCH ORDERS =================

  const fetchOrders = async () => {
    try {
      setLoading(true);

      const res = await getAllOrders();

      setOrders(res.data.orders || []);
    } catch (error) {
      console.error("Failed to fetch orders:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // ================= FILTER =================

  const filteredOrders = useMemo(() => {
    const query = search.trim().toLowerCase();

    return orders.filter((order) => {
      const customerName =
        order.user?.name?.toLowerCase() || "";

      const customerEmail =
        order.user?.email?.toLowerCase() || "";

      const orderId = order._id.toLowerCase();

      const pizzaName =
        order.items?.[0]?.pizza?.name?.toLowerCase() ||
        order.items?.[0]?.name?.toLowerCase() ||
        "customized pizza";

      const matchesSearch =
        !query ||
        customerName.includes(query) ||
        customerEmail.includes(query) ||
        orderId.includes(query) ||
        pizzaName.includes(query);

      const matchesStatus =
        statusFilter === "All" ||
        order.orderStatus === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [orders, search, statusFilter]);

  // ================= STATUS UPDATE =================

  const handleStatusChange = async (
    id: string,
    status: string
  ) => {
    try {
      setUpdatingId(id);

      await updateOrderStatus(id, status);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === id
            ? {
              ...order,
             orderStatus: status,
            }
            : order
        )
      );
    } catch (error) {
      console.error("Failed to update order:", error);
    } finally {
      setUpdatingId(null);
    }
  };

  // ================= STATUS UI =================

  const getStatusConfig = (status: string) => {
    switch (status) {
      case "Placed":
        return {
          label: "Order Received",
          icon: Clock3,
          className:
            "bg-amber-50 text-amber-700 border-amber-200",
        };

      case "Preparing":
        return {
          label: "In Kitchen",
          icon: Package,
          className:
            "bg-blue-50 text-blue-700 border-blue-200",
        };

      case "Out For Delivery":
        return {
          label: "Out for Delivery",
          icon: Truck,
          className:
            "bg-purple-50 text-purple-700 border-purple-200",
        };

      case "Delivered":
        return {
          label: "Delivered",
          icon: CheckCircle2,
          className:
            "bg-emerald-50 text-emerald-700 border-emerald-200",
        };

      case "Cancelled":
        return {
          label: "Cancelled",
          icon: XCircle,
          className:
            "bg-red-50 text-red-700 border-red-200",
        };

      default:
        return {
          label: status,
          icon: Clock3,
          className:
            "bg-gray-50 text-gray-600 border-gray-200",
        };
    }
  };

  // ================= STATS =================

  const totalOrders = orders.length;

  const pendingOrders = orders.filter(
    (order) =>
      order.orderStatus !== "Delivered" &&
      order.orderStatus !== "Cancelled"
  ).length;

  const deliveredOrders = orders.filter(
    (order) => order.orderStatus === "Delivered"
  ).length;

  const cancelledOrders = orders.filter(
    (order) => order.orderStatus === "Cancelled"
  ).length;

  // ================= DATE =================

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // ================= AVATAR =================

  const getInitial = (name?: string) => {
    if (!name) return "U";

    return name.charAt(0).toUpperCase();
  };

  // ================= RENDER =================

  return (
    <div className="w-full max-w-[1500px] mx-auto pb-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

        <div>

          <div className="flex items-center gap-2 mb-2">

            <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

            <span className="text-xs font-bold tracking-[2px] uppercase text-[#BD6A3C]">
              PizzaHub Admin
            </span>

          </div>

          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#24211F]">
            Orders
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customer orders, payments and delivery.
          </p>

        </div>

        {/* Search + Filter */}

        <div className="flex flex-col sm:flex-row gap-3 w-full xl:w-auto">

          {/* Search */}

          <div className="relative w-full sm:w-[280px]">

            <Search
              size={17}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Search orders..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                h-11
                rounded-xl
                border
                border-[#E8E1DB]
                bg-white
                pl-10
                pr-4
                text-sm
                text-[#2E2B27]
                placeholder:text-gray-400
                shadow-sm
                outline-none
                transition
                focus:border-[#BD6A3C]
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            />

          </div>

          {/* Filter */}

          <div className="relative w-full sm:w-[180px]">

            <Filter
              size={16}
              className="
                absolute
                left-3.5
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

            <select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.target.value)
              }
              className="
                appearance-none
                w-full
                h-11
                rounded-xl
                border
                border-[#E8E1DB]
                bg-white
                pl-10
                pr-9
                text-sm
                font-semibold
                text-[#2E2B27]
                shadow-sm
                outline-none
                cursor-pointer
                focus:border-[#BD6A3C]
                focus:ring-4
                focus:ring-[#BD6A3C]/10
              "
            >
              <option value="All">
                All Orders
              </option>

              <option value="Placed">
                Order Received
              </option>

              <option value="Preparing">
                In Kitchen
              </option>

              <option value="Out For Delivery">
                Out for Delivery
              </option>

              <option value="Delivered">
                Delivered
              </option>

              <option value="Cancelled">
                Cancelled
              </option>
            </select>

            <ChevronDown
              size={16}
              className="
                absolute
                right-3
                top-1/2
                -translate-y-1/2
                text-gray-400
                pointer-events-none
              "
            />

          </div>

        </div>

      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {/* Total */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Total Orders
              </p>

              <h2 className="text-2xl font-black text-[#24211F] mt-1">
                {totalOrders}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-[#FBE8DC] flex items-center justify-center">
              <ShoppingBag
                size={19}
                className="text-[#BD6A3C]"
              />
            </div>

          </div>

        </div>


        {/* Pending */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Active Orders
              </p>

              <h2 className="text-2xl font-black text-amber-600 mt-1">
                {pendingOrders}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-amber-50 flex items-center justify-center">
              <Clock3
                size={19}
                className="text-amber-600"
              />
            </div>

          </div>

        </div>


        {/* Delivered */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Delivered
              </p>

              <h2 className="text-2xl font-black text-emerald-600 mt-1">
                {deliveredOrders}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">
              <CheckCircle2
                size={19}
                className="text-emerald-600"
              />
            </div>

          </div>

        </div>


        {/* Cancelled */}

        <div
          className="
            group
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Cancelled
              </p>

              <h2 className="text-2xl font-black text-red-600 mt-1">
                {cancelledOrders}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">
              <XCircle
                size={19}
                className="text-red-600"
              />
            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ORDERS CARD
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E9E1DA]
          bg-white
          shadow-sm
        "
      >

        {/* Card Header */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            px-5
            py-4
            border-b
            border-[#EEE7E1]
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                h-9
                w-9
                rounded-xl
                bg-[#FBE8DC]
                flex
                items-center
                justify-center
              "
            >
              <ShoppingBag
                size={18}
                className="text-[#BD6A3C]"
              />
            </div>

            <div>

              <h2 className="text-lg font-black text-[#24211F]">
                Customer Orders
              </h2>

              <p className="text-xs text-gray-500">
                {filteredOrders.length} order
                {filteredOrders.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>

          <div className="text-xs font-semibold text-gray-400">
            Showing {filteredOrders.length} of{" "}
            {orders.length}
          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="p-5 space-y-3">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="
                  h-16
                  rounded-xl
                  bg-gray-100
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : filteredOrders.length === 0 ? (

          /* =================================================
              EMPTY
          ================================================= */

          <div className="py-16 text-center">

            <div
              className="
                mx-auto
                h-14
                w-14
                rounded-2xl
                bg-[#F8F3EF]
                flex
                items-center
                justify-center
                mb-3
              "
            >
              <ShoppingBag
                size={25}
                className="text-[#BD6A3C]"
              />
            </div>

            <h3 className="font-bold text-[#2E2B27]">
              No orders found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search or filter.
            </p>

          </div>

        ) : (

          /* =================================================
              TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[1050px]">

              <thead>

                <tr className="bg-[#FBF9F7] border-b border-[#EEE7E1]">

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Order
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Customer
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Items
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Amount
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Payment
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredOrders.map((order) => {

                  const status =
                    getStatusConfig(order.orderStatus);

                  const firstItem =
                    order.items?.[0];
                  order.items?.[0];

                  const pizzaName =
                    firstItem?.pizza?.name ||
                    firstItem?.name ||
                    "Customized Pizza";

                  const totalItems =
                    order.items?.reduce(
                      (sum, item) =>
                        sum + (item.quantity || 0),
                      0
                    ) || 0;

                  return (

                    <tr
                      key={order._id}
                      className="
                        border-b
                        border-[#F0EBE7]
                        last:border-b-0
                        hover:bg-[#FCFAF8]
                        transition-colors
                      "
                    >

                      {/* ORDER */}

                      <td className="px-5 py-3.5">

                        <div>

                          <p className="text-sm font-bold text-[#2E2B27]">
                            #{order._id.slice(-6).toUpperCase()}
                          </p>

                          <div className="flex items-center gap-1.5 mt-1 text-[11px] text-gray-400">

                            <CalendarDays size={11} />

                            {formatDate(
                              order.createdAt
                            )}

                            <span>•</span>

                            {formatTime(
                              order.createdAt
                            )}

                          </div>

                        </div>

                      </td>


                      {/* CUSTOMER */}

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-2.5">

                          <div
                            className="
                              h-9
                              w-9
                              shrink-0
                              rounded-xl
                              bg-gradient-to-br
                              from-[#BD6A3C]
                              to-[#E7A06F]
                              text-white
                              flex
                              items-center
                              justify-center
                              text-sm
                              font-black
                            "
                          >
                            {getInitial(
                              order.user?.name
                            )}
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-bold text-[#2E2B27] truncate max-w-[150px]">
                              {order.user?.name ||
                                "Unknown User"}
                            </p>

                            <p className="text-[11px] text-gray-400 truncate max-w-[150px]">
                              {order.user?.email ||
                                "No email"}
                            </p>

                          </div>

                        </div>

                      </td>


                      {/* ITEMS */}

                      <td className="px-4 py-3.5">

                        <div className="max-w-[180px]">

                          <p className="text-sm font-semibold text-[#2E2B27] truncate">
                            {pizzaName}
                          </p>

                          <p className="text-[11px] text-gray-400 mt-0.5">
                            {totalItems} item
                            {totalItems !== 1
                              ? "s"
                              : ""}

                            {order.items?.length >
                              1 &&
                              ` • +${order.items.length - 1
                              } more`}
                          </p>

                        </div>

                      </td>


                      {/* AMOUNT */}

                      <td className="px-4 py-3.5">

                        <div className="flex items-center gap-0.5">

                          <IndianRupee
                            size={13}
                            className="text-[#2E2B27]"
                          />

                          <span className="text-sm font-black text-[#2E2B27]">
                            {order.totalAmount}
                          </span>

                        </div>

                      </td>


                      {/* PAYMENT */}

                      <td className="px-4 py-3.5">

                        <div>

                          <span
                            className={`
                              inline-flex
                              items-center
                              gap-1.5
                              rounded-full
                              border
                              px-2.5
                              py-1
                              text-[10px]
                              font-bold
                              ${order.paymentStatus ===
                                "Paid"
                                ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                                : "border-red-200 bg-red-50 text-red-700"
                              }
                            `}
                          >

                            {order.paymentStatus ===
                              "Paid" ? (
                              <CheckCircle2
                                size={11}
                              />
                            ) : (
                              <XCircle
                                size={11}
                              />
                            )}

                            {order.paymentStatus}

                          </span>

                          <p className="text-[10px] text-gray-400 mt-1 ml-1">
                            {order.paymentMethod ||
                              "Online"}
                          </p>

                        </div>

                      </td>


                      {/* STATUS */}

                      <td className="px-4 py-3.5">

                        <div className="relative">

                          <select
                            value={order.orderStatus}
                            disabled={
                              updatingId ===
                              order._id
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className={`
                              appearance-none
                              w-[155px]
                              rounded-lg
                              border
                              pl-3
                              pr-7
                              py-2
                              text-[11px]
                              font-bold
                              outline-none
                              cursor-pointer
                              transition
                              ${status.className}
                              ${updatingId ===
                                order._id
                                ? "opacity-50 cursor-wait"
                                : ""
                              }
                            `}
                          >

                            <option value="Placed">
                              Order Received
                            </option>

                            <option value="Preparing">
                              In Kitchen
                            </option>

                            <option value="Out For Delivery">
                              Out for Delivery
                            </option>

                            <option value="Delivered">
                              Delivered
                            </option>

                            <option value="Cancelled">
                              Cancelled
                            </option>

                          </select>

                          <ChevronDown
                            size={13}
                            className="
                              absolute
                              right-2
                              top-1/2
                              -translate-y-1/2
                              pointer-events-none
                              opacity-60
                            "
                          />

                        </div>

                      </td>


                      {/* ACTION */}

                      <td className="px-5 py-3.5 text-right">

                        <button
                          onClick={() =>
                            setSelectedOrder(
                              order
                            )
                          }
                          className="
                            inline-flex
                            items-center
                            gap-1.5
                            rounded-lg
                            border
                            border-[#E5D8CE]
                            bg-white
                            px-3
                            py-2
                            text-xs
                            font-bold
                            text-[#BD6A3C]
                            shadow-sm
                            transition
                            hover:bg-[#BD6A3C]
                            hover:text-white
                            hover:border-[#BD6A3C]
                          "
                        >

                          <Eye size={14} />

                          View

                        </button>

                      </td>

                    </tr>

                  );
                })}

              </tbody>

            </table>

          </div>

        )}

      </div>


      {/* =====================================================
          ORDER DETAILS MODAL
      ===================================================== */}

      {selectedOrder && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#1C1714]/50
            backdrop-blur-sm
            p-4
          "
          onClick={() =>
            setSelectedOrder(null)
          }
        >

          <div
            className="
              relative
              w-full
              max-w-2xl
              max-h-[90vh]
              overflow-y-auto
              rounded-3xl
              border
              border-white/40
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div
              className="
                sticky
                top-0
                z-10
                flex
                items-center
                justify-between
                border-b
                border-[#EEE7E1]
                bg-white/95
                backdrop-blur-md
                px-6
                py-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    h-11
                    w-11
                    rounded-2xl
                    bg-[#FBE8DC]
                    flex
                    items-center
                    justify-center
                  "
                >
                  <ShoppingBag
                    size={20}
                    className="text-[#BD6A3C]"
                  />
                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#BD6A3C]">
                    Order Details
                  </p>

                  <h2 className="text-xl font-black text-[#24211F]">
                    #{selectedOrder._id
                      .slice(-8)
                      .toUpperCase()}
                  </h2>

                </div>

              </div>

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="
                  h-9
                  w-9
                  rounded-xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  transition
                  hover:bg-gray-200
                  hover:text-gray-800
                "
              >
                <X size={18} />
              </button>

            </div>


            {/* Modal Content */}

            <div className="p-6">

              {/* Customer */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#EDE5DE]
                  bg-[#FCFAF8]
                  p-4
                  mb-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      h-11
                      w-11
                      rounded-xl
                      bg-gradient-to-br
                      from-[#BD6A3C]
                      to-[#E7A06F]
                      flex
                      items-center
                      justify-center
                      text-white
                      font-black
                    "
                  >
                    {getInitial(
                      selectedOrder.user?.name
                    )}
                  </div>

                  <div>

                    <p className="text-sm font-bold text-[#2E2B27]">
                      {selectedOrder.user?.name ||
                        "Unknown User"}
                    </p>

                    <p className="text-xs text-gray-500">
                      {selectedOrder.user?.email ||
                        "No email available"}
                    </p>

                  </div>

                </div>

              </div>


              {/* Quick Info */}

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <User
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Customer
                  </p>

                  <p className="text-xs font-bold truncate mt-1">
                    {selectedOrder.user?.name ||
                      "Unknown"}
                  </p>

                </div>

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <CalendarDays
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Date
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {formatDate(
                      selectedOrder.createdAt
                    )}
                  </p>

                </div>

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <CreditCard
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Payment
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {selectedOrder.paymentStatus}
                  </p>

                </div>

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <IndianRupee
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Total
                  </p>

                  <p className="text-xs font-black mt-1">
                    ₹{selectedOrder.totalAmount}
                  </p>

                </div>

              </div>


              {/* Items */}

              <div className="mb-6">

                <div className="flex items-center justify-between mb-3">

                  <h3 className="text-sm font-black text-[#2E2B27]">
                    Order Items
                  </h3>

                  <span className="text-xs text-gray-400">
                    {selectedOrder.items?.length || 0} items
                  </span>

                </div>

                <div className="space-y-2">

                  {selectedOrder.items?.map(
                    (item, index) => (

                      <div
                        key={index}
                        className="
                          flex
                          items-center
                          justify-between
                          gap-4
                          rounded-xl
                          border
                          border-[#EEE7E1]
                          bg-white
                          p-3
                        "
                      >

                        <div className="flex items-center gap-3 min-w-0">

                          <div
                            className="
                              h-9
                              w-9
                              shrink-0
                              rounded-lg
                              bg-[#FBE8DC]
                              flex
                              items-center
                              justify-center
                            "
                          >
                            <Package
                              size={16}
                              className="text-[#BD6A3C]"
                            />
                          </div>

                          <div className="min-w-0">

                            <p className="text-sm font-bold truncate">
                              {item.pizza?.name ||
                                item.name ||
                                "Customized Pizza"}
                            </p>

                            <p className="text-[11px] text-gray-400 mt-0.5">
                              Qty:{" "}
                              {item.quantity}

                              {item.size &&
                                ` • ${item.size}`}
                            </p>

                            {item.toppings &&
                              item.toppings
                                .length >
                              0 && (

                                <p className="text-[10px] text-gray-400 mt-1 truncate max-w-[300px]">
                                  {item.toppings.join(
                                    ", "
                                  )}
                                </p>

                              )}

                          </div>

                        </div>

                        <p className="text-sm font-black whitespace-nowrap">
                          ₹{item.price}
                        </p>

                      </div>

                    )
                  )}

                </div>

              </div>


              {/* Bottom Summary */}

              <div
                className="
                  rounded-2xl
                  bg-[#29231F]
                  text-white
                  p-5
                "
              >

                <div className="flex justify-between items-center">

                  <div>

                    <p className="text-xs text-white/50">
                      Order Status
                    </p>

                    <p className="text-sm font-bold mt-1">
                      {getStatusConfig(
                        selectedOrder.orderStatus
                      ).label}
                    </p>

                  </div>

                  <div className="text-right">

                    <p className="text-xs text-white/50">
                      Total Amount
                    </p>

                    <p className="text-2xl font-black mt-1">
                      ₹{selectedOrder.totalAmount}
                    </p>

                  </div>

                </div>

              </div>

            </div>


            {/* Modal Footer */}

            <div
              className="
                border-t
                border-[#EEE7E1]
                px-6
                py-4
                flex
                justify-end
              "
            >

              <button
                onClick={() =>
                  setSelectedOrder(null)
                }
                className="
                  rounded-xl
                  bg-[#BD6A3C]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#A85A2F]
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Orders;