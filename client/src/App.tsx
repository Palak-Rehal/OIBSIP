import { Routes, Route, useLocation } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";

import Home from "./pages/user/Home";
import Menu from "./pages/user/Menu";
import PizzaDetails from "./pages/user/PizzaDetails";
import Cart from "./pages/user/Cart";
import Checkout from "./pages/user/Checkout";
import Offers from "./components/home/Offers";
import Orders from "./pages/user/Orders";
import OrderSummary from "./pages/user/OrderSummary";
import OrderSuccess from "./pages/user/OrderSuccess";
import Login from "./pages/user/Login";
import Register from "./pages/user/Register";
import Profile from "./pages/user/Profile";
import Contact from "./pages/user/Contact";
import CustomizePizza from "./pages/user/CustomizePizza";
import PizzaLab from "./pages/user/PizzaLab";

import Wishlist from "./pages/profile/Wishlist";
import SavedAddresses from "./pages/profile/SavedAddresses";
import AccountSettings from "./pages/profile/AccountSettings";
import Notifications from "./pages/profile/Notifications";

import Dashboard from "./pages/admin/Dashboard";
import AddPizza from "./pages/admin/AddPizza";
import Inventory from "./pages/admin/Inventory";
import AdminOrders from "./pages/admin/Orders";
import AdminUsers from "./pages/admin/Users";
import AdminCoupons from "./pages/admin/Coupons";

import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import VerifyEmail from "./pages/user/VerifyEmail";
import AdminLogin from "./pages/admin/AdminLogin";

import ProtectedRoute from "./routes/ProtectedRoute";
import AdminRoute from "./routes/AdminRoute";
import AdminLayout from "./components/layout/AdminLayout";

import { Toaster } from "react-hot-toast";

function App() {
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" ||
    location.pathname === "/register" ||
    location.pathname === "/forgot-password" ||
    location.pathname.startsWith("/reset-password") ||
    location.pathname.startsWith("/verify-email")||
      location.pathname === "/order-success" ||
  location.pathname.startsWith("/orders/");
  location.pathname === "/admin/login";

  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#1F2937]">

      {!hideLayout && <Navbar />}

      <Routes>
        {/* ================= PUBLIC ROUTES ================= */}

        <Route path="/" element={<Home />} />

        <Route path="/menu" element={<Menu />} />

        <Route path="/pizza/:id" element={<PizzaDetails />} />

        <Route path="/cart" element={<Cart />} />

        <Route path="/contact" element={<Contact />} />

        <Route path="/offers" element={<Offers />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route
          path="/forgot-password"
          element={<ForgotPassword />}
        />

        <Route
          path="/reset-password/:token"
          element={<ResetPassword />}
        />

        <Route
          path="/verify-email/:token"
          element={<VerifyEmail />}
        />

        <Route
          path="/customize-pizza"
          element={<CustomizePizza />}
        />

        <Route
          path="/pizza-lab"
          element={<PizzaLab />}
        />

        {/* ================= PROTECTED USER ROUTES ================= */}

        <Route element={<ProtectedRoute />}>

          <Route
            path="/checkout"
            element={<Checkout />}
          />

          <Route
            path="/order-success"
            element={<OrderSuccess />}
          />

          <Route
            path="/orders"
            element={<Orders />}
          />

          <Route
            path="/orders/:id"
            element={<OrderSummary />}
          />

          <Route
            path="/profile"
            element={<Profile />}
          />

          <Route
            path="/wishlist"
            element={<Wishlist />}
          />

          <Route
            path="/addresses"
            element={<SavedAddresses />}
          />

          <Route
            path="/settings"
            element={<AccountSettings />}
          />

          <Route
            path="/notifications"
            element={<Notifications />}
          />

        </Route>

        {/* ================= ADMIN ROUTES ================= */}
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route element={<AdminRoute />}>

          <Route element={<AdminLayout />}>

            <Route
              path="/admin/dashboard"
              element={<Dashboard />}
            />

            <Route
              path="/admin/add-pizza"
              element={<AddPizza />}
            />

            <Route
              path="/admin/inventory"
              element={<Inventory />}
            />

            <Route
              path="/admin/orders"
              element={<AdminOrders />}
            />

            <Route
              path="/admin/users"
              element={<AdminUsers />}
            />
            <Route
              path="/admin/coupons"
              element={<AdminCoupons />}
            />

          </Route>

        </Route>

      </Routes>

      {!hideLayout && <Footer />}

      <Toaster
        position="top-right"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "16px",
            background: "#ffffff",
            color: "#2E2B27",
            fontWeight: "600",
            boxShadow:
              "0 12px 40px rgba(0,0,0,0.12)",
          },
        }}
      />

    </div>
  );
}

export default App;