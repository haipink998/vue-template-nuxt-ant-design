import moment from "moment";

export const convertTime = (time = '') => {
  return moment(time).format('HH:mm');
}
export const convertTimeAPI = (time= '') => {
  return moment(time).format('YYYY-MM-DDTHH:mm:ss')
}
export const convertDateTime = (date = '', format = 'DD/MM/YYYY') => {
  return date ? moment(date).format(format) : moment().format(format);
}

export const currentTime = () => {
  return moment().format('HH');
}

//* timeChange: 16:30
//* currentDateTime: 2021-01-28T16:51:01"
export const parseTimeToCallAPI = (timeChange = '', currentDateTime) => {
  const date = moment(currentDateTime);
  
  // split to get time and minute
  const [hour, minute] = timeChange.split(':');
  date.set({ hour, minute });

  return date.format('YYYY-MM-DDTHH:mm:ss');
}