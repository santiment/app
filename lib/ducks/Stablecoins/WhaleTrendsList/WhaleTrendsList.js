import React from 'react';
import { WhaleAssets } from './utils';
import WhalesTrend from './WhalesTrend';
import styles from './WhaleTrendsList.module.css';

const WhaleTrendsList = () => {
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, WhaleAssets.map(item => /*#__PURE__*/React.createElement(WhalesTrend, {
    key: item.slug,
    item: item
  })));
};

export default WhaleTrendsList;