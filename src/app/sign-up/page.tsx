"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Eye, EyeOff } from "lucide-react";

export default function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  return (
    <div className="min-h-screen w-full flex flex-col lg:flex-row">
      {/* Left side - Sign Up Form */}
      <div className="flex-1 flex flex-col lg:justify-center">
        {/* Mobile Header Image */}
        <div className="h-[20vh] bg-gradient-to-br from-rose-50 via-purple-100 to-blue-100 lg:hidden relative overflow-hidden">
          <Image
            src="https://picsum.photos/800/600"
            alt="Decorative background"
            layout="fill"
            objectFit="cover"
          />
        </div>

        {/* Logo - Between header and form on mobile, top left on desktop */}
        <div className="relative w-24 h-24 mx-auto -mt-12 mb-8 lg:w-16 lg:h-16 lg:mx-0 lg:mt-8 lg:ml-8 lg:mb-0 z-10">
          <Image
            src="https://picsum.photos/96"
            alt="Logo"
            fill
            className="p-1 bg-white rounded-xl shadow-md object-cover"
          />
        </div>

        {/* Sign Up Form */}
        <div className="w-full max-w-[400px] mx-auto px-4 lg:px-0 flex-grow lg:flex-grow-0 bg-white">
          <div className="bg-white shadow-xl rounded-3xl p-8">
            <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">
              Create your account
            </h1>

            <button className="w-full flex items-center justify-center gap-2 border bg-white rounded-lg p-2.5 mb-6 hover:bg-gray-50 transition-colors text-gray-700 font-medium">
              <Image
                src="https://www.google.com/favicon.ico"
                alt="Google"
                width={20}
                height={20}
                className="w-5 h-5"
              />
              <span>Sign up with Google</span>
            </button>

            <div className="relative mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 text-gray-500 bg-white lg:bg-transparent">
                  or
                </span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm text-gray-600">
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  placeholder="johndoe"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-input-text"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm text-gray-600">
                  Password
                </label>
                <div className="relative">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-input-text"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm text-gray-600"
                >
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-input-text"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md transition duration-300"
              >
                Sign Up
              </button>
            </form>
          </div>

          <p className="mt-6 text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link href="/sign-in" className="text-blue-600 hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Decorative Background (only visible on desktop) */}
      <div className="hidden lg:block lg:flex-1 relative bg-gradient-to-br from-rose-50 via-purple-100 to-blue-100">
        <Image
          src="https://picsum.photos/1200/1600"
          alt="Decorative background"
          layout="fill"
          objectFit="cover"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-rose-50/80 via-purple-100/80 to-blue-100/80">
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mb-32 blur-2xl" />
          <div className="absolute top-1/4 left-1/4 w-48 h-48 bg-white/10 rounded-full blur-2xl" />
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-white/10 rounded-full blur-xl" />
          {/* Dots pattern */}
          <div className="absolute bottom-1/4 left-1/4 w-48 h-48">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/40 rounded-full"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
