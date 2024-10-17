import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { PiUserThin } from "react-icons/pi";
import { useDispatch } from "react-redux";
import { setToken } from "../redux/userSlice";

const CheckPassword = () => {
  const [data, setData] = useState({
    password: "",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!location?.state?.data?.name) {
      navigate("/checkEmail");
    }
  }, [location, navigate]);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/checkPassword`;

    try {
      const response = await axios.post(
        URL,
        {
          userId: location?.state?.data?._id,
          password: data.password,
        },
        {
          withCredentials: true,
        }
      );

      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (response.data.success) {
        dispatch(setToken(response?.data?.token));
        localStorage.setItem("token", response?.data?.token);
        setData({
          password: "",
        });
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message, {
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

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="text-gray-800 border border-gray-300 max-w-sm p-6 w-full rounded-lg overflow-hidden flex justify-center items-center flex-col m-7 bg-white shadow-lg">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-blue-600 font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight text-gray-600">Verify Password</p>
        <div className="max-w-sm mx-auto overflow-hidden">
          <div className="sm:flex sm:items-center px-6 py-4">
            {location?.state?.data?.profile_pic ? (
              <img
                className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-14 w-14 rounded-full object-cover border-2 border-blue-500"
                src={location?.state?.data?.profile_pic}
                alt="Profile"
              />
            ) : (
              <PiUserThin className="block mx-auto sm:mx-0 sm:flex-shrink-0 h-16 w-16 rounded-full object-cover text-gray-400" />
            )}
            <div className="mt-4 sm:mt-0 sm:ml-4 text-center sm:text-left">
              <p className="text-gray-800 leading-tight">
                {location?.state?.data?.name}
              </p>
              <p className="text-sm leading-tight text-blue-600 py-1">
                {location?.state?.data?.email}
              </p>
            </div>
          </div>
        </div>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="password" className="text-gray-700">
                    Password:
                  </label>
                </td>
                <td className="w-2/3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="border border-gray-300 rounded-md mx-2 px-2 my-2 text-base w-full text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    value={data.password}
                    onChange={handleOnchange}
                    required
                    autoFocus
                  />
                </td>
              </tr>

              <tr className="my-3">
                <td colSpan="2" className="text-center">
                  <button
                    type="submit"
                    className="border w-full bg-blue-600 hover:bg-blue-700 border-blue-600 rounded-md my-4 mx-2 px-4 py-1 text-base text-white"
                  >
                    Login
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p className="text-gray-600">
          Forgot Password?{" "}
          <Link
            to={"/forgot-password"}
            className="hover:text-blue-600 font-semibold"
          >
            Click here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default CheckPassword;
