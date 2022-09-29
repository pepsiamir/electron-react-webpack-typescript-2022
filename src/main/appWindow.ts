import { app, BrowserWindow, shell, ipcMain, dialog } from 'electron';
import path from 'path';
import { registerTitlebarIpc } from '@misc/window/titlebarIPC';

// Electron Forge automatically creates these entry points
declare const APP_WINDOW_WEBPACK_ENTRY: string;
declare const APP_WINDOW_PRELOAD_WEBPACK_ENTRY: string;

let appWindow: BrowserWindow;


// if (process.defaultApp) {
//   if (process.argv.length >= 2) {
//     app.setAsDefaultProtocolClient('electron-fiddle', process.execPath, [path.resolve(process.argv[1])])
//   }
// } else {
//   app.setAsDefaultProtocolClient('electron-fiddle')
// }

// const gotTheLock = app.requestSingleInstanceLock()

// if (!gotTheLock) {
//   app.quit()
// } else {
//   app.on('second-instance', (event, commandLine, workingDirectory) => {
//     // Someone tried to run a second instance, we should focus our window.
//     if (appWindow) {
//       if (appWindow.isMinimized()) appWindow.restore()
//       appWindow.focus()
//     }
//   })

//   // Create appWindow, load the rest of the app, etc...
//   app.whenReady().then(() => {
//     createAppWindow()
//   })
  // appWindow.on('ready-to-show', () => appWindow.show());


  // app.on('open-url', (event, url) => {
  //   dialog.showErrorBox('Welcome Back', `You arrived from: ${url}`)
  // })
// }

/**
 * Create Application Window
 * @returns {BrowserWindow} Application Window Instance
 */
export function createAppWindow(): BrowserWindow {
  // Create new window instance
  appWindow = new BrowserWindow({
    width: 800,
    height: 600,
    backgroundColor: '#1f252c',
    show: false,
    autoHideMenuBar: true,
    frame: false,
    titleBarStyle: 'hidden',
    icon: path.resolve('assets/images/appIcon.ico'),
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      nodeIntegrationInWorker: false,
      nodeIntegrationInSubFrames: false,
      preload: APP_WINDOW_PRELOAD_WEBPACK_ENTRY,
    },
  });

  // Load the index.html of the app window.
  appWindow.loadURL(APP_WINDOW_WEBPACK_ENTRY);

  // Show window when its ready to
  appWindow.on('ready-to-show', () => appWindow.show());

  // Register Inter Process Communication for main process
  registerMainIPC();

  // Close all windows when main window is closed
  appWindow.on('close', () => {
    appWindow = null;
    app.quit();
  });


  // Handle window controls via IPC
  // ipcMain.on('shell:open', () => {
  //   const pageDirectory = __dirname.replace('app.asar', 'app.asar.unpacked')
  //   const pagePath = path.join('file://', pageDirectory, 'index.html')
  //   shell.openExternal(pagePath)
  // })

  return appWindow;
}

/**
 * Register Inter Process Communication
 */
function registerMainIPC() {
  /**
   * Here you can assign IPC related codes for the application window
   * to Communicate asynchronously from the main process to renderer processes.
   */
  registerTitlebarIpc(appWindow);
}
