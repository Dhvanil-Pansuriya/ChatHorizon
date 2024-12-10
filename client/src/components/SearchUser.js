import React, { useEffect, useState, useRef } from "react";
import { GoSearch } from "react-icons/go";
import Loading from "./Loading";
import UserCard from "./UserCard";
import axios from "axios";
import { toast } from "react-toastify";
import { VscClose } from "react-icons/vsc";

export default function SearchUser({ onClose }) {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");
  const modalRef = useRef(null); // Use useRef to track the modal container

  const handleUserSearch = async () => {
    const URL = `${process.env.REACT_APP_BACKEND_URL}/api/searchUser`;

    try {
      setLoading(true);
      const response = await axios.post(URL, {
        search: search,
      });
      setLoading(false);
      setSearchUser(response.data.data);
    } catch (error) {
      setLoading(false);
      toast.error(error?.response?.data?.message, {
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

  const handleClickOutside = (e) => {
    // Close modal if click is outside the modal content area
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  useEffect(() => {
    handleUserSearch();
  }, [search]);

  useEffect(() => {
    // Add event listener when component mounts
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      // Clean up the event listener when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex items-center justify-center">
      <div
        ref={modalRef} // Attach the ref to the modal container
        className="w-full max-w-xl mx-auto bg-white rounded-xl shadow-lg p-6 flex flex-col h-[80vh]"
      >
        <div className="relative flex items-center mb-4">
          <input
            type="text"
            className="w-full bg-gray-100 outline-none h-full px-4 py-3 pl-10 rounded-lg text-gray-800 placeholder-gray-500 border border-gray-300 focus:border-blue-500 transition duration-200"
            placeholder="Search user by Name or Email"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button className="ml-3 px-4 py-2 bg-blue-600 text-white rounded-lg flex items-center hover:bg-blue-700 transition duration-200">
            <GoSearch className="mr-2" />
            Search
          </button>
          <button
            onClick={onClose}
            className="ml-2 p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-200 rounded-full transition duration-200"
          >
            <VscClose className="w-6 h-6" />
          </button>
        </div>
        {/* Display Search User */}
        <div className="flex-grow overflow-hidden">
          <div className="h-full overflow-y-auto scrollbar-find-user">
            {searchUser.length === 0 && !loading && (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-6">
                <h1 className="text-4xl font-semibold mb-4 text-gray-800">
                  User Not Found!
                </h1>
                <p className="text-lg text-gray-600 mb-4">
                  We couldn't find the user you're looking for.
                </p>
              </div>
            )}
            {loading && (
              <div className="flex flex-col items-center justify-center h-full bg-gray-100 rounded-lg p-6">
                <div className="text-4xl font-semibold mb-4 text-gray-800 flex justify-center items-center">
                  <Loading />
                </div>
                <p className="text-lg text-gray-600">
                  We're processing to find the user you're looking for.
                </p>
              </div>
            )}
            {searchUser.length !== 0 &&
              !loading &&
              searchUser.map((user) => (
                <UserCard key={user._id} user={user} name={user?.name} onClose={onClose} />
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
