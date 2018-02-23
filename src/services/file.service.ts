import * as fs from "fs";
import * as path from "path";
const articlePath = path.join(__dirname, "../../articles");

const writeFile = function(
  filepath: string,
  filename: string,
  content: string
) {
  new Promise((resolve, reject) => {
    try {
      const out = fs.createWriteStream(path.join(filepath, filename), {
        encoding: "utf8"
      });
      out.write(content);
      out.end();
      out.on("finish", () => {
        resolve("ok");
      });
    } catch (error) {
      reject(error);
    }
  });
};

const readFile = function(filepath: string, filename: string) {
  return new Promise((resolve, reject) => {
    try {
      let content: string = "";
      const stream = fs.createReadStream(path.join(filepath, filename), {
        encoding: "utf8"
      });
      stream.on("end", () => {
        resolve(content);
      });
      stream.on("data", chunk => {
        content += chunk;
      });
    } catch (error) {
      reject(error);
    }
  });
};

export { writeFile, readFile };

// writeFile(articlePath, "test.html", "hehesss");
