import React, { useState } from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import Button from '@santiment-network/ui/Button';
import styles from './MobileProPopup.module.css';

const MobileProPopup = () => {
  const [isShow, setIsShow] = useState(true);
  return /*#__PURE__*/React.createElement(Button, {
    variant: "fill",
    accent: "orange",
    className: cx(styles.wrapper, !isShow && styles.closeAnimation, isShow && styles.appearAnimation)
  }, /*#__PURE__*/React.createElement(Link, {
    to: "/pricing",
    className: styles.link
  }, /*#__PURE__*/React.createElement(Icon, {
    type: "crown",
    className: styles.crown
  }), "Go PRO and get more data"), /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    onClick: () => setIsShow(false),
    className: styles.close
  }));
};

export default MobileProPopup;