import { FaUser, FaUserEdit, FaStar, FaTimes } from "react-icons/fa";
import { useRouter } from "next/navigation";

const Sidebar = ({ closeSidebar }) => {
  const router = useRouter();

  const navigate = (path) => {
    router.push(path);
    if (closeSidebar) closeSidebar();
  };

  return (
    <div className=" hidden md:flex min-h-screen w-64 bg-white p-6  flex-col shadow-xl md:shadow-none mt-">
      {/* Close button for mobile */}
      <div className="md:hidden flex justify-end mb-4">
        <button onClick={closeSidebar}>
          <FaTimes className="text-2xl text-gray-700" />
        </button>
      </div>

      {/* Brand */}
      <div>
        <div className="flex items-center space-x-2 mb-10">
          <div className="bg-black text-white rounded-full w-8 h-8 flex items-center justify-center font-bold">
            S
          </div>
          <h1 className="text-xl font-bold">SMRITI JHA</h1>
        </div>

        {/* Links */}
        <nav className="space-y-6">
          <button
            onClick={() => navigate("/loginstuff/dashboardpage/userprofile")}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaUser className="text-xl" />
            <span>Your Profile</span>
          </button>

          <button
            onClick={() => navigate("/loginstuff/dashboardpage/updateprofile")}
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaUserEdit className="text-xl" />
            <span>Update Profile</span>
          </button>

          <button
            onClick={() =>
              navigate("/loginstuff/dashboardpage/favouritepoetry")
            }
            className="flex items-center space-x-3 text-gray-700 hover:text-blue-600 font-medium"
          >
            <FaStar className="text-xl text-yellow-500" />
            <span>Favorite Poems</span>
          </button>
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
