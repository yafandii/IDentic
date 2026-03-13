// Repository Interfaces

import { HistoryEntity, UserEntity, VerificationEntity } from "../entities";

export interface IAuthRepository {
  login(nik: string, password: string): Promise<UserEntity>;
  logout(): Promise<void>;
}

export interface IVerificationRepository {
  verifyDukcapil(
    nik: string,
    imageBase64: string,
    logDate?: string,
  ): Promise<VerificationEntity>;
}

export interface IHistoriesRepository {
  histories(page: number, limit: number): Promise<HistoryEntity>;
  search(keyword: string, page: number, limit: number): Promise<HistoryEntity>;
}
