import { readdir, readdirSync } from 'fs'

export const getDirectories = (source: string, callback: (files: string[]) => void) =>
  readdir(source, { withFileTypes: true }, (err, files) => {
    if (err) throw err;
    else callback(files.filter(dirent => dirent.isDirectory()).map(dirent => dirent.name));
  }
);
  
export const getDirectoriesSync = (source: string) => readdirSync(source, { withFileTypes: true }).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);