import React from 'react';
import PageLoader from '../../../components/Loader/PageLoader';
import styles from './GeneralFeed.module.css';

const EmptyFeed = () => /*#__PURE__*/React.createElement("div", {
  className: styles.scrollable
}, /*#__PURE__*/React.createElement(PageLoader, null));

export default EmptyFeed;