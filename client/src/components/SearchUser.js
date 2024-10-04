import React, { useEffect } from "react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import Loading from "./Loading";
import UserCard from "./UserCard";
import axios from "axios";
import { toast } from "react-toastify";
import { VscClose } from "react-icons/vsc";
import { Link } from "react-router-dom";

const SearchUser = ({ onClose }) => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

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
    }
  };

  useEffect(() => {
    handleUserSearch();
  }, [search]);


  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-myColor1 bg-opacity-80 z-10">
      <div className="w-full max-w-xl mx-auto m-10">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full bg-myColor5 outline-none h-full px-3 rounded-lg py-3 pl-10"
            placeholder="Search user by Name or Email"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-myColor1" />
          <button className="ml-3 px-4 py-2 border-2 hover:bg-myColor4 border-myColor4 text-myColor1 rounded-lg flex items-center">
            <GoSearch className="mr-2" />
            Search
          </button>
          <div onClick={onClose} className="ml-2 border-2 hover:bg-myColor4 border-myColor1 text-myColor1 rounded-lg flex items-center">
            <VscClose className="my-3 mx-2" />
          </div>
        </div>
        {/* Display Search User */}
        <div className=" w-full mt-4">
          {searchUser.length === 0 && !loading && (
            <div className="rounded m-3 flex justify-center items-center flex-col border-2 mt-20 p-12 bg-myColor1 bg-opacity-95">
              <h1 className="text-4xl font-semibold mb-4 text-myColor5 ">
                User Not Found !
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                We couldn't find the user you're looking for.
              </p>
            </div>
          )}
          {loading && (
            <div className="rounded m-3 flex justify-center items-center flex-col mt-20">
              <h1 className="text-4xl font-semibold mb-4 text-myColor1 flex justify-center items-center">
                <Loading />
              </h1>
              <p className="text-lg text-myColor1 ">
                We processing to find the user you're looking for.
              </p>
            </div>
          )}
          <div className=" h-[calc(90vh-65px)] overflow-x-hidden overflow-y-auto scrollbar-find-user">
            {searchUser.length !== 0 &&
              !loading &&
              searchUser.map((user, index) => {
                return (
                  <UserCard key={user._id} user={user} onClose={onClose} />
                );
              })}
              
          </div>
          {/* <UserCard /> */}
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
