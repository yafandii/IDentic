import React, { useState } from "react";
import IcShieldCheck from "./icons/ic_shield_check";
import IcTakePicture from "./icons/ic_take_picture";

interface AgreementDialogProps {
  isChecked: boolean;
  setIsChecked: (checked: boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

const AgreementDialog = ({
  isChecked,
  setIsChecked,
  isOpen,
  onClose,
  onAgree,
}: AgreementDialogProps) => {
  if (!isOpen) return null;

  const handleAgree = () => {
    if (isChecked) {
      onAgree();
    }
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black/50 transition-opacity" />
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col text-left shadow-xl animate-in zoom-in-95 duration-200 justify-center">
        {/* Header */}
        <div className="flex items-start gap-4 mb-4">
          <div className="w-8 h-8 md:w-8 md:h-8 lg:w-8 lg:h-8  rounded-full flex-shrink-0 flex items-center justify-center bg-gray-100 text-gray-900">
            <IcShieldCheck className="w-5 h-5 " />
          </div>
          <h2 className="font-bold text-lg md:text-xl lg:text-xl  text-gray-900 mt-0.5">
            Persetujuan Verifikasi Wajah
          </h2>
        </div>

        {/* Description */}
        <div className="bg-gray-100 p-4 rounded-xl mb-4">
          <p className="text-gray-500 text-xs md:text-sm lg:text-sm  leading-relaxed text-justify ">
            Untuk melanjutkan proses verifikasi identitas, sistem akan mengambil
            dan memproses gambar wajah Anda guna dilakukan pencocokan biometrik
            dengan data pada Kartu Tanda Penduduk (KTP). Data digunakan hanya
            untuk keperluan verifikasi sesuai kebijakan privasi yang berlaku.
          </p>
        </div>

        {/* Checkbox */}
        <div
          className="flex items-start gap-3 mb-8 cursor-pointer"
          onClick={() => setIsChecked(!isChecked)}
        >
          <div
            className={`mt-0.5 w-5 h-5 border-2 rounded flex items-center justify-center flex-shrink-0 transition-colors ${isChecked ? "bg-gradient-to-br from-myBg via-primary-800 to-primary-900 border-none" : "border-gray-300"}`}
          >
            {isChecked && (
              <svg
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 3L4.5 8.5L2 6"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            )}
          </div>
          <p className="text-xs md:text-sm lg:text-sm text-gray-700 leading-snug select-none text-justify">
            Saya menyetujui pengambilan dan pemrosesan gambar wajah untuk
            keperluan verifikasi identitas melalui pencocokan dengan data KTP.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onClose}
            className=" flex-1 py-3 px-4 rounded-xl font-semibold text-sm bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Batal
          </button>
          <button
            onClick={handleAgree}
            disabled={!isChecked}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold  text-white text-sm transition-all flex items-center justify-center gap-2 ${
              isChecked
                ? "bg-gradient-to-br from-myBg via-primary-800 to-primary-900   "
                : "bg-gray-300 cursor-not-allowed"
            }`}
          >
            <IcTakePicture size={20} color={isChecked ? "white" : "#9CA3AF"} />
            Lanjutkan
          </button>
        </div>
      </div>
    </div>
  );
};

export default AgreementDialog;
