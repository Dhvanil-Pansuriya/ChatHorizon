import React, { useEffect, useState } from "react";
import { PiUserCircle } from "react-icons/pi";
import { useSelector } from "react-redux";

const Avatar = ({ userId, name, imageUrl, width, height }) => {
  const onlineUser = useSelector((state) => state?.user?.onlineUser);
  const [isOnline, setIsOnline] = useState(false);

  useEffect(() => {
    setIsOnline(onlineUser.includes(userId));
  }, [onlineUser, userId]);

  let avatarName = "";
  if (name) {
    const splitName = name.trim().split(" ");
    avatarName =
      splitName.length > 1
        ? splitName[0][0] + splitName[1][0]
        : splitName[0][0];
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

  // if (isOnline) {
  //   console.log(name, " : ", isOnline);
  // }
  // console.log(name, " :-> ", isOnline);

  return (
    <div className="relative flex items-center justify-center">
      <div
        className={`relative flex items-center justify-center rounded-full overflow-hidden border-2 transition-all duration-300
                      ${
                        isOnline
                          ? "border-green-600 shadow-lg"
                          : "border-transparent"
                      }
                      hover:shadow-md`}
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        {imageUrl ? (
          <img
            src={imageUrl}
            width={width}
            height={height}
            alt={name}
            className="h-full w-full rounded-full object-cover transition-transform duration-300 hover:scale-105"
          />
        ) : avatarName ? (
          <div
            className={`flex items-center justify-center text-lg font-bold ${bgColor[randomNumber]} text-gray-800`}
            style={{ width: `${width}px`, height: `${height}px` }}
          >
            {avatarName.toUpperCase()}
          </div>
        ) : (
          <PiUserCircle size={width / 1.5} className="text-slate-800" />
        )}
      </div>

      {isOnline && (
        <div
          className="bg-green-500 w-3 h-3 absolute rounded-full"
          style={{ bottom: 1, right: 1, border: "2px solid white" }}
        ></div>
      )}
    </div>
  );
};

export default Avatar;
