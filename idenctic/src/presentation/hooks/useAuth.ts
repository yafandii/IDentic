"use client";

import { useCallback } from "react";
import { useAppDispatch } from "@/infrastructure/redux/hooks";
import {
  loginSuccess,
  logout as logoutAction,
} from "../redux/slices/authSlice";
import { resetImageState } from "../redux/slices/verificationSlice";
import { loginUseCase, logoutUseCase } from "@/infrastructure/di/container";
import Cookies from "js-cookie";
import { clearHistories } from "../redux/slices/historySlice";

export function useAuth() {
  const dispatch = useAppDispatch();

  const login = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await loginUseCase.execute(email, password);

        dispatch(loginSuccess({ user: response.user, token: response.token }));
        dispatch(resetImageState());
        Cookies.set("auth_token", response.token, { expires: 1 });
        return { success: true, user: response.user };
      } catch (error) {
        return { success: false, error: "Login failed" };
      }
    },
    [dispatch],
  );

  const logout = useCallback(async () => {
    try {
      await logoutUseCase.execute();
      dispatch(logoutAction());
      dispatch(resetImageState());
      dispatch(clearHistories());
      Cookies.remove("auth_token");
      return { success: true };
    } catch (error) {
      return { success: false, error: "Logout failed" };
    }
  }, [dispatch]);

  return {
    login,
    logout,
  };
}
