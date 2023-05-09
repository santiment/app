import React from 'react';
import styles from './index.module.css';

const Signal = ({
  signal,
  setHovered,
  removeSignal
}) => {
  function onMouseEnter() {
    setTimeout(() => setHovered(signal), 0);
  }

  function onMouseLeave() {
    setHovered();
  }

  function onClick() {
    removeSignal(signal.id);
    setHovered();
  }

  return /*#__PURE__*/React.createElement("div", {
    className: styles.signal,
    style: {
      top: signal.y
    },
    onClick: onClick,
    onMouseEnter: onMouseEnter,
    onMouseLeave: onMouseLeave
  });
};

export default Signal;