import {
  ArrowUpRight,
  CheckCircle2,
  Clock3,
  Package,
  ShoppingBag,
  XCircle,
} from "lucide-react";

interface Order {
  id: string;
  customer: string;
  amount: string;
  status: "Delivered" | "Pending" | "Preparing" | "Cancelled";
  date: string;
}

const orders: Order[] = [
  {
    id: "#ORD101",
    customer: "Rahul Sharma",
    amount: "₹850",
    status: "Delivered",
    date: "05 Aug 2026",
  },
  {
    id: "#ORD102",
    customer: "Priya Singh",
    amount: "₹620",
    status: "Preparing",
    date: "05 Aug 2026",
  },
  {
    id: "#ORD103",
    customer: "Aman Verma",
    amount: "₹1200",
    status: "Pending",
    date: "04 Aug 2026",
  },
  {
    id: "#ORD104",
    customer: "Simran Kaur",
    amount: "₹450",
    status: "Cancelled",
    date: "04 Aug 2026",
  },
];

const OrdersTable = () => {
  return (
    <div
      className="
        h-full
        rounded-[26px]
        border
        border-[#E8E2DA]
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(46,43,39,0.05)]
      "
    >
      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          <div
            className="
              flex
              h-10
              w-10
              shrink-0
              items-center
              justify-center
              rounded-xl
              bg-[#F3E1D3]
              text-[#BD6A3C]
            "
          >
            <ShoppingBag size={19} />
          </div>

          <div>
            <h2 className="text-lg font-black text-[#292622]">
              Recent Orders
            </h2>

            <p className="mt-0.5 text-xs text-[#938A80]">
              Latest customer orders
            </p>
          </div>
        </div>

        {/* View All */}

        <button
          className="
            flex
            items-center
            gap-1
            rounded-lg
            px-2
            py-1.5
            text-[10px]
            font-bold
            text-[#BD6A3C]
            transition
            hover:bg-[#FFF1E5]
          "
        >
          View all
          <ArrowUpRight size={12} />
        </button>
      </div>

      {/* =====================================================
          ORDER TABLE
      ===================================================== */}

      <div className="mt-5 overflow-x-auto">
        <table className="w-full min-w-[650px]">

          {/* Table Header */}

          <thead>
            <tr className="border-b border-[#EFEAE4]">

              <th
                className="
                  pb-3
                  text-left
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9A9187]
                "
              >
                Order
              </th>

              <th
                className="
                  pb-3
                  text-left
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9A9187]
                "
              >
                Customer
              </th>

              <th
                className="
                  pb-3
                  text-left
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9A9187]
                "
              >
                Amount
              </th>

              <th
                className="
                  pb-3
                  text-left
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9A9187]
                "
              >
                Status
              </th>

              <th
                className="
                  pb-3
                  text-right
                  text-[9px]
                  font-bold
                  uppercase
                  tracking-wider
                  text-[#9A9187]
                "
              >
                Date
              </th>
            </tr>
          </thead>

          {/* =================================================
              TABLE BODY
          ================================================= */}

          <tbody>
            {orders.map((order) => (
              <OrderRow
                key={order.id}
                order={order}
              />
            ))}
          </tbody>

        </table>
      </div>

      {/* =====================================================
          FOOTER
      ===================================================== */}

      <div
        className="
          mt-4
          flex
          items-center
          justify-between
          rounded-xl
          bg-[#FAF7F2]
          px-3
          py-2.5
        "
      >
        <div className="flex items-center gap-2">

          <CheckCircle2
            size={14}
            className="text-[#26924D]"
          />

          <span className="text-[10px] font-semibold text-[#70685F]">
            Orders are being processed normally
          </span>

        </div>

        <span className="text-[10px] font-bold text-[#9A9187]">
          {orders.length} recent
        </span>
      </div>
    </div>
  );
};

/* ============================================================
   ORDER ROW
============================================================ */

const OrderRow = ({
  order,
}: {
  order: Order;
}) => {
  return (
    <tr
      className="
        border-b
        border-[#F1EDE8]
        last:border-none
        transition
        hover:bg-[#FCFAF7]
      "
    >
      {/* Order ID */}

      <td className="py-3.5">
        <div className="flex items-center gap-2.5">

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-lg
              bg-[#F8F1EB]
              text-[#BD6A3C]
            "
          >
            <Package size={14} />
          </div>

          <div>
            <p className="text-xs font-black text-[#302C28]">
              {order.id}
            </p>

            <p className="mt-0.5 text-[9px] text-[#A29A91]">
              Order
            </p>
          </div>

        </div>
      </td>

      {/* Customer */}

      <td className="py-3.5">

        <div className="flex items-center gap-2.5">

          <div
            className="
              flex
              h-8
              w-8
              items-center
              justify-center
              rounded-full
              bg-[#292622]
              text-[10px]
              font-black
              text-white
            "
          >
            {order.customer
              .charAt(0)
              .toUpperCase()}
          </div>

          <div>
            <p className="text-xs font-bold text-[#302C28]">
              {order.customer}
            </p>

            <p className="mt-0.5 text-[9px] text-[#A29A91]">
              Customer
            </p>
          </div>

        </div>

      </td>

      {/* Amount */}

      <td className="py-3.5">

        <p className="text-xs font-black text-[#292622]">
          {order.amount}
        </p>

      </td>

      {/* Status */}

      <td className="py-3.5">
        <Status status={order.status} />
      </td>

      {/* Date */}

      <td className="py-3.5 text-right">

        <p className="text-[10px] font-semibold text-[#81796F]">
          {order.date}
        </p>

      </td>
    </tr>
  );
};

/* ============================================================
   STATUS
============================================================ */

const Status = ({
  status,
}: {
  status: Order["status"];
}) => {
  if (status === "Delivered") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-[#E7F5EB]
          px-2.5
          py-1
          text-[9px]
          font-bold
          text-[#26924D]
        "
      >
        <CheckCircle2 size={11} />
        Delivered
      </span>
    );
  }

  if (status === "Preparing") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-[#E8F0FB]
          px-2.5
          py-1
          text-[9px]
          font-bold
          text-[#4676B9]
        "
      >
        <Package size={11} />
        Preparing
      </span>
    );
  }

  if (status === "Pending") {
    return (
      <span
        className="
          inline-flex
          items-center
          gap-1.5
          rounded-full
          bg-[#FFF7D9]
          px-2.5
          py-1
          text-[9px]
          font-bold
          text-[#9A7412]
        "
      >
        <Clock3 size={11} />
        Pending
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        gap-1.5
        rounded-full
        bg-[#FDEAEA]
        px-2.5
        py-1
        text-[9px]
        font-bold
        text-[#C73A3A]
      "
    >
      <XCircle size={11} />
      Cancelled
    </span>
  );
};

export default OrdersTable;