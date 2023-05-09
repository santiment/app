import React from 'react';
import cx from 'classnames';
import styles from './AffiliateStatistics.module.css';

const AffiliateStatistics = ({
  promotions
}) => {
  const leadsCount = promotions.reduce((acc, item) => {
    return acc + +item.leadsCount;
  }, 0);
  const visitorsCount = promotions.reduce((acc, item) => {
    return acc + +item.visitorsCount;
  }, 0);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Clicks"), /*#__PURE__*/React.createElement("div", {
    className: styles.value
  }, visitorsCount)), /*#__PURE__*/React.createElement("div", {
    className: styles.block
  }, /*#__PURE__*/React.createElement("div", {
    className: styles.label
  }, "Sign ups"), /*#__PURE__*/React.createElement("div", {
    className: cx(styles.value, styles.highline)
  }, leadsCount)));
};

export default AffiliateStatistics;