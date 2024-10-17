import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleOnChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    //   e.preventDefault();
    //   e.stopPropagation();
    // const URL = `${process.env.REACT_APP_BACKEND_URL}/api/forgot-password`;
    //   try {
    //     const response = await axios.post(
    //       URL,
    //       {
    //         email: email,
    //       },
    //       {
    //         withCredentials: true,
    //       }
    //     );
    //     toast.success(response?.data?.message, {
    //       position: "top-center",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     });
    //     setEmail("");
    //   } catch (error) {
    //     toast.error(error.response?.data?.message || error.message, {
    //       position: "top-center",
    //       autoClose: 2000,
    //       hideProgressBar: false,
    //       closeOnClick: true,
    //       pauseOnHover: true,
    //       draggable: true,
    //       progress: undefined,
    //       theme: "dark",
    //     });
    //   }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center">
      <div className="text-gray-800 border border-gray-300 max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col m-7 bg-white shadow-lg">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-blue-600 font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight text-gray-600">
          Forgot Password <b>(Under Devlopment)</b>
        </p>
        <p className="text-center text-gray-600 py-2">
          Enter your registered email to receive a reset link.
        </p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email" className="text-gray-700">
                    Email:
                  </label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-gray-300 rounded-md mx-2 px-2 my-2 text-base w-full text-gray-800 focus:ring-blue-500 focus:border-blue-500"
                    value={email}
                    onChange={handleOnChange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td colSpan="2" className="text-center">
                  <button
                    type="submit"
                    className="border w-full bg-blue-600 hover:bg-blue-700 border-blue-600 rounded-md my-4 mx-2 px-4 py-1 text-base text-white"
                  >
                    Send Reset Link
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p className="text-gray-600">
          Remember your password?{" "}
          <Link
            to={"/checkEmail"}
            className="hover:text-blue-600 font-semibold"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgotPassword;
