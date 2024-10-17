import React from "react"
import { PiUserThin } from "react-icons/pi"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"

export default function UserCard({ user, onClose }) {
  const onlineUser = useSelector((state) => state?.user?._id)
  
  if (!user) {
    return null
  }
  
  const isOnline = onlineUser.includes(user?._id)

  return (
    <Link to={user?._id} onClick={onClose}>
      <div className="mb-3 mx-2">
        <div className="relative flex items-center space-x-4 rounded-lg py-2 px-4 bg-white hover:bg-gray-50 transition duration-200 shadow-sm border border-gray-200 hover:border-blue-500">
          <div className="relative flex-shrink-0">
            {user?.profile_pic ? (
              <img
                className="w-12 h-12 rounded-full object-cover border-2 border-gray-200"
                src={user?.profile_pic}
                alt={`${user?.name}'s Avatar`}
              />
            ) : (
              <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center">
                <PiUserThin className="w-8 h-8 text-gray-500" />
              </div>
            )}
            {isOnline && (
              <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" title="Online"></div>
            )}
          </div>

          <div className="flex-grow min-w-0">
            <div className="text-sm font-semibold text-gray-900 truncate">
              {user?.name}
            </div>
            <div className="text-xs text-gray-500 truncate">{user?.email}</div>
          </div>
        </div>
      </div>
    </Link>
  )
}