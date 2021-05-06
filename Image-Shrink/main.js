const { app, BrowserWindow } = require("electron");

process.env.NODE_ENV = "development";

const isDev = process.env.NODE_ENV !== "production" ? true : false;
// console.log(process.platform);
const isMac = process.platform === "darwin" ? true : false;
const isWin = process.platform === "win32" ? true : false;

let mainWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "Image Shrink",
    width: 800,
    height: 600,
    icon: "./assets/icons/Icon_256x256.png",
    resizable: isDev ? true : false,
  });
  // mainWindow.loadURL("https://twitter.com");
  // mainWindow.loadURL(`file://${__dirname}/app/index.html`);
  mainWindow.loadFile("./app/index.html");
}

app.on("ready", createMainWindow);

app.on("window-all-closed", () => {
  if (!isMac) {
    app.quit();
  }
});
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createMainWindow();
  }
});
