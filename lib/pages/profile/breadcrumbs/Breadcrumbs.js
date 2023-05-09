import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import styles from './Breadcrumbs.module.css';

const Breadcrumbs = ({
  crumbs,
  className
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.breadcrumbs, className)
  }, crumbs.map(({
    label,
    to = '#'
  }, index) => {
    const isLast = index === crumbs.length - 1;
    return /*#__PURE__*/React.createElement("div", {
      key: label || to
    }, /*#__PURE__*/React.createElement(Link, {
      to: to,
      className: cx(styles.root, isLast && styles.active)
    }, label), !isLast && /*#__PURE__*/React.createElement(Icon, {
      type: "arrow-right",
      className: styles.arrow
    }));
  }));
};

export default Breadcrumbs;