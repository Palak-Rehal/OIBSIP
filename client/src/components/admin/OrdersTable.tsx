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


const statusStyle = {
  Delivered:
    "bg-green-100 text-green-700",

  Preparing:
    "bg-blue-100 text-blue-700",

  Pending:
    "bg-yellow-100 text-yellow-700",

  Cancelled:
    "bg-red-100 text-red-700",
};


const OrdersTable = () => {
  return (
    <div
      className="
      rounded-3xl
      border
      border-white/20
      bg-white/10
      backdrop-blur-xl
      p-6
      shadow-lg
      "
    >

      <div className="mb-6">

        <h2
          className="
          text-xl
          font-bold
          text-[#4b2e1f]
          dark:text-white
          "
        >
          Recent Orders
        </h2>


        <p
          className="
          text-sm
          text-gray-600
          dark:text-gray-300
          "
        >
          Latest customer orders
        </p>

      </div>



      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr
              className="
              border-b
              border-gray-200
              text-left
              text-sm
              text-gray-500
              "
            >

              <th className="pb-4">
                Order ID
              </th>

              <th className="pb-4">
                Customer
              </th>

              <th className="pb-4">
                Amount
              </th>

              <th className="pb-4">
                Status
              </th>

              <th className="pb-4">
                Date
              </th>

            </tr>

          </thead>


          <tbody>

            {orders.map((order) => (

              <tr
                key={order.id}
                className="
                border-b
                border-gray-100
                last:border-none
                text-sm
                "
              >

                <td className="
                py-4
                font-semibold
                text-[#4b2e1f]
                dark:text-white
                ">
                  {order.id}
                </td>


                <td className="
                py-4
                text-gray-700
                dark:text-gray-300
                ">
                  {order.customer}
                </td>


                <td className="
                py-4
                font-medium
                ">
                  {order.amount}
                </td>


                <td className="py-4">

                  <span
                    className={`
                    rounded-full
                    px-3
                    py-1
                    text-xs
                    font-medium
                    ${statusStyle[order.status]}
                    `}
                  >
                    {order.status}
                  </span>

                </td>


                <td className="
                py-4
                text-gray-500
                dark:text-gray-400
                ">
                  {order.date}
                </td>


              </tr>

            ))}

          </tbody>

        </table>

      </div>


    </div>
  );
};


export default OrdersTable;