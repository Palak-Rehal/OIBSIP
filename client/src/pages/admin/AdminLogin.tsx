import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";
 
// Standalone admin login screen.
// Intentionally NOT linked from the public /register or /login pages —
// reachable only via a direct /admin/login URL, or via redirect from a
// protected /admin/* route (see routes/AdminRoute.tsx).
const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, logout } = useAuth();
 
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
 
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
 
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
 
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
 
    try {
      await login(formData);
 
      const role = JSON.parse(localStorage.getItem("user") || "{}").role;
 
      if (role !== "admin") {
        // Valid account, but not an admin — reject from this screen.
        logout();
        toast.error("This account does not have admin access.");
        setSubmitting(false);
        return;
      }
 
      toast.success("Welcome back, admin.");
      navigate("/admin/dashboard");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      setSubmitting(false);
    }
  };
 
  return (
    <div
      className="
        min-h-screen
        bg-[#1B1A17]
        flex
        justify-center
        items-center
        px-4
      "
    >
      <div
        className="
          w-full
          max-w-md
          bg-[#252320]
          rounded-[28px]
          p-10
          shadow-2xl
          border
          border-white/5
        "
      >
        <div className="flex flex-col items-center text-center mb-8">
          <div
            className="
              w-16
              h-16
              rounded-full
              bg-[var(--primary)]
              flex
              items-center
              justify-center
              mb-5
            "
          >
            <ShieldCheck size={30} className="text-white" />
          </div>
 
          <h1 className="text-2xl font-black text-white">
            Admin Console
          </h1>
 
          <p className="mt-2 text-sm text-gray-400">
            Restricted access. Authorised staff only.
          </p>
        </div>
 
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Admin Email
            </label>
 
            <div
              className="
                mt-2
                flex
                items-center
                border
                border-white/10
                bg-white/5
                rounded-2xl
                px-4
                focus-within:border-[var(--primary)]
              "
            >
              <Mail size={18} className="text-gray-500" />
 
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="admin@pizzahub.com"
                className="
                  w-full
                  px-4
                  py-3.5
                  outline-none
                  bg-transparent
                  text-white
                  placeholder:text-gray-600
                "
                required
              />
            </div>
          </div>
 
          <div>
            <label className="text-sm font-semibold text-gray-300">
              Password
            </label>
 
            <div
              className="
                mt-2
                flex
                items-center
                border
                border-white/10
                bg-white/5
                rounded-2xl
                px-4
                focus-within:border-[var(--primary)]
              "
            >
              <Lock size={18} className="text-gray-500" />
 
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="••••••••"
                className="
                  w-full
                  px-4
                  py-3.5
                  outline-none
                  bg-transparent
                  text-white
                  placeholder:text-gray-600
                "
                required
              />
 
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-gray-500"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
 
          <button
            type="submit"
            disabled={submitting}
            className="
              w-full
              bg-[var(--primary)]
              text-white
              py-4
              rounded-full
              font-bold
              text-lg
              hover:opacity-90
              transition
              duration-300
              disabled:opacity-50
            "
          >
            {submitting ? "Signing in..." : "Sign In"}
          </button>
        </form>
 
        <p className="text-center mt-8 text-xs text-gray-600">
          Not an admin? This login is for staff accounts only.
        </p>
      </div>
    </div>
  );
};
 
export default AdminLogin;
 
