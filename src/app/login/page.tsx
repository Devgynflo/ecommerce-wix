"use client";

import { useState } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

import { useWixClient } from "@/hooks/use-wix-client";
import { NextPage } from "next";

interface LoginPageProps {}

const LoginPage: NextPage<LoginPageProps> = ({}) => {
  const [mode, setMode] = useState(MODE.LOGIN);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Log in"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset password"
          : "Verify your email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Login"
      : mode === MODE.REGISTER
        ? "Register"
        : mode === MODE.RESET_PASSWORD
          ? "Reset"
          : "Verify";

  const wixClient = useWixClient();

  return (
    <main className="flex h-[calc(100vh-80px)] items-center justify-center px-4 md:px-8 lg:px-16 xl:px-32 2xl:px-64">
      <form action="" className="flex flex-col gap-8">
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {/* Username */}
        {mode === MODE.REGISTER && (
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-700">
              Username
            </label>
            <input
              type="text"
              name="username"
              placeholder="alan"
              className="rounded-md p-4 ring-2 ring-gray-300"
            />
          </div>
        )}
        {/* Email */}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              placeholder="alan.turing@gmail.com"
              className="rounded-md p-4 ring-2 ring-gray-300"
            />
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-700">
              Verification Code
            </label>
            <input
              type="text"
              name="emailCode"
              placeholder="Code"
              className="rounded-md p-4 ring-2 ring-gray-300"
            />
          </div>
        )}

        {/* Password */}
        {(mode === MODE.LOGIN || mode === MODE.REGISTER) && (
          <div className="flex flex-col gap-2">
            <label htmlFor="" className="text-sm text-gray-700">
              Password
            </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              className="rounded-md p-4 ring-2 ring-gray-300"
            />
          </div>
        )}
        {mode === MODE.LOGIN && (
          <div
            className="cursor-pointer text-sm underline"
            onClick={() => setMode(MODE.RESET_PASSWORD)}
          >
            Forgot password ?
          </div>
        )}
        <button
          className="rounded-md bg-lama py-2 text-white disabled:cursor-not-allowed disabled:bg-pink-200"
          disabled={isLoading}
        >
          {isLoading ? "Loading..." : buttonTitle}
        </button>
        {error && <div className="text-red-600">{error}</div>}
        {mode === MODE.LOGIN && (
          <div
            className="cursor-pointer"
            onClick={() => setMode(MODE.REGISTER)}
          >
            Don&apos;t have an account ?
          </div>
        )}
        {mode === MODE.REGISTER && (
          <div className="cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
            Have an account ?
          </div>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <div className="cursor-pointer" onClick={() => setMode(MODE.LOGIN)}>
            Go back to login
          </div>
        )}
        {message && <div className="text-sm text-green-600">{message}</div>}
      </form>
    </main>
  );
};

export default LoginPage;
