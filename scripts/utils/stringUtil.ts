export function upCaseInitial(text: string): string {
  if (text) {
    return text.substr(0, 1).toUpperCase() + text.substring(1);
  } else {
    return text;
  }
}

export function relativePath(path: string): string {
  let folderPathLength: number = 0;
  if (path) {
    folderPathLength = path.split("/").length;
    if (path.substring(path.length - 1) === "/") {
      folderPathLength = path.split("/").length - 1;
    }
  }

  let goUpperPath: string = "";

  while (folderPathLength > 0) {
    goUpperPath += "../";

    folderPathLength--;
  }

  return goUpperPath;
}

export function formatPath(path: string): string {
  if (path && path.substring(path.length - 1) === "/") {
    return path.substr(0, path.length - 1);
  } else {
    return path;
  }
}
