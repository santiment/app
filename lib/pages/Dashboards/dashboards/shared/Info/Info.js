import React from 'react';
import cx from 'classnames';
import ShareMedias from '../../../../../components/Share/medias/ShareMedias';
import styles from './Info.module.css';

const Info = ({
  title,
  description
}) => /*#__PURE__*/React.createElement("article", {
  className: cx(styles.wrapper, 'row justify')
}, /*#__PURE__*/React.createElement("div", {
  className: cx(styles.info)
}, /*#__PURE__*/React.createElement("h4", {
  className: "h4 txt-b mrg-m mrg--b"
}, title), /*#__PURE__*/React.createElement("p", null, description)), /*#__PURE__*/React.createElement("div", {
  className: cx(styles.share, 'column')
}, /*#__PURE__*/React.createElement("p", {
  className: "nowrap txt-m txt-right c-waterloo mrg-m mrg--b"
}, "Share on social media"), /*#__PURE__*/React.createElement(ShareMedias, {
  shareLink: window.location.href,
  shareText: description,
  isDashboard: true
})));

export default Info;