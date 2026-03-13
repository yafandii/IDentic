import jwt from "jsonwebtoken";
import { Response } from "express";
// import { encryptedResponse } from "../utils/response";

const accessValidation = (req: any, res: Response, next: any) => {
  const { authorization } = req.headers;

  if (!authorization) {
    // return encryptedResponse(
    //   401,
    //   JSON.stringify({ message: "Access Denied" }),
    //   res
    // );

    return res.status(401).json({
      status: 401,
      message: "Access Denied",
    });
  }

  const token = authorization.split(" ")[1];

  try {
    const result = jwt.verify(token, process.env.JWT_SECRET!);

    req.user = result;
    req.body.user_id = req.user.Nik;
  } catch (error) {
    // return encryptedResponse(
    //   401,
    //   JSON.stringify({ message: "Access Denied" }),
    //   res,
    // );
    return res.status(401).json({
      status: 401,
      message: "Access Denied",
    });
  }

  next();
};

export default accessValidation;
