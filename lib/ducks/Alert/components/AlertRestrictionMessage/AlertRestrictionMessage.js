import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import styles from './AlertRestrictionMessage.module.css';

const AlertRestrictionMessage = ({
  shouldHideRestrictionMessage,
  isRestrictedMessageClosed,
  setIsRestrictedMessageClosed
}) => {
  if (shouldHideRestrictionMessage || isRestrictedMessageClosed) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, 'row justify v-center')
  }, /*#__PURE__*/React.createElement("div", {
    className: "row v-center"
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "alert",
    className: styles.icon
  }), /*#__PURE__*/React.createElement("div", {
    className: "body-3"
  }, /*#__PURE__*/React.createElement("span", {
    className: "txt-m"
  }, "Duration restriction!"), " Your Alert will be valid for 30 days. To extend Alert please", ' ', /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: cx(styles.link, 'txt-m')
  }, "Upgrade your Plan."))), /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: "btn c-waterloo",
    onClick: () => setIsRestrictedMessageClosed(true)
  }));
};

export default AlertRestrictionMessage;