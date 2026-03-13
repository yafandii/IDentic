import fs from "fs";
import path from "path";

/**
 * Save a base64 encoded image to a user-specific folder
 * @param base64String The base64 image data
 * @param userId The ID of the user for folder organization
 * @returns The relative path to the saved file
 */
export const saveBase64Image = (
  base64String: string,
  userId: string,
): string => {
  try {
    if (!base64String) {
      throw new Error("Base64 string is required");
    }

    // 1. Resolve storage path: root/uploads/verification/[userId]
    const rootDir = process.cwd();
    const uploadDir = path.join(rootDir, "uploads", "verification", userId);

    // 2. Create directory if not exists
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    let imageData = base64String;
    let extension = "jpg";

    const matches = imageData.match(
      /^data:image\/([A-Za-z-+\/]+);base64,(.+)$/,
    );

    if (matches && matches.length === 3) {
      extension = matches[1];
      imageData = matches[2];
    }

    const fileName = `img_${Date.now()}.${extension}`;
    const filePath = path.join(uploadDir, fileName);

    // 4. Save file
    fs.writeFileSync(filePath, imageData, "base64");

    // Return relative path with forward slashes for database consistency
    return `uploads/${userId}/${fileName}`;
  } catch (error) {
    console.error("Error saving image:", error);
    throw new Error("Failed to save verification image");
  }
};
