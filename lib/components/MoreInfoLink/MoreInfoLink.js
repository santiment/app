import React from 'react';
import styles from './MoreInfoLink.module.css';

const MoreInfoLink = ({
  href
}) => {
  return /*#__PURE__*/React.createElement("span", {
    className: styles.wrapper
  }, "More info", ' ', /*#__PURE__*/React.createElement("a", {
    target: "_blank",
    rel: "noopener noreferrer",
    href: href,
    className: styles.link
  }, "here"));
};

export default MoreInfoLink;