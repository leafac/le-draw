import electron from "electron";
import path from "node:path";

(async () => {
  await electron.app.whenReady();
  const browserWindow = new electron.BrowserWindow({
    transparent: true,
    hasShadow: false,
    show: false,
  });
  browserWindow.setSimpleFullScreen(true);
  browserWindow.setAlwaysOnTop(true);
  await browserWindow.loadFile(
    path.join(import.meta.dirname, "./static/index.html"),
  );
  electron.globalShortcut.register("Control+Option+Command+Space", () => {
    if (browserWindow.isVisible()) browserWindow.hide();
    else browserWindow.show();
  });
})();
