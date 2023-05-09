import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import Panel from '@santiment-network/ui/Panel/Panel';
import EmptySection from '../../../../components/EmptySection/EmptySection';
import styles from './WatchlistsAnon.module.css';

const LoginBlock = () => /*#__PURE__*/React.createElement("div", {
  className: styles.bottom
}, /*#__PURE__*/React.createElement("p", {
  className: cx(styles.desc, styles.login)
}, "Please, log in to use this feature"), /*#__PURE__*/React.createElement(Button, {
  variant: "fill",
  accent: "positive",
  className: styles.btn,
  as: Link,
  to: '/login'
}, "Log in"));

const WrapperType = ({
  children,
  className,
  isFullScreen
}) => isFullScreen ? /*#__PURE__*/React.createElement(Panel, {
  className: cx(styles.fullScreen, styles.wrapper, className)
}, children) : /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className)
}, children);

const WatchlistsAnon = ({
  isFullScreen,
  className,
  wrapperClassName
}) => /*#__PURE__*/React.createElement(WrapperType, {
  isFullScreen: isFullScreen,
  className: wrapperClassName
}, /*#__PURE__*/React.createElement(EmptySection, {
  className: className,
  imgClassName: cx(styles.hide, className, isFullScreen && styles.img)
}, /*#__PURE__*/React.createElement("p", {
  className: styles.title
}, "Easy asset tracking"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "Use watchlists to organize and track"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "assets you are interested in"), /*#__PURE__*/React.createElement(LoginBlock, null)));

export const ChartLayoutsAnon = ({
  isFullScreen,
  className
}) => /*#__PURE__*/React.createElement(WrapperType, {
  isFullScreen: isFullScreen
}, /*#__PURE__*/React.createElement(EmptySection, {
  className: className,
  imgClassName: cx(styles.hide, isFullScreen && styles.img)
}, /*#__PURE__*/React.createElement("p", {
  className: styles.title
}, "Make your own Chart Layouts"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "Create, load and save"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "your personal chart views"), /*#__PURE__*/React.createElement(LoginBlock, null)));
export default WatchlistsAnon;