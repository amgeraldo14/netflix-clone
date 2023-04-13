import React from "react";

interface MobileMenuProps {
  visible: boolean;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ visible }) => {
  return (
    <div
      style={{
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0,
        transition: "visibility 0.5s, opacity 0.25s",
      }}
      className=" transition bg-black w-56 absolute top-8 left-0 py-5 flex flex-col border-2 border-gray-800 "
    >
      <div className="flex flex-col gap-4">
        <div className="px-3 text-center text-white hover:underline">Home</div>
        <div className="px-3 text-center text-white hover:underline">
          Series
        </div>
        <div className="px-3 text-center text-white hover:underline">Films</div>
        <div className="px-3 text-center text-white hover:underline">
          New & popular
        </div>
        <div className="px-3 text-center text-white hover:underline">
          My List
        </div>
        <div className="px-3 text-center text-white hover:underline">
          Browse by Languages
        </div>
      </div>
    </div>
  );
};

export default MobileMenu;
