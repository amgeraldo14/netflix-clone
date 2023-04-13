import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "./api/auth/[...nextauth]";

import useCurrentuser from "@/hooks/useCurrentUser";
import Link from "next/link";
export async function getServerSideProps(context: any) {
  const session = getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }
  return { props: {} };
}

function Profile() {
  const { data: user, error, isLoading, mutate } = useCurrentuser();
  return (
    <div className="flex items-center h-full justify-center">
      <div className="flex flex-col ">
        <h1 className="text-3xl md:text-6xl text-white text-center">
          Who is watching?
        </h1>
        <div className="flex items-center justify-center gap-8 mt-10">
          <Link href={"/"}>
            <div className="group flex-row w-44 mx-auto">
              <div className="w-44 h-44 rounded-md flex items-center justify-center border-2 border-transparent group-hover:cursor-pointer group-hover:border-white">
                <img
                  src="/images/default-red.png"
                  alt="profile"
                  className="rounded-md"
                />
              </div>
              <div className="mt-4 text-gray-400 text-2xl text-center group-hover:text-white group-hover:cursor-pointer">
                <p>{user?.name}</p>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Profile;
