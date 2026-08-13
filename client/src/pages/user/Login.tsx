import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Pizza } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import toast from "react-hot-toast";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await login(formData);

      toast.success("Login successful!");

      const role = JSON.parse(
        localStorage.getItem("user") || "{}"
      ).role;

      if (role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Login failed"
      );
    }
  };

  return (
    <div
      className="
        min-h-screen
        bg-[#FAF7F2]
        flex
        items-center
        justify-center
        px-4
        py-6
      "
    >
      <div
        className="
          w-full
          max-w-[820px]
          grid
          md:grid-cols-[0.85fr_1fr]
          bg-white
          rounded-[28px]
          overflow-hidden
          shadow-[0_20px_60px_rgba(46,43,39,0.12)]
        "
      >

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div
          className="
            hidden
            md:flex
            bg-[#2E2B27]
            text-white
            flex-col
            justify-center
            items-center
            text-center
            px-8
            py-8
          "
        >

          {/* Logo */}

          <div
            className="
              w-14
              h-14
              rounded-2xl
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              mb-5
              shadow-lg
              shadow-[#BD6A3C]/20
            "
          >
            <Pizza size={28} strokeWidth={2.2} />
          </div>

          <h1 className="text-2xl font-black">
            Welcome Back 🍕
          </h1>

          <p
            className="
              mt-3
              text-gray-400
              text-sm
              leading-6
              max-w-[230px]
            "
          >
            Login to PizzaHub and continue enjoying your
            favorite handcrafted pizzas.
          </p>

          {/* Small decorative line */}

          <div className="mt-6 flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-[#BD6A3C]" />
            <span className="h-1.5 w-10 rounded-full bg-[#BD6A3C]/30" />
            <span className="h-1.5 w-1.5 rounded-full bg-[#BD6A3C]" />
          </div>

        </div>


        {/* =================================================
            LOGIN FORM
        ================================================= */}

        <div className="px-7 py-7 md:px-9 md:py-8">

          {/* Header */}

          <div>
            <p
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[2px]
                text-[#BD6A3C]
              "
            >
              PizzaHub
            </p>

            <h2
              className="
                text-2xl
                md:text-[27px]
                font-black
                text-[#2E2B27]
                mt-1
              "
            >
              Login Account
            </h2>

            <p className="mt-1.5 text-sm text-gray-500">
              Enter your details to access your account.
            </p>
          </div>


          {/* Success Message */}

          {location.state?.message && (
            <div
              className="
                mt-4
                bg-green-50
                border
                border-green-200
                text-green-700
                rounded-xl
                px-3
                py-2.5
                text-sm
                font-medium
              "
            >
              ✅ {location.state.message}
            </div>
          )}


          {/* Form */}

          <form
            onSubmit={handleSubmit}
            className="mt-5 space-y-4"
          >

            {/* Email */}

            <div>

              <label
                className="
                  text-xs
                  font-bold
                  text-gray-700
                "
              >
                Email Address
              </label>

              <div
                className="
                  mt-1.5
                  h-11
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  px-3
                  bg-white
                  focus-within:border-[#BD6A3C]
                  focus-within:ring-4
                  focus-within:ring-[#BD6A3C]/10
                  transition
                "
              >

                <Mail
                  size={17}
                  className="text-gray-400 shrink-0"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="
                    w-full
                    px-3
                    text-sm
                    outline-none
                    text-gray-700
                    bg-transparent
                  "
                  required
                />

              </div>

            </div>


            {/* Password */}

            <div>

              <label
                className="
                  text-xs
                  font-bold
                  text-gray-700
                "
              >
                Password
              </label>

              <div
                className="
                  mt-1.5
                  h-11
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-xl
                  px-3
                  bg-white
                  focus-within:border-[#BD6A3C]
                  focus-within:ring-4
                  focus-within:ring-[#BD6A3C]/10
                  transition
                "
              >

                <Lock
                  size={17}
                  className="text-gray-400 shrink-0"
                />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
                    w-full
                    px-3
                    text-sm
                    outline-none
                    text-gray-700
                    bg-transparent
                  "
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="text-gray-400 hover:text-[#BD6A3C]"
                >
                  {showPassword ? (
                    <EyeOff size={17} />
                  ) : (
                    <Eye size={17} />
                  )}
                </button>

              </div>

            </div>


            {/* Forgot Password */}

            <div className="flex justify-end -mt-1">

              <Link
                to="/forgot-password"
                className="
                  text-xs
                  font-semibold
                  text-[#BD6A3C]
                  hover:underline
                "
              >
                Forgot Password?
              </Link>

            </div>


            {/* Login Button */}

            <button
              type="submit"
              className="
                w-full
                h-11
                bg-[#BD6A3C]
                text-white
                rounded-xl
                font-bold
                text-sm
                hover:bg-[#a95731]
                hover:shadow-lg
                hover:shadow-[#BD6A3C]/20
                transition
                duration-300
              "
            >
              Login
            </button>

          </form>


          {/* Register */}

          <p
            className="
              text-center
              mt-5
              text-xs
              text-gray-500
            "
          >
            Don't have an account?

            <Link
              to="/register"
              className="
                ml-1.5
                text-[#BD6A3C]
                font-bold
                hover:underline
              "
            >
              Create Account
            </Link>
          </p>


          {/* Admin Login */}

          <div
            className="
              mt-4
              pt-4
              border-t
              border-gray-100
              text-center
            "
          >

            <p className="text-[11px] text-gray-400">
              Restaurant administrator?
            </p>

            <Link
              to="/admin/login"
              className="
                inline-flex
                items-center
                mt-1
                text-xs
                font-bold
                text-[#2E2B27]
                hover:text-[#BD6A3C]
                transition
              "
            >
              Admin Login
              <span className="ml-1">→</span>
            </Link>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Login;