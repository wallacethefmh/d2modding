import fs from "fs";
import readline from "readline";

export async function parseTsv(
  filenamePath: string,
  onHeaders: (row: string[]) => void,
  onRow: (row: string[]) => void,
): Promise<void> {
  const fileStream = fs.createReadStream(filenamePath);

  const readstream = readline.createInterface({
    input: fileStream,
    crlfDelay: Infinity,
  });

  let headers: string[] | null = null;

  for await (const line of readstream) {
    // Skip empty lines
    if (!line.trim()) continue;

    // Split the line by tabs
    const columns = line.split("\t");

    if (!headers) {
      // First line is treated as headers
      headers = columns;
      onHeaders(headers);
    } else {
      // Process the current row
      onRow(columns);
    }
  }
}