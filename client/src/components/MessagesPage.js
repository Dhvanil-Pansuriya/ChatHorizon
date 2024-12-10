import React, { useEffect, useState, useCallback } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
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
import { IoSend } from "react-icons/io5";
import { Button } from "./ui/Button";
import Avatar from "./Avatar";

// Import assets
const Background = require("../assets/Back.png");

export default function MessagesPage() {
  const param = useParams();
  const navigate = useNavigate();
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

  const compressImage = async (file) => {
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    try {
      return await imageCompression(file, options);
    } catch (error) {
      console.error("Error compressing image:", error);
      return file;
    }
  };

  const handleUploadFile = useCallback(async (file, type) => {
    setLoading(true);
    try {
      let compressedFile = file;
      if (type === "image") {
        compressedFile = await compressImage(file);
      }

      const uploadResult = await uploadFile(compressedFile);

      if (uploadResult && uploadResult.url) {
        setMessage((prev) => ({
          ...prev,
          [type === "image" ? "imageUrl" : "videoUrl"]: uploadResult.url,
        }));
        toast.success(
          `${
            type.charAt(0).toUpperCase() + type.slice(1)
          } uploaded successfully`,
          {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          }
        );
      } else {
        throw new Error("Invalid file upload response - URL not found");
      }
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}: ${error.message}`, {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } finally {
      setLoading(false);
      setOpenUploadImageVideo(false);
    }
  }, []);

  const handleCancelUpload = useCallback((type) => {
    setMessage((prev) => ({ ...prev, [type]: "" }));
  }, []);

  const handleUploadImageVideoOpen = useCallback(() => {
    setOpenUploadImageVideo((prev) => !prev);
  }, []);

  const handleOnChange = useCallback((e) => {
    const { value } = e.target;
    setMessage((prev) => ({ ...prev, text: value }));
  }, []);

  const handleSendMessage = async (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit("NewMessage", {
          sender: user?._id,
          receiver: param.userId,
          text: message.text,
          imageUrl: message.imageUrl,
          videoUrl: message.videoUrl,
        });

        setMessage({ text: "", imageUrl: "", videoUrl: "" });

        toast.success("Message sent successfully!", {
          position: "top-center",
          autoClose: 3000,
        });
      }
    }
  };

  let avatarName = "";
  if (dataUser?.name) {
    const splitName = dataUser?.name.trim().split(" "); // Ensure we trim whitespace
    avatarName =
      splitName.length > 1
        ? splitName[0][0] + splitName[1][0] // Get initials from first and last name
        : splitName[0][0]; // Get initial from first name only
  }


  const bgColor = [
    "bg-slate-200",
    "bg-teal-200",
    "bg-red-200",
    "bg-green-200",
    "bg-yellow-200",
    "bg-gray-200",
    "bg-cyan-200",
    "bg-sky-200",
    "bg-blue-200",
  ];

  const randomNumber = Math.floor(Math.random() * bgColor.length);

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", param.userId);

      const handleMessageUser = (data) => {
        setDataUser(data);
      };

      socketConnection.on("message-user", handleMessageUser);

      return () => {
        socketConnection.off("message-user", handleMessageUser);
      };
    }
  }, [socketConnection, param.userId, user]);

  return (
    <div
      className="min-h-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${Background})` }}
    > 
      {/*Header section  */}
      <header className="sticky top-0 h-16 bg-gray-300 shadow-sm">
        <div className="flex items-center justify-between h-full px-4">
          <div className="flex items-center space-x-4">
            <Link
              className="lg:hidden text-gray-600 hover:text-gray-800"
              to="/"
            >
              <IoChevronBack size={30} />
            </Link>
            {dataUser?.profile_pic ? (
              <Avatar
                width={45}
                height={45  }
                name={dataUser?.name}
                userId={dataUser?._id}
                imageUrl={dataUser?.profile_pic}
              />
            ) : (
              <div
                className={`flex items-center rounded-full justify-center text-xl font-semibold  ${bgColor[randomNumber]} text-gray-800`}
                style={{ width: `45px`, height: `45px` }}
              >
                {avatarName.toUpperCase()}
              </div>
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
          <button className="text-gray-600 hover:text-gray-800">
            <FaBars size={18} />
          </button>
        </div>
      </header>

      {/* Message section */}
      <section className="h-[calc(100vh-128px)] border-t border-gray-200 overflow-y-auto scrollbar-message-user bg-opacity-95 bg-gray-200 relative">
        {(message.imageUrl || message.videoUrl) && (
          <div className="absolute inset-0 bg-gray-500 bg-opacity-30 flex items-center justify-center">
            <div className="bg-white rounded-lg shadow-lg p-4 max-w-md w-full">
              <div className="relative">
                <button
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                  onClick={() =>
                    handleCancelUpload(
                      message.imageUrl ? "imageUrl" : "videoUrl"
                    )
                  }
                >
                  <VscClose size={24} />
                </button>
                {message.imageUrl && (
                  <img
                    src={message.imageUrl}
                    alt="Uploaded"
                    className="aspect-video w-full h-full rounded-md object-contain p-2 my-1 border"
                  />
                )}
                {message.videoUrl && (
                  <video
                    src={message.videoUrl}
                    className="aspect-video w-full h-full rounded-md p-2 my-1 border"
                    controls
                    muted
                    autoPlay
                  />
                )}
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() =>
                    handleCancelUpload(
                      message.imageUrl ? "imageUrl" : "videoUrl"
                    )
                  }
                >
                  Cancel
                </Button>
                <Button onClick={handleSendMessage}>Send</Button>
              </div>
            </div>
          </div>
        )}
        {loading && <Loading />}
      </section>

      {/* Footer (Send messages) section */}
      <section className="bg-gray-100 bg-opacity-100 h-16 flex items-center p-4 border-t border-gray-200">
        <div className="relative">
          <button
            className="h-10 w-10 border border-gray-300 flex items-center justify-center rounded-xl hover:border-gray-400 bg-white text-gray-600 hover:text-gray-800"
            onClick={handleUploadImageVideoOpen}
          >
            <HiPlus size={25} />
          </button>
          <div
            className={`absolute bottom-16 left-0 w-36 bg-white shadow-md rounded p-2 m-1 transition-all duration-300 ease-in-out z-50 ${
              openUploadImageVideo
                ? "opacity-100 scale-100"
                : "opacity-0 scale-0"
            }`}
            style={{ transformOrigin: "bottom left" }}
          >
            <form>
              <label
                htmlFor="uploadImage"
                className="flex items-center p-2 px-3 gap-3 cursor-pointer hover:bg-gray-100 rounded"
              >
                <MdImage size={20} className="text-gray-600" />
                <p className="text-gray-600">Image</p>
              </label>
              <label
                htmlFor="uploadVideo"
                className="flex items-center p-2 px-3 gap-3 cursor-pointer hover:bg-gray-100 rounded"
              >
                <FaVideo size={20} className="text-gray-600" />
                <p className="text-gray-600">Video</p>
              </label>
              <input
                type="file"
                id="uploadImage"
                accept="image/*"
                onChange={(e) => handleUploadFile(e.target.files[0], "image")}
                hidden
              />
              <input
                type="file"
                id="uploadVideo"
                accept="video/*"
                onChange={(e) => handleUploadFile(e.target.files[0], "video")}
                hidden
              />
            </form>
          </div>
        </div>
        <form
          className="flex-1 flex items-center ml-4"
          onSubmit={handleSendMessage}
        >
          <input
            type="text"
            className="w-full h-10 px-4 rounded-xl focus:outline-none border border-gray-100 focus:border-gray-200 bg-gray-100"
            placeholder="Type a message..."
            value={message.text}
            onChange={handleOnChange}
            autoFocus
          />
          <button className="ml-2 h-10 px-4 flex items-center justify-center text-black rounded-xl hover:bg-gray-300">
            <IoSend size={25} />
          </button>
        </form>
      </section>
    </div>
  );
}
