function _extends() { _extends = Object.assign ? Object.assign.bind() : function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

import React, { Fragment } from 'react';
import { getDateFormats } from '../../utils/dates';
import { makeDateLabel } from '../../pages/feed/GeneralFeed/FeedList/FeedList';
import styles from './Feed.module.css';

const Feed = ({
  component: El,
  data,
  dateKey
}) => {
  let lastDateKey;
  return data.map((item, index) => {
    const id = item.id || index;
    let isNotSameAsLastDate, date;

    if (dateKey) {
      const {
        MMM,
        D
      } = getDateFormats(new Date(item[dateKey]));
      date = `${MMM} ${D}`;
      isNotSameAsLastDate = date !== lastDateKey;

      if (isNotSameAsLastDate) {
        lastDateKey = date;
      }
    }

    return /*#__PURE__*/React.createElement(Fragment, {
      key: id
    }, isNotSameAsLastDate && /*#__PURE__*/React.createElement("h4", {
      className: styles.date
    }, makeDateLabel(new Date(item[dateKey]))), /*#__PURE__*/React.createElement(El, _extends({
      className: styles.signal
    }, item)));
  });
};

export default Feed;