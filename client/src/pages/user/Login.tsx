import { useState } from "react";
import { Mail, Lock, Eye, EyeOff, Pizza } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
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

    navigate("/");
  } catch (error: any) {
    alert(
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
        px-6
      "
    >

      <div
        className="
          max-w-5xl
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
            p-12
            text-center
          "
        >

          <div
            className="
              w-24
              h-24
              rounded-full
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              mb-8
            "
          >
            <Pizza size={50}/>
          </div>


          <h1 className="text-4xl font-black">
            Welcome Back 🍕
          </h1>


          <p className="mt-5 text-gray-300 text-lg leading-8">
            Login to PizzaHub and continue enjoying your
            favorite handcrafted pizzas.
          </p>


        </div>




        {/* Login Form */}

        <div className="p-8 md:p-12">


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
                    py-4
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
                    py-4
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
                    <EyeOff size={20}/>
                    :
                    <Eye size={20}/>
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
                className="
                  text-[#BD6A3C]
                  font-semibold
                  text-sm
                "
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