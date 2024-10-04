import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";

const MessagesPage = () => {
  const param = useParams();
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", param.userId);

      socketConnection.on("message-user", (data) => {
        // console.log("User data : ", data);
        setDataUser(data);
      });
    }
  }, [socketConnection, param?.userId, user]);

  console.log("dataUser : ", dataUser);

  // const onlineUser = useSelector((state) => state?.user?._id);
  // console.log("onlineUser", onlineUser);

  // const isOnline = onlineUser.includes(dataUser?._id);

  return (
    <>
      <header className="sticky top-0 h-16 bg-myColor4 z-0">
        <div className="flex items-center justify-between h-16 pr-6 pl-1">

          <div className="flex items-center px-4 space-x-4">
          <Link className="lg:hidden" to={"/"}>
            <IoChevronBack size={30} />
          </Link>
            {dataUser?.profile_pic ? (
              <img
                className="h-11 w-11 rounded-full object-cover border-2"
                src={dataUser?.profile_pic}
                alt="Profile"
              />
            ) : (
              <PiUserCircleThin size={45} />
            )}
            <div>
              <div
                className="text-myColor1 font-semibold"
                title={dataUser?.email}
              >
                {dataUser?.name}
              </div>
              {dataUser?.online ? (
                <div className="flex items-center text-xs text-myColor6">
                  <CiWifiOn size={17} />
                  <span className="px-1">Online</span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-myColor7">
                  <CiWifiOff size={17} />
                  <span className="px-1">Offline</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <button className="cursor-pointer hover:text-myColor2">
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="h-[calc(100vh-64px)] border-4 border-myColor6">
        Message Display here
      </section>
    </>
  );
};

export default MessagesPage;
