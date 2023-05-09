import React from 'react';
import cx from 'classnames';
import styles from './Column.module.css';

const Column = ({
  className,
  percent,
  color = '#FFAD4D'
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className),
  style: {
    '--percent': `${percent}%`,
    '--color': color
  }
});

export default Column;