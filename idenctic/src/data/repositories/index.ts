// Repository Implementations

import {
  IAuthRepository,
  IHistoriesRepository,
  IVerificationRepository,
} from "@/domain/repositories";
import {
  AuthDataSource,
  HistoriesDataSource,
  VerificationDataSource,
} from "../data-sources";
import { HistoryDTO, UserDTO, VerificationDTO } from "../dto";
import {
  HistoryEntity,
  UserEntity,
  VerificationEntity,
} from "@/domain/entities";

export class AuthRepository implements IAuthRepository {
  constructor(private dataSource: AuthDataSource) {}

  async login(nik: string, password: string): Promise<UserEntity> {
    const dto = await this.dataSource.login({ nik, password });
    return this.toUser(dto);
  }

  async logout(): Promise<void> {
    return this.dataSource.logout();
  }

  private toUser(dto: UserDTO): UserEntity {
    return {
      token: dto.token,
      user: {
        nik: dto.data.Nik,
        name: dto.data.Nama,
      },
    };
  }
}

export class VerificationRepository implements IVerificationRepository {
  constructor(private dataSource: VerificationDataSource) {}

  async verifyDukcapil(
    nik: string,
    imageBase64: string,
    logDate?: string,
  ): Promise<VerificationEntity> {
    const dto = await this.dataSource.verifyFace({ nik, imageBase64, logDate });
    return this.toVerification(dto);
  }

  private toVerification(dto: VerificationDTO): VerificationEntity {
    return {
      nik: dto.nik,
      isMatch: dto.isMatch,
      score: dto.score,
      path: dto.path,
      checkDate: dto.check_date,
      error: dto.error,
    };
  }
}

export class HistoriesRepository implements IHistoriesRepository {
  constructor(private dataSource: HistoriesDataSource) {}

  async histories(page: number, limit: number): Promise<HistoryEntity> {
    const dto = await this.dataSource.histories(page, limit);

    return this.toHistory(dto);
  }

  async search(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<HistoryEntity> {
    const dto = await this.dataSource.searchHistory(keyword, page, limit);
    return this.toHistory(dto);
  }

  private toHistory(dto: HistoryDTO): HistoryEntity {
    return {
      data: dto.data.map((item) => ({
        nik: item.nik_target,
        matchScore: item.match_score,
        path: item.path,
        message: item.message,
        createdDate: item.created_date,
      })),
      page: dto.page,
      limit: dto.limit,
      totalPage: dto.totalPage,
    };
  }
}
