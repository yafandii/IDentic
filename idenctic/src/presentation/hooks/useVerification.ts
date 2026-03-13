// Custom hook for image capture

"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/infrastructure/redux/hooks";
import {
  setCapturedImage,
  setLoading,
  setVerificationStatus,
  setLastError,
} from "../redux/slices/verificationSlice";
import { verifyFaceUseCase } from "@/infrastructure/di/container";
import { useAppSelector } from "@/infrastructure/redux/hooks";
import { VerificationEntity } from "@/domain/entities";

export function useVerification() {
  const dispatch = useAppDispatch();
  const { nik } = useAppSelector((state) => state.image);

  const verify = useCallback(
    async (
      imageData: string,
      logDate?: string,
    ): Promise<VerificationEntity> => {
      if (!nik) {
        return {
          isMatch: false,
          error: {
            errorCode: "NIK_EMPTY",
            errorMessage: "NIK Harus Diisi",
          },
        };
      }

      dispatch(setLoading(true));

      try {
        const result = await verifyFaceUseCase.execute(nik, imageData, logDate);

        dispatch(
          setCapturedImage({
            nik: nik,
            dataUrl: imageData,
            timestamp: Date.now(),
          }),
        );
        dispatch(setVerificationStatus(result));
        dispatch(setLastError(null));
        return result;
      } catch (error: any) {
        const errorMessage =
          error.response?.data?.message || "Verification failed";
        const result: VerificationEntity = {
          nik: nik,
          isMatch: false,
          score: 0,
          error: {
            errorCode: "VERIFICATION_FAILED",
            errorMessage: errorMessage,
          },
        };
        dispatch(setVerificationStatus(result));
        dispatch(setLastError(errorMessage));
        return {
          isMatch: false,
          error: {
            errorCode: "VERIFICATION_FAILED",
            errorMessage: errorMessage,
          },
        };
      } finally {
        dispatch(setLoading(false));
      }
    },
    [dispatch, nik],
  );

  return {
    verify,
  };
}
