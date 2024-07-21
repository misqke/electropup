const { contextBridge, ipcRenderer } = require("electron");


contextBridge.exposeInMainWorld('puppetMaster', {
  runWebThing: () => ipcRenderer.send("run-web-thing")
})


