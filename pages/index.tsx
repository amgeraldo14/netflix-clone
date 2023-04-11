import useCurrentuser from "@/hooks/useCurrentUser";
import { NextPageContext } from "next";
import { getSession, signOut } from "next-auth/react";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Billboard from "./billboard";

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

  return (
    <>
      <Navbar />
      <Billboard />
    </>
  );
}
