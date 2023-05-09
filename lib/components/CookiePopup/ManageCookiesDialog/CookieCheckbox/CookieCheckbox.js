import React, { useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Toggle from '@santiment-network/ui/Toggle';
import styles from './CookieCheckbox.module.css';

const CookieCheckbox = ({
  title,
  content,
  hideCheckbox = true,
  onChange,
  isActive
}) => {
  const [isOpen, setIsOpen] = useState(false);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.titleWrapper
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title,
    onClick: () => setIsOpen(prev => !prev)
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.iconWrapper
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "arrow-right-big",
    className: cx(styles.icon, isOpen && styles.openIcon)
  })), /*#__PURE__*/React.createElement("span", null, title)), /*#__PURE__*/React.createElement("div", {
    className: styles.checkbox
  }, hideCheckbox ? 'Always Active' : /*#__PURE__*/React.createElement(Toggle, {
    isActive: isActive,
    onClick: onChange
  }))), isOpen && /*#__PURE__*/React.createElement("div", {
    className: styles.content
  }, content));
};

export default CookieCheckbox;