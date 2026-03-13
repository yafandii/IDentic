import { VerifyFaceResponse } from "../../modules/ktp-verification/ktp-verification.types";
import { formatDate } from "./date-formatter";

export const MOCK_RESPONSES = {
  SUCCESS_HIGH_SCORE: {
    isMatch: true,
    errorCode: "6018",
    errorMessage: "Sukses",
    minScore: 5,
    maxScore: 10,
  },
  FAILED_LOW_SCORE: {
    isMatch: false,
    errorCode: "6019",
    errorMessage: "Foto Tidak Sesuai",
    minScore: 0,
    maxScore: 4,
  },
  ERROR_FACE_NOT_FOUND: {
    isMatch: false,
    errorCode: "6019",
    errorMessage: "NIK Tidak Ditemukan",
    score: 0,
  },
};

export const getMockDukcapilResponse = (nik: string): VerifyFaceResponse => {
  const random = Math.random();
  let responseTemplate;
  let score = 0;

  if (random < 0.6) {
    responseTemplate = MOCK_RESPONSES.SUCCESS_HIGH_SCORE;
    score =
      Number(Math.random().toFixed(4)) *
        (responseTemplate.maxScore - responseTemplate.minScore + 1) +
      responseTemplate.minScore;
  } else if (random < 0.9) {
    responseTemplate = MOCK_RESPONSES.FAILED_LOW_SCORE;

    score =
      Number(Math.random().toFixed(4)) *
        (responseTemplate.maxScore - responseTemplate.minScore + 1) +
      responseTemplate.minScore;
  } else {
    responseTemplate = MOCK_RESPONSES.ERROR_FACE_NOT_FOUND;
    score = responseTemplate.score;
  }

  return {
    nik,
    isMatch: responseTemplate.isMatch,
    score,
    path: "",
    check_date: formatDate(new Date()),
    error: {
      errorCode: responseTemplate.errorCode,
      errorMessage: responseTemplate.errorMessage,
    },
  };
};
