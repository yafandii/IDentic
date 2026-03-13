/**
 * Utility to stop all active media streams in the document.
 * Includes a "Nuclear" option to force hardware release on stubborn browsers.
 */
export const stopAllMediaStreams = async () => {
  if (typeof window === "undefined") return;

  try {
    // 1. Scan and stop all video elements
    const videos = Array.from(document.querySelectorAll("video"));

    videos.forEach((video) => {
      // Pause and clear srcObject
      video.pause();
      const stream = (video as HTMLVideoElement).srcObject as MediaStream;
      if (stream && stream.getTracks) {
        stream.getTracks().forEach((track) => {
          track.stop();
          track.enabled = false;
        });
      }
      video.srcObject = null;
      video.src = "";
      video.removeAttribute("src");
      video.load(); // Force reset
    });

    // 2. Nuclear Option: Briefly acquire and kill a new stream.
    // This forces many browsers/OSs to reach a 'clean' state.
    try {
      const hackStream = await navigator.mediaDevices.getUserMedia({
        video: { width: 1, height: 1 },
      });
      hackStream.getTracks().forEach((track) => {
        track.stop();
        track.enabled = false;
      });
    } catch (e) {
      // Silently ignore if camera is already blocked or permission denied
    }
  } catch (error) {
    console.warn("[CameraUtils] Error during nuclear cleanup:", error);
  }
};
