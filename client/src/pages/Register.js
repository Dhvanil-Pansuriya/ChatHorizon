import React, { useState } from "react";
import { IoCloseCircle } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom";
import uploadFile from "../helpers/uploadFiles";
import axios from "axios";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";

const Register = () => {
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    profile_pic: "",
  });

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [fileSize, setFileSize] = useState(null);
  const navigate = useNavigate();

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleUploadPhoto = async (e) => {
    try {
      const file = e.target.files[0];
      const options = {
        maxSizeMB: 0.5,
        maxWidthOrHeight: 800,
        useWebWorker: true,
      };

      const compressedFile = await imageCompression(file, options);
      const fileSizeInKB = (compressedFile.size / 1024).toFixed(2);
      const fileSizeInMB = (fileSizeInKB / 1000).toFixed(2);

      console.log(fileSizeInKB, fileSizeInMB);

      if (fileSizeInKB > 1000) {
        toast.error(
          `File size exceeds 1 MB, your file size : ${fileSizeInMB} MB`,
          {
            position: "top-center",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "",
          }
        );
        return;
      }

      const uploadPhoto = await uploadFile(compressedFile);
      setUploadPhoto(compressedFile);
      setFileSize(fileSizeInKB);
      setData((prev) => ({
        ...prev,
        profile_pic: uploadPhoto?.url,
      }));
    } catch (error) {
      toast.error(error?.response?.data?.message, {
        position: "top-center",
        autoClose: 20000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "",
      });
      console.log(error?.response?.data?.message);
    }
  };

  const handleRemoveUploadPhoto = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setUploadPhoto(null);
    setFileSize(null);
    setData((prev) => ({
      ...prev,
      profile_pic: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    const URL = `${process.env.REACT_APP_BACKEND_URL}api/register`;

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
        theme: "dark",
      });

      if (response?.data?.success) {
        setData({
          name: "",
          email: "",
          password: "",
          profile_pic: "",
        });
        navigate("/checkEmail");
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
      console.log("Error : ", error);
    }

    console.log(data);
  };

  return (

    <>
    <div className="min-h-screen bg-myColor1 flex justify-center items-center flex-col">
    <p className="josefin-sans text-5xl m-10 text-myColor3 flex justify-center  ">
        ChatHorizon
      </p>
      <div className="text-white border border-myColor2 max-w-sm p-6 w-full rounded-2xl overflow-hidden flex justify-center items-center flex-col">
        <p className="text-2xl py-4">
          <span className="text-xl">
            <b>Welcome to</b>
          </span>{" "}
          <span className="text-myColor3 font-bold">ChatHorizon</span>
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
                    className="border border-myColor2 rounded-md mx-2 px-2 my-2 text-base w-full text-myColor1"
                    value={data.name}
                    onChange={handleOnChange}
                    required
                    autoFocus
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
                    className="border border-myColor2 rounded-md mx-2 px-2 my-2 text-base w-full text-myColor1"
                    value={data.email}
                    onChange={handleOnChange}
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
                    className="border border-myColor2 rounded-md mx-2 px-2 my-2 text-base w-full text-myColor1"
                    value={data.password}
                    onChange={handleOnChange}
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
                    <div className="rounded-md h-10 mx-2 text-base w-full my-2 outline outline-1 outline-myColor2 flex justify-center items-center cursor-pointer">
                      <p className="text-xs px-2">
                        {uploadPhoto?.name ? uploadPhoto.name : "Upload here"}
                      </p>
                      {uploadPhoto?.name && (
                        <button
                          onClick={handleRemoveUploadPhoto}
                          className="px-2 hover:text-myColor2"
                        >
                          <IoCloseCircle />
                        </button>
                      )}
                    </div>
                    <span className="text-xs px-2 text-myColor2">
                      * not required
                    </span>
                  </label>
                  <input
                    name="profile_pic"
                    id="profile_pic"
                    type="file"
                    className="rounded-md mx-2 text-base w-full my-2 outline outline-1 outline-myColor2 hidden"
                    onChange={handleUploadPhoto}
                  />
                </td>
              </tr>
              <tr className="my-3">
                <td colSpan="2" className="text-center">
                  <button
                    type="submit"
                    className="border w-full bg-myColor2 hover:bg-myColor2 border-myColor2 rounded-md my-4 mx-2 px-4 py-1 text-base text-white"
                  >
                    Register
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
        <p>
          Already have Account?{" "}
          <Link
            to={"/checkEmail"}
            className="hover:text-myColor2 font-semibold"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
    </>
  );
};

export default Register;
