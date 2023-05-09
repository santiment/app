import React from 'react';
import Like from './like.png';
import Dislike from './dislike.png';
import styles from './index.module.css';

const UsefulSuggestion = () => /*#__PURE__*/React.createElement("div", {
  className: styles.wrapper
}, /*#__PURE__*/React.createElement("span", {
  className: styles.text
}, "Is this signal useful?"), /*#__PURE__*/React.createElement("img", {
  src: Like,
  alt: "yes",
  className: styles.reaction
}), /*#__PURE__*/React.createElement("img", {
  src: Dislike,
  alt: "no",
  className: styles.reaction
}));

export default UsefulSuggestion;