import {
  LayoutDashboard,
  ShoppingBag,
  Pizza,
  Boxes,
  Users,
  Tag,
  Star,
  Settings,
  LogOut,
} from "lucide-react";

import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();

  const { logout } = useAuth();

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Orders",
      icon: ShoppingBag,
      path: "/admin/orders",
    },
    {
      title: "Add Pizza",
      icon: Pizza,
      path: "/admin/add-pizza",
    },
    {
      title: "Inventory",
      icon: Boxes,
      path: "/admin/inventory",
    },
    {
      title: "Users",
      icon: Users,
      path: "/admin/users",
    },
    {
      title: "Coupons",
      icon: Tag,
      path: "/admin/coupons",
    },
    {
      title: "Reviews",
      icon: Star,
      path: "/admin/reviews",
    },
    {
      title: "Settings",
      icon: Settings,
      path: "/admin/settings",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 w-72 h-screen bg-[#2E2B27] text-white flex flex-col shadow-2xl">

      <div className="h-24 flex items-center justify-center border-b border-white/10">

        <div className="text-center">

          <h1
            className="text-3xl font-black italic"
            style={{ fontFamily: "'Fraunces', serif" }}
          >
            PizzaHub
          </h1>

          <p className="text-xs text-gray-400 tracking-[3px] uppercase mt-1">
            Admin Panel
          </p>

        </div>

      </div>

      <div className="flex-1 overflow-y-auto px-5 py-8">

        <div className="space-y-2">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300
                  ${
                    isActive
                      ? "bg-[#BD6A3C] text-white shadow-lg"
                      : "text-gray-300 hover:bg-white/10 hover:text-white"
                  }`
                }
              >
                <Icon size={22} />

                <span className="font-semibold">
                  {menu.title}
                </span>
              </NavLink>
            );
          })}
        </div>
      </div>

      <div className="border-t border-white/10 p-5">

        <button
          onClick={() => {
            logout();
            navigate("/login");
          }}
          className="w-full flex items-center justify-center gap-3 rounded-2xl bg-red-500 hover:bg-red-600 py-4 transition"
        >
          <LogOut size={20} />

          Logout
        </button>

      </div>
    </aside>
  );
};

export default Sidebar;