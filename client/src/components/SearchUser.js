import React from "react";
import { useState } from "react";
import { GoSearch } from "react-icons/go";
import Loading from "./Loading";
import UserCard from "./UserCard";

const SearchUser = () => {
  const [searchUser, setSearchUser] = useState([]);
  const [loading, setLoading] = useState(false);

  return (
    <div className="fixed top-0 bottom-0 right-0 left-0 bg-myColor2 bg-opacity-50">
      <div className="w-full max-w-xl mx-auto m-10">
        <div className="relative flex items-center">
          <input
            type="text"
            className="w-full bg-myColor4 outline-none py-1 h-full px-3 rounded-lg py-3 pl-10"
            placeholder="Search user by Name or Email"
          />
          <GoSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <button className="ml-3 px-4 py-2 border-2 hover:bg-myColor4 border-myColor4 text-myColor1 rounded-lg flex items-center">
            <GoSearch className="mr-2" />
            Search
          </button>
        </div>
        {/* Display Search User */}
        <div className="bg-myColor4 w-full mt-2 p-4 rounded-md">
          {searchUser.length === 0 && !loading && (
            <div className="rounded m-3 flex justify-center items-center flex-col">
              <h1 className="text-4xl font-semibold mb-4 text-myColor2">
                User Not Found !
              </h1>
              <p className="text-lg text-gray-700 mb-4">
                We couldn't find the user you're looking for.
              </p>
            </div>
          )}
          {loading && (
            <div className="rounded m-3 flex justify-center items-center flex-col">
              <h1 className="text-4xl font-semibold mb-4 text-myColor2 flex justify-center items-center">
                <Loading />
              </h1>
              <p className="text-lg text-gray-700 ">
                We processing to find the user you're looking for.
              </p>
            </div>
          )}
          {searchUser.length !== 0 &&
            !loading &&
            searchUser.map((user, index) => {
              return <UserCard key={user._id} user={user} />;
            })}
        <UserCard/>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
