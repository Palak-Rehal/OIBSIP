import { useState } from "react";
import {
  ArrowLeft,
  MapPin,
  Home,
  Briefcase,
  Plus,
  Edit3,
  Trash2,
  CheckCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const SavedAddresses = () => {
  const navigate = useNavigate();

  const [addresses] = useState([
    {
      id: 1,
      type: "Home",
      icon: Home,
      name: "Palak Rehal",
      phone: "+91 98765 43210",
      address:
        "House No. 123, Model Town, Sirhind, Fatehgarh Sahib, Punjab - 140406",
      default: true,
    },
    {
      id: 2,
      type: "Office",
      icon: Briefcase,
      name: "Palak Rehal",
      phone: "+91 98765 43210",
      address:
        "IT Park, Sector 74, Mohali, Punjab - 160055",
      default: false,
    },
  ]);

  return (
    <div className="min-h-screen bg-[#F8F5F1] pt-28 pb-12 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Header */}

        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => navigate(-1)}
              className="bg-white p-3 rounded-xl shadow-md"
            >
              <ArrowLeft size={22} />
            </button>

            <div>
              <h1 className="text-4xl font-black text-[#2E2B27]">
                Saved Addresses
              </h1>

              <p className="text-gray-500 mt-2">
                Manage your delivery locations.
              </p>
            </div>

          </div>

          <button
            className="
              bg-[#C86B36]
              text-white
              px-6
              py-3
              rounded-xl
              flex
              items-center
              gap-2
              font-semibold
              hover:bg-[#B45A2C]
              transition-all
            "
          >
            <Plus size={20}/>
            Add Address
          </button>

        </div>

        {/* Address List */}

        <div className="space-y-6">

          {addresses.map((item) => {

            const Icon = item.icon;

            return (

              <div
                key={item.id}
                className="
                  bg-white
                  rounded-3xl
                  border
                  border-[#ECE5DD]
                  shadow-md
                  hover:shadow-xl
                  transition-all
                  p-7
                "
              >

                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">

                  <div className="flex gap-5">

                    <div
                      className="
                        w-16
                        h-16
                        rounded-2xl
                        bg-orange-100
                        flex
                        items-center
                        justify-center
                      "
                    >
                      <Icon
                        size={28}
                        className="text-[#C86B36]"
                      />
                    </div>

                    <div>

                      <div className="flex items-center gap-3">

                        <h2 className="text-2xl font-black text-[#2E2B27]">
                          {item.type}
                        </h2>

                        {item.default && (
                          <span
                            className="
                              bg-green-100
                              text-green-700
                              px-3
                              py-1
                              rounded-full
                              text-xs
                              font-bold
                            "
                          >
                            Default
                          </span>
                        )}

                      </div>

                      <p className="mt-3 font-semibold">
                        {item.name}
                      </p>

                      <p className="text-gray-500">
                        {item.phone}
                      </p>

                      <div className="flex gap-2 mt-3">

                        <MapPin
                          size={18}
                          className="text-[#C86B36] mt-1"
                        />

                        <p className="text-gray-600 leading-7">
                          {item.address}
                        </p>

                      </div>

                    </div>

                  </div>

                  <div className="flex gap-3">

                    {!item.default && (

                      <button
                        className="
                          px-5
                          py-3
                          rounded-xl
                          bg-green-100
                          text-green-700
                          flex
                          items-center
                          gap-2
                          font-semibold
                        "
                      >
                        <CheckCircle size={18}/>
                        Set Default
                      </button>

                    )}

                    <button
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-blue-100
                        text-blue-600
                        flex
                        items-center
                        justify-center
                        hover:bg-blue-600
                        hover:text-white
                        transition-all
                      "
                    >
                      <Edit3 size={18}/>
                    </button>

                    <button
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-red-100
                        text-red-600
                        flex
                        items-center
                        justify-center
                        hover:bg-red-600
                        hover:text-white
                        transition-all
                      "
                    >
                      <Trash2 size={18}/>
                    </button>

                  </div>

                </div>

              </div>

            );

          })}

        </div>

      </div>

    </div>
  );
};

export default SavedAddresses;