import React from 'react';
import UserAvatar from './UserAvatar';
import AvatarEditor from './AvatarEditor';
import styles from './AvatarSettings.module.css';

const AvatarSettings = ({
  avatarUrl
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(UserAvatar, {
    as: "div",
    avatarUrl: avatarUrl
  }), /*#__PURE__*/React.createElement(AvatarEditor, {
    avatarUrl: avatarUrl
  }));
};

export default AvatarSettings;