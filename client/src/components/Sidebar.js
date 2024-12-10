import React from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { PiUserPlusThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { PiUserCircleThin, PiUsersThin } from "react-icons/pi";
import { useSelector, useDispatch } from "react-redux"; // Import useDispatch
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";
import SearchUser from "./SearchUser";
import axios from "axios";
import { toast } from "react-toastify";
import Avatar from "./Avatar";
import { logout } from "../redux/userSlice"; // Import the logout action

const Sidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Initialize dispatch
  const user = useSelector((state) => state.user);

  const [editUserSection, setEditUserSection] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const logoutUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
    try {
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      if (response.data.success) {
        // Dispatch logout action to clear Redux state
        dispatch(logout());

        // Remove Token from localstorage
        localStorage.removeItem("token");
        // Navigate to the email verification page
        navigate("/checkEmail");

        toast.success("Logout successfully", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    } catch (error) {
      toast.error("Something went wrong" || error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  let avatarName = "";
  if (user?.name) {
    const splitName = user?.name.trim().split(" "); // Ensure we trim whitespace
    avatarName =
      splitName.length > 1
        ? splitName[0][0] + splitName[1][0] // Get initials from first and last name
        : splitName[0][0]; // Get initial from first name only
  }

  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);

  const onlineUser = useSelector((state) => state?.user?._id);
  const isOnline = onlineUser.includes(user?._id);

  return (
    <div className="w-full h-full bg-gray-100 grid grid-cols-[48px,1fr]">
      <div className="bg-gray-300 w-12 h-full py-3 flex flex-col justify-between text-gray-800">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:border rounded-lg border-gray-700 ${
                isActive && "border"
              }`
            }
            title="Chat"
          >
            <BiSolidMessageSquareDetail size={25} />
          </NavLink>
          <div
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:border rounded-lg border-gray-700"
            title="Add Friends"
            onClick={() => setOpenSearchUser(true)}
          >
            <PiUserPlusThin size={25} />
          </div>
        </div>

        <div>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:border rounded-lg border-gray-700 relative"
            title={user?.name}
            onClick={() => setEditUserSection(true)}
          >
            {user?.profile_pic ? (
              <Avatar
                width={40}
                height={40}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
              />
            ) : (
              <div
                className={`flex items-center rounded-full justify-center text-xl font-semibold  ${bgColor[randomNumber]} text-gray-800`}
                style={{ width: `40px`, height: `40px` }}
              >
                {avatarName.toUpperCase()}{" "}
                {isOnline && (
                  <div className="bg-green-500 p-1 absolute bottom-1.5 right-2 z-10 rounded-full"></div>
                )}
              </div>
            )}
          </button>
          <button
            className="w-12 h-12 flex justify-center items-center cursor-pointer hover:border rounded-lg border-gray-700"
            title="Logout"
          >
            <span className="-ml-1">
              <CiLogout size={30} onClick={logoutUser} />
            </span>
          </button>
        </div>
      </div>

      <div className="w-full">
        <div>
          <h1 className="nunito text-2xl h-16 p-4 flex items-center text-gray-800">
            Messages
          </h1>
          <div className="bg-gray-800 p-[0.5px]" />
        </div>
        <div className="h-[calc(100vh-65px)] overflow-x-hidden overflow-y-auto scrollbar">
          {/* users Scrollbar */}
          {allUser.length === 0 && (
            <div className="mt-12 justify-center items-center ">
              <div className="flex justify-center items-center text-gray-800">
                <div
                  onClick={() => setOpenSearchUser(true)}
                  className="w-12 h-12 flex justify-center items-center cursor-pointer rounded-lg hover:text-gray-400"
                >
                  <PiUsersThin size={40} />
                </div>
              </div>
              <div className="text-gray-800 text-xl text-center">
                <p>Explore users to start Conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Open Edit User */}
      {editUserSection && (
        <EditUserDetail onClose={() => setEditUserSection(false)} user={user} />
      )}

      {/* Open Search User */}
      {openSearchUser && (
        <SearchUser onClose={() => setOpenSearchUser(false)} />
      )}
    </div>
  );
};

export default Sidebar;
