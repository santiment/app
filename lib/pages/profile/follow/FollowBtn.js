import React from 'react';
import cx from 'classnames';
import { Mutation } from 'react-apollo';
import Button from '@santiment-network/ui/Button';
import Icon from '@santiment-network/ui/Icon';
import { useUser } from '../../../stores/user';
import { FOLLOW_MUTATION, UNFOLLOW_MUTATION } from '../../../queries/ProfileGQL';
import styles from './FollowBtn.module.css';
const ARR = [];
const OBJ = {};
export function isInFollowers(users, targetUserId, currentUserId) {
  if (currentUserId && users) {
    if (targetUserId) {
      return users.some(({
        id
      }) => +id === +targetUserId);
    } else {
      return users.some(({
        id
      }) => +id === +currentUserId);
    }
  }

  return false;
}

const FollowBtn = ({
  userId,
  targetUserId,
  users = ARR,
  updateCache,
  className,
  variant = 'fill'
}) => {
  const {
    user = OBJ
  } = useUser();
  const isFollowing = isInFollowers(users, targetUserId, user.id);
  return /*#__PURE__*/React.createElement(Mutation, {
    mutation: isFollowing ? UNFOLLOW_MUTATION : FOLLOW_MUTATION,
    update: updateCache
  }, (followAction, {
    loading
  }) => /*#__PURE__*/React.createElement(Button, {
    accent: isFollowing ? 'grey' : 'positive',
    variant: variant,
    className: cx(isFollowing && styles.grey, className),
    onClick: () => !loading && followAction({
      variables: {
        id: +userId
      }
    })
  }, !loading ? isFollowing ? /*#__PURE__*/React.createElement(Icon, {
    type: "followers",
    className: styles.followImg
  }) : /*#__PURE__*/React.createElement(Icon, {
    type: "follow",
    className: styles.followImg
  }) : /*#__PURE__*/React.createElement(Icon, {
    type: "following",
    className: styles.followImg
  }), isFollowing ? 'Following' : 'Follow'));
};

export default FollowBtn;