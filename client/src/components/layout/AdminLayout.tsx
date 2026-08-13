import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar";

const AdminLayout = () => {
  return (
    <div className="min-h-screen bg-[#F7F5F2]">

      {/* Admin Sidebar */}
      <Sidebar />

      {/* Admin Content */}
      <div className="ml-72 min-h-screen">

        <main className="px-6 py-5 lg:px-6 lg:py-6">
          <Outlet />
        </main>

      </div>

    </div>
  );
};

export default AdminLayout;