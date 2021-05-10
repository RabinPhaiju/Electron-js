const { BrowserWindow } = require("electron");

class AboutWindow extends BrowserWindow {
  constructor(file) {
    super({
      title: "About SysTop",
      width: 300,
      height: 300,
      opacity: 0.96,
      icon: "./app/icons/icon.png",
      resizable: false,
      backgroundColor: "white",
    });
    this.loadFile(file);
  }
}

module.exports = AboutWindow;
