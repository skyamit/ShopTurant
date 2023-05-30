var Config = {
    "url" : "http://localhost:8080",
    "stripeUrl":"https://api.stripe.com",
    "deleteAddress" :"/address/delete?id="
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
export function getDateFromString(str) {
  var datePart = str.split('T')[0];

  var date = new Date(datePart);
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();
  var monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  
  var suffix = getDaySuffix(day);
  
  // Format the date string
  var dateString = day + suffix + ' ' + monthNames[month - 1];
  return dateString+", "+year;
};

function getDaySuffix(day) {
  if (day >= 11 && day <= 13) {
    return 'th';
  } else {
    var lastDigit = day % 10;
    switch (lastDigit) {
      case 1:
        return 'st';
      case 2:
        return 'nd';
      case 3:
        return 'rd';
      default:
        return 'th';
    }
  }
}

export function getStatus(e) {
  if(e === 1)
    return "Order Received! We're on it.";
  else if(e === 2)
    return "Order in Transit!";
  else if(e === 3) 
    return "Out for Delivery!";
  else if(e === 4)
    return "Order Delivered!";
  else if(e === 5)
    return "Order Cancelled";
  else 
    return "Invalid Status";
}



export default Config;