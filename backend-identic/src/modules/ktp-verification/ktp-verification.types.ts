interface VerifyFaceRequest {
  user_id?: string;
  nik: string;
  imageBase64: string;
  device_info?: string;
  ip_address?: string;
  logDate?: string;
}

interface VerifyFaceResponse {
  nik: string;
  isMatch: boolean;
  score: number;
  path: string;
  check_date: string;
  error?: DukcapilError;
}

interface DukcapilRequest {
  transactionId: string;
  transactionSource: string;
  nik: string;
  threshold: number;
  image: string;
  template: string;
  type: string;
  position: string;
  customer_id: string;
  user_id: string;
  password: string;
  ip: string;
}

interface DukcapilResponse {
  error: DukcapilError;
  httpResponseCode: number;
  matchScore: number;
  transactionId: string;
  uid: string;
  verificationResult: boolean;
  quotaLimiter: string;
}

interface DukcapilError {
  errorCode: string;
  errorMessage: string;
}

interface LogToDB {
  user_id: string;
  nik_target: string;
  status: string;
  match_score: number;
  path: string;
  raw_response: string;
  message: string;
  ip_address: string;
  device_info: string;
  date: string;
  log_date?: string;
}

interface LoginRequest {
  nik: string;
  password: string;
}

interface LoginResponse {
  status: string;
  message: string;
  data?: Data;
  token?: string;
}

interface Data extends LoginResponse {
  Nik: string;
  Nama: string;
}

interface HistoryRequest {
  limit: number;
  page: number;
  keyword?: string;
  user_id: string;
}

interface HistoryResponse {
  status: string;
  message: string;
  data?: DataHistory[];
  page: number;
  limit: number;
  totalPage: number;
}

interface DataHistory {
  nik_target: string;
  match_score: string;
  path: string;
  message: string;
}

export {
  VerifyFaceRequest,
  VerifyFaceResponse,
  DukcapilRequest,
  LogToDB,
  LoginRequest,
  LoginResponse,
  Data,
  DukcapilResponse,
  HistoryResponse,
  HistoryRequest,
};
