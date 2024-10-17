import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { PiUserCircleThin } from "react-icons/pi";
import { CiWifiOn, CiWifiOff } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { IoChevronBack } from "react-icons/io5";
import { HiPlus } from "react-icons/hi";
import { MdImage } from "react-icons/md";
import { FaVideo } from "react-icons/fa6";
import imageCompression from "browser-image-compression";
import { toast } from "react-toastify";
import uploadFile from "../helpers/uploadFiles";
import { VscClose } from "react-icons/vsc";
import Loading from "./Loading";

export default function MessagesPage() {
  const param = useParams();
  const user = useSelector((state) => state?.user);
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    profile_pic: "",
    online: false,
    _id: "",
  });

  const [openUploadImageVideo, setOpenUploadImageVideo] = useState(false);
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  const [loading, setLoading] = useState(false);

  const handleUploadImage = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadPhoto = await uploadFile(file);
    setLoading(false);
    setMessage((preve) => {
      return {
        ...preve,
        imageUrl: uploadPhoto.url,
      };
    });
  };

  const handleCancelUploadImage = async () => {
    setMessage((prev) => {
      return { ...prev, imageUrl: "" };
    });
  };

  const handleUploadVideo = async (e) => {
    const file = e.target.files[0];
    setLoading(true);
    const uploadVideo = await uploadFile(file);
    setLoading(false);
    setMessage((preve) => {
      return {
        ...preve,
        videoUrl: uploadVideo.url,
      };
    });
  };

  const handleCancelUploadVideo = async () => {
    setMessage((prev) => {
      return { ...prev, videoUrl: "" };
    });
  };
  const handleUploadImageVideoOpen = () => {
    setOpenUploadImageVideo((prev) => !prev);
  };

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", param.userId);

      socketConnection.on("message-user", (data) => {
        setDataUser(data);
      });

      return () => {
        socketConnection.off("message-user");
      };
    }
  }, [socketConnection, param.userId, user]);

  console.log(message.imageUrl);
  console.log(message.imageUrl);

  return (
    <>
      <header className="sticky top-0 h-16 bg-gray-100 z-0 shadow-sm bg-gradient-to-r from-gray-300 to-black-200">
        <div className="flex items-center justify-between h-16 pr-6 pl-1">
          <div className="flex items-center px-4 space-x-4">
            <Link
              className="lg:hidden text-gray-600 hover:text-gray-800"
              to={"/"}
            >
              <IoChevronBack size={30} />
            </Link>
            {dataUser.profile_pic ? (
              <img
                className="h-11 w-11 rounded-full object-cover border-2 border-gray-300"
                src={dataUser.profile_pic}
                alt="Profile"
              />
            ) : (
              <PiUserCircleThin size={45} className="text-gray-400" />
            )}
            <div>
              <div
                className="text-gray-800 font-semibold"
                title={dataUser.email}
              >
                {dataUser.name}
              </div>
              {dataUser.online ? (
                <div className="flex items-center text-xs text-green-600">
                  <CiWifiOn size={17} />
                  <span className="px-1">Online</span>
                </div>
              ) : (
                <div className="flex items-center text-xs text-gray-500">
                  <CiWifiOff size={17} />
                  <span className="px-1">Offline</span>
                </div>
              )}
            </div>
          </div>

          <div>
            <button className="cursor-pointer text-gray-600 hover:text-gray-800">
              <FaBars size={18} />
            </button>
          </div>
        </div>
      </header>

      <section className="h-[calc(100vh-128px)] border-t border-gray-200 overflow-x-hidden overflow-y-auto scrollbar-message-user bg-gray-200 relative">
        {message.imageUrl && (
          <div className="w-full h-full bg-gray-500 bg-opacity-30 flex items-center justify-center overflow-hidden ">
            <div className=" w-fit absolute top-0 right-0 p-2 ">
              <VscClose
                size={30}
                className="cursor-pointer"
                onClick={handleCancelUploadImage}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-2 max-w-md">
              <img
                src={message?.imageUrl}
                alt="UploadedImage"
                className="aspect-video w-full h-full rounded-md object-contain"
              />
            </div>
          </div>
        )}
        {message.videoUrl && (
          <div className="w-full h-full bg-gray-500 bg-opacity-30 flex items-center justify-center overflow-hidden ">
            <div className=" w-fit absolute top-0 right-0 p-2 ">
              <VscClose
                size={30}
                className="cursor-pointer"
                onClick={handleCancelUploadVideo}
              />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-2 max-w-md">
              <video
                src={message?.videoUrl}
                className="aspect-video w-full h-full rounded-md"
                controls
                muted
                autoPlay
              />
            </div>
          </div>
        )}
        {loading && <Loading />}
        Display messages here
      </section>

      <section className="bg-gray-100 h-16 flex items-center p-4 border-t border-gray-200">
        <div className="relative">
          <button
            className="h-10 w-10 border border-gray-300 flex items-center justify-center rounded-xl hover:border-gray-400 bg-white text-gray-600 hover:text-gray-800"
            onClick={handleUploadImageVideoOpen}
          >
            <HiPlus size={25} />
          </button>

          <div
            className={`bg-white shadow-md rounded absolute bottom-14 w-36 p-2 my-2 transition-transform duration-300 ${
              openUploadImageVideo
                ? "translate-y-0 opacity-100"
                : "translate-y-10 opacity-0"
            }`}
          >
            <form>
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 px-3 gap-3 cursor-pointer hover:bg-gray-100 rounded"
              >
                <div className="flex justify-around w-full items-center text-gray-600">
                  <MdImage size={20} />
                  <p>Image</p>
                </div>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 px-3 gap-3 cursor-pointer hover:bg-gray-100 rounded"
              >
                <div className="flex justify-around w-full items-center text-gray-600">
                  <FaVideo size={20} />
                  <p>Video</p>
                </div>
              </label>
              <input
                type="file"
                id="uploadImage"
                className="hidden"
                accept="image/*"
                onChange={handleUploadImage}
              />
              <input
                type="file"
                id="uploadVideo"
                className="hidden"
                accept="video/*"
                onChange={handleUploadVideo}
              />
            </form>
          </div>
        </div>
        {/* Other components like input for text messages can go here */}
      </section>
    </>
  );
}
