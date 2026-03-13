// Landing Page Component

"use client";

import Image from "next/image";
import ItemHilightBox from "./shared/item-hilight-box";
import BaseButton from "./shared/base-button";
import { useRouter } from "next/navigation";

export default function LandingPage() {
  const router = useRouter();
  return (
    <div className="min-h-screen items-center justify-center bg-gradient-to-br from-myBg via-primary-800 to-primary-900 flex flex-col relative">
      <div className=" flex items-center justify-center p-4 mb-16">
        <div className="max-w-4xl md:max-w-5xl lg:max-w-6xl xl:max-w-7xl text-center space-y-8 xl:space-y-20">
          <div className="">
            <Image
              src="./images/logo.svg"
              alt="Logo"
              width={0}
              height={0}
              className="mx-auto w-32 h-32 xl:w-48 xl:h-48 mt-12 mt-4"
            />
            <h1 className="text-4xl font-extrabold text-white">
              <span className="text-primary-400">ID</span>entic
            </h1>

            <p className="text-sm lg:text-base xl:text-lg text-primary-300 max-w-2xl xl:max-w-4xl mx-auto mt-8 ">
              Layanan verifikasi kepemilikan KTP yang mencocokkan wajah pengguna
              dengan basis data kependudukan resmi untuk memastikan identitas
              asli secara cepat dan aman.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mt-10 mb-4 ">
            <BaseButton
              onClick={() => {
                router.push("/login");
              }}
              disabled={false}
              className="px-12 xl:px-14 py-2 xl:text-md"
            >
              Mulai
            </BaseButton>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3  gap-6 text-left">
            <ItemHilightBox
              icon="./images/ic_integrated.svg"
              title="Terintegrasi"
              description="Terhubung langsung dengan sistem Dukcapil untuk memverifikasi kecocokan wajah dengan data KTP secara akurat."
            />
            <ItemHilightBox
              icon="./images/ic_instant.svg"
              title="Instan"
              description="Proses verifikasi wajah dilakukan secara real-time dengan teknologi terkini, memberikan hasil yang cepat dan akurat."
            />
            <ItemHilightBox
              icon="./images/ic_shield.svg"
              title="Aman"
              description="Teknologi enkripsi modern melindungi data biometrik pengguna selama proses verifikasi, memastikan privasi dan keamanan data terjaga."
            />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full text-center text-xs font-semibold text-primary-300 pt-12 pb-4">
        Copyright © 2026 | MNC FINANCE. All Rights Reserved.
      </div>
    </div>
  );
}
