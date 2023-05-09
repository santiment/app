import React from 'react';
import cx from 'classnames';
import PropTypes from 'prop-types';
import { CSSTransition } from 'react-transition-group';
import styles from './Skeleton.module.css';

const Skeleton = ({
  className,
  wrapperClassName,
  centered,
  show,
  repeat
}) => {
  const elem = new Array(repeat).fill(0);
  return /*#__PURE__*/React.createElement("div", {
    className: cx(styles.wrapper, centered && styles.centered, wrapperClassName)
  }, /*#__PURE__*/React.createElement(CSSTransition, {
    in: show,
    timeout: 1000,
    classNames: {
      exit: styles.animated,
      exitActive: styles.fadeOut
    },
    unmountOnExit: true
  }, /*#__PURE__*/React.createElement("div", null, elem.map((_, idx) => /*#__PURE__*/React.createElement("div", {
    className: cx(styles.skeleton, className),
    key: idx
  })))));
};

Skeleton.propTypes = {
  repeat: PropTypes.number.isRequired,
  show: PropTypes.bool.isRequired
};
export default Skeleton;