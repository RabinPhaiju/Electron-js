const { app, BrowserWindow } = require("electron");

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 800,
    height: 600,

    icon: "./assets/icons/Icon_256x256.png",
  });
  // mainWindow.loadURL("https://twitter.com");
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);
