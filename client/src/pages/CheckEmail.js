import React from "react";
import { Link } from "react-router-dom";

const CheckEmail = () => {
  return (
    <div className="mt-5 flex justify-center items-center">
      <div className="text-white border border-secondary max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col m-7">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-secondary font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight">Login</p>
        <form className="flex justify-center flex-col w-full">
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email">Email:</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="password">Password:</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                  />
                </td>
              </tr>

              <tr className="my-3">
                <td colSpan="2" className="text-center">
                <button
                    type="submit"
                    className="border w-full bg-secondary hover:bg-secondary2  border-secondary rounded-md my-4 mx-2 px-4 py-1 text-base text-white   "
                  >
                    Submit
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Don't have Account ? <Link to={"/register"} className="hover:text-secondary2 font-semibold">
             Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};
export default CheckEmail;
