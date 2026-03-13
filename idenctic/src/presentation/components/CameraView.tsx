"use client";
import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { Camera, CameraType } from "react-camera-pro";
import { useRouter } from "next/navigation";
import PreviewImage from "./shared/preview-image";
import IcTakePicture from "./shared/icons/ic_take_picture";
import AgreementDialog from "./shared/AgreementDialog";
import IcBack from "./shared/icons/ic_back";
import { useVerification } from "../hooks/useVerification";
import LoadingAnimation from "./shared/loading_animation";
import { useAppSelector, useAppDispatch } from "@/infrastructure/redux/hooks";
import {
  setTempImage,
  clearNik,
  setIsFromHistory,
  setLogDate,
} from "../redux/slices/verificationSlice";

import { stopAllMediaStreams } from "../utils/camera-utils";
import ErrorDialog from "./shared/ErrorDialog";

export default function CameraView() {
  const camera = useRef<CameraType | null>(null);
  const {
    tempImage: image,
    isLoading: isVerifying,
    logDate,
  } = useAppSelector((state) => state.image);
  const dispatch = useAppDispatch();
  const [numberOfCameras, setNumberOfCameras] = useState(0);
  const [isFront, setIsFront] = useState(true);
  const router = useRouter();
  const { verify } = useVerification();
  const [error, setError] = useState("");
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [isStopping, setIsStopping] = useState(false);
  const [isAgreementOpen, setIsAgreementOpen] = useState(false);

  const [isChecked, setIsChecked] = useState(false);
  const [isErrorDialogOpen, setIsErrorDialogOpen] = useState(false);
  const [errorDetails, setErrorDetails] = useState({
    title: "",
    message: "",
  });

  const setImage = (img: string | null) => {
    dispatch(setTempImage(img));
    if (img === null) {
      setError("");
    }
  };

  const handleConfirm = async () => {
    if (!image) return;

    setError("");

    setIsStopping(true);

    const result = await verify(image, logDate ?? "");

    if (result.isMatch) {
      await stopAllMediaStreams();
      dispatch(setIsFromHistory(false));
      router.push("/result");
    } else {
      setIsStopping(false);
      setErrorDetails({
        title: "Error : " + result.error?.errorCode,
        message:
          result.error?.errorMessage || "Terjadi kesalahan saat memproses foto",
      });
      setIsErrorDialogOpen(true);
    }
  };

  useEffect(() => {
    if (!logDate) {
      setIsAgreementOpen(true);
    }
    if (isVerifying && image) {
      handleConfirm();
    }
  }, []);

  const gridView = (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none pb-24">
      <div className="relative w-[75%] aspect-[3/4]">
        <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-white rounded-tl-xl" />
        <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-white rounded-tr-xl" />
        <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-white rounded-bl-xl" />
        <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-white rounded-br-xl" />

        <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
          <div className="border-r border-b border-white/30 border-dashed" />
          <div className="border-b border-white/30 border-dashed" />
          <div className="border-r border-white/30 border-dashed" />
          <div />
        </div>
      </div>
    </div>
  );

  return (
    <div className="h-[100dvh] w-full bg-black flex flex-col relative overflow-hidden font-sans">
      <div
        className={`absolute inset-0 z-0 ${image ? "opacity-0 pointer-events-none" : "opacity-100"}`}
      >
        {isCameraActive && (
          <Camera
            errorMessages={{
              canvas: "Canvas not found",
              noCameraAccessible: "No camera accessible",
              permissionDenied: "Permission denied",
              switchCamera: "Switch camera",
            }}
            numberOfCamerasCallback={setNumberOfCameras}
            ref={camera}
            key={isFront ? "front" : "back"}
            facingMode={isFront ? "user" : "environment"}
            aspectRatio="cover"
          />
        )}
      </div>

      {image ? (
        <PreviewImage
          image={image}
          onRetake={() => {
            setImage(null);
            dispatch(setLogDate(null));

            setIsAgreementOpen(true);
            setIsCameraActive(true);
          }}
          onConfirm={handleConfirm}
          isLoading={isVerifying || isStopping}
        />
      ) : (
        <>
          <div className="relative w-full z-20 p-4 pt-6 bg-gradient-to-b from-black/60 to-transparent">
            <button
              onClick={async () => {
                await stopAllMediaStreams();
                setIsCameraActive(false);
                setTimeout(() => {
                  dispatch(clearNik());
                }, 100);
                router.push("/");
              }}
              className="text-white p-2 rounded-full active:bg-white/10  backdrop-blur-md border border-white/20 "
            >
              <IcBack size={24} color="white" />
            </button>
          </div>

          {gridView}

          {error && (
            <div className="absolute top-24 left-0 w-full flex justify-center z-30 px-6">
              <div className="bg-red-500 text-white px-4 py-3 rounded-2xl shadow-xl flex items-center gap-3 border border-red-400 animate-in slide-in-from-top-4 duration-300">
                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center">
                  <span className="font-bold text-xs">!</span>
                </div>
                <p className="text-sm font-medium">{error}</p>
              </div>
            </div>
          )}

          <div className="absolute bottom-0 left-0 w-full z-20 flex flex-col items-center justify-end pb-8 px-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent pt-16">
            <div className="flex items-center justify-between w-full max-w-sm px-4">
              <div className="w-12 h-12 bg-transparent  rounded-xl overflow-hidden  "></div>

              <button
                className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-md border-4 border-white flex items-center justify-center relative group active:scale-95 transition-transform"
                onClick={async () => {
                  const photo = camera.current?.takePhoto?.(
                    "base64url",
                  ) as string;
                  if (!photo) {
                    setImage(null);
                    return;
                  }

                  if (isFront) {
                    const img = document.createElement("img");
                    img.src = photo;
                    img.onload = async () => {
                      const canvas = document.createElement("canvas");
                      canvas.width = img.width;
                      canvas.height = img.height;
                      const ctx = canvas.getContext("2d");
                      if (ctx) {
                        ctx.translate(canvas.width, 0);
                        ctx.scale(-1, 1);
                        ctx.drawImage(img, 0, 0);
                        await stopAllMediaStreams();
                        setTimeout(() => {
                          setImage(canvas.toDataURL("image/jpeg"));
                          setIsCameraActive(false);
                        }, 50);
                      }
                    };
                  } else {
                    await stopAllMediaStreams();
                    setTimeout(() => {
                      setImage(photo);
                      setIsCameraActive(false);
                    }, 50);
                  }
                }}
              >
                <IcTakePicture size={48} color="white" />
              </button>

              <div className="w-12 h-12 flex items-center justify-center">
                {numberOfCameras > 1 && (
                  <button
                    className="p-3 bg-white/10 backdrop-blur-md rounded-full border border-white/20 active:bg-white/20 transition-colors"
                    onClick={() => {
                      setIsFront(!isFront);
                    }}
                  >
                    <Image
                      src="./images/ic_switch_camera.svg"
                      alt="Switch Camera"
                      width={24}
                      height={24}
                      className="w-6 h-6 "
                    />
                  </button>
                )}
              </div>
            </div>
          </div>
        </>
      )}

      <LoadingAnimation isOpen={isVerifying || isStopping} />

      <ErrorDialog
        isOpen={isErrorDialogOpen}
        title={errorDetails.title}
        description={errorDetails.message}
        onClick={() => {
          setIsErrorDialogOpen(false);
          router.push("/");
        }}
      />

      <AgreementDialog
        isOpen={isAgreementOpen}
        onClose={() => router.back()}
        setIsChecked={() => setIsChecked(!isChecked)}
        isChecked={isChecked}
        onAgree={() => {
          dispatch(setLogDate(new Date().toISOString()));
          setIsAgreementOpen(false);
          setIsChecked(false);
          setIsCameraActive(true);
        }}
      />
    </div>
  );
}
