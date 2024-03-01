const ConvertedDate = (string) => {
  const newDate = new Date(string);
  const year = newDate.getFullYear();
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  return `${day}-${month}-${year}`;
};
const convertedTime = (string) => {
  const newDate = new Date(string);
  let hour = newDate.getHours();
  const minute = newDate.getMinutes();
  const second = newDate.getSeconds();
  let suffix = "";
  if (hour > 12) {
    suffix = "PM";
    hour = hour % 12;
  } else {
    suffix = "AM";
  }
  return `${hour}:${minute}:${second} ${suffix}`;
};
const currentTime = () => {
  const date = new Date();
  const currentTime = date.getTime();
  return currentTime;
};
const compareDates = (date1, date2) => {
  const data1 = new Date(date1);
  const data2 = new Date(date2);
  if (
    data1.getFullYear() == data2.getFullYear() &&
    data1.getMonth == data2.getMonth &&
    data1.getDate == data2.getDate
  ) {
    return true;
  } else {
    return false;
  }
};
module.exports = { ConvertedDate, convertedTime, compareDates, currentTime };
