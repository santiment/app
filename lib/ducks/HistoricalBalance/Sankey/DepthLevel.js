import React, { useState } from 'react';
import cx from 'classnames';
import Title from './Title';
import { useDebounceEffect } from '../../../hooks/index';
import styles from './index.module.css';

const DepthLevel = ({
  name,
  value,
  className,
  onChange
}) => {
  const [depth, setDepth] = useState(value);
  useDebounceEffect(() => onChange(depth), 700, [depth]);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.depth, className)
  }, /*#__PURE__*/React.createElement(Title, {
    className: styles.depth__title
  }, "Depth level:", /*#__PURE__*/React.createElement("span", {
    className: styles.depth__name
  }, " ", name)), /*#__PURE__*/React.createElement("div", {
    className: styles.depth__actions
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.depth__btn,
    onClick: depth < 2 ? undefined : () => setDepth(depth - 1)
  }, "\u2013"), /*#__PURE__*/React.createElement("div", {
    className: styles.depth__value,
    style: {
      width: depth.toString().length + 'ch'
    }
  }, depth), /*#__PURE__*/React.createElement("div", {
    className: styles.depth__btn,
    onClick: depth > 24 ? undefined : () => setDepth(depth + 1)
  }, "+")));
};

export default DepthLevel;