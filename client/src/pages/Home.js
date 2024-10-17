import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  logout,
  setOnlineUser,
  setSocketConnection,
  setUser,
} from "../redux/userSlice";
import Sidebar from "../components/Sidebar";
import io from "socket.io-client";

export default function Home() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/userDetail`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/checkEmail");
      }
    } catch (error) {
      console.log("Error at Home : ", error);
      dispatch(logout());
      navigate("/checkEmail");
      toast.error(error?.response?.data?.message || error.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  useEffect(() => {
    const socketConnection = io(process.env.REACT_APP_BACKEND_URL, {
      auth: {
        token: localStorage.getItem("token"),
      },
      withCredentials: true,
    });

    socketConnection.on("onlineUser", (data) => {
      dispatch(setOnlineUser(data));
    });

    dispatch(setSocketConnection(socketConnection));

    return () => {
      socketConnection.disconnect();
    };
  }, []);

  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[340px,1fr] h-screen max-h-screen bg-gray-50">
      <section
        className={`bg-white border-r border-gray-200 ${
          !basePath && "hidden"
        } lg:block`}
      >
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"} bg-white`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden bg-white ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div className="text-center">
          <p className="nunito text-4xl mt-10 text-gray-800 flex justify-center">
            <span className="nunito text-4xl text-blue-600 flex justify-center items-end pb-3 mr-2">
              Hello
            </span>
            , {user.name}
          </p>
          <p className="nunito text-2xl m-2 text-gray-600 flex justify-center font-extrabold">
            Welcome to :
          </p>
          <p className="josefin-sans text-5xl mt-2 text-blue-600 flex justify-center">
            ChatHorizon
          </p>
        </div>
        <p className="text-lg text-gray-600 mt-4">
          Select user to send message
        </p>
      </div>
    </div>
  );
}
