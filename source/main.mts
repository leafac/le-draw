import electron from "electron";
import path from "node:path";

(async () => {
  await electron.app.whenReady();
  const tray = new electron.Tray(
    path.join(import.meta.dirname, "./static/tray.png"),
  );
  tray.addListener("click", () => {
    browserWindow.show();
  });
  const browserWindow = new electron.BrowserWindow({
    transparent: true,
    hasShadow: false,
    show: false,
  });
  browserWindow.setSimpleFullScreen(true);
  browserWindow.setVisibleOnAllWorkspaces(true, { visibleOnFullScreen: true });
  browserWindow.setAlwaysOnTop(true, "screen-saver", 1);
  await browserWindow.loadFile(
    path.join(import.meta.dirname, "./static/index.html"),
  );
  electron.globalShortcut.register("Control+Option+Command+Space", () => {
    if (browserWindow.isVisible()) browserWindow.hide();
    else browserWindow.show();
  });
})();
