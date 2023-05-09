import React from 'react';
import cx from 'classnames';
import { CSSTransition } from 'react-transition-group';
import styles from './Skeleton.module.css';
const transitionStyles = {
  exit: styles.animated,
  exitActive: styles.fadeOut
};

const BaseSkeleton = ({
  className,
  children,
  show
}) => /*#__PURE__*/React.createElement(CSSTransition, {
  unmountOnExit: true,
  in: show,
  timeout: 1000,
  classNames: transitionStyles
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, children));

export const FluidSkeleton = ({
  className,
  show
}) => /*#__PURE__*/React.createElement(BaseSkeleton, {
  show: show,
  className: cx(styles.skeleton, className)
});
export const Skeleton = ({
  className,
  show
}) => /*#__PURE__*/React.createElement(BaseSkeleton, {
  show: show
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.skeleton, className)
}));