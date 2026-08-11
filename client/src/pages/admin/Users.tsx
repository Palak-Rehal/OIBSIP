import { useEffect, useMemo, useState } from "react";
import {
  Search,
  Users as UsersIcon,
  Eye,
  Mail,
  Calendar,
} from "lucide-react";

import { getAllUsers } from "../../api/adminApi";


interface User {

  _id: string;

  name: string;

  email: string;

  role: string;

  isVerified?: boolean;

  createdAt: string;

}



const Users = () => {


  const [users, setUsers] = useState<User[]>([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  const [selectedUser, setSelectedUser] =
    useState<User | null>(null);



  const fetchUsers = async () => {

    try {

      const res = await getAllUsers();

      setUsers(res.data.users || []);

    } catch (error) {

      console.log(error);

    } finally {

      setLoading(false);

    }

  };



  useEffect(() => {

    fetchUsers();

  }, []);




  const filteredUsers = useMemo(() => {

    return users.filter((user) =>

      user.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

      ||

      user.email
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  }, [users, search]);



  return (

    <div className="min-h-screen bg-[#F8F6F3] p-6 lg:p-10">


      <div className="max-w-7xl mx-auto">



        {/* Header */}

        <div className="flex flex-col lg:flex-row justify-between gap-6 mb-8">


          <div>

            <h1 className="text-4xl font-black text-[#2E2B27]">
              Users Management
            </h1>


            <p className="text-gray-500 mt-2">
              Manage customers, accounts and user activity.
            </p>

          </div>



          <div className="relative w-full lg:w-80">

            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            />


            <input

              value={search}

              onChange={(e)=>
                setSearch(e.target.value)
              }

              placeholder="Search users..."

              className="
              w-full
              bg-white
              border
              rounded-2xl
              py-3
              pl-11
              pr-4
              outline-none
              focus:ring-2
              focus:ring-[#BD6A3C]
              "

            />


          </div>


        </div>





        {/* Stats */}


        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">


          <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <p className="text-gray-500">
              Total Users
            </p>

            <h2 className="text-4xl font-black mt-2">
              {users.length}
            </h2>

          </div>




          <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <p className="text-gray-500">
              Verified Users
            </p>

            <h2 className="text-4xl font-black text-green-600 mt-2">

              {
                users.filter(
                  user => user.isVerified
                ).length
              }

            </h2>

          </div>




          <div className="bg-white rounded-3xl p-6 border shadow-sm">

            <p className="text-gray-500">
              Admin Accounts
            </p>

            <h2 className="text-4xl font-black text-[#BD6A3C] mt-2">

              {
                users.filter(
                  user => user.role==="admin"
                ).length
              }

            </h2>

          </div>


        </div>







        {/* Table */}


        <div className="bg-white rounded-3xl border shadow-sm overflow-hidden">


          <div className="flex items-center gap-3 px-6 py-5 border-b">

            <UsersIcon
              className="text-[#BD6A3C]"
            />

            <h2 className="text-2xl font-black">
              Customer List
            </h2>


          </div>




          {loading ? (

            <div className="py-20 text-center">
              Loading Users...
            </div>

          ) : filteredUsers.length===0 ? (

            <div className="py-20 text-center text-gray-500">
              No Users Found
            </div>

          ) : (


          <div className="overflow-x-auto">


          <table className="w-full">


          <thead className="bg-[#FAF7F2]">

          <tr className="text-left text-sm text-gray-500 uppercase">


          <th className="px-6 py-4">
            User
          </th>


          <th className="px-6 py-4">
            Role
          </th>


          <th className="px-6 py-4">
            Status
          </th>


          <th className="px-6 py-4">
            Joined
          </th>


          <th className="px-6 py-4">
            Action
          </th>


          </tr>

          </thead>




          <tbody>


          {filteredUsers.map(user=>(


          <tr
          key={user._id}
          className="border-b hover:bg-[#FAF7F2] transition"
          >



          <td className="px-6 py-5">

          <p className="font-bold">
            {user.name}
          </p>

          <p className="text-sm text-gray-500 flex gap-2 items-center">

          <Mail size={14}/>

          {user.email}

          </p>


          </td>





          <td className="px-6 py-5">

          <span className="
          px-3 py-1 rounded-full text-xs font-bold
          bg-orange-100 text-orange-700
          ">

          {user.role}

          </span>

          </td>





          <td className="px-6 py-5">


          <span className={`
          px-3 py-1 rounded-full text-xs font-bold
          ${
            user.isVerified
            ?
            "bg-green-100 text-green-700"
            :
            "bg-red-100 text-red-700"
          }
          `}>

          {user.isVerified
          ?"Verified"
          :"Unverified"}

          </span>


          </td>






          <td className="px-6 py-5 text-gray-600">


          <div className="flex items-center gap-2">

          <Calendar size={15}/>

          {
            new Date(
              user.createdAt
            ).toLocaleDateString()
          }


          </div>


          </td>






          <td className="px-6 py-5">


          <button

          onClick={()=>
            setSelectedUser(user)
          }

          className="
          flex items-center gap-2
          bg-[#BD6A3C]
          text-white
          px-4 py-2
          rounded-xl
          hover:bg-[#a85b33]
          transition
          "

          >

          <Eye size={16}/>

          View

          </button>


          </td>





          </tr>


          ))}



          </tbody>


          </table>


          </div>

          )}



        </div>





        {/* Modal */}


        {selectedUser && (


        <div className="
        fixed inset-0
        bg-black/40
        flex
        items-center
        justify-center
        z-50
        ">


        <div className="
        bg-white
        rounded-3xl
        p-8
        w-full
        max-w-md
        relative
        ">



        <button

        onClick={()=>
          setSelectedUser(null)
        }

        className="
        absolute
        right-5
        top-5
        text-gray-500
        "

        >
        ✕
        </button>




        <h2 className="text-2xl font-black mb-6">
          User Details
        </h2>


        <p>
        <b>Name:</b> {selectedUser.name}
        </p>

        <p className="mt-2">
        <b>Email:</b> {selectedUser.email}
        </p>

        <p className="mt-2">
        <b>Role:</b> {selectedUser.role}
        </p>


        </div>


        </div>


        )}



      </div>


    </div>

  );

};


export default Users;