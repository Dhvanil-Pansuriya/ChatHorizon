import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const user = useSelector((state) => state.user);
  console.log("Redux user : ", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const fetchUserData = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}api/userDetail`;

      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      
      dispatch(setUser(response.data.data));
      
      console.log("Response at Home.js : ",response.data);
      if (response.data.data.logout) {
        dispatch(logout());
        navigate("/checkEmail");
      }

      console.log("Current User : ", response);
    } catch (error) {
      console.log("Error at Home : ", error);
      toast.error(error?.response?.data?.message || error.message, {
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

  useEffect(() => {
    fetchUserData();
  }, []);
  const basePath = location.pathname === "/";

  return (
    <div className="grid lg:grid-cols-[340px,1fr] h-screen max-h-screen">
      <section className={`bg-myColor3 ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section>

      <section className={`${basePath && "hidden"} bg-myColor3`}>
        <Outlet />
      </section>

      <div
        className={`justify-center items-center flex-col gap-2 hidden bg-myColor3 ${
          !basePath ? "hidden" : "lg:flex"
        }`}
      >
        <div>
          <p className="nunito text-5xl mt-10 text-myColor1 flex justify-center ">
            <span className="nunito text-4xl text-myColor2 flex justify-center items-end">
              Hello
            </span>{" "}
            , {user.name}
          </p>
          <p className="nunito text-2xl m-2 text-myColor2 flex justify-center font-extrabold">
            Welcome to :{")"}
          </p>
          <p className="josefin-sans text-5xl mt-2 text-myColor1 flex justify-center  ">
            ChatHorizon Dhvanil
          </p>
        </div>
        <p className="text-lg  text-myColor2">Select user to send message</p>
      </div>
    </div>
  );
};

export default Home;
