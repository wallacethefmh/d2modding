import React from "react";

interface FileSelectorProps {
  selectedFile: string;
  setSelectedFile: (file: string) => void;
}

export const FileSelector: React.FC<FileSelectorProps> = ({ selectedFile, setSelectedFile }) => {
  const files = [
    "skills.txt",
    "levels.txt",
    "monstats.txt"
  ];

  return (
    <div>
      <label className="block text-lg font-medium">Select a File {selectedFile}:</label>
      <select
        className="mt-2 block w-full rounded border-gray-300"
        value={selectedFile}
        onChange={(e) => setSelectedFile(e.target.value) }
      >
        <option value="">-- Select a file --</option>
        {files.map((file, idx) => (
          <option key={idx} value={file}>
            {file}
          </option>
        ))}
      </select>
    </div>
  );
};
