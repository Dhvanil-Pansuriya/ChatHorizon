import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFiles";
import axios from "axios";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState("");
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

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadPhoto = await uploadFile(file);

    setUploadPhoto(file);

    setData((perv) => {
      return {
        ...perv,
        profile_pic: uploadPhoto?.url,
      };
    });
  };

  const handleRemoveUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}api/register`;

    console.log(URL);

    try {
      const response = await axios.post(URL, data);
      console.log("Response : ", response);
      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "",
      });

      if (response?.data?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });

        navigate("/email");
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
        theme: "",
      });
      console.log("Error : ", error);
    }

    console.log(data);
  };

  return (
    <div className="mt-5 flex justify-center  items-center">
      <div className="text-white border border-secondary max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col m-7">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-secondary font-bold">ChatHorizon</span>
        </p>
        <p className="text-xl font-extralight">Register</p>
        <form
          className="flex justify-center flex-col w-full"
          onSubmit={handleSubmit}
        >
          <table className="my-3 border-collapse w-full">
            <tbody>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="name">Name :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="name"
                    id="name"
                    type="text"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.name}
                    onChange={handleOnchange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="email">Email :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="email"
                    id="email"
                    type="email"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.email}
                    onChange={handleOnchange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="password">Password :</label>
                </td>
                <td className="w-2/3">
                  <input
                    name="password"
                    id="password"
                    type="password"
                    className="border border-secondary rounded-md mx-2 px-2 my-2 text-base w-full"
                    value={data.password}
                    onChange={handleOnchange}
                    required
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td className="w-1/3">
                  <label htmlFor="profile_pic">Profile :</label>
                </td>
                <td className="w-2/3">
                  <label htmlFor="profile_pic">
                    <div className="rounded-md h-10 mx-2 text-base w-full my-2 outline outline-1 outline-secondary flex justify-center items-center  cursor-pointer ">
                      <p className="text-xs px-2 ">
                        {uploadPhoto?.name ? uploadPhoto?.name : "Upload hear"}
                      </p>
                      {uploadPhoto?.name && (
                        <button
                          onClick={handleRemoveUploadPhoto}
                          className="px-2 hover:text-secondary"
                        >
                          <IoCloseCircle />
                        </button>
                      )}
                    </div>
                  </label>
                  <input
                    name="profile_pic"
                    id="profile_pic"
                    type="file"
                    className="rounded-md mx-2 text-base w-full my-2 outline outline-1 outline-secondary  hidden"
                    onChange={handleUploadPhoto}
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
          Already have Account ?{" "}
          <Link to={"/email"} className="hover:text-secondary2 font-semibold">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
