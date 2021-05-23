const path = require('path')
const { app, BrowserWindow, ipcMain, Menu } = require('electron')
const fetch = require('node-fetch')

process.env.NODE_ENV = 'production'
// process.env.NODE_ENV = 'development'

let mainWindow
const isMac = process.platform === 'darwin' ? true : false
const isWin = process.platform === 'win32' ? true : false
const isDev = process.env.NODE_ENV !== 'production' ? true : false

function createWindow() {
  mainWindow = new BrowserWindow({
    width: isDev ? 1000 : 800,
    height: 600,
    show: false,
    backgroundColor: 'white',
    icon: './public/logo192.png',
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
      preload: __dirname + '/preload.js'
      // enableRemoteModule: true
    }
  })
  mainWindow.loadURL(
    isDev
      ? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  )

  mainWindow.once('ready-to-show', function () {
    mainWindow.show()

    // Open devtools if dev
    if (isDev) {
      const installExtensions = async () => {
        const installer = require('electron-devtools-installer')
        const forceDownload = !!process.env.UPGRADE_EXTENSIONS
        const extensions = ['REACT_DEVELOPER_TOOLS']

        return installer
          .default(
            extensions.map(name => installer[name]),
            { forceDownload, loadExtensionOptions: { allowFileAccess: true } }
          )
          .catch(console.log)
      }
      mainWindow.webContents.openDevTools()
    }
  })
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  const mainMenu = Menu.buildFromTemplate(menu)
  Menu.setApplicationMenu(mainMenu)
})

//menu
const menu = [
  ...(isMac ? [{ role: 'appMenu' }] : []),
  {
    role: 'fileMenu'
  },
  {
    role: 'editMenu'
  },
  {
    label: 'Logs',
    submenu: [
      {
        label: 'Clear Logs'
        // click: () => clearLogs()
      }
    ]
  },
  ...(isDev
    ? [
        {
          label: 'Developer',
          submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'toggledevtools' }
          ]
        }
      ]
    : [])
]

//load from api
ipcMain.on('logs:load', async () => {
  try {
    const res = await fetch('http://localhost:3004/logs')
    const data = await res.json()
    mainWindow.webContents.send('logs:get', data)
  } catch (err) {
    console.log(err)
  }
})
ipcMain.on('users:load', async () => {
  try {
    const res = await fetch('http://localhost:3004/users')
    const data = await res.json()
    mainWindow.webContents.send('users:get', data)
  } catch (err) {
    console.log(err)
  }
})
ipcMain.on('logs:delete', async (e, id) => {
  try {
    await fetch(`http://localhost:3004/logs/${id}`, {
      method: 'DELETE'
    })
    mainWindow.webContents.send('logs:deleted')
  } catch (err) {
    console.log(err)
  }
})
ipcMain.on('logs:add', async (e, log) => {
  try {
    await fetch('http://localhost:3004/logs', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(log)
    })
    mainWindow.webContents.send('logs:added')
  } catch (err) {
    console.log(err)
  }
})

// QUit when all windows are closed.
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

// Stop error
app.allowRendererProcessReuse = true
