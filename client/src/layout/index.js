import React from "react";

const AuthLayouts = ({ children }) => {
  return (
    <>
      <header className="flex justify-center items-center bg-myColor1">
        <p className="josefin-sans text-5xl mt-10 text-myColor3 flex justify-center  ">ChatHorizon</p>
      </header>
      {children}
    </>
  );
};

export default AuthLayouts;
