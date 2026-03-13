// Data Sources

import {
  HistoryDTO,
  LoginDTO,
  UserDTO,
  VerificationDTO,
  VerificationPayload,
} from "../dto";
import apiClient from "@/infrastructure/http/apiClient";

export class AuthDataSource {
  async login(dto: LoginDTO): Promise<UserDTO> {
    const response = await apiClient.post("login", dto);
    return response.data;
  }

  async logout(): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 200));
  }

  async getCurrentUser(): Promise<UserDTO | null> {
    return null;
  }
}

export class VerificationDataSource {
  async verifyFace(payload: VerificationPayload): Promise<VerificationDTO> {
    const response = await apiClient.post("verify-face", payload);
    return response.data;
  }
}

export class HistoriesDataSource {
  async histories(page: number, limit: number): Promise<HistoryDTO> {
    const response = await apiClient.post("history", { page, limit });
    return response.data;
  }

  async searchHistory(
    keyword: string,
    page: number,
    limit: number,
  ): Promise<HistoryDTO> {
    const response = await apiClient.post("history", { keyword, page, limit });

    return response.data;
  }
}
