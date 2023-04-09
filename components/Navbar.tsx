import React, { useState } from "react";
import NavbarItem from "./NavbarItem";
import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";
import MobileMenu from "./MobileMenu";

const Navbar = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleMobileMenu = () => setShowMobileMenu((current) => !current);
  return (
    <nav className="w-full fixed z-40">
      <div className="px-4 md:px-16 py-6 flex items-center transition duration-500 bg-zinc-900/90">
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="logo" />
        <div className="hidden lg:flex gap-7 ml-8">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Films" />
          <NavbarItem label="New & Popular" />
          <NavbarItem label="My List" />
          <NavbarItem label="Browse by languages" />
        </div>
        <div
          onClick={toggleMobileMenu}
          className="lg:hidden flex items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>

          <BsChevronDown className={`text-white transition w-3`} />
          <MobileMenu visible={showMobileMenu} />
        </div>
        <div className="flex ml-auto gap-7 items-center">
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-200 hover:text-gray-300 cursor-pointer">
            <BsBell />
          </div>
          <div className="flex- flex-row items-center gap-2 cursor-pointer relative ">
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-red.png" alt="profile" />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
