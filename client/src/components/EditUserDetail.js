import React, { useRef, useState, useEffect } from "react";
import { PiUserThin } from "react-icons/pi";
import uploadFile from "../helpers/uploadFiles";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";
import axios from "axios";

const EditUserDetail = ({ onClose, user }) => {
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
      const uploadPhoto = await uploadFile(file);
      setData((prev) => ({ ...prev, profile_pic: uploadPhoto?.url }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      const URL = `${process.env.REACT_APP_BACKEND_URL}api/update`;

      const response = await axios.post(URL, data, {
        withCredentials: true,
      });

      console.log("response", response);

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
        theme: "dark",
      });
    }
  };

  return (
    <>
      <div className="fixed inset-0 bg-myColor1 bg-opacity-25 flex justify-center items-center">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-lg border bg-myColor1 border-myColor2">
          <h2 className="text-2xl font-bold mb-6 text-center text-myColor4">
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
                  className="font-medium text-myColor4"
                >
                  Profile:
                </label>
                <button
                  onClick={handleOpenUploadPhoto}
                  className="text-center flex w-72 flex items-center "
                >
                  {data?.profile_pic ? (
                    <img
                      className="h-20 w-20 rounded-full object-cover mx-auto border border-myColor3 border-2 hover:cursor-pointer"
                      src={data?.profile_pic}
                      alt="Profile"
                    />
                  ) : (
                    <PiUserThin className="h-20 w-20 rounded-full text-myColor4 mx-auto hover:cursor-pointer" />
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
                <label htmlFor="name" className="font-medium text-myColor4">
                  Name:
                </label>
                <input
                  name="name"
                  id="name"
                  type="text"
                  className="rounded-md w-2/3 px-4 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-myColor2 bg-myColor2"
                  value={data.name}
                  onChange={handleOnChange}
                  required
                />
              </div>

              <div className="flex justify-center">
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full text-myColor3 bg-myColor2 hover:bg-myColor2-dark font-medium rounded-md py-2 transition duration-200 mx-2"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-full text-myColor3 bg-myColor2 hover:bg-myColor2-dark font-medium rounded-md py-2 transition duration-200 mx-2"
                >
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default EditUserDetail;
