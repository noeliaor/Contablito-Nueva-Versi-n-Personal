const { app,BrowserWindow} = require("electron");
function createWindow() {
    // Create the browser window.
    let win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    });
 // and load the index.html of the app.
 win.loadFile("index.html");
}
app.on("ready", createWindow);

/*
In this file we are importing the app and BrowserWindow modules
 from the Electron package we installed earlier.
  When the Electron app is ready we create a new BrowserWindow with the provided properties
   and load in our index.html file*/
