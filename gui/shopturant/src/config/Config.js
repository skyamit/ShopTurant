var Config = {
    "url" : "http://localhost:8080"
}
export function limitString(str) {
    if (str.length > 100) {
      return str.slice(0, 100) + "...";
    }
    return str;
  }

export default Config;