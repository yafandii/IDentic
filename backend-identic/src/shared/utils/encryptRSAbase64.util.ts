import fs from "fs";
import path from "path";
import { publicEncrypt, constants } from "crypto";

const getPublicKey = (): string => {
  try {
    const certPath = path.resolve(
      __dirname,
      "../../assets/certs/990040921020245.pem",
    );

    if (!fs.existsSync(certPath)) {
      throw new Error(`Certificate file not found at: ${certPath}`);
    }

    return fs.readFileSync(certPath, "utf8");
  } catch (error) {
    console.error("Error reading public key:", error);
    throw error;
  }
};

export const encryptRSA = (data: string): string => {
  const publicKey = getPublicKey();

  try {
    const encryptedBuffer = publicEncrypt(
      {
        key: publicKey,
        padding: constants.RSA_PKCS1_PADDING,
      },
      Buffer.from(data),
    );

    return encryptedBuffer.toString("base64");
  } catch (error) {
    console.error("Error encrypting data:", error);
    throw error;
  }
};
