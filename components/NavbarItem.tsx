import React from "react";

interface NavbaritemProps {
  label: string;
}

const NavbarItem: React.FC<NavbaritemProps> = ({ label }) => {
  return (
    <div className="text-white cursor-pointer hover:text-gray-300 transition"></div>
  );
};

export default NavbarItem;
