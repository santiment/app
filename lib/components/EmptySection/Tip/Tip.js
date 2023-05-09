import React from 'react';
import cx from 'classnames';
import { MobileOnly } from '../../Responsive';
import tip from '../../../assets/tip.svg';
import styles from './tip.module.css';

const Tip = ({
  className,
  action
}) => /*#__PURE__*/React.createElement(MobileOnly, null, /*#__PURE__*/React.createElement("section", {
  className: cx(styles.tipWrapper, 'row', className)
}, /*#__PURE__*/React.createElement("img", {
  src: tip,
  alt: "tip",
  className: cx(styles.tipImg, 'mrg-m mrg--r')
}), /*#__PURE__*/React.createElement("article", {
  className: "body-2 mrg-xs mrg--b"
}, /*#__PURE__*/React.createElement("div", {
  className: "row justify v-center"
}, /*#__PURE__*/React.createElement("p", {
  className: "txt-m"
}, "Go to desktop for full access!"), action), /*#__PURE__*/React.createElement("p", {
  className: cx(styles.tipDescription, 'mrg-l mrg--r')
}, "Head to Sanbase\u2019s desktop version for the ability to create watchlists, alerts, chart layouts, and the ability to edit and access more features!"))));

export default Tip;