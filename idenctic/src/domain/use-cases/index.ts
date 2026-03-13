// Use Case Interfaces

import { HistoryEntity, UserEntity, VerificationEntity } from "../entities";
import {
  IAuthRepository,
  IHistoriesRepository,
  IVerificationRepository,
} from "../repositories";

export interface ILoginUseCase {
  execute(email: string, password: string): Promise<UserEntity>;
}

export interface ILogoutUseCase {
  execute(): Promise<void>;
}

export interface IVerifyFaceUseCase {
  execute(
    nik: string,
    imageBase64: string,
    logDate?: string,
  ): Promise<VerificationEntity>;
}

export interface IHistoriesUseCase {
  execute(page: number, limit: number): Promise<HistoryEntity>;
}

export interface ISearchHistoriesUseCase {
  execute(keyword: string, page: number, limit: number): Promise<HistoryEntity>;
}

export class LoginUseCase implements ILoginUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(nik: string, password: string): Promise<UserEntity> {
    return this.authRepository.login(nik, password);
  }
}

export class LogoutUseCase implements ILogoutUseCase {
  constructor(private authRepository: IAuthRepository) {}

  async execute(): Promise<void> {
    return this.authRepository.logout();
  }
}

export class VerifyFaceUseCase implements IVerifyFaceUseCase {
  constructor(private verificationRepository: IVerificationRepository) {}

  async execute(
    nik: string,
    imageBase64: string,
    logDate?: string,
  ): Promise<VerificationEntity> {
    return this.verificationRepository.verifyDukcapil(
      nik,
      imageBase64,
      logDate,
    );
  }
}

export class HistoriesUseCase implements IHistoriesUseCase {
  constructor(private historiesRepository: IHistoriesRepository) {}

  async execute(page: number, limit: number): Promise<HistoryEntity> {
    return this.historiesRepository.histories(page, limit);
  }
}

export class SearchHistoriesUseCase implements ISearchHistoriesUseCase {
  constructor(private historiesRepository: IHistoriesRepository) {}

  async execute(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<HistoryEntity> {
    return this.historiesRepository.search(keyword, page, limit);
  }
}
