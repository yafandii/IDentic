import { IncomingHttpHeaders } from "http";
import { UAParser } from "ua-parser-js";

export const DeviceInfo = (headers: IncomingHttpHeaders): string => {
  let finalDeviceInfo: string;
  const headerDeviceInfo = headers["x-device-info"] as string | undefined; // Assuming x-device-info header might exist

  if (headerDeviceInfo) {
    finalDeviceInfo = headerDeviceInfo;
  } else {
    const parser = new UAParser(headers["user-agent"]);
    const browser = parser.getBrowser();
    const os = parser.getOS();
    const device = parser.getDevice();

    const browserStr = `${browser.name || ""} ${browser.version || ""}`.trim();
    const osStr = `${os.name || ""} ${os.version || ""}`.trim();
    const deviceStr = `${device.vendor || ""} ${device.model || ""}`.trim();

    finalDeviceInfo =
      `${browserStr} on ${osStr}${deviceStr ? " - " + deviceStr : ""}`.trim();

    if (!finalDeviceInfo || finalDeviceInfo === "on") {
      finalDeviceInfo = "Unknown Device";
    }
  }
  return finalDeviceInfo;
};
