export function upCaseInitial(text: string): string {
  if (text) {
    return text.substr(0, 1).toUpperCase() + text.substring(1);
  } else {
    return text;
  }
}
