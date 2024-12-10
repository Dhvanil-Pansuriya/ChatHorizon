import React from "react";
import { PiUserThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./Avatar";

export default function UserCard({ user, name, onClose }) {
  const onlineUser = useSelector((state) => state?.user?._id);
  const isOnline = onlineUser.includes(user?._id);

  // console.log(user?.name);

    // console.log(onlineUser);
  // console.log(user?._id);

  if (!user) {
    return null;
  }

  let avatarName = "";
  if (name) {
    const splitName = name.trim().split(" "); // Ensure we trim whitespace
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

  // console.log(user?.name , " : ", isOnline);

  if (isOnline) {
    console.log(user?.name);
    
  }

  return (
    <Link to={user?._id} onClick={onClose}>
      <div className="mb-3 mx-2">
        <div className="relative flex items-center space-x-4 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition duration-200 shadow-sm border border-gray-200 hover:border-blue-500">
          <div className="relative flex-shrink-0">
            {user?.profile_pic ? (
              <Avatar
                width={50}
                height={50}
                name={user?.name}
                userId={user?._id}
                imageUrl={user?.profile_pic}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <div
                  className={`flex items-center rounded-full justify-center text-lg font-bold ${bgColor[randomNumber]} text-gray-800`}
                  style={{ width: `50px`, height: `50px` }}
                >
                  {avatarName.toUpperCase()}{" "}
                  {isOnline && (
                    <div
                      className="bg-green-500 w-3 h-3 absolute rounded-full"
                      style={{ bottom: 1, right: 1, border: "2px solid white" }}
                    ></div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex-grow min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {user?.name}
            </div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
