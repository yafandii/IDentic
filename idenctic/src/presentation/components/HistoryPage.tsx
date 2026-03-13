"use client";

import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback } from "react";
import { stopAllMediaStreams } from "../utils/camera-utils";
import { useAppDispatch, useAppSelector } from "@/infrastructure/redux/hooks";
import {
  resetImageState,
  setIsFromHistory,
} from "../redux/slices/verificationSlice";
import Image from "next/image";
import BaseButton from "./shared/base-button";
import IcTakePicture from "./shared/icons/ic_take_picture";
import ConfirmDialog from "./shared/ConfirmDialog";
import { useAuth } from "../hooks/useAuth";
import BaseTextInput from "./shared/base-text-input";
import IcSearch from "./shared/icons/ic_search";
import { setHistories, appendHistories } from "../redux/slices/historySlice";
import { setVerificationStatus } from "../redux/slices/verificationSlice";
import {
  historiesUseCase,
  searchHistoriesUseCase,
} from "@/infrastructure/di/container";
import IcRightArrow from "./shared/icons/ic_right_arrow";
import { useDebouncedCallback } from "use-debounce";
import { useInView } from "react-intersection-observer";
import { VerificationEntity } from "@/domain/entities";
import { formatDateWithTime } from "../utils/date-formatter";

export default function HistoryPage() {
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);
  const { histories, page, totalPage } = useAppSelector(
    (state) => state.histories,
  );
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { logout } = useAuth();
  const [ref, inView] = useInView();

  const fetchHistories = useCallback(
    async (pageArg: number, keyword: string, isLoadMore: boolean = false) => {
      setIsLoading(true);

      try {
        let response;
        if (keyword) {
          response = await searchHistoriesUseCase.execute(keyword, pageArg, 10);
        } else {
          response = await historiesUseCase.execute(pageArg, 10);
        }

        if (isLoadMore) {
          dispatch(appendHistories(response));
        } else {
          dispatch(setHistories(response));
        }
      } catch (error) {
        return;
      } finally {
        setIsLoading(false);
      }
    },
    [dispatch],
  );

  useEffect(() => {
    if (inView || page === 0) {
      fetchHistories(page + 1, search, page > 0);
    }
    stopAllMediaStreams();
    dispatch(resetImageState());
  }, [inView]);

  const handleSearch = useDebouncedCallback((keyword: string) => {
    fetchHistories(1, keyword);
  }, 500);

  return (
    <div className="min-h-screen bg-gradient-to-br from-myBg via-primary-800 to-primary-900 flex flex-col relative font-sans">
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
      <div className="bg-transparent px-6 py-6 z-10 sticky top-0 backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-white">Riwayat</h1>
        <p className="text-sm text-primary-300">Riwayat verifikasi wajah</p>

        <button
          onClick={() => setIsConfirmDialogOpen(true)}
          className="absolute top-6 right-4  text-white p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 active:bg-white/20 transition-colors"
        >
          <Image
            src="./images/ic_logout.svg"
            alt="Logout"
            width={24}
            height={24}
            className="w-6 h-6 "
          />
        </button>

        <BaseTextInput
          name="search"
          label=""
          placeholder="Cari riwayat"
          value={search}
          icon={<IcSearch size={32} color="#fff5" />}
          className=" text-xs mt-4"
          iconClassName="left-2 pl-5"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-3 pb-24">
        {histories && histories.length > 0 ? (
          histories.map((item) => (
            <div
              key={item.path}
              onClick={() => {
                const mappedResult: VerificationEntity = {
                  nik: item.nik,
                  isMatch: item.message.includes("Sukses"),
                  score: item.matchScore,
                  path: item.path,
                  checkDate: formatDateWithTime(item.createdDate),
                  error: {
                    errorCode: "",
                    errorMessage: item.message,
                  },
                };
                dispatch(setVerificationStatus(mappedResult));
                dispatch(setIsFromHistory(true));
                router.push("/result");
              }}
              className="bg-primary-800/50 backdrop-blur-md rounded-2xl p-4 flex items-center shadow-lg border border-primary-700 active:scale-[0.98] transition-transform cursor-pointer"
            >
              <div className="w-12 h-12 bg-primary-700/50 rounded-xl flex items-center justify-center mr-4 flex-shrink-0 relative overflow-hidden ring-1 ring-primary-600">
                <Image
                  src={`/api/${item.path}`}
                  alt="History"
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>

              <div className="flex-1">
                <h3 className="font-bold text-white text-sm">{item.nik}</h3>
                <p className="text-xs text-primary-300 mt-0.5">
                  {formatDateWithTime(item.createdDate)}
                </p>
              </div>

              <div className="flex items-center">
                <span
                  className={`text-[10px] font-semibold px-2 py-1 rounded-full mr-2 ${
                    item.message.includes("Sukses")
                      ? "text-green-300 bg-green-900/40 border border-green-800"
                      : "text-red-300 bg-red-900/40 border border-red-800"
                  }`}
                >
                  {item.message.includes("Sukses") ? "Cocok" : "Tidak Cocok"}
                </span>
                <IcRightArrow size={20} color="currentColor" />
              </div>
            </div>
          ))
        ) : (
          <div className=" absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center justify-center h-full">
            <Image
              src="/images/ic_empty.svg"
              alt="Empty"
              width={100}
              height={100}
              className="w-64"
            />
            <p className="text-xs text-primary-300 mt-4">Tidak ada data</p>
          </div>
        )}

        {page < totalPage && histories.length > 0 && (
          <div className="text-center py-4" ref={ref}>
            <p className="text-xs text-primary-300 animate-pulse">
              Memuat data...
            </p>
          </div>
        )}
      </div>

      <div className="fixed bottom-6 left-0 w-full flex justify-center px-4 z-20">
        <BaseButton
          children="Mulai Verifikasi"
          className="w-full max-w-sm h-12"
          icon={<IcTakePicture size={24} color="#0c4a6e" />}
          onClick={() => {
            dispatch(resetImageState());
            router.push("/camera");
          }}
        />
      </div>
      <ConfirmDialog
        isOpen={isConfirmDialogOpen}
        title="Logout"
        description="Are you sure you want to logout?"
        confirmText="Yes"
        cancelText="No"
        type="danger"
        onConfirm={async () => {
          await logout().then(() => {
            router.push("/login");
          });
        }}
        onCancel={() => setIsConfirmDialogOpen(false)}
      />
    </div>
  );
}
