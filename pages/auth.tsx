import Input from "@/components/Input";
import React, { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { getServerSession } from "next-auth";

import { authOptions } from "./api/auth/[...nextauth]";

export async function getServerSideProps(context: any) {
  const session = await getServerSession(context.req, context.res, authOptions);
  // const session = await getSession(context);

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {},
  };
}

const Auth = () => {
  const router = useRouter();
  const { error } = router.query;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [variant, setVariant] = useState("login");

  const toggleVariant = () => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  };

  const login = async (e?: any) => {
    setIsLoading(true);
    if (e) {
      e.preventDefault();
    }
    try {
      await signIn("credentials", {
        email,
        password,

        callbackUrl: "/profile",
      });
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  const register = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.post("/api/register", { email, name, password });
      login();
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-cover">
      <div className="h-full w-full bg-black lg:bg-black/50">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo.png" alt="logo" className="h-12" /> */}
          <Image src="/images/logo.png" alt="logo" width={180} height={48} />
        </nav>
        <form
          className="flex justify-center"
          onSubmit={variant === "register" ? register : login}
        >
          <div className="bg-black/70 p-16 mt-2 self-center lg:w-2/5 lg:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  label="Name"
                  value={name}
                />
              )}
              <Input
                id="email"
                type="text"
                onChange={(e) => setEmail(e.target.value)}
                label="Email"
                value={email}
              />
              <Input
                id="password"
                type="password"
                onChange={(e) => setPassword(e.target.value)}
                label="Password"
                value={password}
              />
              {error && <p className="text-red-600">Error: {error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`${
                  isLoading ? "animate-pulse duration-200" : ""
                } text-white bg-red-600 rounded w-full mt-10 hover:bg-red-700 py-3 transition`}
              >
                {variant === "login" ? "Login" : "Sign up"}
              </button>
              <div className="flex items-center gap-4 mt-8 justify-center">
                <div
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn("google", { callbackUrl: "/profile" })}
                >
                  <FcGoogle size={30} />
                </div>
                <div
                  className="w-10 h-10 bg-white rounded-full flex items-center justify-center cursor-pointer hover:opacity-80 transition"
                  onClick={() => signIn("github", { callbackUrl: "/profile" })}
                >
                  <FaGithub size={30} />
                </div>
              </div>
              <p className="text-neutral-500 mt-12">
                {variant === "login"
                  ? " New to Netflix?"
                  : "Already have an account?"}

                <span
                  onClick={toggleVariant}
                  className="text-white ml-1 hover:underline cursor-pointer"
                >
                  {variant === "login" ? "Create an account" : "Login"}
                </span>
              </p>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Auth;
