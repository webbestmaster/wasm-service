import fileSystem from "node:fs/promises";

export async function writeStringToFile(pathToFile: string, data: string): Promise<void> {
    return fileSystem.writeFile(pathToFile, data);
}
