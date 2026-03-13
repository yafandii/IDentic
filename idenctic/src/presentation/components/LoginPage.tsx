// Login Page Component

"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../hooks/useAuth";
import Image from "next/image";
import BaseButton from "./shared/base-button";
import BaseTextInput from "./shared/base-text-input";
import IcLock from "./shared/icons/ic_lock";
import IcUser from "./shared/icons/ic_user";

export default function LoginPage() {
  const [nik, setNik] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { login } = useAuth();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const result = await login(nik, password);

    if (result.success) {
      router.push("/history");
    } else {
      setError(result.error || "Login failed. Please try again.");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-myBg via-primary-800 to-primary-900 flex flex-col ">
      <div className="w-full flex items-center justify-center p-4 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="bg-primary-800/50 backdrop-blur-sm p-6 rounded-lg shadow-xl border border-primary-700  ">
          <Image
            src="./images/logo.svg"
            alt="Logo"
            width={0}
            height={0}
            className="mx-auto w-24 h-24 xl:w-32 xl:h-32 mt-12 mt-4"
          />
          <h1 className="text-2xl font-extrabold text-white text-center mb-4">
            <span className="text-primary-400">ID</span>entic
          </h1>
          <p className="text-primary-300 text-center text-sm lg:text-xs mb-4">
            Login untuk melanjutkan
          </p>

          <form onSubmit={handleSubmit}>
            <div>
              <BaseTextInput
                label="Username"
                name="nik"
                value={nik}
                onChange={(e) => setNik(e.target.value)}
                placeholder="Masukkan Username"
                icon={<IcUser color="#fff" size={18} />}
                className="mb-4 text-xs"
              />
            </div>
            <div>
              <BaseTextInput
                label="Password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Masukkan password"
                type="password"
                className="mb-1 text-xs"
                icon={<IcLock color="#fff" size={18} />}
              />
            </div>
            {error && (
              <div className=" text-red-500 text-xs px-2 py-1 rounded-lg flex items-center gap-2 ">
                <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                  <span className="text-red-100 text-xs font-bold">!</span>
                </div>{" "}
                {error}
              </div>
            )}

            <BaseButton
              disabled={isLoading}
              className="w-full mb-6 mt-8 text-xs  xl:py-2.5"
            >
              {isLoading ? "Loading..." : "Login"}
            </BaseButton>

            <p className="text-center text-primary-300 text-xs">
              Silakan hubungi admin untuk mendapatkan kredensial login.
            </p>
          </form>
        </div>
      </div>

      <div className="w-full text-center pt-8 text-xs font-semibold text-primary-300 absolute bottom-2">
        Copyright © 2026 | MNC FINANCE. All Rights Reserved.
      </div>
    </div>
  );
}
