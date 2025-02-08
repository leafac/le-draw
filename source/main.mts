import electron from "electron";

(async () => {
  await electron.app.whenReady();

  new electron.BrowserWindow({ width: 800, height: 600 }).loadFile(
    "./static/index.html",
  );
})();
