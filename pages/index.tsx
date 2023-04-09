import useCurrentuser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";

export async function getServerSideProps(context: NextPageContext) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const session = await getSession(context);

  if (!session) {
    return {
      redirect: {
        destination: "/auth",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

export default function Home() {
  const { data: user, error, isLoading, mutate } = useCurrentuser();

  console.log({ user });
  return (
    <>
      <Navbar />
      <h1 className="text-white">Netflix clone</h1>
      <p className="text-white">
        Logged in as : {isLoading ? "Loading..." : user?.name}
      </p>
      <button className="h-10 w-full bg-white" onClick={() => signOut()}>
        Logout
      </button>
    </>
  );
}
