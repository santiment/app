import React, { useState, useEffect } from 'react';
import { useIntercomClick } from '../../hooks/intercome';
import styles from './index.module.css';

const Intercom = ({
  isDesktop
}) => {
  const [isShown, setIsShown] = useState(true);
  useEffect(() => {
    if (window.Intercom) {
      window.Intercom('onHide', () => setIsShown(true));
      window.Intercom('onShow', () => setIsShown(false));
    }
  }, []);
  const intercomHandler = useIntercomClick();
  return isDesktop && isShown ? /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper,
    onClick: intercomHandler,
    draggable: "false"
  }, /*#__PURE__*/React.createElement("svg", {
    className: styles.icon,
    width: "14",
    height: "16"
  }, /*#__PURE__*/React.createElement("path", {
    d: "M14 16l-4.3-1.7h-8c-1 0-1.7-.8-1.7-1.8V1.8C0 .8.8 0 1.7 0h10.6c1 0 1.7.8 1.7 1.8V16zm-2-6a.4.4 0 00-.7 0S9.8 11.3 7 11.3a6.8 6.8 0 01-4.4-1.4.4.4 0 00-.5.1.5.5 0 000 .7S4 12.3 7 12.3c3.1 0 4.8-1.5 4.9-1.6l.1-.3V10z"
  })), "Help & Feedback") : null;
};

export default Intercom;