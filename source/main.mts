import electron from "electron";
import path from "node:path";

(async () => {
  await electron.app.whenReady();
  const browserWindow = new electron.BrowserWindow({
    transparent: true,
    hasShadow: false,
  });
  browserWindow.setSimpleFullScreen(true);
  browserWindow.setAlwaysOnTop(true);
  await browserWindow.loadFile(
    path.join(import.meta.dirname, "./static/index.html"),
  );
})();
