import Cookies from 'js-cookie';
import moment from 'moment';

export const isExpired = timestamp => moment.utc(timestamp).isBefore();

export const isLoggedIn = () => {
  const expires = Cookies.get('expires');
  return (expires && !isExpired(expires));
};
