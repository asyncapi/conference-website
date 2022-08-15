/* eslint-disable react/no-unescaped-entities */
import React from "react";
import Logo from "../illustrations/logo";

function Header() {
  return (
    <div>
      <div className="mt-10 flex justify-center bg-transparent">
        <div className="flex flex-col items-center text-white w-2/4">
          <Logo className="" height="112px" width="112px" />
          <h1 className="mt-5 text-7xl font-black"> AsyncAPI</h1>
          <h1 className="mt-5 text-7xl font-black"> Conf 2022</h1>
        </div>
      </div>
      <div className="bg-architectureCover w-full h-full-screen bg-cover bg-center"></div>
    </div>
  );
}

export default Header;
