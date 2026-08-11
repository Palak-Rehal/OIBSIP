import { useState } from "react";

import {
  CalendarDays,
  ChevronRight,
  XCircle,
  CreditCard,
  ShoppingCart,
} from "lucide-react";

import { Link, useNavigate } from "react-router-dom";

import { cancelOrder } from "../../api/orderApi";

import toast from "react-hot-toast";

const IMAGE_URL = "http://localhost:5000";

interface Props {
  order: any;
  compact?: boolean;
  onCancelled?: () => void;
}

const STEPS = [
  "Placed",
  "Preparing",
  "Out For Delivery",
  "Delivered",
];

const STEP_LABELS: Record<string, string> = {
  Placed: "Order Received",
  Preparing: "In Kitchen",
  "Out For Delivery": "On The Way",
  Delivered: "Delivered",
};

const STATUS_BADGE: Record<string, string> = {
  Placed: "bg-blue-100 text-blue-700",
  Preparing: "bg-amber-100 text-amber-700",
  "Out For Delivery": "bg-purple-100 text-purple-700",
  Delivered: "bg-green-100 text-green-700",
  Cancelled: "bg-red-100 text-red-600",
};

const OrderCard = ({
  order,
  compact = false,
  onCancelled,
}: Props) => {
  const navigate = useNavigate();

  const [cancelling, setCancelling] = useState(false);

  const status: string = order?.orderStatus || "Placed";

  const isCancelled = status === "Cancelled";

  const currentStepIndex = STEPS.indexOf(status);

  const itemCount = order?.items?.length || 0;

  const firstItem = order?.items?.[0];

  const firstItemName =
    firstItem?.pizza?.name ||
    firstItem?.name ||
    "Pizza";

  // ==========================================
  // CAN CANCEL?
  // ==========================================

  const canCancel =
    status === "Placed" ||
    status === "Preparing";

  // ==========================================
  // CANCEL ORDER
  // ==========================================

  const handleCancelOrder = async () => {
    if (cancelling) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this order?"
    );

    if (!confirmed) return;

    try {
      setCancelling(true);

      await cancelOrder(order._id);

      toast.success("Order cancelled successfully");

      // Refresh Orders page
      if (onCancelled) {
        onCancelled();
      }
    } catch (error: any) {
      console.error(
        "Cancel order error:",
        error?.response?.data || error
      );

      toast.error(
        error?.response?.data?.message ||
          "Unable to cancel order"
      );
    } finally {
      setCancelling(false);
    }
  };

  // ==========================================
  // BUY AGAIN
  // ==========================================

  const handleBuyAgain = () => {
    navigate("/menu");
  };

  return (
    <div
      className={`
        bg-white
        rounded-3xl
        border
        border-[#E7DED3]
        overflow-hidden
        transition-all
        duration-300
        ${
          compact
            ? "hover:shadow-md"
            : "shadow-lg hover:shadow-xl"
        }
      `}
    >
      <div
        className={
          compact
            ? "p-5"
            : "p-6 md:p-7"
        }
      >
        {/* ==========================================
            HEADER
        ========================================== */}

        <div className="flex justify-between items-start gap-4">
          <div>
            <h2
              className={`
                font-black
                text-[#22281F]
                ${
                  compact
                    ? "text-base"
                    : "text-2xl"
                }
              `}
            >
              Order #
              {order?._id
                ?.slice(-6)
                .toUpperCase()}
            </h2>

            <div className="flex items-center gap-1.5 text-gray-400 mt-1.5 text-xs">
              <CalendarDays size={13} />

              <span>
                {order?.createdAt
                  ? new Date(
                      order.createdAt
                    ).toLocaleDateString()
                  : "Date unavailable"}
              </span>
            </div>
          </div>

          {/* STATUS */}

          <span
            className={`
              px-3.5
              py-1.5
              rounded-full
              font-bold
              text-xs
              shrink-0
              ${
                STATUS_BADGE[status] ||
                "bg-gray-100 text-gray-600"
              }
            `}
          >
            {status}
          </span>
        </div>

        {/* ==========================================
            ORDER PROGRESS / CANCELLED
        ========================================== */}

        <div
          className={
            compact
              ? "mt-4"
              : "mt-7"
          }
        >
          {isCancelled ? (
            <div
              className="
                flex
                items-center
                gap-3
                text-red-600
                text-sm
                font-semibold
                bg-red-50
                border
                border-red-100
                rounded-2xl
                px-5
                py-4
              "
            >
              <XCircle size={19} />

              <div>
                <p className="font-bold">
                  This order was cancelled
                </p>

                <p className="text-xs text-red-400 mt-0.5">
                  You can place the same type of order
                  again from the menu.
                </p>
              </div>
            </div>
          ) : (
            <div>
              {/* TRACK LINE */}

              <div className="relative flex items-center justify-between">
                <div
                  className="
                    absolute
                    left-0
                    right-0
                    top-1/2
                    -translate-y-1/2
                    h-[3px]
                    bg-gray-200
                    rounded-full
                  "
                />

                <div
                  className="
                    absolute
                    left-0
                    top-1/2
                    -translate-y-1/2
                    h-[3px]
                    bg-[#D8531F]
                    rounded-full
                    transition-all
                    duration-700
                  "
                  style={{
                    width:
                      currentStepIndex >= 0
                        ? `${
                            (currentStepIndex /
                              (STEPS.length - 1)) *
                            100
                          }%`
                        : "0%",
                  }}
                />

                {STEPS.map(
                  (step, index) => {
                    const reached =
                      currentStepIndex >= 0 &&
                      index <= currentStepIndex;

                    return (
                      <div
                        key={step}
                        className="
                          relative
                          z-10
                          flex
                          flex-col
                          items-center
                          gap-2
                        "
                        style={{
                          width: `${
                            100 / STEPS.length
                          }%`,
                        }}
                      >
                        <div
                          className={`
                            rounded-full
                            transition-all
                            ${
                              reached
                                ? "bg-[#D8531F]"
                                : "bg-gray-300"
                            }
                            ${
                              index ===
                              currentStepIndex
                                ? "w-3.5 h-3.5 ring-4 ring-[#D8531F]/20"
                                : "w-2.5 h-2.5"
                            }
                          `}
                        />

                        {!compact && (
                          <span
                            className={`
                              text-[10px]
                              font-semibold
                              text-center
                              ${
                                reached
                                  ? "text-[#D8531F]"
                                  : "text-gray-400"
                              }
                            `}
                          >
                            {
                              STEP_LABELS[
                                step
                              ]
                            }
                          </span>
                        )}
                      </div>
                    );
                  }
                )}
              </div>

              {compact && (
                <p className="text-center text-xs font-semibold text-[#D8531F] mt-2">
                  {STEP_LABELS[status] ||
                    status}
                </p>
              )}
            </div>
          )}
        </div>

        {/* ==========================================
            DIVIDER
        ========================================== */}

        <hr
          className={
            compact
              ? "my-4 border-[#F1EAE0]"
              : "my-6 border-[#ECE6DB]"
          }
        />

        {/* ==========================================
            ITEMS
        ========================================== */}

        {compact ? (
          <div className="flex items-center gap-3">
            <div
              className="
                w-12
                h-12
                rounded-xl
                overflow-hidden
                bg-[#FAF7F2]
                border
                border-[#F1EAE0]
                shrink-0
              "
            >
              <img
                src={
                  firstItem?.pizza?.image
                    ? `${IMAGE_URL}${firstItem.pizza.image}`
                    : "/pizza-placeholder.png"
                }
                alt={firstItemName}
                className="w-full h-full object-cover"
              />
            </div>

            <p className="text-sm text-[#22281F] font-medium">
              {firstItemName}

              {itemCount > 1 && (
                <span className="text-gray-400">
                  {" "}
                  + {itemCount - 1} more item
                  {itemCount > 2
                    ? "s"
                    : ""}
                </span>
              )}
            </p>
          </div>
        ) : (
          <div className="space-y-5">
            {order?.items?.map(
              (item: any) => (
                <div
                  key={item._id}
                  className="
                    flex
                    justify-between
                    items-center
                    gap-4
                  "
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item?.pizza?.image
                          ? `${IMAGE_URL}${item.pizza.image}`
                          : "/pizza-placeholder.png"
                      }
                      alt={
                        item?.pizza?.name ||
                        item?.name ||
                        "Pizza"
                      }
                      className="
                        w-16
                        h-16
                        rounded-xl
                        object-cover
                        border
                        border-[#E7DED3]
                      "
                    />

                    <div>
                      <h3 className="font-bold text-[#22281F]">
                        {item?.pizza?.name ||
                          item?.name ||
                          "Customized Pizza"}
                      </h3>

                      <p className="text-gray-500 text-sm">
                        {item?.size ||
                          "Regular"}{" "}
                        • Qty{" "}
                        {item?.quantity ||
                          1}
                      </p>
                    </div>
                  </div>

                  <span className="font-bold text-[#D8531F]">
                    ₹
                    {(item?.price || 0) *
                      (item?.quantity ||
                        1)}
                  </span>
                </div>
              )
            )}
          </div>
        )}

        {/* ==========================================
            DIVIDER
        ========================================== */}

        <hr
          className={
            compact
              ? "my-4 border-[#F1EAE0]"
              : "my-6 border-[#ECE6DB]"
          }
        />

        {/* ==========================================
            FOOTER
        ========================================== */}

        <div
          className={`
            ${
              compact
                ? "flex items-center justify-between gap-3"
                : "flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5"
            }
          `}
        >
          {/* PAYMENT */}

          <div>
            <p className="text-gray-500 text-sm">
              Payment
            </p>

            <div className="flex items-center gap-2">
              <CreditCard
                size={15}
                className="text-gray-400"
              />

              <h3 className="font-bold text-[#22281F]">
                {order?.paymentMethod ||
                  "Online Payment"}
              </h3>
            </div>
          </div>

          {/* TOTAL */}

          <div
            className={
              compact
                ? "text-right"
                : "lg:text-right"
            }
          >
            <p className="text-gray-500 text-sm">
              Total Amount
            </p>

            <h2
              className={`
                font-black
                text-[#D8531F]
                ${
                  compact
                    ? "text-lg"
                    : "text-3xl"
                }
              `}
            >
              ₹
              {order?.totalAmount ||
                0}
            </h2>
          </div>

          {/* ACTIONS */}

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-3
            "
          >
            {/* DETAILS */}

            <Link
              to={`/orders/${order._id}`}
              className="
                h-11
                px-5
                rounded-full
                border
                border-[#E1D5C7]
                bg-white
                text-[#2E2B27]
                text-sm
                font-bold
                flex
                items-center
                gap-2
                hover:border-[#D8531F]
                hover:text-[#D8531F]
                transition-all
              "
            >
              Details
              <ChevronRight size={16} />
            </Link>

            {/* CANCEL */}

            {canCancel && (
              <button
                type="button"
                onClick={
                  handleCancelOrder
                }
                disabled={cancelling}
                className="
                  h-11
                  px-5
                  rounded-full
                  bg-red-50
                  border
                  border-red-200
                  text-red-600
                  text-sm
                  font-bold
                  flex
                  items-center
                  gap-2
                  hover:bg-red-100
                  hover:border-red-300
                  transition-all
                  disabled:opacity-50
                  disabled:cursor-not-allowed
                "
              >
                <XCircle size={17} />

                {cancelling
                  ? "Cancelling..."
                  : "Cancel Order"}
              </button>
            )}

            {/* BUY AGAIN */}

            {isCancelled && (
              <button
                type="button"
                onClick={handleBuyAgain}
                className="
                  h-11
                  px-5
                  rounded-full
                  bg-[#D8531F]
                  hover:bg-[#B8431A]
                  text-white
                  text-sm
                  font-bold
                  flex
                  items-center
                  gap-2
                  transition-all
                  hover:shadow-lg
                "
              >
                <ShoppingCart size={17} />

                Buy Again
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderCard;