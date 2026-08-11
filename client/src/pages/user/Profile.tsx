import { useEffect, useState } from "react";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  Heart,
  LogOut,
  Edit3,
  Save,
  X,
  Home,
  Settings,
  Package,
  Bell,
  IndianRupee,
  CalendarDays,
  Pizza as PizzaIcon,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  getProfile,
  updateProfile,
} from "../../api/authApi";
import { getMyOrders } from "../../api/orderApi";
import toast from "react-hot-toast";

interface OrderItem {
  pizza?: { name?: string; image?: string } | null;
  name?: string;
  quantity: number;
}

interface OrderRecord {
  _id: string;
  items: OrderItem[];
  totalAmount: number;
  orderStatus: string;
  createdAt: string;
}

const STATUS_STYLES: Record<string, string> = {
  Delivered: "bg-[#5B8C5A]/10 text-[#5B8C5A]",
  Placed: "bg-gray-100 text-gray-600",
  Preparing: "bg-amber-100 text-amber-700",
  "Out For Delivery": "bg-blue-100 text-blue-700",
  Cancelled: "bg-red-100 text-red-600",
};

const navItems = [
  { label: "My Profile", icon: User, path: "/profile" },
  { label: "My Orders", icon: ShoppingBag, path: "/orders" },
  { label: "Wishlist", icon: Heart, path: "/wishlist" },
  { label: "Saved Addresses", icon: Home, path: "/addresses" },
  { label: "Notifications", icon: Bell, path: "/notifications" },
  { label: "Account Settings", icon: Settings, path: "/settings" },
];

const formatDate = (iso: string) =>
  new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

const orderLabel = (items: OrderItem[]) => {
  if (!items?.length) return "Order";

  const first = items[0].pizza?.name || items[0].name || "Pizza";

  return items.length > 1
    ? `${first} + ${items.length - 1} more`
    : first;
};

const Profile = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(false);

  const [user, setUser] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    createdAt: "",
  });

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(true);

  useEffect(() => {
    fetchProfile();
    fetchOrders();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);

      const res = await getProfile();

      const profile = res.data.user;

      setUser({
        name: profile.name,
        email: profile.email,
        phone: profile.phone,
        address: profile.address || "",
        createdAt: profile.createdAt || "",
      });

      setFormData({
        name: profile.name,
        phone: profile.phone,
        address: profile.address || "",
      });

    } catch (error: any) {
      localStorage.removeItem("token");

      navigate("/login");
    } finally {
      setLoading(false);
    }
  };

  const fetchOrders = async () => {
    try {
      setOrdersLoading(true);

      const res = await getMyOrders();

      setOrders(res.data.orders || []);
    } catch (error) {
      // Non-fatal — profile still works without order history
    } finally {
      setOrdersLoading(false);
    }
  };

  const handleSave = async () => {
    try {
      setSaving(true);

      const res = await updateProfile({
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
      });

      const profile = res.data.user;

      setUser((prev) => ({
        ...prev,
        name: profile.name,
        phone: profile.phone,
        address: profile.address ?? formData.address,
      }));

      setEditing(false);
      toast.success("Profile updated");

    } catch (error: any) {

      toast.error(
        error.response?.data?.message ||
        "Unable to update profile."
      );

    } finally {
      setSaving(false);
    }
  };

  const cancelEdit = () => {
    setEditing(false);

    setFormData({
      name: user.name,
      phone: user.phone,
      address: user.address,
    });
  };

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logged out successfully");
    navigate("/login");
  };

  const firstName = user.name?.split(" ")[0] || "";

  const totalOrders = orders.length;

  const totalSpent = orders.reduce(
    (sum, order) => sum + (order.totalAmount || 0),
    0
  );

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString("en-IN", {
        month: "short",
        year: "numeric",
      })
    : "—";

  if (loading) {
    return (
      <div className="min-h-screen bg-[#FAF7F2] flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-[#D8531F] border-t-transparent rounded-full animate-spin mx-auto" />
          <p className="mt-4 text-sm text-gray-400">
            Loading profile...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF7F2] pt-24 pb-12 px-4">
      <div className="max-w-6xl mx-auto grid lg:grid-cols-4 gap-6">

        {/* ================= Sidebar ================= */}
        <div
          className="
            lg:col-span-1
            bg-white
            rounded-2xl
            border
            border-[#E7DED3]
            p-6
            h-fit
            lg:sticky
            lg:top-24
          "
        >
          <div className="flex flex-col items-center text-center">
            <div
              className="
                w-16
                h-16
                rounded-full
                bg-[#22281F]
                flex
                items-center
                justify-center
                text-white
                text-xl
                font-bold
              "
            >
              {user.name.charAt(0).toUpperCase()}
            </div>

            <h2 className="mt-4 text-lg font-bold text-[#22281F]">
              {user.name}
            </h2>

            <p className="text-sm text-gray-400">{user.email}</p>
          </div>

          <div className="border-t border-gray-100 my-6" />

          <div className="space-y-1">
            {navItems.map(({ label, icon: Icon, path }) => {
              const active = path === "/profile";

              return (
                <button
                  key={path}
                  onClick={() => navigate(path)}
                  className={`
                    w-full
                    flex
                    items-center
                    gap-3
                    px-3.5
                    py-2.5
                    rounded-xl
                    text-sm
                    font-semibold
                    transition-colors
                    ${
                      active
                        ? "bg-[#FCE4D6] text-[#D8531F]"
                        : "text-gray-500 hover:bg-gray-50"
                    }
                  `}
                >
                  <Icon size={17} />
                  {label}
                </button>
              );
            })}
          </div>

          <div className="border-t border-gray-100 my-6" />

          <button
            onClick={logout}
            className="
              w-full
              py-2.5
              rounded-xl
              border
              border-red-200
              text-red-500
              text-sm
              font-semibold
              flex
              items-center
              justify-center
              gap-2
              hover:bg-red-50
              transition-colors
            "
          >
            <LogOut size={16} />
            Logout
          </button>
        </div>

        {/* ================= Right Content ================= */}
        <div className="lg:col-span-3 space-y-6">

          {/* Header row */}
          <div className="flex items-start justify-between flex-wrap gap-4">
            <div>
              <p className="text-sm text-gray-400">
                Welcome back, {firstName}
              </p>

              <h1 className="mt-1 text-2xl font-black text-[#22281F]">
                Profile
              </h1>
            </div>

            {!editing ? (
              <button
                onClick={() => setEditing(true)}
                className="
                  bg-[#22281F]
                  text-white
                  px-5
                  py-2.5
                  rounded-xl
                  flex
                  items-center
                  gap-2
                  text-sm
                  font-semibold
                  hover:bg-[#D8531F]
                  transition-colors
                "
              >
                <Edit3 size={15} />
                Edit Profile
              </button>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={cancelEdit}
                  className="
                    px-4
                    py-2.5
                    rounded-xl
                    border
                    border-gray-200
                    text-sm
                    font-semibold
                    flex
                    items-center
                    gap-2
                    hover:bg-gray-50
                  "
                >
                  <X size={15} />
                  Cancel
                </button>

                <button
                  disabled={saving}
                  onClick={handleSave}
                  className="
                    px-5
                    py-2.5
                    rounded-xl
                    bg-[#5B8C5A]
                    text-white
                    text-sm
                    font-semibold
                    flex
                    items-center
                    gap-2
                    hover:opacity-90
                    disabled:opacity-60
                  "
                >
                  <Save size={15} />
                  {saving ? "Saving..." : "Save"}
                </button>
              </div>
            )}
          </div>

          {/* ================= Real stats ================= */}
          <div className="grid sm:grid-cols-3 gap-4">

            <StatCard
              icon={Package}
              label="Total Orders"
              value={ordersLoading ? "—" : String(totalOrders)}
            />

            <StatCard
              icon={IndianRupee}
              label="Total Spent"
              value={ordersLoading ? "—" : `₹${totalSpent}`}
            />

            <StatCard
              icon={CalendarDays}
              label="Member Since"
              value={memberSince}
            />

          </div>

          {/* ================= Personal Information ================= */}
          <div className="bg-white rounded-2xl border border-[#E7DED3] p-6">
            <h2 className="text-base font-bold text-[#22281F] mb-6">
              Personal Information
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <Field label="Full Name" icon={User}>
                <input
                  disabled={!editing}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Email" icon={Mail}>
                <input
                  value={user.email}
                  disabled
                  className={inputClass}
                />
              </Field>

              <Field label="Phone Number" icon={Phone}>
                <input
                  disabled={!editing}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>

              <Field label="Address" icon={MapPin}>
                <input
                  disabled={!editing}
                  value={formData.address}
                  onChange={(e) =>
                    setFormData({ ...formData, address: e.target.value })
                  }
                  className={inputClass}
                />
              </Field>

            </div>
          </div>

          {/* ================= Recent Orders (real data) ================= */}
          <div className="bg-white rounded-2xl border border-[#E7DED3] p-6">
            <div className="flex justify-between items-center mb-5">
              <h2 className="text-base font-bold text-[#22281F]">
                Recent Orders
              </h2>

              <button
                onClick={() => navigate("/orders")}
                className="text-sm font-semibold text-[#D8531F] hover:underline"
              >
                View All
              </button>
            </div>

            {ordersLoading ? (
              <p className="text-sm text-gray-400 py-6 text-center">
                Loading orders...
              </p>
            ) : orders.length === 0 ? (
              <div className="text-center py-8">
                <p className="text-sm text-gray-400">
                  No orders yet.
                </p>
                <button
                  onClick={() => navigate("/menu")}
                  className="mt-3 text-sm font-semibold text-[#D8531F] hover:underline"
                >
                  Browse the menu
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {orders.slice(0, 3).map((order) => (
                  <div
                    key={order._id}
                    onClick={() => navigate(`/orders/${order._id}`)}
                    className="
                      flex
                      justify-between
                      items-center
                      border
                      border-[#EFEADC]
                      rounded-xl
                      p-4
                      cursor-pointer
                      hover:border-[#D8531F]/30
                      hover:bg-[#FAF7F2]
                      transition-colors
                    "
                  >
                    <div className="flex items-center gap-4 min-w-0">
                      <div className="w-10 h-10 rounded-xl bg-[#FCE4D6] flex items-center justify-center shrink-0">
                        <PizzaIcon size={17} className="text-[#D8531F]" />
                      </div>

                      <div className="min-w-0">
                        <h3 className="font-semibold text-[#22281F] text-sm truncate">
                          {orderLabel(order.items)}
                        </h3>
                        <p className="text-gray-400 text-xs mt-0.5">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0 pl-4">
                      <p className="font-bold text-sm text-[#22281F]">
                        ₹{order.totalAmount}
                      </p>
                      <span
                        className={`inline-block mt-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold ${
                          STATUS_STYLES[order.orderStatus] ||
                          "bg-gray-100 text-gray-600"
                        }`}
                      >
                        {order.orderStatus}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

const inputClass =
  "w-full pl-11 pr-4 py-2.5 rounded-xl border border-gray-200 outline-none focus:border-[#D8531F] disabled:bg-gray-50 disabled:text-gray-500 text-sm transition-colors";

const Field = ({
  label,
  icon: Icon,
  children,
}: {
  label: string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  children: React.ReactNode;
}) => (
  <div>
    <label className="text-xs font-semibold text-gray-500">
      {label}
    </label>

    <div className="mt-1.5 relative">
      <Icon size={16} className="absolute left-4 top-3 text-gray-400" />
      {children}
    </div>
  </div>
);

const StatCard = ({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  label: string;
  value: string;
}) => (
  <div className="bg-white rounded-2xl border border-[#E7DED3] p-5">
    <div className="w-9 h-9 rounded-lg bg-[#FCE4D6] flex items-center justify-center">
      <Icon size={17} className="text-[#D8531F]" />
    </div>

    <p className="mt-4 text-2xl font-black text-[#22281F]">
      {value}
    </p>

    <p className="text-xs text-gray-400 mt-0.5">{label}</p>
  </div>
);

export default Profile;