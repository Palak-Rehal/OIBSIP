import { useState } from "react";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
  Pizza,
  Phone,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { registerUser } from "../../api/authApi";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
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
    const response = await registerUser(formData);

    toast.success(
      response.data.message ||
      "Registration successful! Please verify your email."
    );

    navigate("/login", {
      state: {
        message:
          "Registration successful! Please verify your email before logging in.",
      },
    });

  } catch (error: any) {

    toast.error(
      error.response?.data?.message ||
      "Registration failed"
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
        py-10
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


        {/* Left Section */}

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
            p-12
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


          <h1
            className="
              text-4xl
              font-black
            "
          >
            Join PizzaHub 🍕
          </h1>


          <p
            className="
              mt-5
              text-gray-300
              text-lg
              leading-8
            "
          >
            Create your account and enjoy delicious
            handcrafted pizzas delivered fresh.
          </p>


        </div>




        {/* Register Form */}

        <div
          className="
            p-8
            md:p-12
          "
        >

          <h2
            className="
              text-3xl
              font-black
              text-[#2E2B27]
            "
          >
            Create Account
          </h2>


          <p
            className="
              mt-3
              text-gray-500
            "
          >
            Sign up to start ordering your favorite pizzas.
          </p>




          <form
            onSubmit={handleSubmit}
            className="
              mt-8
              space-y-5
            "
          >



            {/* Name */}

            <InputField
              icon={<User size={20}/>}
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
            />



            {/* Email */}

            <InputField
              icon={<Mail size={20}/>}
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
            />



            {/* Phone */}

            <InputField
              icon={<Phone size={20}/>}
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
            />




            {/* Password */}

            <div
              className="
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
                placeholder="Password"
                className="
                  w-full
                  px-4
                  py-4
                  outline-none
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





            {/* Submit */}

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
              "
            >
              Create Account
            </button>


          </form>





          <p
            className="
              text-center
              mt-8
              text-gray-500
            "
          >

            Already have an account?

            <Link
              to="/login"
              className="
                ml-2
                text-[#BD6A3C]
                font-bold
              "
            >
              Login
            </Link>


          </p>



        </div>



      </div>



    </div>
  );
};





// Reusable Input Component

const InputField = ({
  icon,
  type,
  name,
  placeholder,
  value,
  onChange,
}: any) => {

  return (
    <div
      className="
        flex
        items-center
        border
        border-gray-200
        rounded-2xl
        px-4
        focus-within:border-[#BD6A3C]
      "
    >

      <span className="text-gray-400">
        {icon}
      </span>


      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="
          w-full
          px-4
          py-4
          outline-none
        "
        required
      />


    </div>
  );
};



export default Register;