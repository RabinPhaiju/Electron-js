const { app, BrowserWindow } = require("electron");

function createMainWindow() {
  const mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 800,
    height: 600,
  });
}

app.on("ready", createMainWindow);
