// * This script contains the main process of the app.
// * This is the first script executed in the app.

// Imports form Electron and others node libraries.
const {app, BrowserWindow, ipcMain} = require('electron');
const path = require('path');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) {
  app.quit();
}

/**
 * @description Creates a window that contains the windowPath HTML page.
 */
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 1200,
    height: 1000,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload-context-bridge.js'), // use a preload script
    },
  });

  // and load the index.html of the app.
  mainWindow.loadFile(path.join(__dirname, 'rendererProcess/html/index.html'));

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};


// * ########################################################
// * ################### App callbacks ######################
// * ########################################################

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});


// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.


// * ########################################################
// * ############### Main process functions #################
// * ########################################################

const createTextWindow = (windowPath) => {
  // Gets main window attributes.
  const mainWindow = BrowserWindow.fromId(1);
  const contentBounds = mainWindow.getBounds();

  const numWindows = BrowserWindow.getAllWindows().length;
  const offsetFromPreviousWindow = (numWindows === 1) ? 0 : (numWindows * 49);

  // Creates the new window.
  const window = new BrowserWindow({
    width: 800,
    height: 600,
    x: contentBounds.x + mainWindow.getSize()[0],
    y: contentBounds.y + offsetFromPreviousWindow,
    webPreferences: {
      nodeIntegration: false, // is default value after Electron v5
      contextIsolation: true, // protect against prototype pollution
      enableRemoteModule: false, // turn off remote
      preload: path.join(__dirname, 'preload-context-bridge.js'), // use a preload script
    },
  });

  // and load the index.html of the app.
  window.loadFile(path.join(__dirname, windowPath));

  // Open the DevTools.
  window.webContents.openDevTools();

  return window;
};


ipcMain.on('trainer-type-submission', function(event, trainerType) {
  console.log(`MAIN PROCESS: received a request from ${event.senderFrame.url}`);

  // Creates the window used to show the generated text for trainerType.
  const generatedTextWindow = createTextWindow('rendererProcess/html/generated-text.html');

  // Once the window has been generated, sends the trainerType object to it.
  generatedTextWindow.once('ready-to-show', () => {
    generatedTextWindow.show();
    generatedTextWindow.webContents.send('generate-text', trainerType);
  });
});
