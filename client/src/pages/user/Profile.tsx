import {
  User,
  Mail,
  Phone,
  MapPin,
  Edit3,
  ShoppingBag,
  LogOut,
} from "lucide-react";
import { useNavigate } from "react-router-dom";


const Profile = () => {

  const navigate = useNavigate();


  const user = {
    name: "Aarav Sharma",
    email: "aarav@gmail.com",
    phone: "+91 9876543210",
    address: "Chandigarh, India",
  };


  return (

    <div
      className="
        min-h-screen
        bg-[#FAF7F2]
        px-6
        py-16
      "
    >

      <div
        className="
          max-w-5xl
          mx-auto
          bg-white
          rounded-[35px]
          shadow-xl
          overflow-hidden
        "
      >


        {/* Header */}

        <div
          className="
            bg-[#2E2B27]
            text-white
            p-10
            flex
            flex-col
            md:flex-row
            items-center
            gap-6
          "
        >

          <div
            className="
              w-28
              h-28
              rounded-full
              bg-[#BD6A3C]
              flex
              items-center
              justify-center
              text-5xl
              font-black
            "
          >
            A
          </div>


          <div>

            <h1
              className="
                text-4xl
                font-black
              "
            >
              {user.name}
            </h1>

            <p className="text-gray-300 mt-2">
              Pizza Lover 🍕
            </p>

          </div>


        </div>





        {/* Details */}

        <div
          className="
            p-8
            md:p-12
          "
        >


          <div
            className="
              flex
              justify-between
              items-center
              mb-8
            "
          >

            <h2
              className="
                text-3xl
                font-black
                text-[#2E2B27]
              "
            >
              My Profile
            </h2>


            <button
              className="
                flex
                items-center
                gap-2
                bg-[#BD6A3C]
                text-white
                px-5
                py-3
                rounded-full
                font-semibold
              "
            >

              <Edit3 size={18}/>
              Edit

            </button>


          </div>





          <div
            className="
              grid
              md:grid-cols-2
              gap-6
            "
          >


            <ProfileCard
              icon={<User/>}
              title="Full Name"
              value={user.name}
            />


            <ProfileCard
              icon={<Mail/>}
              title="Email"
              value={user.email}
            />


            <ProfileCard
              icon={<Phone/>}
              title="Phone"
              value={user.phone}
            />


            <ProfileCard
              icon={<MapPin/>}
              title="Address"
              value={user.address}
            />


          </div>





          {/* Actions */}

          <div
            className="
              mt-12
              grid
              md:grid-cols-2
              gap-5
            "
          >


            <button
              onClick={() => navigate("/orders")}
              className="
                flex
                justify-center
                items-center
                gap-3
                bg-[#FAF7F2]
                border
                border-[#E7DED3]
                py-4
                rounded-2xl
                font-bold
                text-[#2E2B27]
                hover:shadow-lg
                transition
              "
            >

              <ShoppingBag/>
              My Orders

            </button>



            <button
              onClick={() => navigate("/login")}
              className="
                flex
                justify-center
                items-center
                gap-3
                bg-red-500
                text-white
                py-4
                rounded-2xl
                font-bold
              "
            >

              <LogOut/>
              Logout

            </button>


          </div>



        </div>


      </div>


    </div>

  );
};






const ProfileCard = ({
  icon,
  title,
  value,
}:any)=>{


  return (

    <div
      className="
        bg-[#FAF7F2]
        rounded-2xl
        p-6
        flex
        gap-4
        items-center
        border
        border-[#E7DED3]
      "
    >

      <div
        className="
          text-[#BD6A3C]
        "
      >
        {icon}
      </div>


      <div>

        <p className="text-gray-500 text-sm">
          {title}
        </p>

        <h3
          className="
            font-bold
            text-[#2E2B27]
          "
        >
          {value}
        </h3>

      </div>


    </div>

  );

};



export default Profile;