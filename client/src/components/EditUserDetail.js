import React, { useState } from "react";
import { PiUserThin } from "react-icons/pi";
import { IoCloseCircle } from "react-icons/io5";
import uploadFile from "../helpers/uploadFiles";
import { toast } from "react-toastify";
import imageCompression from "browser-image-compression";
import { useNavigate } from "react-router-dom";

const EditUserDetail = ({ onClose, user }) => {
  const navigate = useNavigate();

  const [uploadPhoto, setUploadPhoto] = useState(null);
  const [fileSize, setFileSize] = useState(null);

  const [data, setData] = useState({
    name: user?.name,
    profile_pic: user?.profile_pic,
  });

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
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
            theme: "dark",
          }
        );
        return;
      }

      // const uploadPhoto = await uploadFile(compressedFile);
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
        theme: "dark",
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

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  return (
    <div className="fixed inset-0 bg-myColor3 bg-opacity-10 flex justify-center items-center">
      <div className=" p-8 rounded-lg shadow-lg w-full max-w-lg">
        <h2 className="text-2xl font-bold mb-6 text-center text-nyColor4">
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
              <div className="text-center flex w-full items-center justify-between">
                {data?.profile_pic ? (
                  <img
                    className="h-20 w-20 rounded-full object-cover mx-auto border border-myColor3 border-2  "
                    src={data?.profile_pic}
                    alt="Profile"
                  />
                ) : (
                  <PiUserThin className="h-20 w-20 rounded-full text-myColor4 mx-auto" />
                )}
                <label htmlFor="profile_pic" className="block w-32">
                  <div className="flex items-center justify-center border border-myColor2 rounded-md py-2 px-4 cursor-pointer">
                    <p className="text-xs text-gray-600">
                      {uploadPhoto?.name ? uploadPhoto.name : "Upload here"}
                    </p>
                    {uploadPhoto?.name && (
                      <button
                        onClick={handleRemoveUploadPhoto}
                        className="ml-2 text-myColor2"
                      >
                        <IoCloseCircle />
                      </button>
                    )}
                  </div>
                  <input
                    name="profile_pic"
                    id="profile_pic"
                    type="file"
                    className="hidden"
                    onChange={handleUploadPhoto}
                  />
                </label>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <label htmlFor="name" className="font-medium text-myColor4">
                Name:
              </label>
              <input
                name="name"
                id="name"
                type="text"
                className="rounded-md w-2/3 px-4 py-2 text-base border border-gray-300 focus:outline-none focus:ring-2 focus:ring-myColor2"
                value={data.name}
                onChange={handleOnChange}
                required
              />
            </div>

            <div className="flex justify-center ">
              <button
                type="submit"
                onClick={onClose}
                className="w-full text-myColor3  bg-myColor2 hover:bg-myColor2-darkfont-medium rounded-md py-2 transition duration-200 mx-2"
              >
                Cancel
              </button>{" "}
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
  );
};

export default EditUserDetail;
