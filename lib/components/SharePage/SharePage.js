function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React from 'react';
import ShareMedias from '../Share/medias/ShareMedias';
import styles from './SharePage.module.css';

const SharePage = props => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, "Share", /*#__PURE__*/React.createElement(ShareMedias, _extends({}, props, {
    shareLink: window.location.href,
    showTitle: false,
    classes: styles
  })));
};

export default SharePage;