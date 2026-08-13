import { useEffect, useMemo, useState } from "react";

import {
  Search,
  Users as UsersIcon,
  Eye,
  Mail,
  CalendarDays,
  ShieldCheck,
  UserCheck,
  X,
  UserRound,
  Shield,
  Clock3,
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
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  // ================= FETCH USERS =================

  const fetchUsers = async () => {
    try {
      setLoading(true);

      const res = await getAllUsers();

      console.log("ADMIN USERS RESPONSE:", res.data);

      const usersData =
        res.data?.users ??
        res.data?.data ??
        res.data ??
        [];

      if (Array.isArray(usersData)) {
        setUsers(usersData);
      } else {
        console.error(
          "Unexpected users response:",
          res.data
        );

        setUsers([]);
      }

    } catch (error: any) {
      console.error(
        "Failed to fetch users:",
        error?.response?.data || error
      );

      setUsers([]);
    } finally {
      setLoading(false);
    }
  };
  // IMPORTANT: CALL fetchUsers here
  useEffect(() => {
    fetchUsers();
  }, []);
  
  // ================= FILTER =================

  const filteredUsers = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return users;

    return users.filter((user) => {
      return (
        user.name?.toLowerCase().includes(query) ||
        user.email?.toLowerCase().includes(query) ||
        user.role?.toLowerCase().includes(query)
      );
    });
  }, [users, search]);

  // ================= STATS =================

  const totalUsers = users.length;

  const verifiedUsers = users.filter(
    (user) => user.isVerified
  ).length;

  const adminUsers = users.filter(
    (user) => user.role?.toLowerCase() === "admin"
  ).length;

  const unverifiedUsers = users.filter(
    (user) => !user.isVerified
  ).length;

  // ================= HELPERS =================

  const getInitial = (name?: string) => {
    if (!name) return "U";

    return name.charAt(0).toUpperCase();
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // ================= RENDER =================

  return (
    <div className="w-full max-w-[1500px] mx-auto pb-8">

      {/* =====================================================
          PAGE HEADER
      ===================================================== */}

      <div className="flex flex-col xl:flex-row xl:items-center xl:justify-between gap-5 mb-6">

        {/* Heading */}

        <div>

          <div className="flex items-center gap-2 mb-2">

            <span className="h-2 w-2 rounded-full bg-[#BD6A3C]" />

            <span className="text-xs font-bold tracking-[2px] uppercase text-[#BD6A3C]">
              PizzaHub Admin
            </span>

          </div>

          <h1 className="text-3xl lg:text-4xl font-black tracking-tight text-[#24211F]">
            Users
          </h1>

          <p className="text-sm text-gray-500 mt-1">
            Manage customers, accounts and user activity.
          </p>

        </div>


        {/* Search */}

        <div className="relative w-full sm:w-[300px]">

          <Search
            size={17}
            className="
              absolute
              left-3.5
              top-1/2
              -translate-y-1/2
              text-gray-400
            "
          />

          <input
            type="text"
            placeholder="Search users..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="
              w-full
              h-11
              rounded-xl
              border
              border-[#E8E1DB]
              bg-white
              pl-10
              pr-4
              text-sm
              text-[#2E2B27]
              placeholder:text-gray-400
              shadow-sm
              outline-none
              transition
              focus:border-[#BD6A3C]
              focus:ring-4
              focus:ring-[#BD6A3C]/10
            "
          />

        </div>

      </div>


      {/* =====================================================
          STAT CARDS
      ===================================================== */}

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">

        {/* Total Users */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Total Users
              </p>

              <h2 className="text-2xl font-black text-[#24211F] mt-1">
                {totalUsers}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-[#FBE8DC] flex items-center justify-center">

              <UsersIcon
                size={19}
                className="text-[#BD6A3C]"
              />

            </div>

          </div>

        </div>


        {/* Verified */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Verified
              </p>

              <h2 className="text-2xl font-black text-emerald-600 mt-1">
                {verifiedUsers}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-emerald-50 flex items-center justify-center">

              <UserCheck
                size={19}
                className="text-emerald-600"
              />

            </div>

          </div>

        </div>


        {/* Admin */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Admin Accounts
              </p>

              <h2 className="text-2xl font-black text-[#BD6A3C] mt-1">
                {adminUsers}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-[#FBE8DC] flex items-center justify-center">

              <ShieldCheck
                size={19}
                className="text-[#BD6A3C]"
              />

            </div>

          </div>

        </div>


        {/* Unverified */}

        <div
          className="
            rounded-2xl
            border
            border-[#E9E1DA]
            bg-white
            p-4
            shadow-sm
            transition
            hover:-translate-y-0.5
            hover:shadow-md
          "
        >

          <div className="flex items-center justify-between">

            <div>

              <p className="text-xs font-semibold text-gray-500">
                Unverified
              </p>

              <h2 className="text-2xl font-black text-red-500 mt-1">
                {unverifiedUsers}
              </h2>

            </div>

            <div className="h-10 w-10 rounded-xl bg-red-50 flex items-center justify-center">

              <Shield
                size={19}
                className="text-red-500"
              />

            </div>

          </div>

        </div>

      </div>


      {/* =====================================================
          USERS CARD
      ===================================================== */}

      <div
        className="
          overflow-hidden
          rounded-2xl
          border
          border-[#E9E1DA]
          bg-white
          shadow-sm
        "
      >

        {/* Card Header */}

        <div
          className="
            flex
            flex-col
            sm:flex-row
            sm:items-center
            sm:justify-between
            gap-3
            px-5
            py-4
            border-b
            border-[#EEE7E1]
          "
        >

          <div className="flex items-center gap-3">

            <div
              className="
                h-9
                w-9
                rounded-xl
                bg-[#FBE8DC]
                flex
                items-center
                justify-center
              "
            >

              <UsersIcon
                size={18}
                className="text-[#BD6A3C]"
              />

            </div>

            <div>

              <h2 className="text-lg font-black text-[#24211F]">
                Customer List
              </h2>

              <p className="text-xs text-gray-500">
                {filteredUsers.length} user
                {filteredUsers.length !== 1
                  ? "s"
                  : ""}{" "}
                found
              </p>

            </div>

          </div>


          <div className="text-xs font-semibold text-gray-400">
            Showing {filteredUsers.length} of {users.length}
          </div>

        </div>


        {/* =================================================
            LOADING
        ================================================= */}

        {loading ? (

          <div className="p-5 space-y-3">

            {[1, 2, 3, 4].map((item) => (

              <div
                key={item}
                className="
                  h-16
                  rounded-xl
                  bg-gray-100
                  animate-pulse
                "
              />

            ))}

          </div>

        ) : filteredUsers.length === 0 ? (

          /* =================================================
              EMPTY
          ================================================= */

          <div className="py-16 text-center">

            <div
              className="
                mx-auto
                h-14
                w-14
                rounded-2xl
                bg-[#F8F3EF]
                flex
                items-center
                justify-center
                mb-3
              "
            >

              <UsersIcon
                size={25}
                className="text-[#BD6A3C]"
              />

            </div>

            <h3 className="font-bold text-[#2E2B27]">
              No users found
            </h3>

            <p className="text-sm text-gray-500 mt-1">
              Try changing your search.
            </p>

          </div>

        ) : (

          /* =================================================
              TABLE
          ================================================= */

          <div className="overflow-x-auto">

            <table className="w-full min-w-[850px]">

              <thead>

                <tr className="bg-[#FBF9F7] border-b border-[#EEE7E1]">

                  <th className="px-5 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    User
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Role
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Status
                  </th>

                  <th className="px-4 py-3 text-left text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Joined
                  </th>

                  <th className="px-5 py-3 text-right text-[11px] font-bold uppercase tracking-wider text-gray-500">
                    Action
                  </th>

                </tr>

              </thead>


              <tbody>

                {filteredUsers.map((user) => (

                  <tr
                    key={user._id}
                    className="
                      border-b
                      border-[#F0EBE7]
                      last:border-b-0
                      hover:bg-[#FCFAF8]
                      transition-colors
                    "
                  >

                    {/* USER */}

                    <td className="px-5 py-3.5">

                      <div className="flex items-center gap-3">

                        <div
                          className="
                            h-9
                            w-9
                            shrink-0
                            rounded-xl
                            bg-gradient-to-br
                            from-[#BD6A3C]
                            to-[#E7A06F]
                            text-white
                            flex
                            items-center
                            justify-center
                            text-sm
                            font-black
                            shadow-sm
                          "
                        >
                          {getInitial(user.name)}
                        </div>


                        <div className="min-w-0">

                          <p className="text-sm font-bold text-[#2E2B27] truncate max-w-[220px]">
                            {user.name || "Unknown User"}
                          </p>

                          <div className="flex items-center gap-1.5 mt-0.5">

                            <Mail
                              size={11}
                              className="text-gray-400 shrink-0"
                            />

                            <p className="text-[11px] text-gray-400 truncate max-w-[220px]">
                              {user.email || "No email"}
                            </p>

                          </div>

                        </div>

                      </div>

                    </td>


                    {/* ROLE */}

                    <td className="px-4 py-3.5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          uppercase
                          ${user.role?.toLowerCase() === "admin"
                            ? "border-[#E7C8B6] bg-[#FBE8DC] text-[#A85A2F]"
                            : "border-gray-200 bg-gray-50 text-gray-600"
                          }
                        `}
                      >
                        {user.role || "user"}
                      </span>

                    </td>


                    {/* STATUS */}

                    <td className="px-4 py-3.5">

                      <span
                        className={`
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-full
                          border
                          px-2.5
                          py-1
                          text-[10px]
                          font-bold
                          ${user.isVerified
                            ? "border-emerald-200 bg-emerald-50 text-emerald-700"
                            : "border-red-200 bg-red-50 text-red-600"
                          }
                        `}
                      >

                        <span
                          className={`
                            h-1.5
                            w-1.5
                            rounded-full
                            ${user.isVerified
                              ? "bg-emerald-500"
                              : "bg-red-500"
                            }
                          `}
                        />

                        {user.isVerified
                          ? "Verified"
                          : "Unverified"}

                      </span>

                    </td>


                    {/* JOINED */}

                    <td className="px-4 py-3.5">

                      <div className="flex items-center gap-1.5 text-xs text-gray-500">

                        <CalendarDays
                          size={13}
                          className="text-[#BD6A3C]"
                        />

                        {formatDate(user.createdAt)}

                      </div>

                    </td>


                    {/* ACTION */}

                    <td className="px-5 py-3.5 text-right">

                      <button
                        onClick={() =>
                          setSelectedUser(user)
                        }
                        className="
                          inline-flex
                          items-center
                          gap-1.5
                          rounded-lg
                          border
                          border-[#E5D8CE]
                          bg-white
                          px-3
                          py-2
                          text-xs
                          font-bold
                          text-[#BD6A3C]
                          shadow-sm
                          transition
                          hover:bg-[#BD6A3C]
                          hover:text-white
                          hover:border-[#BD6A3C]
                        "
                      >

                        <Eye size={14} />

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


      {/* =====================================================
          USER DETAILS MODAL
      ===================================================== */}

      {selectedUser && (

        <div
          className="
            fixed
            inset-0
            z-[100]
            flex
            items-center
            justify-center
            bg-[#1C1714]/50
            backdrop-blur-sm
            p-4
          "
          onClick={() =>
            setSelectedUser(null)
          }
        >

          <div
            className="
              relative
              w-full
              max-w-md
              overflow-hidden
              rounded-3xl
              border
              border-white/40
              bg-white
              shadow-2xl
            "
            onClick={(e) =>
              e.stopPropagation()
            }
          >

            {/* Modal Header */}

            <div
              className="
                flex
                items-center
                justify-between
                border-b
                border-[#EEE7E1]
                bg-white/95
                px-6
                py-5
              "
            >

              <div className="flex items-center gap-3">

                <div
                  className="
                    h-11
                    w-11
                    rounded-2xl
                    bg-[#FBE8DC]
                    flex
                    items-center
                    justify-center
                  "
                >

                  <UserRound
                    size={20}
                    className="text-[#BD6A3C]"
                  />

                </div>

                <div>

                  <p className="text-xs font-bold uppercase tracking-wider text-[#BD6A3C]">
                    Customer Profile
                  </p>

                  <h2 className="text-xl font-black text-[#24211F]">
                    User Details
                  </h2>

                </div>

              </div>


              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  h-9
                  w-9
                  rounded-xl
                  bg-gray-100
                  flex
                  items-center
                  justify-center
                  text-gray-500
                  transition
                  hover:bg-gray-200
                  hover:text-gray-800
                "
              >
                <X size={18} />
              </button>

            </div>


            {/* Modal Content */}

            <div className="p-6">

              {/* Profile */}

              <div
                className="
                  rounded-2xl
                  border
                  border-[#EDE5DE]
                  bg-[#FCFAF8]
                  p-4
                  mb-5
                "
              >

                <div className="flex items-center gap-3">

                  <div
                    className="
                      h-12
                      w-12
                      rounded-2xl
                      bg-gradient-to-br
                      from-[#BD6A3C]
                      to-[#E7A06F]
                      flex
                      items-center
                      justify-center
                      text-white
                      text-lg
                      font-black
                    "
                  >
                    {getInitial(selectedUser.name)}
                  </div>

                  <div className="min-w-0">

                    <h3 className="text-base font-black text-[#2E2B27] truncate">
                      {selectedUser.name}
                    </h3>

                    <p className="text-xs text-gray-500 truncate">
                      {selectedUser.email}
                    </p>

                  </div>

                </div>

              </div>


              {/* Info Grid */}

              <div className="grid grid-cols-2 gap-3">

                {/* Email */}

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <Mail
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Email
                  </p>

                  <p className="text-xs font-bold mt-1 break-all">
                    {selectedUser.email}
                  </p>

                </div>


                {/* Role */}

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <Shield
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Role
                  </p>

                  <p className="text-xs font-bold mt-1 capitalize">
                    {selectedUser.role}
                  </p>

                </div>


                {/* Verification */}

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <UserCheck
                    size={15}
                    className={
                      selectedUser.isVerified
                        ? "text-emerald-600 mb-2"
                        : "text-red-500 mb-2"
                    }
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Account Status
                  </p>

                  <p
                    className={`
                      text-xs
                      font-bold
                      mt-1
                      ${selectedUser.isVerified
                        ? "text-emerald-600"
                        : "text-red-500"
                      }
                    `}
                  >
                    {selectedUser.isVerified
                      ? "Verified"
                      : "Unverified"}
                  </p>

                </div>


                {/* Joined */}

                <div className="rounded-xl bg-[#FAF7F4] p-3">

                  <Clock3
                    size={15}
                    className="text-[#BD6A3C] mb-2"
                  />

                  <p className="text-[10px] uppercase font-bold text-gray-400">
                    Joined
                  </p>

                  <p className="text-xs font-bold mt-1">
                    {formatDate(
                      selectedUser.createdAt
                    )}
                  </p>

                </div>

              </div>

            </div>


            {/* Footer */}

            <div
              className="
                border-t
                border-[#EEE7E1]
                px-6
                py-4
                flex
                justify-end
              "
            >

              <button
                onClick={() =>
                  setSelectedUser(null)
                }
                className="
                  rounded-xl
                  bg-[#BD6A3C]
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-white
                  shadow-sm
                  transition
                  hover:bg-[#A85A2F]
                "
              >
                Close
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
};

export default Users;