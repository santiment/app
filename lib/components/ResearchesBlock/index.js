import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Button from '@santiment-network/ui/Button';
import ContactUs from '../ContactUs/ContactUs';
import styles from './index.module.css';

const ResearchesBlock = ({
  className
}) => /*#__PURE__*/React.createElement("section", {
  className: cx(styles.wrapper, className)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.content
}, /*#__PURE__*/React.createElement("div", {
  className: styles.block
}, /*#__PURE__*/React.createElement("h4", {
  className: styles.heading
}, "Researchers"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "Need data to support your crypto market analysis? Tap into on-chain, social media and development indicators on over 1000 cryptocurrencies via our", ' ', /*#__PURE__*/React.createElement("a", {
  href: "https://sheets.santiment.net/",
  target: "_blank",
  rel: "noopener noreferrer",
  className: styles.link
}, "Google spreadsheet plugin"), ", through our", ' ', /*#__PURE__*/React.createElement("a", {
  target: "_blank",
  rel: "noopener noreferrer",
  className: styles.link,
  href: "https://api.santiment.net/"
}, "unified API"), ' ', "or directly on charts in Sanbase Studio."), /*#__PURE__*/React.createElement(Button, {
  border: true,
  className: styles.button,
  as: Link,
  to: '/charts',
  target: "_blank",
  rel: "noopener noreferrer"
}, "Go to Studio")), /*#__PURE__*/React.createElement("div", {
  className: styles.block
}, /*#__PURE__*/React.createElement("h4", {
  className: styles.heading
}, "Reporters"), /*#__PURE__*/React.createElement("p", {
  className: styles.desc
}, "Want to give more context about crypto market events to your audience? We help content creators big and small elevate their market coverage with hard data and explore new, untapped market storylines."), /*#__PURE__*/React.createElement(ContactUs, {
  border: true,
  className: styles.button
}))));

export default ResearchesBlock;