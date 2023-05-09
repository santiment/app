import React from 'react';
import cx from 'classnames';
import GeneralFeed from './GeneralFeed/GeneralFeed';
import MobileHeader from '../../components/MobileHeader/MobileHeader';
import styles from './Feed.module.css';

const FeedPage = ({
  location
}) => {
  return /*#__PURE__*/React.createElement("div", {
    className: cx('page', styles.feed)
  }, /*#__PURE__*/React.createElement(MobileHeader, {
    title: "Feed"
  }), /*#__PURE__*/React.createElement("div", {
    className: styles.feeds
  }, /*#__PURE__*/React.createElement(GeneralFeed, {
    location: location
  })));
};

export default FeedPage;