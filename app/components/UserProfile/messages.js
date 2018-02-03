/*
 * HomePage Messages
 *
 * This contains all the text for the HomePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  followers: {
    id: 'boilerplate.components.userProfile.followers',
    defaultMessage: 'Followers: {followers}',
  },
  country: {
    id: 'boilerplate.components.userProfile.country',
    defaultMessage: 'Country: {country}',
  },
  product: {
    id: 'boilerplate.components.userProfile.product',
    defaultMessage: 'Product: {product}',
  },
  error: {
    id: 'boilerplate.components.userProfile.error',
    defaultMessage: 'Error loading user profile',
  },
});
