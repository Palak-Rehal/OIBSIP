import { useEffect, useState } from "react";
import { getDashboard } from "../../api/adminApi";

import {
  Pizza,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Clock,
  CheckCircle,
  ArrowUpRight,
} from "lucide-react";

import RevenueChart from "../../components/admin/RevenueChart";
import TopSelling from "../../components/admin/TopSelling";
import LowStock from "../../components/admin/LowStock";
import RecentActivity from "../../components/admin/RecentActivity";

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalPizzas: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    pendingOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState<any[]>([]);
  const [latestUsers, setLatestUsers] = useState<any[]>([]);

  const fetchDashboard = async () => {
    try {
      const res = await getDashboard();

      setStats(res.data.dashboard);

      setRecentOrders(
        res.data.recentOrders || []
      );

      setLatestUsers(
        res.data.latestUsers || []
      );
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  const dashboardCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingBag,
      color: "bg-orange-100 text-orange-600",
    },
    {
      title: "Revenue",
      value: `₹${stats.revenue}`,
      icon: IndianRupee,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Customers",
      value: stats.totalUsers,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Pizzas",
      value: stats.totalPizzas,
      icon: Pizza,
      color: "bg-purple-100 text-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F3] p-6 lg:p-10">

      <div className="max-w-7xl mx-auto space-y-8">

        {/* ================= Welcome Banner ================= */}

        <div className="rounded-3xl overflow-hidden bg-gradient-to-r from-[#BD6A3C] via-[#CF7A4A] to-[#E59A6A] shadow-xl">

          <div className="p-8 lg:p-10 flex flex-col lg:flex-row justify-between gap-8">

            <div>

              <p className="uppercase tracking-[4px] text-white/70 text-sm">
                PizzaHub Admin
              </p>

              <h1 className="text-4xl font-black text-white mt-2">
                Welcome Back 👋
              </h1>

              <p className="mt-4 text-white/90 max-w-xl leading-7">

                Manage pizzas, orders, inventory, customers and
                analytics from one premium dashboard.

              </p>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-5">

                <p className="text-white/80 text-sm">
                  Today's Orders
                </p>

                <h2 className="text-3xl font-black text-white mt-2">
                  {stats.totalOrders}
                </h2>

              </div>

              <div className="bg-white/20 backdrop-blur rounded-2xl px-6 py-5">

                <p className="text-white/80 text-sm">
                  Revenue
                </p>

                <h2 className="text-3xl font-black text-white mt-2">
                  ₹{stats.revenue}
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* ================= Stats ================= */}

        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6">

          {dashboardCards.map((card) => {

            const Icon = card.icon;

            return (

              <div
                key={card.title}
                className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition duration-300"
              >

                <div className="flex justify-between items-start">

                  <div>

                    <p className="text-gray-500 text-sm">
                      {card.title}
                    </p>

                    <h2 className="text-4xl font-black text-[#2E2B27] mt-3">
                      {card.value}
                    </h2>

                  </div>

                  <div
                    className={`w-16 h-16 rounded-2xl flex items-center justify-center ${card.color}`}
                  >

                    <Icon size={30} />

                  </div>

                </div>

                <div className="mt-6 flex items-center justify-between">

                  <span className="flex items-center gap-1 text-green-600 text-sm font-semibold">

                    <ArrowUpRight size={16} />

                    +12%

                  </span>

                  <span className="text-xs text-gray-400">

                    Since yesterday

                  </span>

                </div>

              </div>

            );

          })}

        </div>

        {/* ================= Dashboard Content Starts Here ================= */}

        <div className="grid lg:grid-cols-3 gap-8">
                  {/* ================= Recent Orders ================= */}

          <div className="lg:col-span-2 bg-white rounded-3xl border border-gray-100 shadow-sm">

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-7 border-b">

              <div>

                <h2 className="text-2xl font-black text-[#2E2B27]">
                  Recent Orders
                </h2>

                <p className="text-gray-500 text-sm mt-1">
                  Latest customer orders
                </p>

              </div>

              <div className="flex gap-3">

                <input
                  type="text"
                  placeholder="Search Order..."
                  className="border rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#BD6A3C]"
                />

                <button
                  className="text-[#BD6A3C] font-semibold hover:underline"
                >
                  View All →
                </button>

              </div>

            </div>

            <div className="divide-y">

              {recentOrders.length === 0 ? (

                <div className="text-center py-12 text-gray-400">

                  No recent orders

                </div>

              ) : (

                recentOrders.map((order) => (

                  <div
                    key={order._id}
                    className="flex flex-col md:flex-row md:items-center justify-between p-6 hover:bg-[#FAF7F2] transition"
                  >

                    <div>

                      <h3 className="font-bold text-[#2E2B27]">

                        #{order._id?.slice(-6)}

                      </h3>

                      <p className="text-gray-500 mt-1">

                        {order.user?.name}

                      </p>

                      <p className="text-sm text-gray-400">

                        {order.items?.[0]?.pizza?.name ||
                          "Customized Pizza"}

                      </p>

                    </div>

                    <div className="mt-4 md:mt-0 text-right">

                      <p className="font-black text-lg">

                        ₹{order.totalAmount}

                      </p>

                      <Status status={order.status} />

                    </div>

                  </div>

                ))

              )}

            </div>

          </div>

          {/* ================= Right Side ================= */}

          <div className="space-y-6">

            {/* Quick Overview */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

              <h2 className="text-2xl font-black mb-6">
                Quick Overview
              </h2>

              <div className="space-y-5">

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <TrendingUp
                      size={18}
                      className="text-green-600"
                    />

                    <span>Revenue</span>

                  </div>

                  <span className="font-bold text-green-600">

                    ₹{stats.revenue}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <Clock
                      size={18}
                      className="text-orange-500"
                    />

                    <span>Pending Orders</span>

                  </div>

                  <span className="font-bold">

                    {stats.pendingOrders}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <CheckCircle
                      size={18}
                      className="text-green-600"
                    />

                    <span>Total Customers</span>

                  </div>

                  <span className="font-bold">

                    {stats.totalUsers}

                  </span>

                </div>

                <div className="flex justify-between items-center">

                  <div className="flex items-center gap-3">

                    <Pizza
                      size={18}
                      className="text-[#BD6A3C]"
                    />

                    <span>Total Pizzas</span>

                  </div>

                  <span className="font-bold">

                    {stats.totalPizzas}

                  </span>

                </div>

              </div>

            </div>

            {/* Latest Customers */}

            <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-7">

              <h2 className="text-2xl font-black mb-6">
                Latest Customers
              </h2>

              <div className="space-y-5">

                {latestUsers.length === 0 ? (

                  <p className="text-gray-400">
                    No customers found
                  </p>

                ) : (

                  latestUsers.map((user) => (

                    <div
                      key={user._id}
                      className="flex items-center justify-between border-b last:border-none pb-4"
                    >

                      <div>

                        <h4 className="font-semibold">

                          {user.name}

                        </h4>

                        <p className="text-sm text-gray-500">

                          {user.email}

                        </p>

                      </div>

                    </div>

                  ))

                )}

              </div>

            </div>

          </div>
                  </div>


          {/* Analytics Components */}

          <div className="grid lg:grid-cols-2 gap-8">

            <RevenueChart />

            <TopSelling />

          </div>


          <div className="grid lg:grid-cols-2 gap-8">

            <LowStock />

            <RecentActivity />

          </div>


        </div>

      </div>
    
  );
};
 
const Status = ({
  status,
}: {
  status: string;
}) => {

  if (status === "Delivered") {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-green-100
          px-3
          py-1
          text-xs
          font-bold
          text-green-700
        "
      >
        Delivered
      </span>
    );
  }

  if (status === "Cancelled") {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-red-100
          px-3
          py-1
          text-xs
          font-bold
          text-red-700
        "
      >
        Cancelled
      </span>
    );
  }

  if (status === "Out for Delivery") {
    return (
      <span
        className="
          inline-flex
          items-center
          rounded-full
          bg-blue-100
          px-3
          py-1
          text-xs
          font-bold
          text-blue-700
        "
      >
        Out for Delivery
      </span>
    );
  }

  return (
    <span
      className="
        inline-flex
        items-center
        rounded-full
        bg-yellow-100
        px-3
        py-1
        text-xs
        font-bold
        text-yellow-700
      "
    >
      Preparing
    </span>
  );
};

export default Dashboard;