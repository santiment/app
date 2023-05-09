import React from 'react';
import DarkTooltip from '../../../../../../components/Tooltip/DarkTooltip';
import styles from './index.module.css';

const DeprecatedLabel = ({
  isAuthor
}) => {
  return /*#__PURE__*/React.createElement(DarkTooltip, {
    position: "top",
    align: "center",
    on: "hover",
    className: styles.deprecated__tooltip,
    trigger: /*#__PURE__*/React.createElement("span", {
      className: styles.deprecated__label
    }, "OUTDATED")
  }, `This metric no longer supported in screener${isAuthor ? '. Please, update your filter' : ''}`);
};

export default DeprecatedLabel;