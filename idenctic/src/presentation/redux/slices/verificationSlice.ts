// Image Redux Slice

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CapturedImage, VerificationEntity } from "@/domain/entities";

interface VerificationState {
  capturedImage: CapturedImage | null;
  nik: string | null;
  isLoading: boolean;
  tempImage: string | null;
  verificationResult: VerificationEntity | null;
  lastError: string | null;
  isFromHistory: boolean;
  logDate: string | null;
}

const initialState: VerificationState = {
  capturedImage: null,
  nik: null,
  isLoading: false,
  tempImage: null,
  verificationResult: null,
  lastError: null,
  isFromHistory: false,
  logDate: null,
};

const imageSlice = createSlice({
  name: "image",
  initialState,
  reducers: {
    setCapturedImage: (state, action: PayloadAction<CapturedImage>) => {
      state.capturedImage = action.payload;
    },
    clearCapturedImage: (state) => {
      state.capturedImage = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setNIK: (state, action: PayloadAction<string>) => {
      state.nik = action.payload;
    },
    clearNik: (state) => {
      state.nik = null;
    },
    setTempImage: (state, action: PayloadAction<string | null>) => {
      state.tempImage = action.payload;
    },
    clearTempImage: (state) => {
      state.tempImage = null;
    },
    setVerificationStatus: (
      state,
      action: PayloadAction<VerificationEntity>,
    ) => {
      state.verificationResult = action.payload;
    },
    setLastError: (state, action: PayloadAction<string | null>) => {
      state.lastError = action.payload;
    },
    setIsFromHistory: (state, action: PayloadAction<boolean>) => {
      state.isFromHistory = action.payload;
    },
    resetImageState: (state) => {
      state.capturedImage = null;
      state.tempImage = null;
      state.verificationResult = null;
      state.lastError = null;
      state.nik = null;
      state.isLoading = false;
      state.logDate = null;
    },
    setLogDate: (state, action: PayloadAction<string | null>) => {
      state.logDate = action.payload;
    },
    clearLogDate: (state) => {
      state.logDate = null;
    },
  },
});

export const {
  setCapturedImage,
  clearCapturedImage,
  setLoading,
  setNIK,
  clearNik,
  setTempImage,
  clearTempImage,
  setVerificationStatus,
  setLastError,
  resetImageState,
  setIsFromHistory,
  setLogDate,
  clearLogDate,
} = imageSlice.actions;
export default imageSlice.reducer;
