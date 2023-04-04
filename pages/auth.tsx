import Input from "@/components/Input";
import React, { useCallback, useState } from "react";
import Image from "next/image";

const Auth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");

  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login"
    );
  }, []);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-fixed bg-cover">
      <div className="h-full w-full bg-black lg:bg-black/50">
        <nav className="px-12 py-5">
          {/* <img src="/images/logo.png" alt="logo" className="h-12" /> */}
          <Image src="/images/logo.png" alt="logo" width={180} height={48} />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 p-16 mt-2 self-center lg:w-2/5 lg:max-w-md  rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-semibold">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant === "register" && (
                <Input
                  id="username"
                  type="username"
                  onChange={(e) => setUsername(e.target.value)}
                  label="Username"
                  value={username}
                />
              )}
              <Input
                id="email"
                type="email"
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
              <button className="text-white bg-red-600 rounded w-full mt-10 hover:bg-red-700 py-3 transition">
                {variant === "login" ? "Login" : "Sign up"}
              </button>
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
        </div>
      </div>
    </div>
  );
};

export default Auth;
