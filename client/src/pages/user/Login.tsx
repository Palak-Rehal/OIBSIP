import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Pizza } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocation } from "react-router-dom";
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

      // Read latest user after login
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
    justify-center
    items-start
    pt-32
    pb-10
    px-4
      "
    >

      <div
        className="
          max-w-4xl
          w-full
          grid
          md:grid-cols-2
          bg-white
          rounded-[35px]
          overflow-hidden
          shadow-2xl
        "
      >


        {/* Left Side */}

        <div
          className="
            hidden
            md:flex
            bg-[#2E2B27]
            text-white
            flex-col
            justify-center
            items-center
            p-10
            text-center
          "
        >

          <div
            className="
              w-20
              h-20
              rounded-full
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              mb-8
            "
          >
            <Pizza size={40} />
          </div>


          <h1 className="text-3xl font-black">
            Welcome Back 🍕
          </h1>


          <p className="mt-5 text-gray-300 text-lg leading-8">
            Login to PizzaHub and continue enjoying your
            favorite handcrafted pizzas.
          </p>


        </div>




        {/* Login Form */}

        <div className="p-8 md:p-10">


          <h2
            className="
              text-3xl
              font-black
              text-[#2E2B27]
            "
          >
            Login Account
          </h2>


          <p className="mt-3 text-gray-500">
            Enter your details to access your account.
          </p>

          {location.state?.message && (
            <div
              className="
      mt-4
      bg-green-100
      border
      border-green-300
      text-green-700
      rounded-xl
      px-4
      py-3
      font-medium
    "
            >
              ✅ {location.state.message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-6"
          >


            {/* Email */}

            <div>

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Email Address
              </label>


              <div
                className="
                  mt-2
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  focus-within:border-[#BD6A3C]
                "
              >

                <Mail
                  size={20}
                  className="text-gray-400"
                />

                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter email"
                  className="
                    w-full
                    px-4
                    py-3.5
                    outline-none
                    text-gray-700
                  "
                  required
                />

              </div>

            </div>




            {/* Password */}

            <div>

              <label
                className="
                  text-sm
                  font-semibold
                  text-gray-700
                "
              >
                Password
              </label>


              <div
                className="
                  mt-2
                  flex
                  items-center
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  focus-within:border-[#BD6A3C]
                "
              >

                <Lock
                  size={20}
                  className="text-gray-400"
                />


                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="
                    w-full
                    px-4
                    py-3
                    outline-none
                    text-gray-700
                  "
                  required
                />


                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                >

                  {
                    showPassword
                      ?
                      <EyeOff size={20} />
                      :
                      <Eye size={20} />
                  }

                </button>


              </div>


            </div>



            {/* Forgot Password */}

            <div
              className="
                flex
                justify-end
              "
            >

              <Link
                to="/forgot-password"
                className="text-sm text-[#BD6A3C] hover:underline"
              >
                Forgot Password?
              </Link>
            </div>



            {/* Button */}

            <button
              type="submit"
              className="
                w-full
                bg-[#BD6A3C]
                text-white
                py-4
                rounded-full
                font-bold
                text-lg
                hover:bg-[#a95731]
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
              mt-8
              text-gray-500
            "
          >

            Don't have an account?

            <Link
              to="/register"
              className="
                ml-2
                text-[#BD6A3C]
                font-bold
              "
            >
              Create Account
            </Link>

          </p>



        </div>


      </div>


    </div>
  );
};


export default Login;