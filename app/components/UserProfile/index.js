import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

import A from '../A';
import ProfilePicture from './ProfilePicture';
import messages from './messages';

class Header extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return (
      <div>
        <A href={user.uri}>
          {user.images ? (
            <ProfilePicture src={user.images[0].url} alt={user.display_name} />
          ) : null}
          {user.display_name}
        </A>
        <div><FormattedMessage {...messages.country} values={{ country: user.country }} /></div>
        <div><FormattedMessage {...messages.followers} values={{ followers: user.followers.total }} /></div>
        <div><FormattedMessage {...messages.product} values={{ product: user.product }} /></div>
      </div>
    );
  }
}

Header.propTypes = {
  user: PropTypes.object.isRequired,
  error: PropTypes.bool,
  loading: PropTypes.bool,
};

export default Header;
