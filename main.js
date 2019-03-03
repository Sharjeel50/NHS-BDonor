const { app, BrowserWindow, Menu } = require('electron')
const ipcMain = require('electron').ipcMain;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let win
let requestWindow
let configWindow
let donorWindow

function createWindow () {
  win = new BrowserWindow({ width: 1700, height: 950 })
  win.loadFile('src/index.html') // Refer to the html file for the window

  // Emitted when the window is closed.
  win.on('closed', () => {
    win = null
  })

  // Window for the user to request for a donor
  function createRequestDonor(){
    requestWindow = new BrowserWindow({ width: 300, height: 500 })
    requestWindow.loadFile('src/requestWindow.html')
  }

  // Catching the input data from the html
  ipcMain.on('Request:DonorInformation', function(event, requestType, bloodType, Notice){
    console.log("Request Type:", requestType, " - ", "Blood type:", bloodType," - ", "Notice:" ,Notice);
    win.webContents.send('Request:DonorInformation', requestType, bloodType, Notice);

  })



  function createConfigWidow(){
    configWindow = new BrowserWindow({ width: 330, height: 550 })
    configWindow.loadFile('src/configWindow.html')
  }

  // Catching the input data from the html
  ipcMain.on('setupData', function(event, hospitalName, streetAddress, cityName, postalCode ){
    console.log(hospitalName, streetAddress, cityName, postalCode);
    win.webContents.send('setupData', hospitalName, streetAddress, cityName, postalCode);

  })

  // Create Donor viewing Page
  function createDonorWindow(){
    let donorWindow = new BrowserWindow({width: 500, height: 700})
    donorWindow.loadFile('src/viewDonors.html')
  }


  // Menu on the main window
  var menu = Menu.buildFromTemplate([
    {
      label: 'Menu',
      submenu: [
        {label: 'Request Donor', click() { createRequestDonor(); }}, // Run function to create a new window
        {label: 'View Donors', click() { createDonorWindow(); }},
        {label: 'Exit', click() { app.quit() }}
      ]
  },
  {
    label: 'Configuration',
    submenu: [
      {label: 'Setup', click() { createConfigWidow(); }} // Run function to create a new window
    ]
  },
  {
    label: 'Developer Tools',
    submenu: [
      {label: 'Console', click(item, focusedWindow) { focusedWindow.toggleDevTools(); } },
      {role: 'reload'}
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
