import { useState } from "react";

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
  ChevronDown,
  SlidersHorizontal,
  ShieldCheck,
  Home,
} from "lucide-react";

import { NavLink, useLocation, useNavigate } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { logout } = useAuth();

  const [settingsOpen, setSettingsOpen] = useState(
    location.pathname.startsWith("/admin/settings")
  );

  const menus = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/admin/dashboard",
    },
    {
      title: "Home",
      icon: Home,
      path: "/",
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
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <aside
      className="
        fixed
        left-0
        top-0
        z-50
        h-screen
        w-[240px]
        bg-[#292622]
        text-white
        flex
        flex-col
        border-r
        border-white/[0.06]
        shadow-[8px_0_30px_rgba(0,0,0,0.08)]
      "
    >
      {/* =====================================================
          LOGO
      ===================================================== */}

      <div
        className="
          h-[78px]
          shrink-0
          flex
          items-center
          px-6
          border-b
          border-white/[0.07]
        "
      >
        <div className="flex items-center gap-3">

          {/* Logo Icon */}

          <div
            className="
              h-10
              w-10
              rounded-xl
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              shadow-lg
              shadow-[#BD6A3C]/20
            "
          >
            <Pizza size={21} strokeWidth={2.3} />
          </div>

          {/* Logo Text */}

          <div>
            <h1
              className="
                text-[20px]
                font-black
                tracking-tight
                text-white
              "
              style={{
                fontFamily: "'Fraunces', serif",
              }}
            >
              PizzaHub
            </h1>

            <p
              className="
                text-[9px]
                uppercase
                tracking-[0.22em]
                text-white/40
                font-semibold
              "
            >
              Admin
            </p>
          </div>

        </div>
      </div>


      {/* =====================================================
          MENU
      ===================================================== */}

      <div
        className="
          flex-1
          overflow-y-auto
          px-3
          py-5

          [&::-webkit-scrollbar]:w-1
          [&::-webkit-scrollbar-thumb]:rounded-full
          [&::-webkit-scrollbar-thumb]:bg-white/10
        "
      >

        {/* Section Label */}

        <p
          className="
            px-3
            mb-3
            text-[9px]
            font-bold
            uppercase
            tracking-[0.18em]
            text-white/30
          "
        >
          Main Menu
        </p>


        {/* Main Navigation */}

        <nav className="space-y-1">

          {menus.map((menu) => {
            const Icon = menu.icon;

            return (
              <NavLink
                key={menu.path}
                to={menu.path}
                className={({ isActive }) =>
                  `
                    group
                    relative
                    flex
                    items-center
                    gap-3
                    rounded-xl
                    px-3
                    py-2.5
                    text-[13px]
                    font-semibold
                    transition-all
                    duration-200

                    ${isActive
                    ? `
                          bg-[#BD6A3C]
                          text-white
                          shadow-[0_6px_18px_rgba(189,106,60,0.22)]
                        `
                    : `
                          text-white/55
                          hover:bg-white/[0.06]
                          hover:text-white
                        `
                  }
                  `
                }
              >

                <Icon
                  size={18}
                  strokeWidth={2}
                  className="
                    shrink-0
                    transition-transform
                    duration-200
                    group-hover:scale-105
                  "
                />

                <span>
                  {menu.title}
                </span>

              </NavLink>
            );
          })}


          {/* =================================================
              SETTINGS DROPDOWN
          ================================================= */}

          <div className="pt-1">

            <button
              type="button"
              onClick={() => setSettingsOpen(!settingsOpen)}
              className={`
                group
                w-full
                flex
                items-center
                justify-between
                rounded-xl
                px-3
                py-2.5
                text-[13px]
                font-semibold
                transition-all
                duration-200

                ${location.pathname.startsWith("/admin/settings")
                  ? "bg-white/[0.08] text-white"
                  : "text-white/55 hover:bg-white/[0.06] hover:text-white"
                }
              `}
            >

              <div className="flex items-center gap-3">

                <Settings
                  size={18}
                  strokeWidth={2}
                  className="
                    transition-transform
                    duration-300
                    group-hover:rotate-45
                  "
                />

                <span>
                  Settings
                </span>

              </div>

              <ChevronDown
                size={15}
                className={`
                  text-white/40
                  transition-transform
                  duration-200
                  ${settingsOpen ? "rotate-180" : ""}
                `}
              />

            </button>


            {/* Settings Dropdown */}

            {settingsOpen && (

              <div
                className="
                  mt-1
                  ml-4
                  pl-3
                  border-l
                  border-white/[0.08]
                  space-y-1
                "
              >

                <NavLink
                  to="/admin/settings"
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-2.5
                      rounded-lg
                      px-3
                      py-2
                      text-[12px]
                      font-medium
                      transition

                      ${isActive
                      ? "bg-[#BD6A3C]/15 text-[#E8A477]"
                      : "text-white/40 hover:bg-white/[0.05] hover:text-white/80"
                    }
                    `
                  }
                >
                  <SlidersHorizontal size={15} />

                  General Settings
                </NavLink>


                <NavLink
                  to="/admin/settings/security"
                  className={({ isActive }) =>
                    `
                      flex
                      items-center
                      gap-2.5
                      rounded-lg
                      px-3
                      py-2
                      text-[12px]
                      font-medium
                      transition

                      ${isActive
                      ? "bg-[#BD6A3C]/15 text-[#E8A477]"
                      : "text-white/40 hover:bg-white/[0.05] hover:text-white/80"
                    }
                    `
                  }
                >
                  <ShieldCheck size={15} />

                  Security
                </NavLink>

              </div>

            )}

          </div>

        </nav>


        {/* =====================================================
            SYSTEM SECTION
        ===================================================== */}

        <div className="mt-7">

          <p
            className="
              px-3
              mb-3
              text-[9px]
              font-bold
              uppercase
              tracking-[0.18em]
              text-white/30
            "
          >
            System
          </p>


          <div
            className="
              mx-1
              rounded-xl
              border
              border-white/[0.06]
              bg-white/[0.025]
              px-3
              py-3
            "
          >

            <div className="flex items-center gap-2.5">

              <span
                className="
                  h-2
                  w-2
                  rounded-full
                  bg-[#4ADE80]
                  shadow-[0_0_0_4px_rgba(74,222,128,0.08)]
                "
              />

              <div>

                <p className="text-[11px] font-semibold text-white/70">
                  System Online
                </p>

                <p className="text-[9px] text-white/30 mt-0.5">
                  All services operational
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          ADMIN PROFILE + LOGOUT
      ===================================================== */}

      <div
        className="
          shrink-0
          border-t
          border-white/[0.07]
          p-3
        "
      >

        {/* Admin Profile */}

        <div
          className="
            flex
            items-center
            gap-3
            rounded-xl
            bg-white/[0.04]
            px-3
            py-2.5
            mb-2
          "
        >

          <div
            className="
              h-8
              w-8
              shrink-0
              rounded-lg
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              text-xs
              font-black
            "
          >
            A
          </div>

          <div className="min-w-0">

            <p className="text-xs font-bold text-white truncate">
              Admin
            </p>

            <p className="text-[9px] text-white/35 truncate">
              Restaurant Manager
            </p>

          </div>

        </div>


        {/* Logout */}

        <button
          type="button"
          onClick={handleLogout}
          className="
            group
            w-full
            flex
            items-center
            gap-3
            rounded-xl
            px-3
            py-2.5
            text-[13px]
            font-semibold
            text-white/45
            transition-all
            duration-200
            hover:bg-red-500/10
            hover:text-red-400
          "
        >

          <LogOut
            size={18}
            className="
              transition-transform
              duration-200
              group-hover:translate-x-0.5
            "
          />

          <span>
            Logout
          </span>

        </button>

      </div>

    </aside>
  );
};

export default Sidebar;