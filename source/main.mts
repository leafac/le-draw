import electron from "electron";
import path from "node:path";

let tray: electron.Tray;
(async () => {
  await electron.app.whenReady();
  tray = new electron.Tray(path.join(import.meta.dirname, "./static/tray.png"));
  tray.setContextMenu(
    electron.Menu.buildFromTemplate([
      {
        label: "Show/hide drawing",
        accelerator: "Control+Option+Command+Space",
        enabled: false,
      },
      { label: "Colors", accelerator: "1", enabled: false },
      { label: "Clear drawing", accelerator: "Backspace", enabled: false },
      { type: "separator" },
      { role: "quit" },
    ]),
  );
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
