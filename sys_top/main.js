const path = require("path");
const os = require("os");
const { app, BrowserWindow, Menu, ipcMain, shell, Tray } = require("electron");
const log = require("electron-log"); // use this if cpu overloads and time
const Store = require("./Store");
const MainWindow = require("./MainWindow");
const AboutWindow = require("./AboutWindow");
const AppTray = require("./AppTray");

// Set env
process.env.NODE_ENV = "production";
const isMac = process.platform === "darwin" ? true : false;
const isWin = process.platform === "win32" ? true : false;
const isDev = process.env.NODE_ENV !== "production" ? true : false;

let mainWindow;
let aboutWindow;
let tray = null;

// Init store & defaults
const store = new Store({
  configName: "user-settings",
  defaults: {
    settings: {
      cpuOverload: 80,
      memOverload: 80,
      alertFrequency: 5,
    },
  },
});

function createMainWindow() {
  mainWindow = new MainWindow("./app/index.html", isDev);
}

// About page
function createAboutWindow() {
  aboutWindow = new AboutWindow("./app/about.html");
}

app.on("ready", () => {
  createMainWindow();

  // when dom is ready we read the data from store.json
  mainWindow.webContents.on("dom-ready", () => {
    mainWindow.webContents.send("settings:get", store.get("settings"));
  });

  const mainMenu = Menu.buildFromTemplate(menu);
  Menu.setApplicationMenu(mainMenu);

  mainWindow.on("close", (e) => {
    if (!app.isQuitting) {
      e.preventDefault();
      mainWindow.hide();
    }
    return true;
  });

  // Create tray
  const icon = path.join(__dirname, "app", "icons", "tray_icon.png");
  tray = new AppTray(icon, mainWindow);

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
  {
    // menu for all platform
    label: "View",
    submenu: [
      {
        label: "Toggle Navigaion",
        click: () => mainWindow.webContents.send("nav:toggle"),
      },
    ],
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

// Set settings
ipcMain.on("settings:set", (e, value) => {
  store.set("settings", value);
  mainWindow.webContents.send("settings:get", store.get("settings"));
});

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
