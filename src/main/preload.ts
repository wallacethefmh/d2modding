import { contextBridge, ipcRenderer } from "electron";

console.log("Preload script loaded!");

contextBridge.exposeInMainWorld("electron", {
  loadTsv: (filePath: string) => ipcRenderer.invoke("load-tsv", filePath),
});