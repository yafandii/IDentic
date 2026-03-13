import { Router } from "express";
import {
  loginController,
  verifyFaceController,
  getFileController,
  getHistoryController,
} from "../modules/ktp-verification/ktp-varification.controller";
import "../modules/ktp-verification/ktp-verification.types";
import accessValidation from "../middleware/auth-middleware";

const router = Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     DukcapilError:
 *       type: object
 *       properties:
 *         errorCode:
 *           type: number
 *           example: 1
 *         errorMessage:
 *           type: string
 *           example: "Error message"
 *     DukcapilBaseResponse:
 *       type: object
 *       properties:
 *         error:
 *           type: object
 *           properties:
 *             errorCode:
 *               type: number
 *               example: 1
 *             errorMessage:
 *               type: string
 *               example: "Error message"
 *         httpResponseCode:
 *           type: string
 *           example: "1"
 *         transactionId:
 *           type: string
 *           example: "1"
 *         uid:
 *           type: string
 *           example: "1"
 *         quotaLimiter:
 *           type: string
 *           example: "1"
 *     DukcapilFaceVerifyResponse:
 *       type: object
 *       properties:
 *         matchScore:
 *           type: string
 *           example: "1"
 *         verificationResult:
 *           type: string
 *           example: "1"
 *     FaceVerificationError:
 *       type: object
 *       properties:
 *         code:
 *           type: number
 *           example: 1
 *         message:
 *           type: string
 *           example: "Error message"
 *     FaceVerificationResult:
 *       type: object
 *       properties:
 *         isMatch:
 *           type: boolean
 *           example: true
 *         score:
 *           type: number
 *           example: 1
 *     FaceVerificationRequest:
 *       type: object
 *       properties:
 *         transactionId:
 *           type: string
 *           example: "1"
 *         transactionSource:
 *           type: string
 *           example: "1"
 *         nik:
 *           type: string
 *           example: "1"
 *         threshold:
 *           type: string
 *           example: "1"
 *         image:
 *           type: string
 *           example: "1"
 *         template:
 *           type: string
 *           example: "1"
 *         type:
 *           type: string
 *           example: "1"
 *         position:
 *           type: string
 *           example: "1"
 *         customerId:
 *           type: string
 *           example: "1"
 *         userId:
 *           type: string
 *           example: "1"
 *         password:
 *           type: string
 *           example: "1"
 *         ip:
 *           type: string
 *           example: "1"
 *     LoginRequest:
 *       type: object
 *       properties:
 *         nik:
 *           type: string
 *           example: "SVYDEV"
 *         password:
 *           type: string
 *           example: "SVYDEV"
 *     LoginResponse:
 *       type: object
 *       properties:
 *         status:
 *           type: string
 *           example: "1"
 *         message:
 *           type: string
 *           example: "1"
 *         data:
 *           type: object
 *           properties:
 *             Nik:
 *               type: string
 *               example: "1"
 *             Nama:
 *               type: string
 *               example: "1"
 *         token:
 *           type: string
 *           example: "1"
 *     Data:
 *       type: object
 *       properties:
 *         Nik:
 *           type: string
 *           example: "1"
 *         Nama:
 *           type: string
 *           example: "1"
 */

/**
 * @openapi
 * /ktp-verification:
 *   post:
 *     summary: Verify face
 *     description: Verify face
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/FaceVerificationRequest'
 *     responses:
 *       200:
 *         description: Face verified successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FaceVerificationResult'
 */
router.post("/verify-face", accessValidation, verifyFaceController);
/**
 * @openapi
 * /login:
 *   post:
 *     summary: Login
 *     description: Login
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: Login successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/LoginResponse'
 */
router.post("/login", loginController);

/**
 * @openapi
 * /uploads/{userId}/{filename}:
 *   get:
 *     summary: Get uploaded image
 *     description: Get uploaded image (requires authentication)
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: filename
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Image file
 *       404:
 *         description: File not found
 */
router.get("/uploads/:userId/:filename", getFileController);

/**
 * @openapi
 * /history:
 *   post:
 *     summary: Get history
 *     description: Get history
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HistoryRequest'
 *     responses:
 *       200:
 *         description: History retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/HistoryResponse'
 */
router.post("/history", accessValidation, getHistoryController);

export default router;
