import * as fs from "fs";
import * as path from "path";
const articlePath = path.join(__dirname, "../articles");

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
      resolve("ok");
    } catch (error) {
      reject(error);
    }
  });
};

writeFile(articlePath, "test.html", "hehesss");
