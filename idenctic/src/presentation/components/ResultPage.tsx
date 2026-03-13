"use client";

import { useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAppSelector, useAppDispatch } from "@/infrastructure/redux/hooks";
import { resetImageState } from "../redux/slices/verificationSlice";
import { stopAllMediaStreams } from "../utils/camera-utils";
import Image from "next/image";
import BaseButton from "./shared/base-button";
import IcBack from "./shared/icons/ic_back";

export default function ResultPage() {
  const router = useRouter();
  const { verificationResult, isFromHistory } = useAppSelector(
    (state) => state.image,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    const runCleanup = async () => {
      await stopAllMediaStreams();
    };
    runCleanup();

    if (!verificationResult) {
      router.replace("/history");
    }
  }, [verificationResult, router]);

  const currentTime = useMemo(() => {
    const now = new Date();
    return now.toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, []);

  if (!verificationResult) {
    return null;
  }

  return (
    <div className="min-h-[100dvh] bg-gradient-to-b from-myBg via-primary-900 to-black flex flex-col items-center justify-between font-sans overflow-hidden">
      <div className="absolute top-0 left-0 right-0 z-0 w-full bg-gradient-to-b from-black/60 to-transparent p-6">
        {/* background logo centered */}
        <Image
          src="/images/logo.svg"
          alt="Logo"
          width={100}
          height={100}
          className="w-96 h-96 xl:w-full xl:h-full xl:p-36 opacity-5 absolute top-0 left-0 right-0 bottom-0 min-h-screen w-full mx-auto"
        />
      </div>
      {isFromHistory && (
        <div className="absolute top-0 left-0 right-0 z-20  bg-gradient-to-b from-black/60 to-transparent p-6">
          <button
            onClick={async () => {
              dispatch(resetImageState());
              router.push("/");
            }}
            className="text-white p-2 rounded-full active:bg-white/10  backdrop-blur-md border border-white/20 "
          >
            <IcBack size={24} color="white" />
          </button>
        </div>
      )}
      <div className="w-full max-w-sm flex-1 flex flex-col items-center justify-center  relative z-10">
        {/* Top Icon */}
        <div className="animate-zoom-in ">
          <Image
            src={
              verificationResult.isMatch && (verificationResult.score ?? 0) > 0
                ? "/images/thumbs_up_3d.png"
                : "/images/access_denied_3d.png"
            }
            alt={verificationResult.isMatch ? "Cocok" : "Tidak Cocok"}
            width={100}
            height={100}
            className="w-24 h-24 lg:w-32 lg:h-32 "
          />
        </div>

        {/* Headlines */}
        <div className="text-center  px-4">
          <h1
            className={`text-2xl lg:text-2xl font-extrabold drop-shadow-md ${
              verificationResult.isMatch ? "text-primary-300" : "text-red-400"
            }`}
          >
            {verificationResult.isMatch && (verificationResult.score ?? 0) > 0
              ? "Cocok!"
              : "Tidak Cocok!"}
          </h1>
          <p className="text-white/80 text-md font-medium leading-tight mt-2">
            {verificationResult.error?.errorMessage}
          </p>
        </div>

        <div className="relative group mt-6">
          <div
            className={`absolute -inset-1 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200 ${
              verificationResult.isMatch
                ? "bg-gradient-to-r from-primary-400 to-primary-600"
                : "bg-gradient-to-r from-red-400 to-orange-600"
            }`}
          ></div>
          <div className="relative w-40 h-40 rounded-full border-4 border-white/20 overflow-hidden shadow-2xl">
            <Image
              src={`/api/${verificationResult.path}`}
              alt="Verified User"
              fill
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex flex-col items-center mt-4">
          <h2
            className={`text-2xl font-extrabold ${
              verificationResult.isMatch ? "text-primary-300" : "text-white/40"
            }`}
          >
            {verificationResult.nik}
          </h2>
        </div>

        <div className="flex flex-col items-center mt-4">
          {verificationResult.score && verificationResult.score > 0 ? (
            <div className="w-full flex flex-col gap-y-4 px-4 items-center mb-4 mt-4">
              <div className="space-y-1">
                <p className="text-white font-semibold text-sm text-center">
                  Match Score:
                </p>
                <p className="text-primary-300 font-extrabold text-md text-center">
                  {verificationResult.score}
                </p>
              </div>
            </div>
          ) : (
            <> </>
          )}
          <div className="space-y-1">
            <p className="text-white font-semibold text-sm text-center">
              Check Date:
            </p>
            <p className="text-primary-300 font-extrabold text-md text-center">
              {verificationResult.checkDate}
            </p>
          </div>
        </div>
      </div>

      {/* Footer & Actions */}
      {!isFromHistory && (
        <div className="w-full max-w-sm mt-8 space-y-4 mb-16 px-6">
          <BaseButton
            onClick={() => {
              dispatch(resetImageState());
              router.push("/history");
            }}
            disabled={false}
            className="w-full py-2"
          >
            <span className="text-md font-extrabold">Selesai</span>
          </BaseButton>
        </div>
      )}
      <p className="text-white/40 text-[10px] text-center mb-4">
        Copyright © 2026 | MNC FINANCE. All Rights Reserved.
      </p>
    </div>
  );
}
