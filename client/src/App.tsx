import { Routes, Route } from "react-router-dom";

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
import Login from "../src/pages/user/Login";
import Register from "../src/pages/user/Register";
import Profile from "../src/pages/user/Profile";
import AddPizza from "./pages/admin/AddPizza";
import Dashboard from "./pages/admin/Dashboard";
import Contact from "./pages/user/Contact";
import ForgotPassword from "./pages/user/ForgotPassword";




function App() {
  return (
    <div className="min-h-screen bg-[#FFF9F5] text-[#1F2937]">

      <Navbar />

      <Routes>

        {/* Home */}
        <Route path="/" element={<Home />} />

        {/* Menu */}
        <Route path="/menu" element={<Menu />} />

        {/* Pizza Details */}
        <Route
          path="/pizza/:id"
          element={<PizzaDetails />}
        />

        {/* Cart */}
        <Route
          path="/cart"
          element={<Cart />}
        />
        <Route
            path="/contact"
            element={<Contact />}
          />

        {/* Checkout */}
        <Route
          path="/checkout"
          element={<Checkout />}
        />

        {/* Order Success */}
        <Route
          path="/order-success"
          element={<OrderSuccess />}
        />
        <Route
              path="/forgot-password"
              element={<ForgotPassword />}
            />

        {/* All Orders */}
        <Route
          path="/orders"
          element={<Orders />}
        />

        {/* Single Order */}
        <Route
          path="/orders/:id"
          element={<OrderSummary />}
        />
      <Route path="/offers" element={<Offers />} />
<Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/profile" element={<Profile />} />
      <Route 
       path="/admin/add-pizza"
       element={<AddPizza />}
      />
      <Route
 path="/admin/dashboard"
 element={<Dashboard />}
/>
      
      
      
      
      
      
      
      
      </Routes>

      <Footer />

    </div>
  );
}

export default App;