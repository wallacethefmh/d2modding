import "electron";

declare module "electron" {
  interface RendererProcessAPI {
    loadTsv: (filePath: string) => Promise<{ headers: string[]; rows: string[][] }>;
  }
}

declare global {
  interface Window {
    electron: Electron.RendererProcessAPI & typeof Electron;
  }
}