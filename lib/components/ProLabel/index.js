import React from 'react';
import cx from 'classnames';
import { NavLink as Link } from 'react-router-dom';
import Label from '@santiment-network/ui/Label';
import styles from './index.module.css';
export const ProLabel = ({
  className,
  as = Link,
  isPlus
}) => /*#__PURE__*/React.createElement(Label, {
  as: as,
  to: "/pricing",
  className: cx(styles.label, isPlus && styles.plus, className),
  variant: "fill",
  accent: "texas-rose"
}, "PRO", isPlus && '+');