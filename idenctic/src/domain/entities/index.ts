// Domain Entities

export interface UserEntity {
  token: string;
  user: User;
}

export interface User {
  nik: string;
  name: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserEntity | null;
  token: string | null;
}

export interface CapturedImage {
  nik: string;
  dataUrl: string;
  timestamp: number;
}

export interface HistoryEntity {
  data: DataHistory[];
  page: number;
  limit: number;
  totalPage: number;
}

export interface DataHistory {
  nik: string;
  matchScore: number;
  path: string;
  message: string;
  createdDate: Date;
}

export interface VerificationEntity {
  nik?: string;
  isMatch?: boolean;
  score?: number;
  path?: string;
  checkDate?: string;
  error?: errorDTO;
}

export interface errorDTO {
  errorCode: string;
  errorMessage: string;
}
