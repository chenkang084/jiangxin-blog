// List all files in a directory in Node.js recursively in a synchronous function
export function walkSync(
  dir: string,
  filelist: { name: string; path: string }[]
) {
  const path = require("path"),
    fs = require("fs"),
    files = fs.readdirSync(dir);
  filelist = filelist || [];
  files.forEach(function(file: string) {
    if (fs.statSync(path.join(dir, file)).isDirectory()) {
      filelist = walkSync(path.join(dir, file), filelist);
    } else {
      filelist.push({ name: file, path: path.resolve(dir, file) });
    }
  });
  return filelist;
}
