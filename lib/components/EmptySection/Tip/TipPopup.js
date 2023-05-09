import React, { useEffect, useState } from 'react';
import cx from 'classnames';
import Icon from '@santiment-network/ui/Icon';
import Tip from './Tip';
import styles from './tip.module.css';

const TipPopup = () => {
  const [isOpened, setIsOpened] = useState(false);
  useEffect(() => {
    const timeoutId = setTimeout(() => setIsOpened(true), 3000);
    return () => clearTimeout(timeoutId);
  }, []);
  if (!isOpened) return null;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.popupWrapper, 'fluid')
  }, /*#__PURE__*/React.createElement(Tip, {
    className: styles.popup,
    action: /*#__PURE__*/React.createElement("button", {
      onClick: () => setIsOpened(false)
    }, /*#__PURE__*/React.createElement(Icon, {
      type: "close-medium"
    }))
  }));
};

export default TipPopup;