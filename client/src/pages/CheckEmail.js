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

    const URL = `${process.env.REACT_APP_BACKEND_URL}api/checkEmail`;

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
        theme: "dark",
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
        theme: "dark",
      });
      // console.log("Error : ", error);
    }
  };

  return (
    <div className="min-h-screen bg-myColor1 flex justify-center items-center">
        <div className="text-white border border-myColor2 max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-myColor3 font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight">Verify Email</p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email">Email :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-myColor2 rounded-md mx-2 px-2 my-2 text-base w-full text-myColor1"
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
                    className="border w-full bg-myColor2 hover:bg-myColor2  border-myColor2 rounded-md my-4 mx-2 px-4 py-1 text-base text-white   "
                  >
                    Let's Go
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Already have Account ?{" "}
          <Link to={"/register"} className="hover:text-myColor2 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};
export default CheckEmail;
