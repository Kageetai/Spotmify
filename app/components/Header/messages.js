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
  features: {
    id: 'boilerplate.components.Header.features',
    defaultMessage: 'Features',
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
