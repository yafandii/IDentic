"use client";

import CameraView from "@/presentation/components/CameraView";
import NikInputPage from "@/presentation/components/NikInputPage";
import { useAppSelector } from "@/infrastructure/redux/hooks";
import { useRef } from "react";

export default function Camera() {
  const {
    nik,
    verificationResult: verificationStatus,
    isLoading,
  } = useAppSelector((state) => state.image);

  // Instant Latch: Gunakan ref untuk mendeteksi fase verifikasi secara sinkron.
  const isLockedToVerification = useRef(false);

  // Jika NIK ditemukan, sedang loading, atau sudah ada hasil verifikasi,
  // kita kunci tampilan ke mode CameraView. Ini jaminan flicker TIDAK AKAN MUNCUL
  // saat proses pindah ke halaman result page.
  if (nik || isLoading || verificationStatus !== null) {
    isLockedToVerification.current = true;
  }

  if (isLockedToVerification.current) {
    return <CameraView />;
  }

  return <NikInputPage />;
}
