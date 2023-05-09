import React from 'react';
import cx from 'classnames';
import Skeleton from '../../../components/Skeleton/Skeleton';
import styles from './index.module.css';

const Loader = ({
  isLoading,
  classes = {},
  repeat
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.loader, classes.wrapper)
}, /*#__PURE__*/React.createElement(Skeleton, {
  className: cx(styles.skeleton, classes.row),
  show: isLoading,
  repeat: repeat
}));

export default Loader;