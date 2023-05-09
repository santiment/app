import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import { Button, Icon } from '@santiment-network/ui';
import { LoaderImage } from '../../../components/Loader/PageLoader';
import styles from './MobileWrapper.module.css';

const MobileHeader = ({
  toggleMenu
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.header
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.headercontent, 'row justify v-center')
}, /*#__PURE__*/React.createElement("div", {
  className: "row v-center"
}, /*#__PURE__*/React.createElement(LoaderImage, {
  withAnimation: false,
  size: 32
}), /*#__PURE__*/React.createElement("h1", {
  className: "mrg--l mrg-s body-2 txt-m"
}, "Sanbase")), /*#__PURE__*/React.createElement(Button, {
  to: "/search",
  as: Link,
  onClick: () => toggleMenu()
}, /*#__PURE__*/React.createElement(Icon, {
  type: "search",
  width: 18,
  height: 18
}))));

export default MobileHeader;