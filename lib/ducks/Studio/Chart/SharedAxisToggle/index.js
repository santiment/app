import React from 'react';
import cx from 'classnames';
import Toggle from '@santiment-network/ui/Toggle';
import styles from './index.module.css';
export default (({
  className,
  isDomainGroupingActive,
  setIsDomainGroupingActive
}) => {
  function toggleDomainGrouping() {
    setIsDomainGroupingActive(state => !state);
  }

  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, className),
    onClick: toggleDomainGrouping
  }, "Shared axis", /*#__PURE__*/React.createElement(Toggle, {
    isActive: isDomainGroupingActive,
    className: styles.toggle
  }));
});