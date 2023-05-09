import React from 'react';
import cx from 'classnames';
import NoDataImage from '../Illustrations/NoData';
import styles from './index.module.css';

const NoDataTemplate = ({
  title,
  desc,
  className
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, /*#__PURE__*/React.createElement(NoDataImage, {
  className: styles.img
}), /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("h3", {
  className: styles.title
}, title), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, desc)));

NoDataTemplate.defaultProps = {
  title: '',
  desc: ''
};
export default NoDataTemplate;