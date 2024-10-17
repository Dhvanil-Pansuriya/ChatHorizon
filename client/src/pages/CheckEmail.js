import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const CheckEmail = () => {
  const [data, setData] = useState({
    email: "",
  });

  const navigate = useNavigate();

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

    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/checkEmail`;

    try {
      const response = await axios.post(URL, data);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      if (response?.data?.success) {
        setData({
          email: "",
        });

        navigate("/password", {
          state: response?.data,
        });
      }
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      console.log("Error : ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="text-gray-800 border border-gray-300 max-w-sm p-6 w-full rounded-lg overflow-hidden flex justify-center items-center flex-col bg-white shadow-lg">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-blue-600 font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight text-gray-600">Verify Email</p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email" className="text-gray-700">Email :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-gray-300 rounded-md mx-2 px-2 my-2 text-base w-full text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    value={data.email}
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
                    Let's Go
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p className="text-gray-600">
          Already have an account?{" "}
          <Link to={"/register"} className="hover:text-blue-600 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default CheckEmail;
