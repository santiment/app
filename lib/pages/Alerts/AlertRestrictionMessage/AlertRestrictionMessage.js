import React from 'react';
import { Link } from 'react-router-dom';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import { DesktopOnly } from '../../../components/Responsive';
import styles from '../../../ducks/Alert/components/AlertRestrictionMessage/AlertRestrictionMessage.module.css';

const AlertRestrictionMessage = ({
  shouldHideRestrictionMessage,
  isRestrictedMessageClosed,
  setIsRestrictedMessageClosed
}) => {
  if (shouldHideRestrictionMessage || isRestrictedMessageClosed) {
    return null;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, styles.wrapperPage, 'mrg-xl mrg--b row v-center justify')
  }, /*#__PURE__*/React.createElement("div", {
    className: cx(styles.info, 'row v-center')
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "alert",
    className: styles.icon
  }), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.description, 'body-3')
  }, "You have reached the maximum amount of alerts available to you. To unlock more alerts please", ' ', /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: cx(styles.link, 'txt-m')
  }, "Update your Plan!"))), /*#__PURE__*/React.createElement(DesktopOnly, null, /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: "btn c-waterloo",
    onClick: () => setIsRestrictedMessageClosed(true)
  })));
};

export default AlertRestrictionMessage;