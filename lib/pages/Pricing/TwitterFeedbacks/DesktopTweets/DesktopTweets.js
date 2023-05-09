import React, { useCallback, useState } from 'react';
import Masonry from 'react-responsive-masonry';
import { useEventListener } from '../../../../hooks/eventListeners';
import { TweetCard, TweetsParsed } from '../Tweets';
import styles from './DesktopTweets.module.css';
const SETTINGS = {
  columnWidth: 370,
  height: 300,
  gutterSize: 10
};

function getColumnsCount() {
  const {
    columnWidth,
    gutterSize
  } = SETTINGS;
  const width = Math.min(window.innerWidth, 1140);
  return Math.floor(width / (columnWidth + gutterSize));
}

const DesktopTweets = () => {
  const [columnsCount, setColumnsCount] = useState(() => getColumnsCount());

  function _calculateColumnCount() {
    const newCount = getColumnsCount();

    if (newCount !== columnsCount) {
      setColumnsCount(newCount);
    }
  }

  const _onResize = useCallback(() => {
    _calculateColumnCount();
  }, [_calculateColumnCount]);

  useEventListener('resize', _onResize);
  return /*#__PURE__*/React.createElement("div", {
    className: styles.container
  }, /*#__PURE__*/React.createElement(Masonry, {
    columnsCount: columnsCount,
    gutter: '24px'
  }, TweetsParsed.map((item, index) => /*#__PURE__*/React.createElement(TweetCard, {
    item: item,
    key: index
  }))), /*#__PURE__*/React.createElement("div", {
    className: styles.gradient
  }));
};

export default DesktopTweets;