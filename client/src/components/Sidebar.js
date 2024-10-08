import React from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { PiUserPlusThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { PiUserCircleThin, PiUsersThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";
import SearchUser from "./SearchUser";
import axios from "axios";
import { toast } from "react-toastify";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);

  // console.log("User :", user?._id);
  // console.log("Redux user : ", user);

  const [editUserSection, setEditUserSection] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false);

  const logoutUser = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/logout`;
    const response = await axios({
      url: URL,
      withCredentials: true,
    });
    console.log(response.data.success);
    try {
      if (response.data.success) {
        navigate("/checkEmail");
      }
      toast.success("Logout successfully", {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "",
      });
    } catch (error) {
      toast.error("Something went wrong" || error, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "",
      });
    }
  };

  const onlineUser = useSelector((state) => state?.user?._id);
  const isOnline = onlineUser.includes(user?._id);

  return (
    <div className="w-full h-full bg-myColor2  grid grid-cols-[48px,1fr]">
      <div className="bg-myColor1 w-12 h-full py-3 flex flex-col justify-between text-myColor3 ">
        <div>
          <NavLink
            className={({ isActive }) =>
              `w-12 h-12 flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 ${
                isActive && "border"
              }`
            }
            title="Chat"
          >
            <BiSolidMessageSquareDetail size={25} />
          </NavLink>
          <div
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 "
            title="Add Friends"
            onClick={() => setOpenSearchUser(true)}
          >
            <PiUserPlusThin size={25} />
          </div>
        </div>

        <div>
          <button
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 relative"
            title={user?.name}
            onClick={() => setEditUserSection(true)}
          >
            {user?.profile_pic ? (
              <img
                className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-9 w-9 rounded-full object-cover border-2"
                src={user?.profile_pic}
                size={30}
                alt="Profile"
              />
            ) : (
              <PiUserCircleThin size={45} />
            )}
            {isOnline && <div className="bg-myColor6 p-1 absolute bottom-2 right-2 z-10 rounded-full"></div>}
          </button>
          <button
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 "
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
          <h1 className="nunito text-2xl h-16 p-4 flex items-center text-myColor1">
            Messages
          </h1>
          <div className="bg-myColor1 p-[0.5px]" />
        </div>
        <div className=" h-[calc(100vh-65px)]  overflow-x-hidden overflow-y-auto scrollbar">
          {/* users Scrollbar */}
          {allUser.length === 0 && (
            <div className="mt-12 justify-center items-center ">
              <div className="flex justify-center items-center text-myColor1">
                <div
                  onClick={() => setOpenSearchUser(true)}
                  className="w-12 h-12  flex justify-center items-center cursor-pointer rounded-lg  hover:text-myColor3"
                >
                  <PiUsersThin size={40} />
                </div>
              </div>
              <div className="text-myColor1 text-xl text-center">
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
