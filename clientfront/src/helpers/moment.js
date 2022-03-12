import moment from "moment";

export const changeDate = (date) => {
  const newDate = moment(date).format("dddd, MMMM Do YYYY, h:mm:ss a");
  return newDate;
};

changeDate();
