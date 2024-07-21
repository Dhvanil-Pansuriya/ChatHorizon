import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { logout, setUser } from "../redux/userSlice";
import Sidebar from "../components/Sidebar";

const Home = () => {


  const user = useSelector((state) => state.user);
  console.log("Redux user : ", user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const fetchUserData = async () => {
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}api/userDetail`;
      const response = await axios({
        url: URL,
        withCredentials: true,
      });

      dispatch(setUser(response.data.data));

      if (response.data.logout) {
        dispatch(logout());
        navigate("/checkEmail");
      }

      // console.log("Current User : ", response);
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
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

  useEffect(() => {}, [fetchUserData()]);

  return (
    <main className="text-white grid lg:grid-cols-[340px,1fr] h-screen max-h-screen">
      <section className="">
        <Sidebar/>
      </section>
      <section>
        <Outlet />
      </section>
    </main>
  );
};

export default Home;
