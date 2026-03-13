import { Request, Response } from "express";
import path from "path";
import fs from "fs";
import TypedRequest from "../../shared/types/express";
import {
  getHistory,
  login,
  verifyFaceService,
} from "./ktp-verification.service";
import {
  HistoryRequest,
  LoginRequest,
  VerifyFaceRequest,
} from "./ktp-verification.types";
import jwt from "jsonwebtoken";
import { DeviceInfo } from "../../shared/utils/device-info";

export const verifyFaceController = async (
  req: TypedRequest<VerifyFaceRequest>,
  res: Response,
) => {
  req.body.device_info = DeviceInfo(req.headers);

  const ip =
    (req.headers["x-forwarded-for"] as string) ||
    req.socket.remoteAddress ||
    req.ip ||
    "";
  req.body.ip_address = ip.replace("::ffff:", "");

  const result = await verifyFaceService(req.body);

  setTimeout(() => {
    return res.status(200).json(result);
  }, 2000);
};

export const loginController = async (
  req: TypedRequest<LoginRequest>,
  res: Response,
) => {
  const result = await login(req.body);

  if (Number(result.status) !== 200) {
    return res.status(403).json(result);
  }

  const token = jwt.sign(result.data ?? {}, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });
  const newData = {
    ...result,
    token,
  };

  return res.status(200).json(newData);
};

export const getFileController = async (req: Request, res: Response) => {
  const { userId, filename } = req.params;

  const filePath = path.join(
    process.cwd(),
    "uploads",
    "verification",
    userId as string,
    filename as string,
  );

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({
      status: 404,
      message: "File not found",
    });
  }

  return res.sendFile(filePath);
};

export const getHistoryController = async (
  req: TypedRequest<HistoryRequest>,
  res: Response,
) => {
  const result = await getHistory(req.body);

  return res.status(200).json(result);
};
