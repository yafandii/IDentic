import { saveBase64Image } from "../../shared/utils/file-storage";
import { getMockDukcapilResponse } from "../../shared/utils/mock-response";
import { mncfClient } from "../../shared/http/mfin.client";

import {
  DukcapilRequest,
  DukcapilResponse,
  HistoryRequest,
  HistoryResponse,
  LogToDB,
  LoginRequest,
  LoginResponse,
  VerifyFaceRequest,
  VerifyFaceResponse,
} from "./ktp-verification.types";
import { encryptRSA } from "../../shared/utils/encryptRSAbase64.util";
import { DbHelper } from "../../shared/database/db-helper";
import { formatDate } from "../../shared/utils/date-formatter";
import { dukcapilClient } from "../../shared/http/dukcapil.client";

export const verifyFaceService = async (
  payload: VerifyFaceRequest,
): Promise<VerifyFaceResponse> => {
  if (payload.imageBase64 && payload.imageBase64.includes("base64,")) {
    payload.imageBase64 = payload.imageBase64.split("base64,")[1];
  }

  const data: DukcapilRequest = {
    transactionId: "",
    transactionSource: " ",
    nik: "",
    threshold: 0,
    image: payload.imageBase64,
    template: "",
    type: "",
    position: "",
    customer_id: "",
    user_id: "",
    password: "",
    ip: process.env.IP_FR!,
  };

  if (process.env.MOCK_DUKCAPIL === "true") {
    return getMockDukcapilResponse(payload.nik);
  } else {
    const verifyDukcapil = await dukcapilClient.post<DukcapilResponse>(
      process.env.URL_FACE_RECOGNITION!,
      data,
    );

    if (
      verifyDukcapil.status === 200 &&
      verifyDukcapil.data.error.errorCode !== "5002"
    ) {
      const imagePath = saveBase64Image(
        payload.imageBase64,
        payload.user_id || "",
      );
      const logData: LogToDB = {
        user_id: payload.user_id || "",
        nik_target: payload.nik,
        status: verifyDukcapil.data.error.errorCode,
        match_score: verifyDukcapil.data.matchScore,
        path: imagePath,
        raw_response: JSON.stringify(verifyDukcapil.data),
        message: verifyDukcapil.data.error.errorMessage,
        ip_address: payload.ip_address || "",
        device_info: payload.device_info || "",
        date: formatDate(new Date()),
        log_date: payload.logDate,
      };

      await DbHelper.execute("INSERT_LOG_FR", logData);
      const response: VerifyFaceResponse = {
        nik: payload.nik,
        isMatch: verifyDukcapil.data.verificationResult, //'FROM_DUKCAPIL => Verification_Result',
        score: verifyDukcapil.data.matchScore,
        path: imagePath,
        check_date: logData.date,
        error: {
          errorCode: verifyDukcapil.data.error.errorCode,
          errorMessage: verifyDukcapil.data.error.errorMessage,
        },
      };
      return response;
    } else {
      const response: VerifyFaceResponse = {
        nik: payload.nik,
        isMatch: verifyDukcapil.data.verificationResult, //'FROM_DUKCAPIL => Verification_Result',
        score: verifyDukcapil.data.matchScore,
        path: "",
        check_date: formatDate(new Date()),
        error: {
          errorCode:
            verifyDukcapil.data.error.errorCode ?? "Verification Failed",
          errorMessage:
            verifyDukcapil.data.error.errorMessage ?? "Verification Failed",
        },
      };
      return response;
    }
  }
};

export const login = async (payload: LoginRequest): Promise<LoginResponse> => {
  const response = await mncfClient.post<LoginResponse>(
    "ms-api/auth/login",
    payload,
  );

  if (Number(response.status) === 404) {
    return {
      status: response.status.toString(),
      message: "User not found",
    };
  } else {
    return response.data;
  }
};

export const getHistory = async (
  payload: HistoryRequest,
): Promise<HistoryResponse> => {
  const result = await DbHelper.execute("GET_HISTORY_FR", {
    userId: payload.user_id,
    limit: payload.limit,
    page: payload.page,
    keyword: payload.keyword,
  });

  if (result.length === 0) {
    return {
      status: "200",
      message: "Success",
      data: [],
      page: payload.page,
      limit: payload.limit,
      totalPage: 0,
    };
  }

  const totalData = await DbHelper.query(
    `SELECT COUNT(*) as total FROM db`
        : ""
    }`,
    {
      user_id: payload.user_id,
      keyword: `%${payload.keyword}%`,
    },
  );

  const totalPage = Math.ceil(totalData[0].total / payload.limit);

  const response: HistoryResponse = {
    status: "200",
    message: "Success",
    data: result,
    page: payload.page,
    limit: payload.limit,
    totalPage: totalPage,
  };

  return response;
};
