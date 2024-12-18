import React, { useRef, useState, useEffect } from "react";
import { PiUserThin } from "react-icons/pi";
import uploadFile from "../helpers/uploadFiles";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";
import imageCompression from "browser-image-compression";
import Avatar from "./Avatar";

export default function EditUserDetail({ onClose, user }) {
  const [data, setData] = useState({
    name: user?.name || "",
    profile_pic: user?.profile_pic || "",
  });
  const uploadPhotoRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!user) {
      console.error("User is undefined");
      return;
    }

    setData({
      name: user.name || "",
      profile_pic: user.profile_pic || "",
    });
  }, [user]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const handleOpenUploadPhoto = (e) => {
    e.preventDefault();
    e.stopPropagation();
    uploadPhotoRef.current.click();
  };

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 1920,
          useWebWorker: true,
        };
        const compressedFile = await imageCompression(file, options);

        if (compressedFile.size > 1048576) {
          toast.error(
            "Compressed image size is bigger than 1 MB. Please choose a smaller image.",
            {
              position: "top-center",
              autoClose: 7000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            }
          );
          return;
        }

        const uploadPhoto = await uploadFile(compressedFile);
        setData((prev) => ({ ...prev, profile_pic: uploadPhoto?.url }));
      } catch (error) {
        console.error(error);
        toast.error("Failed to compress image. Please try again.", {
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
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}/api/update`;

      const response = await axios.post(URL, data, {
        withCredentials: true,
      });

      toast.success(response?.data?.message, {
        position: "top-center",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

      if (response.data.success) {
        dispatch(setUser(response.data.user));
        onClose();
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to update user details. Please try again.", {
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

  let avatarName = "";
  if (user?.name) {
    const splitName = user?.name.trim().split(" "); // Ensure we trim whitespace
    avatarName =
      splitName.length > 1
        ? splitName[0][0] + splitName[1][0] // Get initials from first and last name
        : splitName[0][0]; // Get initial from first name only
  }

  const bgColor = [
    'bg-slate-200',
    'bg-teal-200',
    'bg-red-200',
    'bg-green-200',
    'bg-yellow-200',
    'bg-gray-200',
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200"
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      <div className="p-8 rounded-xl shadow-lg w-full max-w-lg bg-white">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Profile Details
        </h2>
        <p className="text-sm mb-8 text-center text-gray-600">
          Edit user details
        </p>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <label
                htmlFor="profile_pic"
                className="font-medium text-gray-700"
              >
                Profile:
              </label>
              <button
                onClick={handleOpenUploadPhoto}
                className="text-center w-72 flex items-center"
              >
                {data?.profile_pic ? (
                  <Avatar
                    width={70}
                    height={70}
                    name={data?.name}
                    userId={data?._id}
                    imageUrl={data?.profile_pic}
                  />
                ) : (
                  <div
                    className={`flex items-center rounded-full justify-center text-3xl font-semibold  ${bgColor[randomNumber]} text-gray-800`}
                    style={{ width: `70px`, height: `70px` }}
                  >
                    {avatarName.toUpperCase()}{" "}
                    
                  </div>
                )}
              </button>
              <input
                name="profile_pic"
                id="profile_pic"
                type="file"
                className="hidden"
                onChange={handleUploadPhoto}
                ref={uploadPhotoRef}
              />
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="name" className="font-medium text-gray-700">
                Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="rounded-lg w-2/3 px-4 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-800"
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="flex justify-center space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="w-full text-gray-700 bg-gray-200 hover:bg-gray-300 font-medium rounded-lg py-2 transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg py-2 transition duration-200"
              >
                Save
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
