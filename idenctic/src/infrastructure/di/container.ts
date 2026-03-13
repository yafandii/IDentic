// Dependency Injection Container

import {
  AuthRepository,
  HistoriesRepository,
  VerificationRepository,
} from "@/data/repositories";
import {
  AuthDataSource,
  HistoriesDataSource,
  VerificationDataSource,
} from "@/data/data-sources";
import {
  HistoriesUseCase,
  LoginUseCase,
  LogoutUseCase,
  SearchHistoriesUseCase,
  VerifyFaceUseCase,
} from "@/domain/use-cases";

// Data Sources
const authDataSource = new AuthDataSource();
const historiesDataSource = new HistoriesDataSource();
const verificationDataSource = new VerificationDataSource();

// Repositories
const authRepository = new AuthRepository(authDataSource);
const historiesRepository = new HistoriesRepository(historiesDataSource);
const verificationRepository = new VerificationRepository(
  verificationDataSource,
);

// Use Cases
export const loginUseCase = new LoginUseCase(authRepository);
export const logoutUseCase = new LogoutUseCase(authRepository);
export const verifyFaceUseCase = new VerifyFaceUseCase(verificationRepository);
export const searchHistoriesUseCase = new SearchHistoriesUseCase(
  historiesRepository,
);
export const historiesUseCase = new HistoriesUseCase(historiesRepository);
