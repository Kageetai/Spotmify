/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'app.containers.HomePage';

export default defineMessages({
  header: {
    id: `${scope}.header`,
    defaultMessage: 'This is the HomePage container!',
  },
  login: {
    id: 'boilerplate.containers.HomePage.login',
    defaultMessage: 'Login',
    error: {
      id: 'boilerplate.containers.HomePage.login.error',
      defaultMessage: 'Couldn\'t login, try again',
    },
  },
});
