import { useEffect, useState } from "react";

import {
  Pizza,
  ShoppingBag,
  Users,
  IndianRupee,
  TrendingUp,
  Clock3,
  CheckCircle2,
  ArrowUpRight,
  Package,
  MoreHorizontal,
  UserPlus,
  RefreshCw,
} from "lucide-react";

import { getDashboard } from "../../api/adminApi";

import RevenueChart from "../../components/admin/RevenueChart";
import TopSelling from "../../components/admin/TopSelling";
import LowStock from "../../components/admin/LowStock";
import RecentActivity from "../../components/admin/RecentActivity";

/* ============================================================
   TYPES
============================================================ */

interface DashboardStats {
  totalPizzas: number;
  totalOrders: number;
  totalUsers: number;
  revenue: number;
  pendingOrders: number;
}

interface Order {
  _id: string;

  user?: {
    name?: string;
    email?: string;
  };

  items?: {
    pizza?: {
      name?: string;
    };

    name?: string;

    quantity?: number;
  }[];

  totalAmount: number;

  paymentStatus: string;

  orderStatus?: string;

  status?: string;

  createdAt: string;
}

interface User {
  _id: string;
  name?: string;
  email?: string;
}

/* ============================================================
   DASHBOARD
============================================================ */

const Dashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalPizzas: 0,
    totalOrders: 0,
    totalUsers: 0,
    revenue: 0,
    pendingOrders: 0,
  });

  const [recentOrders, setRecentOrders] = useState<Order[]>([]);
  const [latestUsers, setLatestUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  /* ============================================================
     FETCH DASHBOARD
  ============================================================ */

  const fetchDashboard = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      const res = await getDashboard();

      setStats(
        res.data.dashboard || {
          totalPizzas: 0,
          totalOrders: 0,
          totalUsers: 0,
          revenue: 0,
          pendingOrders: 0,
        }
      );

      setRecentOrders(res.data.recentOrders || []);
      setLatestUsers(res.data.latestUsers || []);
    } catch (error) {
      console.error("Dashboard error:", error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchDashboard();
  }, []);

  /* ============================================================
     UI
  ============================================================ */

  return (
    <div className="min-h-screen bg-[#F7F5F2] px-4 py-4 sm:px-5 lg:px-6">

      <div className="mx-auto max-w-[1450px] space-y-4">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <div className="flex items-center gap-2">

              <span className="h-1.5 w-1.5 rounded-full bg-[#BD6A3C]" />

              <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9A9185]">
                PizzaHub Admin
              </span>

            </div>

            <h1 className="mt-1 text-2xl font-black tracking-tight text-[#292622] sm:text-3xl">
              Dashboard
            </h1>

            <p className="mt-1 text-xs text-[#81796E]">
              Monitor restaurant performance and manage operations.
            </p>

          </div>

          <div className="flex items-center gap-2">

            {/* Refresh */}

            <button
              onClick={() => fetchDashboard(true)}
              disabled={refreshing}
              className="flex items-center gap-2 rounded-xl border border-[#E6E0D8] bg-white px-3 py-2 text-xs font-bold text-[#514B44] shadow-sm transition hover:border-[#BD6A3C] hover:text-[#BD6A3C] disabled:opacity-60"
            >

              <RefreshCw
                size={14}
                className={refreshing ? "animate-spin" : ""}
              />

              Refresh

            </button>

            {/* Admin */}

            <div className="hidden items-center gap-2 rounded-xl border border-[#E6E0D8] bg-white px-2.5 py-2 shadow-sm sm:flex">

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E1D3] text-xs font-black text-[#BD6A3C]">
                A
              </div>

              <div>

                <p className="text-[11px] font-bold text-[#302C28]">
                  Admin
                </p>

                <p className="text-[9px] text-[#948B80]">
                  Restaurant Manager
                </p>

              </div>

            </div>

          </div>

        </div>


        {/* =====================================================
            WELCOME BANNER
        ===================================================== */}

        <div className="relative overflow-hidden rounded-2xl bg-[#292622] shadow-[0_12px_35px_rgba(46,43,39,0.10)]">

          <div className="absolute -right-20 -top-24 h-64 w-64 rounded-full bg-[#BD6A3C]/25 blur-[70px]" />

          <div className="absolute -bottom-24 left-1/3 h-48 w-48 rounded-full bg-[#E7A77A]/10 blur-[60px]" />

          <div className="relative flex flex-col justify-between gap-5 p-5 sm:p-6 lg:flex-row lg:items-center">

            <div>

              <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-2.5 py-1">

                <span className="h-1.5 w-1.5 rounded-full bg-[#E59A6A]" />

                <span className="text-[9px] font-bold uppercase tracking-wider text-white/65">
                  Restaurant Overview
                </span>

              </div>

              <h2 className="text-xl font-black tracking-tight text-white sm:text-2xl">
                Welcome back 👋
              </h2>

              <p className="mt-2 max-w-xl text-xs leading-5 text-white/55">
                Here's what's happening with your PizzaHub restaurant today.
              </p>

            </div>

            <div className="grid grid-cols-2 gap-2">

              <MiniMetric
                label="Total Orders"
                value={stats.totalOrders}
                icon={<ShoppingBag size={15} />}
              />

              <MiniMetric
                label="Revenue"
                value={`₹${stats.revenue}`}
                icon={<IndianRupee size={15} />}
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            STAT CARDS
        ===================================================== */}

        <div className="grid grid-cols-2 gap-3 xl:grid-cols-4">

          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            subtitle="All orders"
            icon={ShoppingBag}
            iconBox="bg-[#F3E1D3] text-[#BD6A3C]"
            trend="+12.4%"
            trendUp
          />

          <StatCard
            title="Revenue"
            value={`₹${stats.revenue}`}
            subtitle="Generated"
            icon={IndianRupee}
            iconBox="bg-[#E5F4EA] text-[#26924D]"
            trend="+8.7%"
            trendUp
          />

          <StatCard
            title="Customers"
            value={stats.totalUsers}
            subtitle="Registered"
            icon={Users}
            iconBox="bg-[#E7EFFB] text-[#4676B9]"
            trend="+5.2%"
            trendUp
          />

          <StatCard
            title="Pizza Varieties"
            value={stats.totalPizzas}
            subtitle="Available"
            icon={Pizza}
            iconBox="bg-[#EEE7F8] text-[#7853A8]"
            trend="Active"
            trendUp={false}
          />

        </div>


        {/* =====================================================
            ANALYTICS
        ===================================================== */}

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">

          {/* Revenue */}

          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <div className="mb-3 flex items-start justify-between">

              <div>

                <div className="flex items-center gap-2">

                  <h2 className="text-base font-black text-[#292622]">
                    Revenue Analytics
                  </h2>

                  <span className="rounded-full bg-[#E7F5EB] px-2 py-0.5 text-[9px] font-bold text-[#26924D]">
                    +8.7%
                  </span>

                </div>

                <p className="mt-0.5 text-[10px] text-[#938A80]">
                  Revenue performance overview
                </p>

              </div>

              <button className="rounded-lg p-1.5 text-[#938A80] transition hover:bg-[#F8F5F1] hover:text-[#292622]">
                <MoreHorizontal size={17} />
              </button>

            </div>

            <RevenueChart />

          </div>


          {/* Quick Overview */}

          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <div className="flex items-center justify-between">

              <div>

                <h2 className="text-base font-black text-[#292622]">
                  Quick Overview
                </h2>

                <p className="mt-0.5 text-[10px] text-[#938A80]">
                  Today's restaurant metrics
                </p>

              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E1D3] text-[#BD6A3C]">
                <TrendingUp size={15} />
              </div>

            </div>

            <div className="mt-4 space-y-1">

              <OverviewRow
                icon={<IndianRupee size={14} />}
                label="Revenue"
                value={`₹${stats.revenue}`}
                iconClass="bg-[#E7F5EB] text-[#26924D]"
              />

              <OverviewRow
                icon={<Clock3 size={14} />}
                label="Pending Orders"
                value={stats.pendingOrders}
                iconClass="bg-[#FFF1E5] text-[#BD6A3C]"
              />

              <OverviewRow
                icon={<Users size={14} />}
                label="Customers"
                value={stats.totalUsers}
                iconClass="bg-[#E7EFFB] text-[#4676B9]"
              />

              <OverviewRow
                icon={<Pizza size={14} />}
                label="Pizza Varieties"
                value={stats.totalPizzas}
                iconClass="bg-[#EEE7F8] text-[#7853A8]"
              />

            </div>

          </div>

        </div>


        {/* =====================================================
            ORDERS + CUSTOMERS
        ===================================================== */}

        <div className="grid gap-4 xl:grid-cols-[1.6fr_1fr]">

          {/* Recent Orders */}

          <div className="overflow-hidden rounded-2xl border border-[#E8E2DA] bg-white shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <div className="flex items-center justify-between border-b border-[#EFEAE4] px-4 py-3">

              <div>

                <h2 className="text-base font-black text-[#292622]">
                  Recent Orders
                </h2>

                <p className="mt-0.5 text-[10px] text-[#938A80]">
                  Latest customer activity
                </p>

              </div>

              <button className="flex items-center gap-1 text-[10px] font-bold text-[#BD6A3C] transition hover:text-[#914C29]">
                View all
                <ArrowUpRight size={12} />
              </button>

            </div>

            <div className="divide-y divide-[#F0ECE7]">

              {loading ? (

                <div className="px-4 py-10 text-center text-xs text-[#9A9187]">
                  Loading orders...
                </div>

              ) : recentOrders.length === 0 ? (

                <div className="px-4 py-10 text-center">

                  <Package
                    size={24}
                    className="mx-auto text-[#C7BFB5]"
                  />

                  <p className="mt-2 text-xs font-semibold text-[#82796F]">
                    No recent orders
                  </p>

                </div>

              ) : (

                recentOrders
                  .slice(0, 5)
                  .map((order) => (
                    <RecentOrderRow
                      key={order._id}
                      order={order}
                    />
                  ))

              )}

            </div>

          </div>


          {/* Latest Customers */}

          <div className="rounded-2xl border border-[#E8E2DA] bg-white shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <div className="flex items-center justify-between border-b border-[#EFEAE4] px-4 py-3">

              <div>

                <h2 className="text-base font-black text-[#292622]">
                  Latest Customers
                </h2>

                <p className="mt-0.5 text-[10px] text-[#938A80]">
                  Recently registered users
                </p>

              </div>

              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F3E1D3] text-[#BD6A3C]">
                <UserPlus size={14} />
              </div>

            </div>

            <div className="space-y-0.5 p-3">

              {latestUsers.length === 0 ? (

                <p className="px-3 py-8 text-center text-xs text-[#9A9187]">
                  No customers found
                </p>

              ) : (

                latestUsers
                  .slice(0, 5)
                  .map((user) => (

                    <div
                      key={user._id}
                      className="flex items-center gap-2 rounded-xl p-2 transition hover:bg-[#FAF7F2]"
                    >

                      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#292622] text-[10px] font-black text-white">
                        {user.name
                          ?.charAt(0)
                          ?.toUpperCase() || "U"}
                      </div>

                      <div className="min-w-0 flex-1">

                        <p className="truncate text-xs font-bold text-[#302C28]">
                          {user.name || "Unknown User"}
                        </p>

                        <p className="truncate text-[10px] text-[#958C82]">
                          {user.email || "No email"}
                        </p>

                      </div>

                      <span className="hidden rounded-full bg-[#E7F5EB] px-2 py-0.5 text-[8px] font-bold text-[#26924D] sm:inline-flex">
                        Active
                      </span>

                    </div>

                  ))

              )}

            </div>

          </div>

        </div>


        {/* =====================================================
            TOP SELLING + LOW STOCK
        ===================================================== */}

        <div className="grid gap-4 xl:grid-cols-2">

          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <TopSelling />

          </div>

          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <LowStock />

          </div>

        </div>


        {/* =====================================================
            ACTIVITY + SYSTEM
        ===================================================== */}

        <div className="grid gap-4 xl:grid-cols-2">

          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <RecentActivity />

          </div>


          <div className="rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_6px_20px_rgba(46,43,39,0.04)]">

            <div className="flex min-h-[190px] flex-col justify-center rounded-xl bg-[#FAF7F2] p-5">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3E1D3] text-[#BD6A3C]">
                <Pizza size={17} />
              </div>

              <h3 className="mt-3 text-base font-black text-[#292622]">
                PizzaHub Performance
              </h3>

              <p className="mt-1.5 max-w-md text-xs leading-5 text-[#837A70]">
                Keep inventory healthy and orders moving to maintain a smooth
                customer experience.
              </p>

              <div className="mt-4 flex items-center gap-1.5 text-[10px] font-bold text-[#26924D]">

                <CheckCircle2 size={13} />

                System operating normally

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};


/* ============================================================
   STAT CARD
============================================================ */

const StatCard = ({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBox,
  trend,
  trendUp,
}: {
  title: string;
  value: string | number;
  subtitle: string;
  icon: any;
  iconBox: string;
  trend: string;
  trendUp: boolean;
}) => {
  return (

    <div className="group rounded-2xl border border-[#E8E2DA] bg-white p-4 shadow-[0_5px_18px_rgba(46,43,39,0.04)] transition duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_25px_rgba(46,43,39,0.08)]">

      <div className="flex items-start justify-between">

        <div>

          <p className="text-[10px] font-semibold text-[#8E857B]">
            {title}
          </p>

          <h3 className="mt-1.5 text-2xl font-black tracking-tight text-[#292622]">
            {value}
          </h3>

        </div>

        <div
          className={`flex h-9 w-9 items-center justify-center rounded-xl ${iconBox}`}
        >
          <Icon size={17} />
        </div>

      </div>

      <div className="mt-3 flex items-center justify-between">

        <span
          className={`flex items-center gap-1 text-[9px] font-bold ${
            trendUp
              ? "text-[#26924D]"
              : "text-[#BD6A3C]"
          }`}
        >

          {trendUp ? (
            <ArrowUpRight size={11} />
          ) : (
            <CheckCircle2 size={11} />
          )}

          {trend}

        </span>

        <span className="text-[9px] text-[#A29A91]">
          {subtitle}
        </span>

      </div>

    </div>

  );
};


/* ============================================================
   MINI METRIC
============================================================ */

const MiniMetric = ({
  label,
  value,
  icon,
}: {
  label: string;
  value: string | number;
  icon: React.ReactNode;
}) => {
  return (

    <div className="min-w-[115px] rounded-xl border border-white/10 bg-white/[0.07] px-3 py-2.5 backdrop-blur-md">

      <div className="flex items-center gap-1.5 text-white/50">

        {icon}

        <span className="text-[9px] font-semibold uppercase tracking-wider">
          {label}
        </span>

      </div>

      <p className="mt-1 text-lg font-black text-white">
        {value}
      </p>

    </div>

  );
};


/* ============================================================
   OVERVIEW ROW
============================================================ */

const OverviewRow = ({
  icon,
  label,
  value,
  iconClass,
}: {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  iconClass: string;
}) => {
  return (

    <div className="flex items-center justify-between rounded-xl px-2 py-2 transition hover:bg-[#FAF7F2]">

      <div className="flex items-center gap-2.5">

        <div
          className={`flex h-8 w-8 items-center justify-center rounded-lg ${iconClass}`}
        >
          {icon}
        </div>

        <span className="text-xs font-semibold text-[#514B44]">
          {label}
        </span>

      </div>

      <span className="text-xs font-black text-[#292622]">
        {value}
      </span>

    </div>

  );
};


/* ============================================================
   RECENT ORDER ROW
============================================================ */

const RecentOrderRow = ({
  order,
}: {
  order: Order;
}) => {

  /*
    Backend should use orderStatus.
    status is kept as fallback so old API responses
    don't break the dashboard.
  */

  const status =
    order.orderStatus ||
    order.status ||
    "Placed";

  const pizzaName =
    order.items?.[0]?.pizza?.name ||
    order.items?.[0]?.name ||
    "Customized Pizza";

  return (

    <div className="flex items-center gap-3 px-4 py-3 transition hover:bg-[#FCFAF7]">

      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#F3E1D3] text-[#BD6A3C]">

        <ShoppingBag size={14} />

      </div>


      <div className="min-w-0 flex-1">

        <div className="flex items-center gap-1.5">

          <p className="text-xs font-black text-[#302C28]">
            #{order._id.slice(-6).toUpperCase()}
          </p>

          <Status status={status} />

        </div>

        <p className="mt-0.5 truncate text-[10px] text-[#8E857B]">

          {order.user?.name || "Unknown Customer"}

          {" • "}

          {pizzaName}

        </p>

      </div>


      <div className="text-right">

        <p className="text-xs font-black text-[#292622]">
          ₹{order.totalAmount}
        </p>

        <p className="mt-0.5 text-[9px] text-[#A29A91]">
          {new Date(order.createdAt).toLocaleDateString()}
        </p>

      </div>

    </div>

  );
};


/* ============================================================
   STATUS
============================================================ */

const Status = ({
  status,
}: {
  status: string;
}) => {

  const normalized = status.toLowerCase();

  if (normalized === "delivered") {

    return (

      <span className="inline-flex rounded-full bg-[#E7F5EB] px-1.5 py-0.5 text-[8px] font-bold text-[#26924D]">
        Delivered
      </span>

    );

  }


  if (normalized === "cancelled") {

    return (

      <span className="inline-flex rounded-full bg-[#FDEAEA] px-1.5 py-0.5 text-[8px] font-bold text-[#C73A3A]">
        Cancelled
      </span>

    );

  }


  if (
    normalized === "out for delivery" ||
    normalized === "outfordelivery"
  ) {

    return (

      <span className="inline-flex rounded-full bg-[#E8F0FB] px-1.5 py-0.5 text-[8px] font-bold text-[#4676B9]">
        Delivery
      </span>

    );

  }


  if (normalized === "preparing") {

    return (

      <span className="inline-flex rounded-full bg-[#FFF1E5] px-1.5 py-0.5 text-[8px] font-bold text-[#BD6A3C]">
        Kitchen
      </span>

    );

  }


  return (

    <span className="inline-flex rounded-full bg-[#FFF7D9] px-1.5 py-0.5 text-[8px] font-bold text-[#9A7412]">
      Received
    </span>

  );

};


export default Dashboard;