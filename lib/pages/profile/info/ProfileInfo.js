function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { useState, useMemo } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import Dialog from '@santiment-network/ui/Dialog';
import FollowBtn from '../follow/FollowBtn';
import { useUser } from '../../../stores/user';
import FollowList from '../follow/list/FollowList';
import UserAvatar from '../../Account/avatar/UserAvatar';
import { DesktopOnly, MobileOnly } from '../../../components/Responsive';
import ShareModalTrigger from '../../../components/Share/ShareModalTrigger';
import SidecarExplanationTooltip from '../../../ducks/SANCharts/SidecarExplanationTooltip';
import NotificationBellBtn from '../../../components/NotificationBellBtn/NotificationBellBtn';
import EditProfile from './EditProfile';
import AvatarEditor from '../../../pages/Account/avatar/AvatarEditor';
import styles from './ProfileInfo.module.css';

const ShareTrigger = props => /*#__PURE__*/React.createElement(Button, _extends({
  className: styles.shareTrigger
}, props), /*#__PURE__*/React.createElement(Icon, {
  type: "share",
  className: styles.shareIcon
}), "Share profile");

export const ShareProfile = () => /*#__PURE__*/React.createElement(ShareModalTrigger, {
  feature: "profile",
  source: "profile",
  dialogTitle: "Share profile",
  shareLink: window.location.href,
  trigger: ShareTrigger
});

const DisplayProfileValue = ({
  label,
  value,
  isCurrentUser
}) => {
  const [isDialogVisible, setIsDialogVisible] = useState(false);

  if (!isCurrentUser) {
    return /*#__PURE__*/React.createElement(React.Fragment, null, value || `No ${label}`);
  }

  const Trigger = () => /*#__PURE__*/React.createElement(React.Fragment, null, value || `Add ${label}`, " ", /*#__PURE__*/React.createElement(Icon, {
    className: styles.ml16,
    type: "edit"
  }));

  return /*#__PURE__*/React.createElement(Dialog, {
    title: "Edit",
    trigger: /*#__PURE__*/React.createElement("div", {
      onClick: () => setIsDialogVisible(true)
    }, /*#__PURE__*/React.createElement(Trigger, null)),
    classes: {
      dialog: styles.editWrapper,
      title: styles.modalTitle
    },
    open: isDialogVisible,
    onClose: () => setIsDialogVisible(false)
  }, /*#__PURE__*/React.createElement(EditProfile, {
    onClose: () => setIsDialogVisible(false)
  }));
};

const InfoBlock = ({
  isLoggedIn,
  isCurrentUser,
  updateCache,
  profile,
  followData: {
    followers
  } = {}
}) => {
  const {
    username,
    id,
    name
  } = profile;
  return /*#__PURE__*/React.createElement("div", {
    className: styles.leftText
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.info
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.name, !name && styles.empty, isCurrentUser && styles.editable)
  }, /*#__PURE__*/React.createElement(DisplayProfileValue, {
    label: "full name",
    value: name,
    isCurrentUser: isCurrentUser
  })), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.username, isCurrentUser && styles.editable)
  }, /*#__PURE__*/React.createElement(DisplayProfileValue, {
    label: "username",
    value: username && `@${username}`,
    isCurrentUser: isCurrentUser
  })), isLoggedIn && (!isCurrentUser ? /*#__PURE__*/React.createElement("div", {
    className: styles.followContainer
  }, followers && /*#__PURE__*/React.createElement(FollowBtn, {
    className: styles.followBtn,
    users: followers.users,
    userId: id,
    updateCache: updateCache
  }), /*#__PURE__*/React.createElement(NotificationBellBtn, {
    targetUserId: id,
    className: styles.bell
  })) : /*#__PURE__*/React.createElement(Button, {
    className: styles.accountBtn,
    as: Link,
    to: "/account",
    variant: "fill",
    accent: "positive"
  }, "Account settings"))), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(ShareProfile, null))));
};

const FollowTitle = ({
  title,
  count
}) => /*#__PURE__*/React.createElement("div", null, title, " ", /*#__PURE__*/React.createElement("span", {
  className: styles.counter
}, "(", count, ")"));

const ProfileInfo = ({
  profile,
  updateCache,
  followData = {}
}) => {
  const {
    followers,
    following,
    followers: {
      count: followersCount = 0
    } = {},
    following: {
      count: followingCount
    } = {}
  } = followData;
  const {
    isLoggedIn,
    user
  } = useUser();
  const currentUserId = useMemo(() => user ? user.id : null, [user]);
  const isCurrentUser = useMemo(() => +currentUserId === +profile.id, [user, profile]);
  const userProfile = isCurrentUser ? user : profile;
  const {
    id,
    avatarUrl
  } = userProfile;

  const AvatarHolder = () => /*#__PURE__*/React.createElement(UserAvatar, {
    as: "div",
    userId: id,
    externalAvatarUrl: avatarUrl,
    classes: styles,
    isCurrentUser: isCurrentUser
  });

  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.left
  }, isCurrentUser ? /*#__PURE__*/React.createElement(AvatarEditor, {
    avatarUrl: avatarUrl,
    withRemove: false,
    withRemoveButton: true
  }, /*#__PURE__*/React.createElement(AvatarHolder, null)) : /*#__PURE__*/React.createElement(AvatarHolder, null), /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement(InfoBlock, {
    profile: userProfile,
    isLoggedIn: isLoggedIn,
    followData: followData,
    updateCache: updateCache,
    isCurrentUser: isCurrentUser
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.right
  }, /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(InfoBlock, {
    profile: userProfile,
    isLoggedIn: isLoggedIn,
    followData: followData,
    updateCache: updateCache,
    isCurrentUser: isCurrentUser
  })), /*#__PURE__*/React.createElement("div", {
    className: styles.socials
  }, /*#__PURE__*/React.createElement(SidecarExplanationTooltip, {
    closeTimeout: 500,
    localStorageSuffix: "_PROFILE_FOLLOW_EXPLANATION",
    position: "bottom",
    title: /*#__PURE__*/React.createElement("div", null, "Click to open list of users"),
    description: "",
    withArrow: true,
    classes: styles
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.followersBlocks
  }, followers && /*#__PURE__*/React.createElement(FollowList, {
    currentUserId: currentUserId,
    isCurrentUser: isCurrentUser,
    list: followers,
    title: /*#__PURE__*/React.createElement(FollowTitle, {
      title: "Followers",
      count: followersCount
    }),
    trigger: /*#__PURE__*/React.createElement("div", {
      className: styles.followBlock
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "followers",
      className: styles.follow
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.followCounters
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.followCounter
    }, followersCount), /*#__PURE__*/React.createElement("div", {
      className: styles.followDescription
    }, "followers")))
  }), following && /*#__PURE__*/React.createElement(FollowList, {
    currentUserId: currentUserId,
    isCurrentUser: isCurrentUser,
    list: following,
    title: /*#__PURE__*/React.createElement(FollowTitle, {
      title: "Following",
      count: followingCount
    }),
    trigger: /*#__PURE__*/React.createElement("div", {
      className: cx(styles.followBlock, styles.followBlockSecond)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "following",
      className: styles.follow
    }), /*#__PURE__*/React.createElement("div", {
      className: styles.followCounters
    }, /*#__PURE__*/React.createElement("div", {
      className: styles.followCounter
    }, followingCount), /*#__PURE__*/React.createElement("div", {
      className: styles.followDescription
    }, "following")))
  }))))));
};

export default ProfileInfo;