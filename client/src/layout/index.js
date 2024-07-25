import React from "react";
import logo from "../assets/Logo.png"

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center bg-myColor1">
        {/* <img src={logo} alt="logo" width={280} className="py-6" /> */}
        <p className="josefin-sans text-5xl mt-10 text-myColor3 flex justify-center  ">ChatHorizon</p>
      </header>
      {children}
    </>
  );
};

export default AuthLayouts;
