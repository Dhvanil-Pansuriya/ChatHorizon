import React from "react";
import { BiSolidMessageSquareDetail } from "react-icons/bi";
import { PiUserPlusThin } from "react-icons/pi";
import { NavLink, useNavigate } from "react-router-dom";
import { CiLogout } from "react-icons/ci";
import { PiUserCircleThin, PiUserThin } from "react-icons/pi";
import { useSelector } from "react-redux";
import { useState } from "react";
import EditUserDetail from "./EditUserDetail";

const Sidebar = () => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
 
  console.log("User :", user?._id);
  console.log("Redux user : ", user);

  const [editUserSection, setEditUserSection] = useState(false);

  return (
    <div className="w-full h-full bg-myColor2 rounded-tr-lg">
      <div className="bg-myColor1 w-12 h-full rounded-tr-lg py-3 flex flex-col justify-between ">
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
          >
            <PiUserPlusThin size={25} />
          </div>
        </div>

        <div>
          <button
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 "
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
              <PiUserCircleThin size={30} />
            )}
          </button>
          <button
            className="w-12 h-12  flex justify-center items-center cursor-pointer hover:border rounded-lg border-myColor2 "
            title="Logout"
          >
            <span className="-ml-1">
              <CiLogout size={30} />
            </span>
          </button>
        </div>
      </div>

      {editUserSection && (
        <EditUserDetail onClose={() => setEditUserSection(false)} user={user} />
      )}
    </div>
  );
};

export default Sidebar;
