import React from 'react';
import cx from 'classnames';
import Loader from '@santiment-network/ui/Loader/Loader';
import { formatNumber } from '../../utils/formatting';
import { Skeleton } from '../Skeleton';
import styles from './DashboardCounter.module.css';

const DashboardCounter = ({
  formatter = formatNumber,
  loadings,
  value,
  title,
  classes = {}
}) => {
  const isValid = Number.isFinite(value);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.wrapper
  }, /*#__PURE__*/React.createElement(Skeleton, {
    show: loadings,
    className: cx(styles.skeleton, classes.skeleton)
  }), !loadings && /*#__PURE__*/React.createElement("div", {
    className: styles.card
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.title
  }, title), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, loadings ? /*#__PURE__*/React.createElement(Loader, {
    className: styles.loading
  }) : isValid ? formatter(value.toFixed(2)) : 'No Data')));
};

export default DashboardCounter;