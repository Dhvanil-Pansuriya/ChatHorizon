import React from "react";
import { PiUserThin } from "react-icons/pi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const UserCard = ({ user, onClose }) => {
  const onlineUser = useSelector((state) => state?.user?._id);
  if (!user) {
    return null;
  }
  const isOnline = onlineUser.includes(user?._id);

  return (
    <Link to={user?._id} onClick={onClose}>
      <div className="text-sm leading-6 hover:cursor-pointer mb-2 mr-2 ml-2">
        <div className="relative flex flex-col-reverse rounded-md p-2 bg-myColor4 bg-opacity-95 dark:highlight-white/5 border border-myColor1 hover:border-myColor4 hover:border-2">
          <div className="flex items-center space-x-4">
            {user?.profile_pic ? (
              <div className="relative">
                <img
                  className="flex-none w-10 h-10 rounded-full object-cover border-2 border-myColor1"
                  src={user?.profile_pic}
                  alt="User Avatar"
                />
                {isOnline && (
                  <div className="bg-myColor6 p-1 absolute bottom-1 right-0 z-10 rounded-full"></div>
                )}
              </div>
            ) : (
              <div className="relative">
                <PiUserThin className="flex-none w-10 h-10 rounded-full object-cover  border-2 border-myColor1" />
                {isOnline && (
                  <div className="bg-myColor6 p-1 absolute bottom-1 right-0 z-10 rounded-full"></div>
                )}
              </div>
            )}

            <div className="flex-auto">
              <div className=" text-myColor1 font-semibold text-sm">
                {user?.name}
              </div>
              <div className="text-myColor1 text-xs">{user?.email}</div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
