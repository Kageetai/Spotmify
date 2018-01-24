/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  home: {
    id: 'boilerplate.components.Header.home',
    defaultMessage: 'Home',
  },
  library: {
    id: 'boilerplate.components.Header.library',
    defaultMessage: 'Library',
  },
  login: {
    id: 'boilerplate.containers.Header.login',
    defaultMessage: 'Login',
    error: {
      id: 'boilerplate.containers.Header.login.error',
      defaultMessage: 'Couldn\'t login, try again',
    },
  },
  logout: {
    id: 'boilerplate.containers.Header.logout',
    defaultMessage: 'Logout',
  },
});
