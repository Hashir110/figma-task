import React from "react";
import logo from "../assets/Logo.svg";
import sideBarLogo from "../assets/Side Menu.svg";
import AOS from "aos";
import "aos/dist/aos.css";

const Sidebar = () => {
  AOS.init();

  return (
    <div
      data-aos="fade-right"
      data-aos-duration="1000"
      data-aos-delay="100"
      data-aos-easing="ease-in-sine"
    >
      <div className=" bg-white sm:flex flex-col drop-shadow-md px-4 py-5 w-full sm:w-64 lg:w-72 h-screen max-h-screen overflow-y-auto">
        {/* Logo */}
        <div className="flex justify-center sm:justify-start">
          <img
            className="w-32 sm:w-40 lg:w-48 mx-auto sm:mx-0"
            src={logo}
            alt="Logo"
          />
        </div>

        {/* Sidebar Menu Logo */}
        <div className="mt-8 flex justify-center sm:justify-start">
          <img
            className="w-32 sm:w-40 lg:w-48 mx-auto sm:mx-0"
            src={sideBarLogo}
            alt="Sidebar Menu"
          />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
