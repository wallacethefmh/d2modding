import React, { useState } from "react";
import { FileSelector } from "./components/FileSelector";

export const App: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<string>("");
  const [firstRow, setFirstRow] = useState<any>(null);

  const handleLoad = async () => {
    const prefix = "C:/Program Files (x86)/Diablo II Resurrected/mods/rebalance/rebalance.mpq/data/global/excel"
    const row = await window.electron.loadTsv(`${prefix}/${selectedFile}`);
    setFirstRow(row);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Electron React TSV Loader</h1>
      <FileSelector selectedFile={selectedFile} setSelectedFile={setSelectedFile} />
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleLoad}
      >
        Load
      </button>
      {firstRow && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold">First Row:</h2>
          <pre className="bg-gray-100 p-2 rounded">{JSON.stringify(firstRow, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};
