import React from "react";
import logo from "../assets/Logo.png";
const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center py-3 ">
        <img src={logo} alt="logo" width={280} className="py-6" />
      </header>

      {children}
    </>
  );
};

export default AuthLayouts;
