import React from 'react';
import cx from 'classnames';
import StepsContent from './StepsContent/StepsContent';
import styles from './AlertModalContent.module.css';

const AlertModalContent = ({
  selectorSettings
}) => {
  const {
    shouldHideRestrictionMessage
  } = selectorSettings;
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, !shouldHideRestrictionMessage && styles.wrapperResized)
  }, /*#__PURE__*/React.createElement(StepsContent, {
    selectorSettings: selectorSettings
  }));
};

export default AlertModalContent;