import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "IDentic",
    short_name: "IDentic",
    description: "Verifikasi wajah dengan teknologi terkini",
    start_url: "/",
    scope: "/",
    display: "standalone",
    theme_color: "#000000",
    background_color: "#000000",
    icons: [
      {
        src: "/images/launcher192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/images/launcher512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
    screenshots: [
      {
        src: "/screenshots/mobile.png",
        sizes: "492x915",
        type: "image/png",
        platform: "ios",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/mobile.png",
        sizes: "492x915",
        type: "image/png",
        platform: "android",
        form_factor: "narrow",
      },
      {
        src: "/screenshots/desktop.png",
        sizes: "1918x946",
        type: "image/png",
        platform: "windows",
        form_factor: "wide",
      },
    ],
  };
}
