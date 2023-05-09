import React from 'react';
import cx from 'classnames';
import NoDataTemplate from '../../../components/NoDataTemplate';
import styles from './index.module.css';

const NoData = ({
  description,
  title,
  skipNoData,
  className
}) => skipNoData ? null : /*#__PURE__*/React.createElement(NoDataTemplate, {
  className: cx(styles.wrapper, className),
  desc: description,
  title: title
});

export default NoData;