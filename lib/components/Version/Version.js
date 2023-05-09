import React from 'react';
import cx from 'classnames';
import styles from './Version.module.css';
export const VersionLabel = ({
  className
}) => /*#__PURE__*/React.createElement("span", {
  className: className
}, process.env.REACT_APP_VERSION);

const Version = ({
  classes = {}
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("span", {
  className: cx(styles.versionDivider, classes.footerVersionDivider)
}, "|"), /*#__PURE__*/React.createElement("span", {
  className: cx(styles.version, classes.version)
}, "Ver. ", /*#__PURE__*/React.createElement(VersionLabel, null)));

export default Version;