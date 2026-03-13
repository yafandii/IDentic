"use client";
import React from "react";
import IcDanger from "./icons/ic_danger";

interface ErrorDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  buttonText?: string;
  onClick: () => void;
}

export default function ErrorDialog({
  isOpen,
  title,
  description,
  buttonText = "Tutup",
  onClick,
}: ErrorDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onClick}
      />
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl animate-in zoom-in-95 duration-200">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 bg-red-100`}
        >
          <IcDanger />
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onClick}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-colors bg-red-500 hover:bg-red-600 shadow-red-200 shadow-lg`}
          >
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}
