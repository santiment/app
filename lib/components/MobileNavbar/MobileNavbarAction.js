import React from 'react';
import cx from 'classnames';
import styles from './MobileNavbarAction.module.css';

const MobileNavbarAction = ({
  onClick,
  Icon,
  label,
  linkTo,
  isActive = false,
  href
}) => {
  const handleOnClick = () => onClick(linkTo);

  if (href) {
    return /*#__PURE__*/React.createElement("a", {
      href: href,
      target: "_blank",
      rel: "noopener noreferrer",
      className: cx(styles.btn, 'btn column v-center justify', isActive && styles.active)
    }, /*#__PURE__*/React.createElement(Icon, {
      className: styles.btnIcon
    }), label);
  }

  return /*#__PURE__*/React.createElement("button", {
    className: cx(styles.btn, 'btn column v-center justify', isActive && styles.active),
    onClick: handleOnClick
  }, /*#__PURE__*/React.createElement(Icon, {
    className: styles.btnIcon
  }), label);
};

export default MobileNavbarAction;