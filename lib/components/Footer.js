import React from 'react';
import cx from 'classnames';
import { Link } from 'react-router-dom';
import Version from './Version/Version';
import ContactUs from './ContactUs/ContactUs';
import styles from './Footer.module.css';

const Footer = ({
  classes = {}
}) => /*#__PURE__*/React.createElement("footer", {
  className: cx(styles.footer, classes.footer)
}, /*#__PURE__*/React.createElement("div", {
  className: styles.links
}, /*#__PURE__*/React.createElement(ContactUs, {
  as: "a",
  className: styles.contact
}), /*#__PURE__*/React.createElement(Link, {
  to: '/privacy-policy'
}, "Privacy"), /*#__PURE__*/React.createElement("a", {
  target: "_blank",
  rel: "noopener noreferrer",
  href: "https://academy.santiment.net/sanbase/requesting-display-new-project/"
}, "Request token")), /*#__PURE__*/React.createElement(Version, {
  classes: classes
}));

export default Footer;