import { Outlet } from "react-router-dom";

import Sidebar from "../../components/admin/Sidebar";
import Header from "../../components/admin/Header";

const AdminLayout = () => {

  return (

    <div className="min-h-screen bg-[#F8F9FC] flex">

      <Sidebar />

      <div className="flex-1 ml-72">

        <Header />

        <main className="p-8">

          <Outlet />

        </main>

      </div>

    </div>

  );

};

export default AdminLayout;