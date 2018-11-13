import moment from 'moment';

export const isExpired = timestamp => moment.utc(timestamp).isBefore();

export const isLoggedIn = () => {
  const expires = sessionStorage.getItem('expires');
  return expires && !isExpired(expires);
};
