import Image from "next/image";
import IcRetake from "./icons/ic_retake";
import IcConfirm from "./icons/ic_confirm";

type PreviewImageProps = {
  image: string;
  onRetake: () => void;
  onConfirm: () => void;
  isLoading?: boolean;
};

export default function PreviewImage({
  image,
  onRetake,
  onConfirm,
  isLoading = false,
}: PreviewImageProps) {
  return (
    <div className="absolute inset-0 z-50 bg-black flex flex-col">
      <Image
        src={image}
        alt="Taken photo"
        className={`w-full h-full object-cover`}
        width={0}
        height={0}
      />
      <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent flex justify-between items-end pb-10">
        <button
          onClick={onRetake}
          disabled={isLoading}
          className={`text-white font-semibold flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full ${isLoading ? "opacity-50" : ""}`}
        >
          <IcRetake />
          Retake
        </button>
        <button
          onClick={onConfirm}
          disabled={isLoading}
          className={`text-white font-semibold flex items-center gap-2 bg-primary-900 px-6 py-2 rounded-full shadow-lg ${isLoading ? "opacity-50" : ""}`}
        >
          {isLoading ? "Verifying..." : "Confirm"}
          {!isLoading && <IcConfirm />}
        </button>
      </div>
    </div>
  );
}
