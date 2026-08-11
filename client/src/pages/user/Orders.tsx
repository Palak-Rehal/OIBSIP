import { useEffect, useState } from "react";

import {
  Package,
  ShoppingBag,
  XCircle,
  RefreshCw,
} from "lucide-react";

import { Link } from "react-router-dom";

import OrderCard from "../../components/orders/OrderCard";

import { getMyOrders } from "../../api/orderApi";

const Orders = () => {
  const [orders, setOrders] = useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState<"active" | "cancelled">(
      "active"
    );

  const [error, setError] =
    useState("");

  // ==========================================
  // FETCH ORDERS
  // ==========================================

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response =
        await getMyOrders();

      console.log(
        "Orders response:",
        response.data
      );

      const data = response.data;

      /*
        Supports different backend response formats:
        {
          orders: [...]
        }

        or:
        {
          data: [...]
        }

        or:
        [...]
      */

      const fetchedOrders =
        Array.isArray(data)
          ? data
          : Array.isArray(data?.orders)
          ? data.orders
          : Array.isArray(data?.data)
          ? data.data
          : [];

      setOrders(fetchedOrders);
    } catch (err: any) {
      console.error(
        "Get orders error:",
        err?.response?.data || err
      );

      setError(
        err?.response?.data?.message ||
          "Unable to load your orders."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // INITIAL LOAD
  // ==========================================

  useEffect(() => {
    fetchOrders();
  }, []);

  // ==========================================
  // FILTER ORDERS
  // ==========================================

  const activeOrders =
    orders.filter(
      (order) =>
        order?.orderStatus !==
        "Cancelled"
    );

  const cancelledOrders =
    orders.filter(
      (order) =>
        order?.orderStatus ===
        "Cancelled"
    );

  const displayedOrders =
    activeTab === "active"
      ? activeOrders
      : cancelledOrders;

  // ==========================================
  // LOADING
  // ==========================================

  if (loading) {
    return (
      <section className="min-h-[70vh] bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div
            className="
              w-14
              h-14
              border-4
              border-[#D8531F]
              border-t-transparent
              rounded-full
              animate-spin
              mx-auto
            "
          />

          <p className="mt-5 text-lg font-semibold text-[#2E2B27]">
            Loading your orders...
          </p>
        </div>
      </section>
    );
  }

  // ==========================================
  // ERROR
  // ==========================================

  if (error) {
    return (
      <section className="min-h-[70vh] bg-[#FAF7F2] px-5 py-16">
        <div className="max-w-3xl mx-auto">
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-red-100
              p-10
              text-center
              shadow-sm
            "
          >
            <XCircle
              size={48}
              className="text-red-400 mx-auto"
            />

            <h2 className="text-2xl font-black text-[#22281F] mt-5">
              Unable to load orders
            </h2>

            <p className="text-gray-500 mt-2">
              {error}
            </p>

            <button
              onClick={fetchOrders}
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                px-6
                py-3
                rounded-full
                bg-[#D8531F]
                text-white
                font-bold
                hover:bg-[#B8431A]
                transition
              "
            >
              <RefreshCw size={17} />

              Try Again
            </button>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] px-5 py-10 md:py-14">
      <div className="max-w-6xl mx-auto">

        {/* ==========================================
            PAGE HEADER
        ========================================== */}

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">

          <div>
            <p className="text-sm font-bold uppercase tracking-[0.15em] text-[#D8531F]">
              PizzaHub
            </p>

            <h1 className="text-4xl md:text-5xl font-black text-[#22281F] mt-2">
              My Orders
            </h1>

            <p className="text-gray-500 mt-3 text-lg">
              Track and manage your PizzaHub orders.
            </p>
          </div>

          <Link
            to="/menu"
            className="
              inline-flex
              items-center
              justify-center
              gap-2
              px-6
              py-3
              rounded-full
              bg-[#D8531F]
              text-white
              font-bold
              hover:bg-[#B8431A]
              transition
              shadow-sm
            "
          >
            <ShoppingBag size={18} />

            Order Pizza
          </Link>
        </div>

        {/* ==========================================
            TABS
        ========================================== */}

        <div
          className="
            bg-white
            border
            border-[#E7DED3]
            rounded-2xl
            p-2
            flex
            gap-2
            mb-10
            shadow-sm
            max-w-xl
          "
        >

          {/* ACTIVE */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("active")
            }
            className={`
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3.5
              px-5
              rounded-xl
              font-bold
              text-sm
              transition-all
              ${
                activeTab === "active"
                  ? "bg-[#D8531F] text-white shadow-md"
                  : "text-[#5E584F] hover:bg-[#FAF7F2]"
              }
            `}
          >
            <Package size={18} />

            Active Orders

            <span
              className={`
                min-w-6
                h-6
                px-1.5
                rounded-full
                flex
                items-center
                justify-center
                text-xs
                font-black
                ${
                  activeTab === "active"
                    ? "bg-white/20 text-white"
                    : "bg-[#F2ECDD] text-[#D8531F]"
                }
              `}
            >
              {activeOrders.length}
            </span>
          </button>

          {/* CANCELLED */}

          <button
            type="button"
            onClick={() =>
              setActiveTab("cancelled")
            }
            className={`
              flex-1
              flex
              items-center
              justify-center
              gap-2
              py-3.5
              px-5
              rounded-xl
              font-bold
              text-sm
              transition-all
              ${
                activeTab ===
                "cancelled"
                  ? "bg-red-500 text-white shadow-md"
                  : "text-[#5E584F] hover:bg-[#FAF7F2]"
              }
            `}
          >
            <XCircle size={18} />

            Cancelled

            <span
              className={`
                min-w-6
                h-6
                px-1.5
                rounded-full
                flex
                items-center
                justify-center
                text-xs
                font-black
                ${
                  activeTab ===
                  "cancelled"
                    ? "bg-white/20 text-white"
                    : "bg-red-50 text-red-500"
                }
              `}
            >
              {cancelledOrders.length}
            </span>
          </button>
        </div>

        {/* ==========================================
            SECTION TITLE
        ========================================== */}

        <div className="flex items-center gap-3 mb-6">

          <div
            className={`
              w-11
              h-11
              rounded-xl
              flex
              items-center
              justify-center
              ${
                activeTab ===
                "cancelled"
                  ? "bg-red-50"
                  : "bg-[#FCE4D6]"
              }
            `}
          >
            {activeTab ===
            "cancelled" ? (
              <XCircle
                size={22}
                className="text-red-500"
              />
            ) : (
              <Package
                size={22}
                className="text-[#D8531F]"
              />
            )}
          </div>

          <div>
            <h2 className="text-2xl font-black text-[#22281F]">
              {activeTab ===
              "cancelled"
                ? "Cancelled Orders"
                : "Active Orders"}
            </h2>

            <p className="text-gray-500 text-sm mt-0.5">
              {activeTab ===
              "cancelled"
                ? "Your cancelled orders"
                : "Orders currently being processed or delivered"}
            </p>
          </div>
        </div>

        {/* ==========================================
            NO ORDERS
        ========================================== */}

        {displayedOrders.length ===
        0 ? (
          <div
            className="
              bg-white
              rounded-3xl
              border
              border-[#E7DED3]
              p-12
              md:p-16
              text-center
              shadow-sm
            "
          >

            <div
              className={`
                w-20
                h-20
                rounded-full
                mx-auto
                flex
                items-center
                justify-center
                ${
                  activeTab ===
                  "cancelled"
                    ? "bg-red-50"
                    : "bg-[#FCE4D6]"
                }
              `}
            >
              {activeTab ===
              "cancelled" ? (
                <XCircle
                  size={34}
                  className="text-red-400"
                />
              ) : (
                <Package
                  size={34}
                  className="text-[#D8531F]"
                />
              )}
            </div>

            <h3 className="text-2xl font-black text-[#22281F] mt-6">
              {activeTab ===
              "cancelled"
                ? "No Cancelled Orders"
                : "No Active Orders"}
            </h3>

            <p className="text-gray-500 mt-2 max-w-md mx-auto">
              {activeTab ===
              "cancelled"
                ? "Orders that you cancel will appear here."
                : "You don't have any active orders right now. Order your favorite pizza to get started."}
            </p>

            {activeTab ===
              "active" && (
              <Link
                to="/menu"
                className="
                  inline-flex
                  items-center
                  gap-2
                  mt-7
                  px-7
                  py-3.5
                  rounded-full
                  bg-[#D8531F]
                  text-white
                  font-bold
                  hover:bg-[#B8431A]
                  transition
                "
              >
                <ShoppingBag
                  size={18}
                />

                Browse Menu
              </Link>
            )}

            {activeTab ===
              "cancelled" &&
              cancelledOrders.length ===
                0 && (
                <Link
                  to="/menu"
                  className="
                    inline-flex
                    items-center
                    gap-2
                    mt-7
                    px-7
                    py-3.5
                    rounded-full
                    bg-[#D8531F]
                    text-white
                    font-bold
                    hover:bg-[#B8431A]
                    transition
                  "
                >
                  <ShoppingBag
                    size={18}
                  />

                  Order Pizza
                </Link>
              )}
          </div>
        ) : (
          /* ==========================================
             ORDERS LIST
          ========================================== */

          <div className="space-y-6">

            {displayedOrders.map(
              (order) => (
                <OrderCard
                  key={order._id}
                  order={order}
                  onCancelled={
                    fetchOrders
                  }
                />
              )
            )}

          </div>
        )}
      </div>
    </section>
  );
};

export default Orders;