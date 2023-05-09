import React from 'react';
import cx from 'classnames';
import withSizes from 'react-sizes';
import { Link } from 'react-router-dom';
import Icon from '@santiment-network/ui/Icon';
import { mapSizesToProps } from '../../utils/withSizes';
import styles from './index.module.css';

const Page = ({
  className,
  headerClassName,
  children,
  title,
  isPhone,
  isCentered,
  isWithPadding,
  mainClassName,
  hasHeader = true
}) => /*#__PURE__*/React.createElement("div", {
  className: cx(styles.wrapper, className, isCentered && styles.centered)
}, hasHeader && /*#__PURE__*/React.createElement("div", {
  className: cx(styles.header, isPhone && 'row v-center justify', headerClassName)
}, title && /*#__PURE__*/React.createElement("h1", {
  className: "h4 txt-m nowrap mrg-l mrg--r"
}, title), isPhone && /*#__PURE__*/React.createElement(Link, {
  to: "/search"
}, /*#__PURE__*/React.createElement(Icon, {
  type: "search",
  width: "18",
  height: "18",
  className: styles.searchIcon
}))), /*#__PURE__*/React.createElement("main", {
  className: cx(styles.main, isWithPadding && !isCentered && styles.main_padding, mainClassName)
}, children));

Page.defaultProps = {
  isWithPadding: true
};
export default withSizes(mapSizesToProps)(Page);