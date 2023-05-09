import React from 'react';
import cx from 'classnames';
import Label from '@santiment-network/ui/Label';
import Loader from '@santiment-network/ui/Loader/Loader';
import styles from './Stat.module.css';

const Stat = ({
  name,
  values = [],
  className,
  isLoading
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.stat, className)
}, /*#__PURE__*/React.createElement(Label, {
  className: styles.statName
}, name), values.map((value, idx) => /*#__PURE__*/React.createElement(Label, {
  key: idx,
  className: cx(styles.statValue, isLoading && styles.loading)
}, value, isLoading && /*#__PURE__*/React.createElement(Loader, {
  className: styles.loader
}))));

export default Stat;