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
      out.write(convertToWxHtml(content));
      out.end();
      out.on("finish", () => {
        resolve("ok");
      });
    } catch (error) {
      reject(error);
    }
  });
};

const convertToWxHtml = function(content: string): string {
  const temp = `<html>
<head>
    <meta name="referrer" content="never">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/iframe-resizer/3.5.16/iframeResizer.contentWindow.min.js" type="text/javascript"></script>
    <style>span>img,p>img{max-width: 500px !important;};section[data-id]>section>p:first-child{width: 100%!important;}</style>
</head>
<body>${content}</body>
</html>
`;
  return temp;
};

const convertWxImage = function(content: string): string {
  if (
    content &&
    content.indexOf("640?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1") >
      -1
  ) {
    // content = content.replace(/640\?wx_fmt=jpeg&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1/, "");
    //   // content = content.replace(/640\?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1/, "640?wx_fmt=png&tp=webp");
    //   // content = content.replace(/640\?wx_fmt=png&amp;tp=webp&amp;wxfrom=5&amp;wx_lazy=1/, "640?wx_fmt=png&amp;tp=webp&amp;");
    //   return convertWxImage(content);
  }
  return content;
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