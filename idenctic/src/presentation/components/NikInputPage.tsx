"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/infrastructure/redux/hooks";
import { setNIK } from "../redux/slices/verificationSlice";
import BaseButton from "./shared/base-button";
import BaseTextInput from "./shared/base-text-input";
import IcBack from "./shared/icons/ic_back";

export default function NikInputPage() {
  const [nik, setNik] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();
  const dispatch = useAppDispatch();

  const handleNext = () => {
    if (nik.length === 16) {
      dispatch(setNIK(nik));
      router.push("/camera");
    } else {
      setError("NIK harus 16 digit");
    }
  };

  return (
    <div className="h-[100dvh] relative overflow-hidden bg-gradient-to-br from-myBg via-primary-800 to-primary-900 flex flex-col p-6">
      {/* Header / Back */}
      <div className="flex items-center mb-8">
        <button
          onClick={() => router.back()}
          className="text-white p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:bg-white/20 transition-colors mr-4"
        >
          <IcBack size={24} color="white" />
        </button>
        <h1 className="text-xl font-bold text-white">Input Nomor KTP</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center max-w-sm mx-auto w-full">
        {/* Card */}
        <div className="w-full bg-primary-800/50 backdrop-blur-md rounded-3xl p-8 border border-primary-700 shadow-2xl">
          <div className="mb-6">
            <h2 className="text-white font-extrabold text-lg mb-2">
              Verifikasi
            </h2>
            <p className="text-primary-300 text-sm">
              Silakan masukkan 16 digit nomor KTP target yang akan diverifikasi
              wajahnya.
            </p>
          </div>

          <BaseTextInput
            label="NIK Target"
            name="niktarget"
            placeholder="Masukkan 16 digit NIK"
            value={nik}
            onChange={(e) => {
              const value = e.target.value.replace(/\D/g, ""); // Only numbers
              if (value.length <= 16) setNik(value);
            }}
            className="mb-1"
          />

          {error && (
            <div className=" text-red-500 text-xs px-2 py-1 rounded-lg flex items-center gap-2 ">
              <div className="w-4 h-4 rounded-full bg-red-500 flex items-center justify-center flex-shrink-0">
                <span className="text-red-100 text-xs font-bold">!</span>
              </div>{" "}
              {error}
            </div>
          )}

          <BaseButton onClick={handleNext} className={`w-full mt-6 xl:py-2.5`}>
            Lanjut ke Kamera
          </BaseButton>
        </div>

        {/* Tip */}
        <div className="mt-8 flex items-center gap-3 p-4 bg-blue-900/30 rounded-2xl border border-blue-800/50 max-w-xs">
          <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center flex-shrink-0">
            <span className="text-blue-400 text-xs font-bold">i</span>
          </div>
          <p className="text-xs text-blue-200 leading-relaxed">
            Pastikan NIK sudah sesuai dengan KTP fisik target agar hasil
            verifikasi akurat.
          </p>
        </div>
      </div>
    </div>
  );
}
