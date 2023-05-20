var Config = {
    "url" : "http://localhost:8080",
    "stripeUrl":"https://api.stripe.com"
}
export function limitString(str) {
    if (str.length > 100) {
      return str.slice(0, 100) + "...";
    }
    return str;
  }
  export function limitStringBySize(str, size) {
    if (str.length > size) {
      return str.slice(0, size) + "...";
    }
    return str;
  }
export function calculateActualPrice(cost, discount) {
  return eval(cost - cost*discount/100).toFixed(2);
}
export default Config;