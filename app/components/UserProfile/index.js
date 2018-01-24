import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';
import styled from 'styled-components';

import A from '../A';
import messages from './messages';
import LoadingIndicator from '../LoadingIndicator';
import NormalImg from '../Img';
import H3 from '../H3';

const StyledUserProfile = styled.div`
  display: flex;
`;

const ProfilePicture = styled(NormalImg)`
  flex: 200px 0 0;
`;

const ProfileInfo = styled.div`
  flex: auto 1 0;
  padding: 0 1em;
`;


class UserProfile extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    const { user } = this.props;
    return user ? (
      <StyledUserProfile>
        <A href={user.uri}>
          {user.images ? (
            <ProfilePicture src={user.images[0].url} alt={user.display_name} />
          ) : null}
        </A>
        <ProfileInfo>
          <A href={user.uri}><H3>{user.display_name}</H3></A>
          <div><FormattedMessage {...messages.country} values={{ country: user.country }} /></div>
          {user.followers && (
            <div><FormattedMessage {...messages.followers} values={{ followers: user.followers.total }} /></div>
          )}
          <div><FormattedMessage {...messages.product} values={{ product: user.product }} /></div>
        </ProfileInfo>
      </StyledUserProfile>
    ) : (
      <LoadingIndicator />
    );
  }
}

UserProfile.propTypes = {
  user: PropTypes.object,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  loading: PropTypes.bool,
};

export default UserProfile;
