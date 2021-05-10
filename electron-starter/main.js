const path = require("path");
const os = require("os");
const { app, BrowserWindow, Menu, ipcMain, shell } = require("electron");
const log = require("electron-log");

// Set env
process.env.NODE_ENV = "development";

const isMac = process.platform === "darwin" ? true : false;
const isWin = process.platform === "win32" ? true : false;
const isDev = process.env.NODE_ENV !== "production" ? true : false;

let mainWindow;
let aboutWindow;

function createMainWindow() {
  mainWindow = new BrowserWindow({
    title: "YOUR APP NAME",
    width: isDev ? 800 : 500,
    height: 600,
    icon: `./app/icons/icon.png`,
    resizable: isDev ? true : false,
    backgroundColor: "white",
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    },
  });

  if (isDev) {
    mainWindow.webContents.openDevTools();
  }

  // mainWindow.loadURL("https://twitter.com");
  mainWindow.loadFile("./app/index.html");
}

// About page
function createAboutWindow() {
  aboutWindow = new BrowserWindow({
    title: "About YOUR APP NAME",
    width: 300,
    height: 300,
    icon: "./app/icons/Icon_256x256.png",
    resizable: false,
    backgroundColor: "white",
  });
  aboutWindow.loadFile("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();
  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("ready", () => (mainWindow = null));
});

const menu = [
  // ...(isMac ? [{ role: "appMenu" }] : []),
  ...(isMac
    ? [
        {
          label: app.name,
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  {
    role: "fileMenu",
  },
  ...(isWin
    ? [
        {
          label: "Help",
          submenu: [
            {
              label: "About",
              click: createAboutWindow,
            },
          ],
        },
      ]
    : []),
  ...(isDev
    ? [
        {
          label: "Developer",
          submenu: [
            {
              role: "reload",
            },
            {
              role: "forcereload",
            },
            {
              type: "separator",
            },
            {
              role: "toggleDevTools",
            },
          ],
        },
      ]
    : []),
];

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

app.allowRendererProcessReuse = true;
