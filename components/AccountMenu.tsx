import React from "react";
import { signOut } from "next-auth/react";
import useCurrentuser from "@/hooks/useCurrentUser";

interface AccountMenuProps {
  visible?: boolean;
}

const AccountMenu: React.FC<AccountMenuProps> = ({ visible }) => {
  const { data, error, isLoading, mutate } = useCurrentuser();
  return (
    <div
      className="transition bg-black w-56 absolute top-14 right-0 py-5 flex flex-col border-2 border-gray-800"
      style={{
        visibility: visible ? "visible" : "hidden",
        opacity: visible ? 1 : 0,
        transition: "visibility 0.5s, opacity 0.25s",
      }}
    >
      <div className="flex flex-col gap-3">
        <div className="px-3 group/item flex gap-3 items-center w-full">
          <img
            className="w-8 rounded-md"
            src="/images/default-red.png"
            alt="profile"
          />
          <p className="text-white text-sm group-hover/item:underline">
            {data?.name}
          </p>
        </div>
        <hr className="bg-gray-600 border-0 h-px my-4" />
        <div
          onClick={() => signOut()}
          className="px-3 text-center text-white text-sm hover:underline"
        >
          Sign out of Netflix
        </div>
      </div>
    </div>
  );
};

export default AccountMenu;
