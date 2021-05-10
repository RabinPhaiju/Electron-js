const { BrowserWindow } = require("electron");

class MainWindow extends BrowserWindow {
  constructor(file, isDev) {
    super({
      title: "Sys Top | Monitor your CPU",
      width: isDev ? 800 : 355,
      height: 500,
      icon: `./app/icons/icon.png`,
      resizable: isDev ? true : false,
      // when app open it will not show.
      // show: false,
      opacity: 0.96,

      // backgroundColor: "white",
      webPreferences: {
        nodeIntegration: true,
        contextIsolation: false,
      },
    });
    // this.loadURL("https://twitter.com");
    this.loadFile(file);

    if (isDev) {
      this.webContents.openDevTools();
    }
  }
}

module.exports = MainWindow;
