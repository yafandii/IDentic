// DTOs (Data Transfer Objects)

export interface LoginDTO {
  nik: string;
  password: string;
}

export interface UserDTO {
  data: DataUSer;
  token: string;
}

export interface DataUSer {
  Nik: string;
  Nama: string;
}

export interface VerificationPayload {
  nik: string;
  imageBase64: string;
  logDate?: string;
}

export interface VerificationDTO {
  nik?: string;
  isMatch?: boolean;
  score?: number;
  path?: string;
  check_date?: string;
  error?: errorDTO;
}

export interface errorDTO {
  errorCode: string;
  errorMessage: string;
}

export interface HistoryDTO {
  data: DataHistory[];
  page: number;
  limit: number;
  totalPage: number;
}

export interface DataHistory {
  nik_target: string;
  match_score: number;
  path: string;
  message: string;
  created_date: Date;
}
