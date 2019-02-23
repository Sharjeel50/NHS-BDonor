const { app, BrowserWindow, Menu, ipcMain } = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let requestWindow

function createWindow () {
  win = new BrowserWindow({ width: 800, height: 600 })
  win.loadFile('src/index.html') // Refer to the html file for the window

  // Open the DevTools.
  win.webContents.openDevTools()

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

  // Window for the user to request for a donor
  function createRequestDonor(){
    requestWindow = new BrowserWindow({ width: 350, height: 500 })
    requestWindow.loadFile('src/requestWindow.html')
  }

  // Catching the input data from the html
  ipc.on('Request:bloodType', function(event, item){
    console.log(item);
    menu.webContents.send('Request:bloodType', item)
    createRequestDonor.close();
  })

  // Menu on the main window
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Request Donor', click() { createRequestDonor(); }},
        {label: 'View Patients'},
        {label: 'Exit', click() { app.quit() }}
      ]
  }
])
  Menu.setApplicationMenu(menu);
}


// Dont mess with this shit down below ----------------------------------------

// This method will be called when Electron has finished initialization and is ready to create browser windows. Some APIs can only be used after this event occurs.
app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
