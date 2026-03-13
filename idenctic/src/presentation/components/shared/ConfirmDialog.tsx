"use client";
import React from "react";
import IcDanger from "./icons/ic_danger";
import IcConfirm from "./icons/ic_confirm";

interface ConfirmDialogProps {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "danger" | "info";
}

export default function ConfirmDialog({
  isOpen,
  title,
  description,
  confirmText = "Yes",
  cancelText = "No",
  onConfirm,
  onCancel,
  type = "danger",
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center px-4">
      <div
        className="absolute inset-0 bg-black/50 transition-opacity"
        onClick={onCancel}
      />
      <div className="relative bg-white rounded-3xl p-6 w-full max-w-sm flex flex-col items-center text-center shadow-xl animate-in zoom-in-95 duration-200">
        <div
          className={`w-16 h-16 rounded-full flex items-center justify-center mb-4 ${
            type === "danger" ? "bg-red-100" : "bg-blue-100"
          }`}
        >
          {type === "danger" ? <IcDanger /> : <IcConfirm />}
        </div>

        {/* Text */}
        <h2 className="text-xl font-bold text-gray-900 mb-2">{title}</h2>
        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          {description}
        </p>

        {/* Buttons */}
        <div className="flex gap-3 w-full">
          <button
            onClick={onCancel}
            className="flex-1 py-3 px-4 rounded-xl font-semibold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors"
          >
            {cancelText}
          </button>
          <button
            onClick={onConfirm}
            className={`flex-1 py-3 px-4 rounded-xl font-semibold text-white transition-colors ${
              type === "danger"
                ? "bg-red-500 hover:bg-red-600 shadow-red-200"
                : "bg-blue-500 hover:bg-blue-600 shadow-blue-200"
            } shadow-lg`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
