import { app, BrowserWindow, ipcMain } from "electron";
import path from "path";
import fs from "fs";
import { parseTsv } from "./lib/tsv-parser";

let mainWindow: BrowserWindow | null = null;

console.log(`main script loaded!, preload: ${ path.join(__dirname, "preload.js") }`);

app.on("ready", () => {
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
    },
  });

  if (process.env.NODE_ENV === "development") {
    mainWindow.loadURL("http://localhost:5173"); // Vite default port
  } else {
    mainWindow.loadFile(path.join(__dirname, "../dist/index.html"));
  }
  mainWindow.webContents.openDevTools();
});

ipcMain.handle("load-tsv", async (event, filenamePath: string) => {
  const parsedData: Record<string, string>[] = [];
  let parsedHeaders: string[] = [];

  const onHeaders = (headers: string[]) => {
    parsedHeaders = headers;
  }

  const onRow = (row: string[]) => {
    parsedData.push(row.reduce((data: Record<string, string>, element, i) => {
      data[parsedHeaders[i]] = element;
      return data;
    }, {}));
  }

  await parseTsv(filenamePath, onHeaders, onRow);

  return parsedData;
});
