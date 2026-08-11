import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  Package,
  CheckCircle2,
  Clock,
  Truck,
  MapPin,
  XCircle,
  ChevronDown,
  User,
  Heart,
  Settings,
  LogOut,
  Home,
  Utensils,
} from "lucide-react";

import { getOrderById } from "../../api/orderApi";

const IMAGE_URL = "http://localhost:5000";

const OrderSummary = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [profileOpen, setProfileOpen] = useState(false);

  const profileRef = useRef<HTMLDivElement>(null);

  /* =========================
     GET LOGGED USER
  ========================= */

  const storedUser = localStorage.getItem("user");

  let user: any = null;

  try {
    user = storedUser ? JSON.parse(storedUser) : null;
  } catch {
    user = null;
  }

  const userName =
    user?.name ||
    user?.fullName ||
    "Profile";

  const userInitial = userName
    .charAt(0)
    .toUpperCase();

  /* =========================
     CLOSE PROFILE DROPDOWN
  ========================= */

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        profileRef.current &&
        !profileRef.current.contains(
          event.target as Node
        )
      ) {
        setProfileOpen(false);
      }
    };

    document.addEventListener(
      "mousedown",
      handleClickOutside
    );

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  /* =========================
     FETCH ORDER
  ========================= */

  useEffect(() => {
    if (!id) return;

    const fetchOrder = async () => {
      try {
        console.log(
          "ORDER SUMMARY LOADED"
        );

        console.log(
          "ORDER ID FROM URL:",
          id
        );

        const res =
          await getOrderById(id);

        console.log(
          "ORDER API RESPONSE:",
          res.data
        );

        setOrder(res.data.order);

      } catch (error) {
        console.error(
          "GET ORDER ERROR:",
          error
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  /* =========================
     LOGOUT
  ========================= */

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setProfileOpen(false);

    navigate("/login");
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="min-h-screen bg-[#faf7f2]">

        <OrderHeader
          userName={userName}
          userInitial={userInitial}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          profileRef={profileRef}
          navigate={navigate}
          handleLogout={handleLogout}
        />

        <div className="min-h-[65vh] flex items-center justify-center">

          <div className="text-center">

            <div className="w-8 h-8 border-4 border-[#C56B3C] border-t-transparent rounded-full animate-spin mx-auto" />

            <p className="mt-3 text-sm text-gray-500 font-semibold">
              Loading order...
            </p>

          </div>

        </div>

      </div>
    );
  }

  /* =========================
     NOT FOUND
  ========================= */

  if (!order) {
    return (
      <div className="min-h-screen bg-[#faf7f2]">

        <OrderHeader
          userName={userName}
          userInitial={userInitial}
          profileOpen={profileOpen}
          setProfileOpen={setProfileOpen}
          profileRef={profileRef}
          navigate={navigate}
          handleLogout={handleLogout}
        />

        <div className="min-h-[65vh] flex items-center justify-center px-4">

          <div className="bg-white rounded-2xl border border-[#eadfd3] shadow-sm p-7 text-center">

            <XCircle
              size={45}
              className="mx-auto text-red-400"
            />

            <h2 className="text-xl font-black mt-3">
              Order Not Found
            </h2>

            <button
              onClick={() =>
                navigate("/orders")
              }
              className="mt-4 px-5 py-2.5 rounded-xl bg-[#C56B3C] text-white text-sm font-bold"
            >
              Back to Orders
            </button>

          </div>

        </div>

      </div>
    );
  }

  /* =========================
     TRACKING
  ========================= */

  const status = order.orderStatus;

  const statusSteps = [
    {
      label: "Received",
      status: "Placed",
      icon: Package,
    },
    {
      label: "Kitchen",
      status: "Preparing",
      icon: Clock,
    },
    {
      label: "Delivery",
      status: "Out For Delivery",
      icon: Truck,
    },
    {
      label: "Delivered",
      status: "Delivered",
      icon: CheckCircle2,
    },
  ];

  const statusIndex =
    statusSteps.findIndex(
      (step) =>
        step.status === status
    );

  return (
    <div className="min-h-screen bg-[#faf7f2]">

      {/* =========================
          DYNAMIC HEADER
      ========================= */}

      <OrderHeader
        userName={userName}
        userInitial={userInitial}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        profileRef={profileRef}
        navigate={navigate}
        handleLogout={handleLogout}
      />


      {/* =========================
          CONTENT
      ========================= */}

      <main className="px-3 sm:px-4 py-5">

        <div className="max-w-4xl mx-auto">

          {/* BACK */}

          <button
            onClick={() =>
              navigate("/orders")
            }
            className="
              flex
              items-center
              gap-1.5
              text-[#C56B3C]
              font-bold
              text-sm
              mb-4
              hover:gap-2.5
              transition-all
            "
          >
            <ArrowLeft size={17} />
            Back to Orders
          </button>


          {/* =========================
              MAIN CARD
          ========================= */}

          <div
            className="
              bg-white
              rounded-2xl
              border
              border-[#eadfd3]
              shadow-[0_10px_30px_rgba(45,35,25,0.08)]
              p-4
              sm:p-5
            "
          >

            {/* HEADER */}

            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">

              <div>

                <p className="text-xs text-gray-500 font-semibold">
                  Order Details
                </p>

                <h1 className="text-2xl sm:text-3xl font-black text-[#292724]">
                  Order #
                  {order._id
                    .slice(-6)
                    .toUpperCase()}
                </h1>

                <div className="flex items-center gap-1.5 text-gray-500 mt-1.5 text-sm">

                  <CalendarDays size={15} />

                  {new Date(
                    order.createdAt
                  ).toLocaleDateString()}

                </div>

              </div>


              <span
                className={`
                  px-4
                  py-1.5
                  rounded-full
                  font-bold
                  text-xs
                  w-fit
                  ${
                    status ===
                    "Delivered"
                      ? "bg-green-100 text-green-700"
                      : status ===
                        "Cancelled"
                      ? "bg-red-100 text-red-700"
                      : status ===
                        "Preparing"
                      ? "bg-yellow-100 text-yellow-700"
                      : status ===
                        "Out For Delivery"
                      ? "bg-purple-100 text-purple-700"
                      : "bg-blue-100 text-blue-700"
                  }
                `}
              >
                {status}
              </span>

            </div>


            {/* =========================
                TRACKING
            ========================= */}

            <div className="mt-7">

              <div className="flex items-center justify-between mb-5">

                <h2 className="text-lg font-black">
                  Track Your Order
                </h2>

                <span className="text-xs text-gray-400 font-semibold">
                  {status}
                </span>

              </div>


              <div className="relative">

                {/* BACK LINE */}

                <div
                  className="
                    absolute
                    left-[9%]
                    right-[9%]
                    top-[18px]
                    h-1
                    rounded-full
                    bg-gray-200
                  "
                />


                {/* ACTIVE LINE */}

                <div
                  className="
                    absolute
                    left-[9%]
                    top-[18px]
                    h-1
                    rounded-full
                    bg-[#C56B3C]
                    transition-all
                    duration-700
                  "
                  style={{
                    width:
                      statusIndex < 0
                        ? "0%"
                        : `${(statusIndex / 3) * 82}%`,
                  }}
                />


                {/* STEPS */}

                <div className="relative grid grid-cols-4">

                  {statusSteps.map(
                    (
                      step,
                      index
                    ) => {

                      const Icon =
                        step.icon;

                      const completed =
                        statusIndex >=
                        index;

                      return (
                        <div
                          key={
                            step.status
                          }
                          className="flex flex-col items-center text-center"
                        >

                          <div
                            className={`
                              w-9
                              h-9
                              rounded-full
                              flex
                              items-center
                              justify-center
                              border-4
                              border-white
                              shadow-sm
                              ${
                                completed
                                  ? "bg-[#C56B3C] text-white"
                                  : "bg-gray-200 text-gray-400"
                              }
                            `}
                          >
                            <Icon size={16} />
                          </div>

                          <p
                            className={`
                              mt-2
                              text-[10px]
                              sm:text-xs
                              font-bold
                              ${
                                completed
                                  ? "text-[#C56B3C]"
                                  : "text-gray-400"
                              }
                            `}
                          >
                            {step.label}
                          </p>

                        </div>
                      );
                    }
                  )}

                </div>

              </div>

            </div>


            <div className="my-6 border-t border-[#eee5da]" />


            {/* =========================
                ITEMS
            ========================= */}

            <div>

              <h2 className="text-lg font-black mb-3">
                Ordered Items
              </h2>

              <div className="space-y-2.5">

                {order.items?.map(
                  (item: any) => (

                    <div
                      key={item._id}
                      className="
                        flex
                        items-center
                        justify-between
                        gap-3
                        p-3
                        rounded-xl
                        bg-[#faf7f2]
                        border
                        border-[#eee5da]
                      "
                    >

                      <div className="flex items-center gap-3 min-w-0">

                        <img
                          src={
                            item.pizza
                              ?.image
                              ? `${IMAGE_URL}${item.pizza.image}`
                              : "/pizza-placeholder.png"
                          }
                          alt={
                            item.pizza
                              ?.name ||
                            item.name ||
                            "Pizza"
                          }
                          className="
                            w-14
                            h-14
                            rounded-xl
                            object-cover
                            border
                            border-[#e5d9cb]
                            flex-shrink-0
                          "
                        />

                        <div className="min-w-0">

                          <h3 className="font-black text-sm text-[#292724] truncate">
                            {item.pizza
                              ?.name ||
                              item.name ||
                              "Customized Pizza"}
                          </h3>

                          <p className="text-gray-500 text-xs mt-1">
                            {item.size ||
                              "Regular"}{" "}
                            • Qty{" "}
                            {item.quantity}
                          </p>

                          {item.isCustomized && (
                            <p className="text-[10px] text-[#C56B3C] font-bold mt-0.5">
                              Customized Pizza
                            </p>
                          )}

                        </div>

                      </div>


                      <div className="font-black text-sm text-[#C56B3C] whitespace-nowrap">
                        ₹
                        {item.price *
                          item.quantity}
                      </div>

                    </div>

                  )
                )}

              </div>

            </div>


            {/* =========================
                ADDRESS
            ========================= */}

            <div className="mt-7">

              <h2 className="text-lg font-black mb-3">
                Delivery Address
              </h2>

              <div
                className="
                  flex
                  gap-3
                  p-3.5
                  rounded-xl
                  bg-[#faf7f2]
                  border
                  border-[#eee5da]
                "
              >

                <div
                  className="
                    w-9
                    h-9
                    rounded-lg
                    bg-[#C56B3C]/10
                    flex
                    items-center
                    justify-center
                    flex-shrink-0
                  "
                >
                  <MapPin
                    size={17}
                    className="text-[#C56B3C]"
                  />
                </div>

                <div>

                  <p className="font-black text-sm">
                    {
                      order
                        .deliveryAddress
                        ?.fullName
                    }
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    {
                      order
                        .deliveryAddress
                        ?.address
                    }
                  </p>

                  <p className="text-gray-500 text-xs">
                    {
                      order
                        .deliveryAddress
                        ?.city
                    }
                    ,{" "}
                    {
                      order
                        .deliveryAddress
                        ?.state
                    }{" "}
                    -{" "}
                    {
                      order
                        .deliveryAddress
                        ?.pincode
                    }
                  </p>

                  <p className="text-gray-500 text-xs mt-1">
                    Phone:{" "}
                    {
                      order
                        .deliveryAddress
                        ?.phone
                    }
                  </p>

                </div>

              </div>

            </div>


            {/* =========================
                PAYMENT
            ========================= */}

            <div
              className="
                mt-7
                pt-5
                border-t
                border-[#eadfd3]
              "
            >

              <div className="grid grid-cols-3 gap-3">

                <div>

                  <p className="text-gray-500 text-[11px]">
                    Payment
                  </p>

                  <p className="font-black text-sm mt-0.5">
                    {
                      order.paymentMethod
                    }
                  </p>

                </div>


                <div>

                  <p className="text-gray-500 text-[11px]">
                    Payment Status
                  </p>

                  <p className="font-black text-sm mt-0.5">
                    {
                      order.paymentStatus
                    }
                  </p>

                </div>


                <div className="text-right">

                  <p className="text-gray-500 text-[11px]">
                    Total Amount
                  </p>

                  <p className="font-black text-xl text-[#C56B3C] mt-0.5">
                    ₹
                    {
                      order.totalAmount
                    }
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

    </div>
  );
};


/* =========================================================
   DYNAMIC ORDER HEADER
========================================================= */

interface OrderHeaderProps {
  userName: string;
  userInitial: string;
  profileOpen: boolean;
  setProfileOpen: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  profileRef: React.RefObject<HTMLDivElement | null>;
  navigate: ReturnType<typeof useNavigate>;
  handleLogout: () => void;
}

const OrderHeader = ({
  userName,
  userInitial,
  profileOpen,
  setProfileOpen,
  profileRef,
  navigate,
  handleLogout,
}: OrderHeaderProps) => {

  return (
    <header className="w-full bg-white border-b border-[#eee5da] sticky top-0 z-50">

      <div
        className="
          max-w-5xl
          mx-auto
          px-4
          h-16
          flex
          items-center
          justify-between
        "
      >

        {/* =========================
            LEFT
        ========================= */}

        <div className="flex items-center gap-4">

          <button
            onClick={() =>
              navigate("/orders")
            }
            className="
              flex
              items-center
              gap-1.5
              text-sm
              font-bold
              text-[#5f5a55]
              hover:text-[#C56B3C]
              transition
            "
          >
            <ArrowLeft size={17} />
            <span className="hidden xs:inline">
              Orders
            </span>
          </button>


          <div className="h-5 w-px bg-[#e7ded3]" />


          {/* LOGO */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              text-xl
              font-black
              tracking-tight
              text-[#292724]
              hover:opacity-80
              transition
            "
          >
            Pizza<span className="text-[#C56B3C]">
              Hub
            </span>
          </button>

        </div>


        {/* =========================
            RIGHT
        ========================= */}

        <div className="flex items-center gap-1">

          {/* HOME */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="
              hidden
              md:flex
              items-center
              gap-1.5
              px-3
              py-2
              rounded-xl
              text-sm
              font-bold
              text-[#55504a]
              hover:bg-[#faf4ef]
              hover:text-[#C56B3C]
              transition
            "
          >
            <Home size={16} />
            Home
          </button>


          {/* MENU */}

          <button
            onClick={() =>
              navigate("/menu")
            }
            className="
              hidden
              md:flex
              items-center
              gap-1.5
              px-3
              py-2
              rounded-xl
              text-sm
              font-bold
              text-[#55504a]
              hover:bg-[#faf4ef]
              hover:text-[#C56B3C]
              transition
            "
          >
            <Utensils size={16} />
            Menu
          </button>


          {/* PROFILE */}

          <div
            ref={profileRef}
            className="relative"
          >

            <button
              onClick={() =>
                setProfileOpen(
                  (prev) => !prev
                )
              }
              className="
                flex
                items-center
                gap-2
                px-2
                sm:px-3
                py-1.5
                rounded-xl
                hover:bg-[#faf4ef]
                transition
              "
            >

              <div
                className="
                  w-8
                  h-8
                  rounded-full
                  bg-[#fbe4d7]
                  text-[#C56B3C]
                  flex
                  items-center
                  justify-center
                  font-black
                  text-sm
                "
              >
                {userInitial}
              </div>


              <span className="hidden sm:block max-w-[100px] truncate text-sm font-bold text-[#292724]">
                {userName}
              </span>


              <ChevronDown
                size={15}
                className={`
                  text-gray-500
                  transition-transform
                  ${
                    profileOpen
                      ? "rotate-180"
                      : ""
                  }
                `}
              />

            </button>


            {/* =========================
                DROPDOWN
            ========================= */}

            {profileOpen && (

              <div
                className="
                  absolute
                  right-0
                  top-12
                  w-56
                  bg-white
                  rounded-2xl
                  border
                  border-[#eadfd3]
                  shadow-[0_15px_40px_rgba(45,35,25,0.14)]
                  p-2
                  z-[100]
                "
              >

                {/* USER INFO */}

                <div className="px-3 py-2.5 border-b border-[#eee5da] mb-1">

                  <p className="font-black text-sm text-[#292724] truncate">
                    {userName}
                  </p>

                  <p className="text-[11px] text-gray-400">
                    My Account
                  </p>

                </div>


                {/* PROFILE */}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/profile");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-[#4f4a45]
                    hover:bg-[#faf4ef]
                    hover:text-[#C56B3C]
                    transition
                  "
                >
                  <User size={17} />
                  Profile
                </button>


                {/* ORDERS */}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/orders");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-[#4f4a45]
                    hover:bg-[#faf4ef]
                    hover:text-[#C56B3C]
                    transition
                  "
                >
                  <Package size={17} />
                  My Orders
                </button>


                {/* WISHLIST */}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/wishlist");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-[#4f4a45]
                    hover:bg-[#faf4ef]
                    hover:text-[#C56B3C]
                    transition
                  "
                >
                  <Heart size={17} />
                  Wishlist
                </button>


                {/* SETTINGS */}

                <button
                  onClick={() => {
                    setProfileOpen(false);
                    navigate("/settings");
                  }}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-[#4f4a45]
                    hover:bg-[#faf4ef]
                    hover:text-[#C56B3C]
                    transition
                  "
                >
                  <Settings size={17} />
                  Settings
                </button>


                <div className="my-1 border-t border-[#eee5da]" />


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    text-red-500
                    hover:bg-red-50
                    transition
                  "
                >
                  <LogOut size={17} />
                  Logout
                </button>

              </div>

            )}

          </div>

        </div>

      </div>

    </header>
  );
};

export default OrderSummary;