import React from 'react';
import styles from './Text.module.css';

const Text = ({
  text
}) => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper,
  dangerouslySetInnerHTML: {
    __html: text
  }
});

export default Text;