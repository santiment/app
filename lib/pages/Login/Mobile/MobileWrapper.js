import React from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { mapSizesToProps } from '../../../utils/withSizes';
import Icon from '@santiment-network/ui/Icon';
import Panel from '@santiment-network/ui/Panel';
import MobileHeader from './MobileHeader';
import styles from './MobileWrapper.module.css';

const MobileWrapper = ({
  isDesktop,
  children,
  onBack,
  className,
  withHeader = false,
  toggleMenu
}) => {
  if (isDesktop) {
    return children;
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className, withHeader && styles.withHeader)
  }, withHeader && /*#__PURE__*/React.createElement(MobileHeader, {
    toggleMenu: toggleMenu
  }), /*#__PURE__*/React.createElement(Panel, {
    padding: true,
    className: cx(styles.panel, withHeader && styles.withHeader)
  }, onBack && /*#__PURE__*/React.createElement(Icon, {
    type: "close-medium",
    className: styles.iconClose,
    onClick: onBack
  }), children));
};

export default withSizes(mapSizesToProps)(MobileWrapper);