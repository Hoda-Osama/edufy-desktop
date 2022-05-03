const { app, BrowserWindow } = require('electron')
require('@electron/remote/main').initialize()

function createWindow() {
    const win = new BrowserWindow({
        width: 920,
        height: 920,
        webPreferences: {
            enableRemoteModule: true,
        },

    })
    win.loadURL('http://localhost:3000')
    // desktopCapturer.getSources({ types: ['window', 'screen'] }).then(async sources => {
    //     for (const source of sources) {
    //         if (source.name === 'Electron') {
    //             win.webContents.send('SET_SOURCE', source.id)
    //             return
    //         }
    //     }
    // })

}

app.on('ready', createWindow)
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})
app.on('activate', function () {
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

