import React from "react";
import { useNavigate } from "react-router-dom";

interface headerTypes {
  title: string;
  sidebarHidden?: boolean;
  setSidebarHidden?: any;
  // isMobileOpen?: boolean;
  // setIsMobileOpen?: any;

}

const Header = ({ title, setSidebarHidden, sidebarHidden }: headerTypes) => {
  const navigate = useNavigate();

  const handleMenuClick = () => {
    setSidebarHidden(!sidebarHidden);
    // setIsMobileOpen ? !isMobileOpen : setIsMobileOpen(false);
  };

  return (
    <div style={{ height: "10vh", minHeight: "60px" }}>
      <header className="relative flex items-center text-black py-4 px-4 sm:px-8 bg-white drop-shadow-sm">
        <i
          className="bx bx-menu text-3xl sm:text-4xl cursor-pointer mr-4 sm:mr-8"
          onClick={handleMenuClick}
        ></i>

        <h3 className="hidden sm:block text-xl sm:text-2xl  md:text-3xl font-semibold text-slate-700 flex-grow">
          {title}
        </h3>

        <button
          onClick={() => navigate("/")}
          type="submit"
          className="ml-auto text-sm sm:text-base bg-blue-600 text-white w-20 sm:w-28 lg:w-32 h-10 rounded-md hover:bg-blue-700"
        >
          Logout
        </button>
      </header>
    </div>
  );
};

export default Header;
