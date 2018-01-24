import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import A from '../A';
import ProfilePicture from './ProfilePicture';
import messages from './messages';
import LoadingIndicator from '../LoadingIndicator';

class UserProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return user ? (
      <div>
        <A href={user.uri}>
          {user.images ? (
            <ProfilePicture src={user.images[0].url} alt={user.display_name} />
          ) : null}
          {user.display_name}
        </A>
        <div><FormattedMessage {...messages.country} values={{ country: user.country }} /></div>
        {user.followers && (
          <div><FormattedMessage {...messages.followers} values={{ followers: user.followers.total }} /></div>
        )}
        <div><FormattedMessage {...messages.product} values={{ product: user.product }} /></div>
      </div>
    ) : (
      <LoadingIndicator />
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default UserProfile;
